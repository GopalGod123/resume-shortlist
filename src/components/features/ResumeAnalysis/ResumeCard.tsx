import React from 'react';
import Card, { CardContent, CardHeader, CardTitle } from '../../ui/Card';
import Badge from '../../ui/Badge';
import Progress from '../../ui/Progress';
import { User, Mail, Star, Building, Award } from 'lucide-react';
import type { ResumeAnalysisResult } from '../../../types';

interface ResumeCardProps {
  result: ResumeAnalysisResult;
}

const ResumeCard: React.FC<ResumeCardProps> = ({ result }) => {
  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-emerald-600';
    if (score >= 70) return 'text-blue-600';
    if (score >= 50) return 'text-yellow-600';
    return 'text-red-500';
  };

  const getScoreGradient = (score: number) => {
    if (score >= 85) return 'from-emerald-500 to-green-600';
    if (score >= 70) return 'from-blue-500 to-purple-600';
    if (score >= 50) return 'from-yellow-500 to-orange-600';
    return 'from-red-500 to-red-600';
  };

  const getScoreBackground = (score: number) => {
    if (score >= 85) return 'bg-emerald-50 border-emerald-200';
    if (score >= 70) return 'bg-blue-50 border-blue-200';
    if (score >= 50) return 'bg-yellow-50 border-yellow-200';
    return 'bg-red-50 border-red-200';
  };

  return (
    <Card className="group hover:shadow-xl transition-all duration-300 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-white/20 dark:border-gray-700/50 hover:bg-white/90 dark:hover:bg-gray-800/90">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
              <User className="w-6 h-6 text-white" />
            </div>
                         <div>
               <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100 line-clamp-1">
                 {result.candidate_name}
               </CardTitle>
               <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-1">
                 <Mail className="w-3 h-3" />
                 Resume Analysis
               </p>
             </div>
          </div>
          <div className={`px-3 py-1 rounded-full border-2 ${getScoreBackground(result.match_score)}`}>
            <span className={`text-lg font-bold ${getScoreColor(result.match_score)}`}>
              {result.match_score}%
            </span>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Score Progress */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400">Match Score</span>
            <span className={`font-semibold ${getScoreColor(result.match_score)}`}>
              {result.match_score}%
            </span>
          </div>
          <Progress 
            value={result.match_score} 
            colorClass={`bg-gradient-to-r ${getScoreGradient(result.match_score)}`}
          />
        </div>

        {/* Matched Skills */}
                  <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Star className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Matched Skills</span>
          </div>
          <div className="flex flex-wrap gap-1 pl-6">
            {result.matched_skills.slice(0, 4).map((skill: string, index: number) => (
              <Badge key={index} variant="success" className="text-xs">
                {skill}
              </Badge>
            ))}
            {result.matched_skills.length > 4 && (
              <Badge variant="default" className="text-xs text-gray-500">
                +{result.matched_skills.length - 4} more
              </Badge>
            )}
          </div>
        </div>

        {/* Missing Skills */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Missing Skills</span>
          </div>
          <div className="flex flex-wrap gap-1 pl-6">
            {result.missing_skills.slice(0, 3).map((skill: string, index: number) => (
              <Badge key={index} variant="destructive" className="text-xs">
                {skill}
              </Badge>
            ))}
            {result.missing_skills.length > 3 && (
              <Badge variant="default" className="text-xs text-gray-500">
                +{result.missing_skills.length - 3} more
              </Badge>
            )}
          </div>
        </div>

        {/* Summary */}
        <div className="space-y-2">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Summary</span>
          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3 leading-relaxed">
            {result.summary}
          </p>
        </div>

        {/* File Info */}
        <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
          <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
            📄 {result.fileName}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ResumeCard;
