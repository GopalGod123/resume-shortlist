
import React from 'react';
import { Sparkles, Brain, Zap } from 'lucide-react';

interface SpinnerProps {
    message?: string;
}

const Spinner: React.FC<SpinnerProps> = ({ message = "Analyzing resumes with AI..." }) => {
  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex flex-col items-center justify-center z-50">
      <div className="bg-white/90 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-white/20 max-w-md mx-4">
        <div className="flex flex-col items-center text-center">
          {/* Animated Logo */}
          <div className="relative mb-6">
            <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center animate-pulse">
              <Brain className="w-10 h-10 text-white" />
            </div>
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center animate-bounce">
              <Sparkles className="w-3 h-3 text-white" />
            </div>
            <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-gradient-to-r from-green-400 to-blue-400 rounded-full flex items-center justify-center animate-ping">
              <Zap className="w-3 h-3 text-white" />
            </div>
          </div>

          {/* Loading Bars */}
          <div className="flex space-x-2 mb-6">
            <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full animate-bounce"></div>
            <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
            <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
            <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.3s'}}></div>
          </div>

          {/* Message */}
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Processing...</h3>
          <p className="text-gray-600 text-sm leading-relaxed max-w-sm">
            {message}
          </p>

          {/* Progress Steps */}
          <div className="mt-6 space-y-2 w-full">
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>Extracting text from PDFs</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
              <span>Analyzing with Gemini AI</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
              <span>Calculating match scores</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Spinner;
