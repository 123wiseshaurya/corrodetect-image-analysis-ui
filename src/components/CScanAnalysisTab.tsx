
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import CScanUploader from "./CScanUploader";
import CScanPreview from "./CScanPreview";
import ResultDisplay from "./ResultDisplay";
import { AnalysisResult } from "@/lib/types";

interface CScanAnalysisTabProps {
  result: AnalysisResult;
  onCScanUpload: (file: File) => void;
  resetAnalysis: () => void;
}

const CScanAnalysisTab = ({ result, onCScanUpload, resetAnalysis }: CScanAnalysisTabProps) => {
  const [cscanFile, setCScanFile] = useState<File | null>(null);
  
  const handleCScanUpload = (file: File) => {
    setCScanFile(file);
    onCScanUpload(file);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Upload C-Scan Image</h3>
        <CScanUploader 
          onCScanUpload={handleCScanUpload} 
          isAnalyzing={result.status === "analyzing" && result.dataType === "cscan"} 
        />
        
        {cscanFile && result.status === "complete" && result.dataType === "cscan" && (
          <div className="mt-4 flex justify-center">
            <Button 
              variant="outline" 
              onClick={() => {
                setCScanFile(null);
                resetAnalysis();
              }}
              className="flex items-center"
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Analyze New C-Scan Image
            </Button>
          </div>
        )}
      </div>
      
      <div className="space-y-4">
        <h3 className="text-lg font-medium">
          {cscanFile ? "C-Scan Image Preview" : "No C-Scan Image Selected"}
        </h3>
        <CScanPreview cscanFile={cscanFile} />
        
        {(result.status !== "idle" && result.dataType === "cscan") && (
          <div className="mt-4">
            <ResultDisplay result={result} />
          </div>
        )}
      </div>
    </div>
  );
};

export default CScanAnalysisTab;
