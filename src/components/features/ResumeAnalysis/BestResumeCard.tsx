import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/Card';
import Badge from '../../ui/Badge';
import Progress from '../../ui/Progress';
import Button from '../../ui/Button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../ui/Dialog';
import { User, Mail, Star, Award, Eye, Crown, Trophy, Download } from 'lucide-react';
import type { ResumeAnalysisResult } from '../../../types';

interface BestResumeCardProps {
  result: ResumeAnalysisResult;
}

const BestResumeCard: React.FC<BestResumeCardProps> = ({ result }) => {
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

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

  return (
    <Card className="relative group hover:shadow-2xl transition-all duration-500 bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200 hover:border-amber-300 overflow-hidden">
      {/* Best Resume Badge */}
      <div className="absolute top-4 right-4 z-10">
        <div className="flex items-center gap-2 bg-gradient-to-r from-amber-400 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
          <Crown className="w-4 h-4" />
          Best Match
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-amber-400 via-orange-500 to-red-500" />
      <div className="absolute -top-4 -right-4 w-24 h-24 bg-amber-100 rounded-full opacity-20" />
      <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-orange-100 rounded-full opacity-20" />

      <CardHeader className="pb-4 pt-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 sm:space-x-4">
            <div className="relative">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                <User className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                <Trophy className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" />
              </div>
            </div>
            <div className="min-w-0 flex-1">
              <CardTitle className="text-lg sm:text-2xl font-bold text-gray-900 mb-1 truncate">
                {result.candidate_name}
              </CardTitle>
              <p className="text-xs sm:text-sm text-gray-600 flex items-center gap-1">
                <Mail className="w-3 h-3 flex-shrink-0" />
                Top Candidate
              </p>
            </div>
          </div>
          <div className="flex flex-col items-end flex-shrink-0">
            <div className="bg-gradient-to-r from-emerald-400 to-green-500 text-white px-2 py-1 sm:px-4 sm:py-2 rounded-full border-2 border-white shadow-lg">
              <span className="text-lg sm:text-2xl font-bold">{result.match_score}%</span>
            </div>
            <span className="text-xs text-gray-600 mt-1">Match Score</span>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Score Progress */}
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-gray-700 font-medium">Overall Match</span>
            <span className="font-bold text-emerald-600">{result.match_score}%</span>
          </div>
          <div className="h-3">
            <Progress 
              value={result.match_score} 
              colorClass="bg-gradient-to-r from-emerald-400 to-green-500"
            />
          </div>
        </div>

        {/* Matched Skills */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Star className="w-5 h-5 text-amber-500" />
            <span className="text-sm font-semibold text-gray-800">Matched Skills ({result.matched_skills.length})</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {result.matched_skills.slice(0, 6).map((skill: string, index: number) => (
              <Badge key={index} variant="success" className="text-sm px-3 py-1">
                {skill}
              </Badge>
            ))}
            {result.matched_skills.length > 6 && (
              <Badge variant="default" className="text-sm text-gray-600">
                +{result.matched_skills.length - 6} more
              </Badge>
            )}
          </div>
        </div>

        {/* Missing Skills */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-orange-500" />
            <span className="text-sm font-semibold text-gray-800">Areas for Improvement ({result.missing_skills.length})</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {result.missing_skills.slice(0, 4).map((skill: string, index: number) => (
              <Badge key={index} variant="destructive" className="text-sm px-3 py-1">
                {skill}
              </Badge>
            ))}
            {result.missing_skills.length > 4 && (
              <Badge variant="default" className="text-sm text-gray-600">
                +{result.missing_skills.length - 4} more
              </Badge>
            )}
          </div>
        </div>

        {/* Summary */}
        <div className="space-y-3">
          <span className="text-sm font-semibold text-gray-800">Executive Summary</span>
          <p className="text-sm text-gray-700 leading-relaxed bg-white/60 p-3 rounded-lg">
            {result.summary}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="pt-4 border-t border-amber-200 space-y-3">
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
            <Button 
              onClick={() => setIsViewModalOpen(true)}
              className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white text-sm sm:text-base"
            >
              <Eye className="w-4 h-4 mr-2" />
              View Resume
            </Button>
            
            <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
              <DialogContent className="w-full max-w-4xl">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2 text-sm sm:text-base">
                    <Crown className="w-4 h-4 sm:w-5 sm:h-5 text-amber-500" />
                    <span className="truncate">{result.candidate_name} - Best Match ({result.match_score}%)</span>
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-4 sm:space-y-6 mt-4">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                    <div className="space-y-3 sm:space-y-4">
                      <div>
                        <h3 className="text-base sm:text-lg font-semibold text-green-600 mb-2 sm:mb-3">✅ Matched Skills</h3>
                        <div className="space-y-1 sm:space-y-2 max-h-32 sm:max-h-40 overflow-y-auto">
                          {result.matched_skills.map((skill, index) => (
                            <div key={index} className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0" />
                              <span className="text-xs sm:text-sm">{skill}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="space-y-3 sm:space-y-4">
                      <div>
                        <h3 className="text-base sm:text-lg font-semibold text-red-600 mb-2 sm:mb-3">❌ Missing Skills</h3>
                        <div className="space-y-1 sm:space-y-2 max-h-32 sm:max-h-40 overflow-y-auto">
                          {result.missing_skills.map((skill, index) => (
                            <div key={index} className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-red-500 rounded-full flex-shrink-0" />
                              <span className="text-xs sm:text-sm">{skill}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-3 sm:p-4 rounded-lg">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-2">📋 Summary</h3>
                    <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">{result.summary}</p>
                  </div>
                  
                  <div className="bg-amber-50 p-3 sm:p-4 rounded-lg">
                    <h3 className="text-base sm:text-lg font-semibold text-amber-800 mb-2">🏆 Why This is the Best Match</h3>
                    <ul className="space-y-1 text-xs sm:text-sm text-amber-700">
                      <li>• Highest match score: {result.match_score}%</li>
                      <li>• Strong skill alignment: {result.matched_skills.length} matched skills</li>
                      <li>• Comprehensive profile analysis</li>
                      <li>• Recommended for further interview</li>
                    </ul>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
            
            <Button variant="outline" className="border-amber-300 text-amber-600 hover:bg-amber-50">
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
          </div>
          
          <div className="text-xs text-gray-500 text-center">
            📄 {result.fileName}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BestResumeCard; 