
export interface AnalysisResult {
  corrosionPercentage: number;
  status: 'idle' | 'analyzing' | 'complete' | 'error';
  error?: string;
}
