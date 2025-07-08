
export interface ResumeAnalysisResult {
  id: string;
  fileName: string;
  candidate_name: string;
  match_score: number;
  matched_skills: string[];
  missing_skills: string[];
  summary: string;
}

export interface UploadedFile {
  id: string;
  file: File;
}
