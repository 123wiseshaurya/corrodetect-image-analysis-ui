
import { AnalysisResult } from "@/lib/types";
import { Progress } from "@/components/ui/progress";
import { AlertCircle } from "lucide-react";

interface ResultDisplayProps {
  result: AnalysisResult;
}

const ResultDisplay = ({ result }: ResultDisplayProps) => {
  const { status, corrosionPercentage, error, dataType } = result;

  if (status === "idle") {
    return <div className="h-32 flex items-center justify-center text-gray-500">
      {dataType === "cscan" ? 
        "Upload C-Scan data to analyze corrosion" : 
        "Upload an image to analyze corrosion"}
    </div>;
  }

  if (status === "analyzing") {
    return (
      <div className="h-32 flex flex-col items-center justify-center">
        <p className="mb-2 text-gray-700">
          Analyzing {dataType === "cscan" ? "C-Scan data" : "image"}...
        </p>
        <Progress className="w-full max-w-xs" value={undefined} />
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="h-32 flex flex-col items-center justify-center text-destructive">
        <AlertCircle className="w-8 h-8 mb-2" />
        <p className="text-center">{error || "An error occurred during analysis"}</p>
      </div>
    );
  }

  // Status is complete
  const getCorrosionSeverity = (percentage: number) => {
    if (percentage < 20) return "Low";
    if (percentage < 50) return "Moderate";
    return "High";
  };

  const severity = getCorrosionSeverity(corrosionPercentage);
  const severityColor = 
    severity === "Low" ? "text-green-600" : 
    severity === "Moderate" ? "text-amber-600" : 
    "text-red-600";

  const analysisMethod = dataType === "cscan" ? "C-Scan Analysis" : "Image Analysis";

  return (
    <div className="p-4 bg-white rounded-lg shadow-sm">
      <h3 className="text-lg font-medium text-gray-900 mb-2">Analysis Results</h3>
      
      <div className="mb-2">
        <div className="flex justify-between mb-1">
          <span className="text-sm font-medium text-gray-700">Corrosion Percentage</span>
          <span className="text-sm font-medium text-gray-700">{corrosionPercentage.toFixed(2)}%</span>
        </div>
        <Progress value={corrosionPercentage} className="h-2" />
      </div>
      
      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center">
          <span className="text-sm font-medium text-gray-700 mr-2">Severity:</span>
          <span className={`text-sm font-bold ${severityColor}`}>{severity}</span>
        </div>
        <div className="text-xs bg-gray-100 px-2 py-1 rounded">
          {analysisMethod}
        </div>
      </div>
    </div>
  );
};

export default ResultDisplay;
