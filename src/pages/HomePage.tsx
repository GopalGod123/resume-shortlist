import React, { useState, useMemo } from 'react';
import type { UploadedFile, ResumeAnalysisResult } from '../types';
import { extractTextFromPDF } from '../services/pdfParser';
import { analyzeResume } from '../services/groqService';
import { ResumeCard, ResumeUpload, JobDescriptionInput, LoadingSpinner, AnalysisResults } from '../components/features/ResumeAnalysis';
import { Alert, AlertDescription, AlertTitle } from '../components/ui/Alert';
import { Sparkles, Target, Users, CheckCircle } from 'lucide-react';

const HomePage: React.FC = () => {
  const [jobDescription, setJobDescription] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [results, setResults] = useState<ResumeAnalysisResult[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [processingStatus, setProcessingStatus] = useState<string>('');
  const [processedCount, setProcessedCount] = useState(0);

  const isAnalysisDisabled = useMemo(() => {
    return isLoading || !jobDescription.trim() || uploadedFiles.length === 0;
  }, [isLoading, jobDescription, uploadedFiles]);

  // Helper function to add delay between requests
  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  const handleAnalyze = async () => {
    setIsLoading(true);
    setError(null);
    setResults([]);
    setProcessedCount(0);
    setProcessingStatus('Initializing analysis...');

    const successfulResults: ResumeAnalysisResult[] = [];
    let processingError = "";

    // Process resumes sequentially to avoid rate limits
    for (let i = 0; i < uploadedFiles.length; i++) {
      const uploadedFile = uploadedFiles[i];
      
      try {
        setProcessingStatus(`Processing ${uploadedFile.file.name} (${i + 1}/${uploadedFiles.length})`);
        
        // Extract text from PDF
        const resumeText = await extractTextFromPDF(uploadedFile.file);
        if (!resumeText.trim()) {
          throw new Error("Extracted text is empty. The PDF might be an image or empty.");
        }

        // Analyze resume with AI
        const analysis = await analyzeResume(resumeText, jobDescription);
        
        const result: ResumeAnalysisResult = {
          ...analysis,
          id: uploadedFile.id,
          fileName: uploadedFile.file.name,
        };

        successfulResults.push(result);
        setProcessedCount(i + 1);
        
        // Update results in real-time
        setResults([...successfulResults].sort((a, b) => b.match_score - a.match_score));
        
      } catch (e: any) {
        console.error(`Failed to process ${uploadedFile.file.name}:`, e);
        processingError += `Could not process ${uploadedFile.file.name}: ${e.message || "An unknown error occurred during analysis."}\n`;
        setProcessedCount(i + 1);
      }

      // Add delay between requests to respect rate limits (2 seconds)
      if (i < uploadedFiles.length - 1) {
        setProcessingStatus(`Waiting to process next file... (${i + 2}/${uploadedFiles.length})`);
        await delay(2000); // 2 second delay between requests
      }
    }

    // Final sorting and error handling
    setResults(successfulResults.sort((a, b) => b.match_score - a.match_score));

    if (processingError) {
      setError(processingError.trim());
    }

    setProcessingStatus('Analysis completed!');
    setIsLoading(false);
  };

  const handleReset = () => {
    setJobDescription('');
    setUploadedFiles([]);
    setResults([]);
    setError(null);
    setIsLoading(false);
    setProcessingStatus('');
    setProcessedCount(0);
  };

  const getTopCandidates = () => {
    return results.filter(r => r.match_score >= 75).length;
  };

  const getAverageScore = () => {
    if (results.length === 0) return 0;
    return Math.round(results.reduce((sum, r) => sum + r.match_score, 0) / results.length);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-slate-900 dark:to-gray-800 flex items-center justify-center transition-colors duration-300">
        <div className="text-center">
          <LoadingSpinner />
                      <div className="mt-8 max-w-md">
              <div className="mb-4">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">Processing Resumes</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">{processingStatus}</p>
              </div>
            
            {uploadedFiles.length > 0 && (
              <>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 mb-4">
                  <div 
                    className="bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-500 dark:to-blue-500 h-3 rounded-full transition-all duration-300"
                    style={{ width: `${(processedCount / uploadedFiles.length) * 100}%` }}
                  />
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {processedCount} of {uploadedFiles.length} files processed
                </p>
              </>
            )}
            
            <div className="mt-6 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800">
              <p className="text-sm text-amber-700 dark:text-amber-300">
                <strong>⏱️ Processing sequentially to avoid rate limits</strong><br/>
                Each resume takes about 2-3 seconds to analyze properly.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-slate-900 dark:to-gray-800 transition-colors duration-300">
      {results.length === 0 ? (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full mb-6 animate-float">
              <Sparkles className="w-10 h-10 text-white" />
            </div>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
              AI Resume Shortlister
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Discover your perfect candidates with the power of AI. Upload resumes, define your requirements, and let our intelligent system find the best matches.
            </p>
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="text-center p-6 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 dark:border-gray-700/50">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-lg mb-2 dark:text-gray-100">Smart Matching</h3>
              <p className="text-gray-600 dark:text-gray-300">Advanced AI algorithms analyze skills, experience, and qualifications</p>
            </div>
            <div className="text-center p-6 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 dark:border-gray-700/50">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-lg mb-2 dark:text-gray-100">Sequential Processing</h3>
              <p className="text-gray-600 dark:text-gray-300">Process resumes one by one to ensure quality analysis without rate limits</p>
            </div>
            <div className="text-center p-6 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 dark:border-gray-700/50">
              <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-lg mb-2 dark:text-gray-100">Real-time Results</h3>
              <p className="text-gray-600 dark:text-gray-300">See results as each resume is processed with live progress updates</p>
            </div>
          </div>

          {/* Rate Limit Info */}
          <div className="mb-8 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-2xl border border-blue-200 dark:border-blue-800">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-800 rounded-full flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">Optimized Processing</h3>
                <p className="text-blue-700 dark:text-blue-300 text-sm leading-relaxed">
                  We process resumes sequentially with smart delays to ensure consistent, high-quality analysis. 
                  This approach prevents rate limits and gives you the best results every time.
                </p>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 dark:border-gray-700/50 p-8 lg:p-12 transition-colors duration-300">
            <div className="mb-8">
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">Start New Analysis</h2>
              <p className="text-gray-600 dark:text-gray-400">Fill out the details below to begin shortlisting your candidates.</p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <JobDescriptionInput 
                value={jobDescription} 
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setJobDescription(e.target.value)} 
                disabled={isLoading}
              />
              <ResumeUpload 
                uploadedFiles={uploadedFiles}
                onFilesChange={setUploadedFiles}
                disabled={isLoading}
              />
            </div>

            {error && (
              <div className="mt-8">
                <Alert variant="destructive">
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              </div>
            )}

            <div className="mt-8 flex justify-center">
              <button
                onClick={handleAnalyze}
                disabled={isAnalysisDisabled}
                className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 dark:from-purple-500 dark:to-blue-500 dark:hover:from-purple-600 dark:hover:to-blue-600 text-white font-semibold rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl dark:shadow-purple-500/25"
              >
                <Sparkles className="w-5 h-5 mr-2 inline" />
                Analyze Resumes ({uploadedFiles.length})
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Results Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mb-6">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Analysis Complete
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Here are your candidates, ranked by match score and compatibility.
            </p>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 text-center shadow-lg border border-white/20">
              <div className="text-3xl font-bold text-purple-600 mb-2">{results.length}</div>
              <div className="text-gray-600">Total Candidates</div>
            </div>
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 text-center shadow-lg border border-white/20">
              <div className="text-3xl font-bold text-green-600 mb-2">{getTopCandidates()}</div>
              <div className="text-gray-600">Top Matches (75%+)</div>
            </div>
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 text-center shadow-lg border border-white/20">
              <div className="text-3xl font-bold text-blue-600 mb-2">{getAverageScore()}%</div>
              <div className="text-gray-600">Average Score</div>
            </div>
          </div>

          {error && (
            <div className="mb-8">
              <Alert variant="destructive">
                <AlertTitle>Processing Issues</AlertTitle>
                <AlertDescription>
                  Some resumes could not be processed. Please see the details below:
                  <pre className="whitespace-pre-wrap mt-2 text-xs font-mono bg-destructive/10 p-2 rounded-md">{error}</pre>
                </AlertDescription>
              </Alert>
            </div>
          )}

          {/* Reset Button */}
          <div className="mb-8 text-center">
            <button
              onClick={handleReset}
              className="px-6 py-2 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-700 transition-colors"
            >
              Start New Analysis
            </button>
          </div>

          {/* Results using AnalysisResults component */}
          <AnalysisResults results={results} />
        </div>
      )}
    </div>
  );
};

export default HomePage; 