
export interface AnalysisResult {
  corrosionPercentage: number;
  status: 'idle' | 'analyzing' | 'complete' | 'error';
  error?: string;
  dataType?: 'image' | 'cscan';
}

export interface CScanData {
  fileName: string;
  fileSize: number;
  uploadTime: Date;
}
