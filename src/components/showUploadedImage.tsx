import { X } from "lucide-react";

const ShowUploadedImage = ({
  image,
  close,
}: {
  image: string;
  close: () => void;
}) => {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-50 px-2 sm:px-0">
      <div className="relative max-w-2xl max-h-[80vh] bg-white p-4 rounded-lg shadow-2xl">
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
