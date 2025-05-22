
import { useState } from "react";
import { AnalysisResult } from "@/lib/types";
import ImageUploader from "./ImageUploader";
import ImagePreview from "./ImagePreview";
import ResultDisplay from "./ResultDisplay";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

const CorrosionAnalyzer = () => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [result, setResult] = useState<AnalysisResult>({
    corrosionPercentage: 0,
    status: "idle",
  });

  const handleImageUpload = (file: File) => {
    setImageFile(file);
    // Start analysis
    analyzeImage(file);
  };

  const analyzeImage = async (file: File) => {
    setResult({
      corrosionPercentage: 0,
      status: "analyzing",
    });

    try {
      // In a real application, we would send the image to the backend
      // But for this demo, we'll simulate the analysis with a timeout
      // and a random percentage between 0 and 100
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      // Simulate backend response
      // In reality, this would be replaced with an API call to your Python backend
      const simulatedCorrosionPercentage = Math.random() * 100;
      
      setResult({
        corrosionPercentage: simulatedCorrosionPercentage,
        status: "complete",
      });
    } catch (error) {
      setResult({
        corrosionPercentage: 0,
        status: "error",
        error: "Failed to analyze image. Please try again.",
      });
    }
  };

  const resetAnalysis = () => {
    setImageFile(null);
    setResult({
      corrosionPercentage: 0,
      status: "idle",
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-center">
            Corrosion Analysis Tool
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Upload Image</h3>
              <ImageUploader 
                onImageUpload={handleImageUpload} 
                isAnalyzing={result.status === "analyzing"} 
              />
              
              {imageFile && result.status === "complete" && (
                <div className="mt-4 flex justify-center">
                  <Button 
                    variant="outline" 
                    onClick={resetAnalysis}
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
              
              <div className="mt-4">
                <ResultDisplay result={result} />
              </div>
            </div>
          </div>
          
          <div className="mt-6 pt-4 border-t border-gray-200 text-sm text-gray-500">
            <p>
              This tool analyzes images to detect corrosion by calculating the percentage of 
              corroded areas (yellow) relative to healthy areas (green). Upload a clear image 
              of the surface for best results.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CorrosionAnalyzer;
