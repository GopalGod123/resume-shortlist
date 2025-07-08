import React from 'react';
import Textarea from '../../ui/Textarea';
import Card, { CardContent, CardHeader, CardTitle } from '../../ui/Card';
import { FileText, Sparkles, Lightbulb } from 'lucide-react';

interface JobDescriptionInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  disabled: boolean;
}

const JobDescriptionInput: React.FC<JobDescriptionInputProps> = ({ value, onChange, disabled }) => {
  const wordCount = value.trim().split(/\s+/).filter(word => word.length > 0).length;
  const charCount = value.length;
  const estimatedReadTime = Math.ceil(wordCount / 200); // ~200 words per minute

  return (
    <Card className="h-full bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-white/20 dark:border-gray-700/50 shadow-lg transition-colors duration-300">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-xl font-semibold text-gray-900 dark:text-gray-100">
          <FileText className="w-5 h-5 text-purple-600 dark:text-purple-400" />
          Job Description
        </CardTitle>
        <p className="text-sm text-gray-600 dark:text-gray-400">Define your requirements and criteria</p>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Input Area */}
        <div className="relative">
          <Textarea
            value={value}
            onChange={onChange}
            placeholder="Paste your job description here...

Example:
• Required skills: React, TypeScript, Node.js
• Experience: 3+ years in frontend development
• Education: Bachelor's degree in Computer Science
• Responsibilities: Build responsive web applications..."
            disabled={disabled}
            className="min-h-[280px] lg:min-h-[320px] resize-none border-gray-200 dark:border-gray-600 focus:border-purple-400 dark:focus:border-purple-500 focus:ring-purple-400 dark:focus:ring-purple-500 text-sm leading-relaxed placeholder:text-gray-400 dark:placeholder:text-gray-500 bg-white/50 dark:bg-gray-900/50 transition-all duration-200"
          />
          
          {/* Decorative elements */}
          <div className="absolute top-4 right-4 w-2 h-2 bg-purple-300 dark:bg-purple-400 rounded-full opacity-50" />
          <div className="absolute bottom-4 left-4 w-3 h-3 bg-blue-300 dark:bg-blue-400 rounded-full opacity-30" />
        </div>

        {/* Statistics */}
        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 bg-gray-50/50 dark:bg-gray-700/50 rounded-lg p-3 border border-gray-200/50 dark:border-gray-600/50">
          <div className="flex items-center gap-4">
            <span>{wordCount} words</span>
            <span>{charCount} characters</span>
            <span>~{estimatedReadTime} min read</span>
          </div>
          <div className="flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-purple-500 dark:text-purple-400" />
            <span className="text-purple-600 dark:text-purple-400 font-medium">AI Ready</span>
          </div>
        </div>

        {/* Tips Section */}
        <div className="bg-amber-50/50 dark:bg-amber-900/20 rounded-lg p-4 border border-amber-200/30 dark:border-amber-700/50">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-amber-100 dark:bg-amber-800 rounded-full flex items-center justify-center flex-shrink-0">
              <Lightbulb className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            </div>
            <div>
              <h4 className="text-sm font-medium text-amber-900 dark:text-amber-100 mb-1">
                Tips for better matching
              </h4>
              <ul className="text-xs text-amber-700 dark:text-amber-300 space-y-1">
                <li>• Be specific about required skills and technologies</li>
                <li>• Include experience levels and qualifications</li>
                <li>• Mention key responsibilities and expectations</li>
                <li>• Add any preferred certifications or education</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        {value.trim() && (
          <div className="flex items-center gap-2 pt-2">
            <div className="flex-1 bg-green-50 dark:bg-green-900/20 rounded-lg p-2 border border-green-200/30 dark:border-green-700/50">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 dark:bg-green-400 rounded-full" />
                <span className="text-xs text-green-700 dark:text-green-300 font-medium">
                  Job description ready for analysis
                </span>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default JobDescriptionInput;
