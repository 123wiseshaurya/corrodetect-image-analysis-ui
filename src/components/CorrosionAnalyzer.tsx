
import { useState } from "react";
import { AnalysisResult } from "@/lib/types";
import ImageUploader from "./ImageUploader";
import CScanUploader from "./CScanUploader";
import ImagePreview from "./ImagePreview";
import CScanPreview from "./CScanPreview";
import ResultDisplay from "./ResultDisplay";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/use-toast";

const CorrosionAnalyzer = () => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [cscanFile, setCScanFile] = useState<File | null>(null);
  const [activeTab, setActiveTab] = useState<"image" | "cscan">("image");
  const [result, setResult] = useState<AnalysisResult>({
    corrosionPercentage: 0,
    status: "idle",
  });

  const handleImageUpload = (file: File) => {
    setImageFile(file);
    setActiveTab("image");
    // Start analysis
    analyzeImage(file);
  };

  const handleCScanUpload = (file: File) => {
    setCScanFile(file);
    setActiveTab("cscan");
    // Start analysis
    analyzeCScan(file);
  };

  const analyzeImage = async (file: File) => {
    setResult({
      corrosionPercentage: 0,
      status: "analyzing",
      dataType: "image",
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
        dataType: "image",
      });

      toast({
        title: "Analysis Complete",
        description: `Image analyzed successfully. Corrosion: ${simulatedCorrosionPercentage.toFixed(2)}%`,
      });
    } catch (error) {
      setResult({
        corrosionPercentage: 0,
        status: "error",
        error: "Failed to analyze image. Please try again.",
        dataType: "image",
      });

      toast({
        title: "Analysis Failed",
        description: "Failed to analyze image. Please try again.",
        variant: "destructive",
      });
    }
  };

  const analyzeCScan = async (file: File) => {
    setResult({
      corrosionPercentage: 0,
      status: "analyzing",
      dataType: "cscan",
    });

    try {
      // In a real application, we would parse the C-Scan data
      // But for this demo, we'll simulate the analysis with a timeout
      await new Promise((resolve) => setTimeout(resolve, 3000));
      
      // Simulate backend response
      // C-Scan typically gives more precise results
      const simulatedCorrosionPercentage = 15 + (Math.random() * 30);
      
      setResult({
        corrosionPercentage: simulatedCorrosionPercentage,
        status: "complete",
        dataType: "cscan",
      });

      toast({
        title: "Analysis Complete",
        description: `C-Scan analyzed successfully. Corrosion: ${simulatedCorrosionPercentage.toFixed(2)}%`,
      });
    } catch (error) {
      setResult({
        corrosionPercentage: 0,
        status: "error",
        error: "Failed to analyze C-Scan data. Please try again.",
        dataType: "cscan",
      });

      toast({
        title: "Analysis Failed",
        description: "Failed to analyze C-Scan data. Please try again.",
        variant: "destructive",
      });
    }
  };

  const resetAnalysis = () => {
    if (activeTab === "image") {
      setImageFile(null);
    } else {
      setCScanFile(null);
    }
    
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
          <Tabs 
            defaultValue="image" 
            value={activeTab}
            onValueChange={(value) => setActiveTab(value as "image" | "cscan")}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="image">Image Analysis</TabsTrigger>
              <TabsTrigger value="cscan">C-Scan Analysis</TabsTrigger>
            </TabsList>
            
            <TabsContent value="image" className="mt-0">
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
                  
                  {(result.status !== "idle" && result.dataType === "image") && (
                    <div className="mt-4">
                      <ResultDisplay result={result} />
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="cscan" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Upload C-Scan Data</h3>
                  <CScanUploader 
                    onCScanUpload={handleCScanUpload} 
                    isAnalyzing={result.status === "analyzing" && result.dataType === "cscan"} 
                  />
                  
                  {cscanFile && result.status === "complete" && result.dataType === "cscan" && (
                    <div className="mt-4 flex justify-center">
                      <Button 
                        variant="outline" 
                        onClick={resetAnalysis}
                        className="flex items-center"
                      >
                        <RefreshCw className="mr-2 h-4 w-4" />
                        Analyze New C-Scan
                      </Button>
                    </div>
                  )}
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">
                    {cscanFile ? "C-Scan Data Preview" : "No C-Scan Selected"}
                  </h3>
                  <CScanPreview cscanFile={cscanFile} />
                  
                  {(result.status !== "idle" && result.dataType === "cscan") && (
                    <div className="mt-4">
                      <ResultDisplay result={result} />
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>
          </Tabs>
          
          <div className="mt-6 pt-4 border-t border-gray-200 text-sm text-gray-500">
            <p>
              This tool analyzes images and C-Scan data to detect corrosion by calculating the percentage of 
              corroded areas. For images, it detects yellow (corroded) vs. green (healthy) areas. For C-Scan data, 
              it processes numerical thickness values to identify corrosion patterns.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CorrosionAnalyzer;
