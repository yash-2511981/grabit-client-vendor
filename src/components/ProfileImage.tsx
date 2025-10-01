import useApi from "@/hooks/useApi";
import { ADD_RESTAURANT_IMAGE, SAVE_RESTAURANT_IMG } from "@/lib/routes";
import useVendorStore from "@/store/store";
import { imageValidation } from "@/types/formType";
import { Edit, User2 } from "lucide-react";
import type React from "react";
import { toast } from "sonner";
import { ZodError } from "zod";

const RestaurantImage = () => {
  const { vendor, setVendor } = useVendorStore();
  const { post } = useApi();

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = e.target.files?.[0];
      imageValidation.parse(file);

      if (!file) {
        return;
      }

      const result = await post(ADD_RESTAURANT_IMAGE, {
        fileType: file?.type,
        fileSize: file?.size,
      });

      if (!result?.success) {
        toast.error("Failed to upload the image");
        return;
      }

      const { uploadParams, uploadUrl } = result.data;

      const formData = new FormData();
      formData.append("file", file);

      Object.entries(uploadParams).forEach(([key, value]) => {
        formData.append(key, value as string);
      });

      const uploadResponse = await fetch(uploadUrl, {
        method: "POST",
        body: formData,
      });

      if (!uploadResponse.ok) {
        throw new Error("Upload failed");
      }

      const cloudinaryData = await uploadResponse.json();

      const saveResult = await post(SAVE_RESTAURANT_IMG, {
        imgUrl: cloudinaryData.secure_url,
        publicId: cloudinaryData.public_id,
      });

      console.log(saveResult);
      if (saveResult?.success) {
        toast.success("Image Uploaded Successfully");
        setVendor(saveResult.data.restaurant);
      }
      console.log(vendor);
    } catch (err) {
      console.log(err);
      if (err instanceof ZodError) {
        toast.warning(err.issues[0].message);
      }
    }
  };

  return (
    <div className="relative w-fit">
      {vendor?.restaurantImageUrl ? (
        <img
          src={vendor.restaurantImageUrl}
          alt="restaurant image"
          className="rounded-full w-15 h-15 object-cover border border-amber-700"
        />
      ) : (
        <label className="cursor-pointer">
          <div className="w-16 h-16 bg-amber-200 rounded-full text-amber-600 flex items-center justify-center group relative overflow-hidden">
            <User2 size={35} className="opacity-100" />
          </div>
        </label>
      )}
      <div className="absolute -top-1 -right-1 bg-amber-100 text-amber-600 rounded-full p-1">
        <label className="cursor-pointer">
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageUpload}
          />
          <Edit size={15} />
        </label>
      </div>
    </div>
  );
};

export default RestaurantImage;
