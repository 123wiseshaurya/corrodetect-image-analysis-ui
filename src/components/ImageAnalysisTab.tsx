
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import ImageUploader from "./ImageUploader";
import ImagePreview from "./ImagePreview";
import ResultDisplay from "./ResultDisplay";
import { AnalysisResult } from "@/lib/types";

interface ImageAnalysisTabProps {
  result: AnalysisResult;
  onImageUpload: (file: File) => void;
  resetAnalysis: () => void;
}

const ImageAnalysisTab = ({ result, onImageUpload, resetAnalysis }: ImageAnalysisTabProps) => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  
  const handleImageUpload = (file: File) => {
    setImageFile(file);
    onImageUpload(file);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Upload Image</h3>
        <ImageUploader 
          onImageUpload={handleImageUpload} 
          isAnalyzing={result.status === "analyzing" && result.dataType === "image"} 
        />
        
        {imageFile && result.status === "complete" && result.dataType === "image" && (
          <div className="mt-4 flex justify-center">
            <Button 
              variant="outline" 
              onClick={() => {
                setImageFile(null);
                resetAnalysis();
              }}
              className="flex items-center"
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Analyze New Image
            </Button>
          </div>
        )}
      </div>
      
      <div className="space-y-4">
        <h3 className="text-lg font-medium">
          {imageFile ? "Image Preview" : "No Image Selected"}
        </h3>
        <ImagePreview imageFile={imageFile} />
        
        {(result.status !== "idle" && result.dataType === "image") && (
          <div className="mt-4">
            <ResultDisplay result={result} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageAnalysisTab;
