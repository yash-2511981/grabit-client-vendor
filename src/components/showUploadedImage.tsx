import { X } from "lucide-react";

const ShowUploadedImage = ({
  image,
  close,
}: {
  image: string;
  close: () => void;
}) => {
  return (
    <div className="absolute inset-0 flex items-center justify-center backdrop-blur-xs px-2 sm:px-0">
      <div className="relative max-w-md min-h-40  rounded-lg shadow-2xl">
        <div
          className="absolute -top-2 -right-2 cursor-pointer bg-orange-500 hover:bg-orange-600 rounded-full p-1 shadow-lg transition-colors"
          onClick={close}
        >
          <X className="text-white" size={20} />
        </div>
        <img
          className="max-h-full max-w-full object-contain rounded-lg"
          src={image}
          alt="Preview"
        />
      </div>
    </div>
  );
};

export default ShowUploadedImage;
