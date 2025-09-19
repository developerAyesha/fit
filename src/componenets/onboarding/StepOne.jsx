import React, { useState } from "react";
import Axios from "@/Config/Axios";
import { useFormContext } from "react-hook-form";

const StepOne = () => {
  const [uploading, setUploading] = useState(false);
  const { register, setValue, watch, formState: { errors } } = useFormContext();
  const businessType = watch("business.business_type");


  const handleFileUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await Axios.post(
        "/onboarding/upload-profile-image",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      const imageUrl = res?.data?.image_url;
      if (!imageUrl) throw new Error("No image URL returned");

      // Update form value with S3 URL
      setValue("business.logo_url", imageUrl, { shouldDirty: true, shouldValidate: true });
    } catch (error) {
      console.error("Upload error:", error);
      alert(error?.response?.data?.message || "Failed to upload logo");
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveLogo = () => {
    setValue("business.logo_url", "", { shouldDirty: true, shouldValidate: true });
    const fileInput = document.getElementById("logo_upload");
    if (fileInput) fileInput.value = "";
  };

  return (
    <div className="space-y-6">
      {/* Business Name */}
      <div className="space-y-2">
        <label
          htmlFor="business_name"
          className="block text-sm font-medium text-gray-200"
        >
          Business Name *
        </label>
        <input
          id="business_name"
          placeholder="Enter your business name"
          className="w-full rounded-md border border-gray-600 bg-gray-800 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#fa2a00]"
          {...register("business.business_name")}
        />
        {errors?.business?.business_name && (
          <p className="text-red-500 text-sm">{errors.business.business_name.message}</p>
        )}
      </div>

      {/* Business Type */}
      <div className="space-y-2">
        <p className="block text-sm font-medium text-gray-200">
          Is your business primarily: *
        </p>
        <div className="flex gap-6">
          <label className="flex items-center gap-2">
            <div className="relative">
              <input
                type="radio"
                value="Online"
                {...register("business.business_type")}
                style={{
                  appearance: 'none',
                  WebkitAppearance: 'none',
                  MozAppearance: 'none',
                  width: '16px',
                  height: '16px',
                  border: businessType === "Online" ? '2px solid #fa2a00' : '2px solid #6b7280',
                  borderRadius: '50%',
                  backgroundColor: businessType === "Online" ? '#fa2a00' : 'transparent',
                  position: 'relative',
                  cursor: 'pointer',
                  outline: 'none'
                }}
              />
              {businessType === "Online" && (
                <div
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    backgroundColor: 'white',
                    transform: 'translate(-50%, -50%)',
                    pointerEvents: 'none'
                  }}
                />
              )}
            </div>
            <span className="text-gray-200">Online</span>
          </label>
          <label className="flex items-center gap-2">
            <div className="relative">
              <input
                type="radio"
                value="In Person"
                {...register("business.business_type")}
                style={{
                  appearance: 'none',
                  WebkitAppearance: 'none',
                  MozAppearance: 'none',
                  width: '16px',
                  height: '16px',
                  border: businessType === "In Person" ? '2px solid #fa2a00' : '2px solid #6b7280',
                  borderRadius: '50%',
                  backgroundColor: businessType === "In Person" ? '#fa2a00' : 'transparent',
                  position: 'relative',
                  cursor: 'pointer',
                  outline: 'none'
                }}
              />
              {businessType === "In Person" && (
                <div
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    backgroundColor: 'white',
                    transform: 'translate(-50%, -50%)',
                    pointerEvents: 'none'
                  }}
                />
              )}
            </div>
            <span className="text-gray-200">In Person</span>
          </label>
        </div>
      </div>

      {/* Business City */}
      {businessType === "In Person" && (
        <div className="space-y-2">
          <label
            htmlFor="business_city"
            className="block text-sm font-medium text-gray-200"
          >
            What city are you based in? *
          </label>
          <input
            id="business_city"
            placeholder="Enter your city"
            className="w-full rounded-md border border-gray-600 bg-gray-800 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#fa2a00]"
            {...register("business.business_city")}
          />
          {errors?.business?.business_city && (
            <p className="text-red-500 text-sm">{errors.business.business_city.message}</p>
          )}
        </div>
      )}

      {/* Logo Upload */}
      <div className="space-y-2">
        <label
          htmlFor="logo_upload"
          className="block text-sm font-medium text-gray-200"
        >
          Logo Upload (Optional)
        </label>
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => document.getElementById("logo_upload")?.click()}
            disabled={uploading}
            className="px-4 py-2 rounded-md border border-gray-600 bg-gray-800 text-white hover:bg-gray-700 disabled:opacity-50"
          >
            {uploading ? "Uploading..." : "Upload Logo"}
          </button>
          <input
            id="logo_upload"
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
          />
          {watch("business.logo_url") && (
            <div className="flex items-center gap-2">
              <img
                src={watch("business.logo_url")}
                alt="Uploaded logo"
                className="w-10 h-10 object-contain border border-gray-600 rounded"
              />
              <button
                type="button"
                onClick={handleRemoveLogo}
                className="text-red-500 hover:text-red-700 text-sm"
              >
                ✕ Remove
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Website URL */}
      <div className="space-y-2">
        <label
          htmlFor="website_url"
          className="block text-sm font-medium text-gray-200"
        >
          Website URL
        </label>
        <input
          id="website_url"
          type="url"
          placeholder="https://your-website.com"
          className="w-full rounded-md border border-gray-600 bg-gray-800 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#fa2a00]"
          {...register("business.website_url")}
        />
        {errors?.business?.website_url && (
          <p className="text-red-500 text-sm">{errors.business.website_url.message}</p>
        )}
      </div>
    </div>
  );
};

export default StepOne;
