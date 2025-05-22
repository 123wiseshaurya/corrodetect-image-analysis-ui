
import { CScanData } from "@/lib/types";
import { FileImage } from "lucide-react";

interface CScanPreviewProps {
  cscanFile: File | null;
}

const CScanPreview = ({ cscanFile }: CScanPreviewProps) => {
  if (!cscanFile) {
    return (
      <div className="flex flex-col items-center justify-center w-full h-60 bg-gray-100 rounded-lg">
        <FileImage className="w-12 h-12 text-gray-400" />
        <p className="mt-2 text-gray-500">No C-Scan image uploaded</p>
      </div>
    );
  }

  // Format file size
  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' bytes';
    else if (bytes < 1048576) return (bytes / 1024).toFixed(2) + ' KB';
    else return (bytes / 1048576).toFixed(2) + ' MB';
  };

  // Create object URL for image preview
  const imageUrl = URL.createObjectURL(cscanFile);

  return (
    <div className="w-full flex flex-col space-y-4 p-6 rounded-lg bg-gray-100">
      <div className="flex flex-col space-y-3">
        <div className="flex items-center">
          <FileImage className="w-10 h-10 text-primary mr-4" />
          <div>
            <h3 className="font-medium text-gray-900">{cscanFile.name}</h3>
            <p className="text-sm text-gray-500">{formatFileSize(cscanFile.size)}</p>
          </div>
        </div>
        <div className="flex flex-col space-y-1 text-sm">
          <p><span className="font-medium">Type:</span> {cscanFile.type || 'Image'}</p>
          <p><span className="font-medium">Last Modified:</span> {new Date(cscanFile.lastModified).toLocaleString()}</p>
        </div>
      </div>
      
      <div className="relative w-full h-40 bg-black/5 rounded overflow-hidden">
        <img 
          src={imageUrl} 
          alt="C-Scan Preview" 
          className="w-full h-full object-contain"
          onLoad={() => URL.revokeObjectURL(imageUrl)}
        />
      </div>
      
      <div className="py-2 px-3 bg-blue-50 text-blue-700 rounded text-sm">
        C-Scan image ready for analysis
      </div>
    </div>
  );
};

export default CScanPreview;
