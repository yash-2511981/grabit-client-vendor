import apiCLient from "@/lib/axios-client";
import { ADD_RESTAURANT_IMAGE } from "@/lib/routes";
import useVendorStore from "@/store/store";
import { imageValidation } from "@/types/formType";
import { Edit, User2 } from "lucide-react";
import type React from "react";
import { toast } from "sonner";
import { ZodError } from "zod";

const RestaurantImage = () => {
  const { vendor, setVendor } = useVendorStore();

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const formData = new FormData();

    try {
      const file = e.target.files?.[0];
      imageValidation.parse(file);

      if (file) {
        formData.append("file", file);
      }

      const response = await apiCLient.post(ADD_RESTAURANT_IMAGE, formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.status === 200) {
        toast.success("Image Updated Successfully");
        setVendor(response.data.restaurant);
      }
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
          <div className="w-15 h-15 bg-amber-200 rounded-full text-amber-600 flex items-center justify-center group relative overflow-hidden">
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
