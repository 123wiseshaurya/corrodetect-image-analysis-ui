
import { useState, useEffect } from "react";
import { CircleSlash } from "lucide-react";

interface ImagePreviewProps {
  imageFile: File | null;
}

const ImagePreview = ({ imageFile }: ImagePreviewProps) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!imageFile) {
      setPreviewUrl(null);
      return;
    }

    const objectUrl = URL.createObjectURL(imageFile);
    setPreviewUrl(objectUrl);

    // Clean up the URL when component unmounts or imageFile changes
    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [imageFile]);

  if (!previewUrl) {
    return (
      <div className="flex flex-col items-center justify-center w-full h-60 bg-gray-100 rounded-lg">
        <CircleSlash className="w-12 h-12 text-gray-400" />
        <p className="mt-2 text-gray-500">No image to preview</p>
      </div>
    );
  }

  return (
    <div className="w-full flex items-center justify-center overflow-hidden rounded-lg bg-gray-100">
      <img
        src={previewUrl}
        alt="Preview"
        className="max-w-full max-h-[300px] object-contain"
      />
    </div>
  );
};

export default ImagePreview;
