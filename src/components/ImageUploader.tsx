
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";

interface ImageUploaderProps {
  onImageUpload: (file: File) => void;
  isAnalyzing: boolean;
}

const ImageUploader = ({ onImageUpload, isAnalyzing }: ImageUploaderProps) => {
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
      onImageUpload(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      onImageUpload(e.target.files[0]);
    }
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
        <Upload className="w-10 h-10 text-gray-400" />
        <p className="mt-2 text-sm text-gray-500">
          Drag and drop your image here, or{" "}
          <span
            onClick={onButtonClick}
            className="font-medium text-primary cursor-pointer hover:underline"
          >
            browse
          </span>
        </p>
        <p className="mt-1 text-xs text-gray-500">
          JPG, PNG or JPEG (max. 10MB)
        </p>
        <input
          ref={inputRef}
          onChange={handleChange}
          type="file"
          className="hidden"
          accept="image/jpeg,image/png,image/jpg"
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
          {isAnalyzing ? "Analyzing..." : "Upload Image"}
        </Button>
      </div>
    </div>
  );
};

export default ImageUploader;
