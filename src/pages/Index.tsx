
import CorrosionAnalyzer from "@/components/CorrosionAnalyzer";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Corrosion Detection Analysis
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-lg text-gray-500">
            Upload images to detect and measure corrosion percentages in materials
          </p>
        </div>
        
        <CorrosionAnalyzer />
        
        <div className="mt-12 text-center text-sm text-gray-500">
          <p>
            Note: This is a demo application. In a production environment, 
            the analysis would be performed by connecting to a Python backend.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
