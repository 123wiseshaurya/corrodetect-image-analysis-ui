
import { useState } from "react";
import { AnalysisResult } from "@/lib/types";
import { toast } from "@/components/ui/use-toast";

export const useCorrosionAnalysis = () => {
  const [result, setResult] = useState<AnalysisResult>({
    corrosionPercentage: 0,
    status: "idle",
  });

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
      // In a real application, we would send the C-Scan image to the backend
      // But for this demo, we'll simulate the analysis with a timeout
      await new Promise((resolve) => setTimeout(resolve, 3000));
      
      // Simulate backend response
      // C-Scan image analysis typically gives more precise results
      const simulatedCorrosionPercentage = 15 + (Math.random() * 30);
      
      setResult({
        corrosionPercentage: simulatedCorrosionPercentage,
        status: "complete",
        dataType: "cscan",
      });

      toast({
        title: "Analysis Complete",
        description: `C-Scan image analyzed successfully. Corrosion: ${simulatedCorrosionPercentage.toFixed(2)}%`,
      });
    } catch (error) {
      setResult({
        corrosionPercentage: 0,
        status: "error",
        error: "Failed to analyze C-Scan image. Please try again.",
        dataType: "cscan",
      });

      toast({
        title: "Analysis Failed",
        description: "Failed to analyze C-Scan image. Please try again.",
        variant: "destructive",
      });
    }
  };

  return {
    result,
    analyzeImage,
    analyzeCScan,
    resetResult: () => setResult({
      corrosionPercentage: 0,
      status: "idle",
    })
  };
};
