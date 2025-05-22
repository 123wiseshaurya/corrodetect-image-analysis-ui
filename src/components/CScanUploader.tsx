
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Upload, FileImage } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

interface CScanUploaderProps {
  onCScanUpload: (file: File) => void;
  isAnalyzing: boolean;
}

const CScanUploader = ({ onCScanUpload, isAnalyzing }: CScanUploaderProps) => {
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndUpload(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      validateAndUpload(e.target.files[0]);
    }
  };

  const validateAndUpload = (file: File) => {
    // Check file extension for image types
    const validExtensions = ['.jpg', '.jpeg', '.png', '.bmp', '.tiff', '.gif'];
    const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
    
    if (!validExtensions.includes(fileExtension)) {
      toast({
        title: "Invalid file format",
        description: "Please upload a valid C-Scan image file (JPG, PNG, BMP, TIFF, GIF)",
        variant: "destructive"
      });
      return;
    }
    
    // Check file size (limit to 10MB)
    if (file.size > 10 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Maximum file size is 10MB",
        variant: "destructive"
      });
      return;
    }
    
    onCScanUpload(file);
  };

  const onButtonClick = () => {
    inputRef.current?.click();
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div
        className={`flex flex-col items-center justify-center w-full h-48 px-4 transition bg-white border-2 border-dashed rounded-lg ${
          dragActive ? "border-primary" : "border-gray-300"
        } ${dragActive ? "bg-blue-50" : ""}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <FileImage className="w-10 h-10 text-gray-400" />
        <p className="mt-2 text-sm text-gray-500">
          Drag and drop your C-Scan image, or{" "}
          <span
            onClick={onButtonClick}
            className="font-medium text-primary cursor-pointer hover:underline"
          >
            browse
          </span>
        </p>
        <p className="mt-1 text-xs text-gray-500">
          JPG, PNG, BMP, TIFF, GIF (max. 10MB)
        </p>
        <input
          ref={inputRef}
          onChange={handleChange}
          type="file"
          className="hidden"
          accept=".jpg,.jpeg,.png,.bmp,.tiff,.tif,.gif"
          disabled={isAnalyzing}
        />
      </div>
      <div className="mt-4 flex justify-center">
        <Button
          onClick={onButtonClick}
          disabled={isAnalyzing}
          className="w-full"
          size="lg"
        >
          {isAnalyzing ? "Analyzing..." : "Upload C-Scan Image"}
        </Button>
      </div>
    </div>
  );
};

export default CScanUploader;
