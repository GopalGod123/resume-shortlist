import { Groq } from 'groq-sdk';
import type { ResumeAnalysisResult } from '../types';

// Get API key from environment variables
const getApiKey = (): string => {
    const apiKey = (import.meta as any).env.VITE_GROQ_API_KEY;
    
    if (!apiKey) {
        throw new Error(
            "VITE_GROQ_API_KEY environment variable not set. " +
            "Please create a .env file in your project root and add: VITE_GROQ_API_KEY=your_api_key_here"
        );
    }
    
    return apiKey;
};

const groq = new Groq({ 
    apiKey: getApiKey(),
    dangerouslyAllowBrowser: true 
});

const generatePrompt = (resumeText: string, jobDescription: string): string => {
    return `You are an expert HR assistant. Analyze the resume against the job description and return ONLY a JSON object with this exact structure:

{
  "candidate_name": "Full name from resume or 'Candidate' if not found",
  "match_score": 85,
  "matched_skills": ["skill1", "skill2", "skill3"],
  "missing_skills": ["skill4", "skill5"],
  "summary": "Brief summary of candidate fit for the role"
}

Job Description:
${jobDescription}

Resume:
${resumeText}

Return ONLY the JSON object, no other text, explanations, or formatting.`;
};

// Function to extract JSON from potentially messy response
const extractJSON = (text: string): string => {
    // First try to find JSON between curly braces
    const jsonMatch = text.match(/\{[\s\S]*?\}/);
    if (jsonMatch) {
        return jsonMatch[0];
    }
    
    // If no match found, try to find JSON between triple backticks
    const codeBlockMatch = text.match(/```(?:json)?\s*(\{[\s\S]*?\})\s*```/);
    if (codeBlockMatch) {
        return codeBlockMatch[1];
    }
    
    // If still no match, try to find JSON starting from first {
    const startBrace = text.indexOf('{');
    if (startBrace !== -1) {
        let braceCount = 0;
        let endBrace = startBrace;
        
        for (let i = startBrace; i < text.length; i++) {
            if (text[i] === '{') braceCount++;
            if (text[i] === '}') braceCount--;
            if (braceCount === 0) {
                endBrace = i;
                break;
            }
        }
        
        if (braceCount === 0) {
            return text.substring(startBrace, endBrace + 1);
        }
    }
    
    // If all else fails, return the original text
    return text;
};

export const analyzeResume = async (resumeText: string, jobDescription: string): Promise<Omit<ResumeAnalysisResult, 'id' | 'fileName'>> => {
    try {
        const chatCompletion = await groq.chat.completions.create({
            messages: [
                {
                    role: "user",
                    content: generatePrompt(resumeText, jobDescription)
                }
            ],
            model: "llama-3.1-8b-instant", // Using a more reliable model
            temperature: 0.3, // Lower temperature for more consistent output
            max_tokens: 2048,
            top_p: 0.9,
            stream: false,
            stop: null
        });

        const responseText = chatCompletion.choices[0]?.message?.content?.trim() ?? '';
        
        if (!responseText) {
            throw new Error('Empty response from Groq API');
        }

        console.log('Raw Groq response:', responseText); // Debug log
        
        // Extract JSON from the response
        const jsonText = extractJSON(responseText);
        console.log('Extracted JSON:', jsonText); // Debug log

        let parsedJson;
        try {
            parsedJson = JSON.parse(jsonText);
        } catch (parseError) {
            console.error('JSON Parse Error:', parseError);
            console.error('Failed to parse:', jsonText);
            throw new Error('Failed to parse AI response as JSON');
        }

        // Validate and sanitize the parsed object
        const result = {
            candidate_name: String(parsedJson.candidate_name || 'Candidate'),
            match_score: Number(parsedJson.match_score) || 0,
            matched_skills: Array.isArray(parsedJson.matched_skills) ? parsedJson.matched_skills : [],
            missing_skills: Array.isArray(parsedJson.missing_skills) ? parsedJson.missing_skills : [],
            summary: String(parsedJson.summary || 'No summary available')
        };

        // Ensure match_score is within valid range
        result.match_score = Math.max(0, Math.min(100, result.match_score));

        return result;
    } catch (error) {
        console.error('Error calling Groq API or parsing response:', error);
        
        // More specific error handling
        if (error instanceof Error) {
            if (error.message.includes('API key') || error.message.includes('authentication')) {
                throw new Error('Invalid API key. Please check your VITE_GROQ_API_KEY in the .env file.');
            }
            if (error.message.includes('quota') || error.message.includes('rate limit')) {
                throw new Error('API quota exceeded. Please check your Groq API usage limits.');
            }
            if (error.message.includes('JSON') || error.message.includes('parse')) {
                throw new Error('Failed to parse AI response. The AI may have returned invalid JSON.');
            }
        }
        
        throw new Error('Failed to get analysis from AI. Please check the console for details.');
    }
}; 