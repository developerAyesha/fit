import React, { useState } from "react";
import Axios from "@/Config/Axios";

const StepOne = ({ data, updateData }) => {
  const [uploading, setUploading] = useState(false);

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

      // Update local state with S3 URL saved by backend into onboarding.business.logo_url
      updateData("business", { logo_url: imageUrl });
    } catch (error) {
      console.error("Upload error:", error);
      alert(error?.response?.data?.message || "Failed to upload logo");
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveLogo = () => {
    updateData("business", { logo_url: "" });
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
          value={data.business.business_name}
          onChange={(e) =>
            updateData("business", { business_name: e.target.value })
          }
          placeholder="Enter your business name"
          className="w-full rounded-md border border-gray-600 bg-gray-800 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#fa2a00]"
        />
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
                name="business_type"
                value="Online"
                checked={data.business.business_type === "Online"}
                onChange={(e) =>
                  updateData("business", { business_type: e.target.value })
                }
                style={{
                  appearance: 'none',
                  WebkitAppearance: 'none',
                  MozAppearance: 'none',
                  width: '16px',
                  height: '16px',
                  border: data.business.business_type === "Online" ? '2px solid #fa2a00' : '2px solid #6b7280',
                  borderRadius: '50%',
                  backgroundColor: data.business.business_type === "Online" ? '#fa2a00' : 'transparent',
                  position: 'relative',
                  cursor: 'pointer',
                  outline: 'none'
                }}
              />
              {data.business.business_type === "Online" && (
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
                name="business_type"
                value="In Person"
                checked={data.business.business_type === "In Person"}
                onChange={(e) =>
                  updateData("business", { business_type: e.target.value })
                }
                style={{
                  appearance: 'none',
                  WebkitAppearance: 'none',
                  MozAppearance: 'none',
                  width: '16px',
                  height: '16px',
                  border: data.business.business_type === "In Person" ? '2px solid #fa2a00' : '2px solid #6b7280',
                  borderRadius: '50%',
                  backgroundColor: data.business.business_type === "In Person" ? '#fa2a00' : 'transparent',
                  position: 'relative',
                  cursor: 'pointer',
                  outline: 'none'
                }}
              />
              {data.business.business_type === "In Person" && (
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
      {data.business.business_type === "In Person" && (
        <div className="space-y-2">
          <label
            htmlFor="business_city"
            className="block text-sm font-medium text-gray-200"
          >
            What city are you based in? *
          </label>
          <input
            id="business_city"
            value={data.business.business_city}
            onChange={(e) =>
              updateData("business", { business_city: e.target.value })
            }
            placeholder="Enter your city"
            className="w-full rounded-md border border-gray-600 bg-gray-800 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#fa2a00]"
          />
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
          {data.business.logo_url && (
            <div className="flex items-center gap-2">
              <img
                src={data.business.logo_url}
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
          value={data.business.website_url}
          onChange={(e) =>
            updateData("business", { website_url: e.target.value })
          }
          placeholder="https://your-website.com"
          className="w-full rounded-md border border-gray-600 bg-gray-800 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#fa2a00]"
        />
      </div>
    </div>
  );
};

export default StepOne;
