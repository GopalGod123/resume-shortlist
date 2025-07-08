import React from 'react';
import type { ResumeAnalysisResult } from '../../../types';
import ResumeCard from './ResumeCard';
import BestResumeCard from './BestResumeCard';

interface AnalysisResultsProps {
  results: ResumeAnalysisResult[];
}

const AnalysisResults: React.FC<AnalysisResultsProps> = ({ results }) => {
  if (results.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No results to display.</p>
      </div>
    );
  }

  // Sort results by match_score in descending order (highest first)
  const sortedResults = [...results].sort((a, b) => b.match_score - a.match_score);
  
  // Get the best resume (first in sorted array)
  const bestResume = sortedResults[0];
  
  // Get the rest of the resumes
  const otherResumes = sortedResults.slice(1);

  return (
    <div className="space-y-8">
      {/* Best Resume Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-1 h-8 bg-gradient-to-b from-amber-400 to-orange-500 rounded-full" />
            <h2 className="text-2xl font-bold text-gray-900">🏆 Best Match</h2>
          </div>
          <div className="flex-1 h-px bg-gradient-to-r from-amber-200 to-transparent" />
        </div>
        <BestResumeCard result={bestResume} />
      </div>

      {/* Other Resumes Section */}
      {otherResumes.length > 0 && (
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="w-1 h-8 bg-gradient-to-b from-blue-400 to-purple-500 rounded-full" />
              <h2 className="text-xl font-semibold text-gray-800">📋 Other Candidates</h2>
            </div>
            <div className="flex-1 h-px bg-gradient-to-r from-blue-200 to-transparent" />
            <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
              {otherResumes.length} candidate{otherResumes.length === 1 ? '' : 's'}
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
            {otherResumes.map((result) => (
              <ResumeCard key={result.id} result={result} />
            ))}
          </div>
        </div>
      )}

      {/* Summary Stats */}
      <div className="mt-8 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">📊 Analysis Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="text-2xl font-bold text-blue-600">{results.length}</div>
            <div className="text-sm text-gray-600">Total Resumes</div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="text-2xl font-bold text-green-600">{bestResume.match_score}%</div>
            <div className="text-sm text-gray-600">Best Match Score</div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="text-2xl font-bold text-purple-600">
              {Math.round(results.reduce((sum, r) => sum + r.match_score, 0) / results.length)}%
            </div>
            <div className="text-sm text-gray-600">Average Score</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalysisResults; 