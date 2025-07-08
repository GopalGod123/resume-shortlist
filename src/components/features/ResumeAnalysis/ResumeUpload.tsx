import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { UploadCloud, FileText, X, FolderOpen, Download } from 'lucide-react';
import type { UploadedFile } from '../types';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/Card';
import Button from '../../ui/Button';

interface UploadBoxProps {
  onFilesChange: (files: UploadedFile[]) => void;
  uploadedFiles: UploadedFile[];
  disabled: boolean;
}

const UploadBox: React.FC<UploadBoxProps> = ({ onFilesChange, uploadedFiles, disabled }) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newFiles: UploadedFile[] = acceptedFiles.map(file => ({
      id: `${file.name}-${file.lastModified}`,
      file,
    }));
    onFilesChange([...uploadedFiles, ...newFiles]);
  }, [uploadedFiles, onFilesChange]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'application/pdf': ['.pdf'] },
    disabled,
  });

  const removeFile = (id: string) => {
    onFilesChange(uploadedFiles.filter(f => f.id !== id));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <Card className="h-full bg-white/70 backdrop-blur-sm border-white/20 shadow-lg">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-xl font-semibold text-gray-900">
          <FolderOpen className="w-5 h-5 text-purple-600" />
          Upload Resumes
        </CardTitle>
        <p className="text-sm text-gray-600">Add PDF files to analyze</p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Drop Zone */}
        <div
          {...getRootProps()}
          className={`relative p-8 border-2 border-dashed rounded-xl cursor-pointer transition-all duration-300 ${
            isDragActive 
              ? 'border-purple-400 bg-purple-50/50 scale-105' 
              : disabled 
                ? 'border-gray-300 bg-gray-50/50 cursor-not-allowed' 
                : 'border-gray-300 hover:border-purple-400 hover:bg-purple-50/30'
          }`}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center text-center">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 transition-all duration-300 ${
              isDragActive 
                ? 'bg-purple-100 text-purple-600 scale-110' 
                : disabled 
                  ? 'bg-gray-100 text-gray-400' 
                  : 'bg-gray-100 text-gray-500 hover:bg-purple-100 hover:text-purple-600'
            }`}>
              <UploadCloud className="w-8 h-8" />
            </div>
            
            {isDragActive ? (
              <div className="space-y-2">
                <p className="text-lg font-semibold text-purple-600">Drop files here!</p>
                <p className="text-sm text-gray-600">Release to upload your resumes</p>
              </div>
            ) : (
              <div className="space-y-2">
                <p className="text-lg font-semibold text-gray-700">
                  Drag & drop resumes here
                </p>
                <p className="text-sm text-gray-500">
                  or <span className="text-purple-600 font-medium">click to browse</span>
                </p>
                <p className="text-xs text-gray-400">
                  Supports PDF files only
                </p>
              </div>
            )}
          </div>
          
          {/* Decorative elements */}
          <div className="absolute top-4 right-4 w-2 h-2 bg-purple-300 rounded-full opacity-50" />
          <div className="absolute bottom-4 left-4 w-3 h-3 bg-blue-300 rounded-full opacity-30" />
          <div className="absolute top-1/2 left-4 w-1 h-1 bg-indigo-300 rounded-full opacity-40" />
        </div>

        {/* File List */}
        {uploadedFiles.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-semibold text-gray-800">
                Selected Files ({uploadedFiles.length})
              </h4>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onFilesChange([])}
                disabled={disabled}
                className="text-gray-500 hover:text-red-500"
              >
                Clear all
              </Button>
            </div>
            
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {uploadedFiles.map(uploadedFile => (
                <div 
                  key={uploadedFile.id} 
                  className="group flex items-center justify-between p-3 bg-gray-50/70 rounded-lg border border-gray-200 hover:bg-gray-100/70 transition-colors"
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-red-500 to-orange-500 rounded-lg flex items-center justify-center">
                      <FileText className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate" title={uploadedFile.file.name}>
                        {uploadedFile.file.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {formatFileSize(uploadedFile.file.size)}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFile(uploadedFile.id)}
                    disabled={disabled}
                    className="opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8 p-0 text-gray-400 hover:text-red-500 hover:bg-red-50"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Info Section */}
        <div className="bg-blue-50/50 rounded-lg p-4 border border-blue-200/30">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Download className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <h4 className="text-sm font-medium text-blue-900 mb-1">
                Tips for better results
              </h4>
              <ul className="text-xs text-blue-700 space-y-1">
                <li>• Use high-quality PDF files</li>
                <li>• Ensure text is searchable, not just images</li>
                <li>• Upload multiple resumes for batch processing</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UploadBox;
