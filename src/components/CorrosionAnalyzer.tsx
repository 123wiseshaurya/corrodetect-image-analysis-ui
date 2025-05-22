
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCorrosionAnalysis } from "@/hooks/useCorrosionAnalysis";
import ImageAnalysisTab from "./ImageAnalysisTab";
import CScanAnalysisTab from "./CScanAnalysisTab";
import AnalysisDescription from "./AnalysisDescription";

const CorrosionAnalyzer = () => {
  const [activeTab, setActiveTab] = useState<"image" | "cscan">("image");
  const { result, analyzeImage, analyzeCScan, resetResult } = useCorrosionAnalysis();

  const handleImageUpload = (file: File) => {
    setActiveTab("image");
    analyzeImage(file);
  };

  const handleCScanUpload = (file: File) => {
    setActiveTab("cscan");
    analyzeCScan(file);
  };

  const resetAnalysis = () => {
    resetResult();
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
              <TabsTrigger value="cscan">C-Scan Image Analysis</TabsTrigger>
            </TabsList>
            
            <TabsContent value="image" className="mt-0">
              <ImageAnalysisTab 
                result={result} 
                onImageUpload={handleImageUpload} 
                resetAnalysis={resetAnalysis}
              />
            </TabsContent>
            
            <TabsContent value="cscan" className="mt-0">
              <CScanAnalysisTab
                result={result}
                onCScanUpload={handleCScanUpload}
                resetAnalysis={resetAnalysis}
              />
            </TabsContent>
          </Tabs>
          
          <AnalysisDescription />
        </CardContent>
      </Card>
    </div>
  );
};

export default CorrosionAnalyzer;
