import React from "react";

const StepFour = ({ data, updateData }) => {
  return (
    <div className="space-y-6">
      {/* Instagram Reel URL */}
      <div className="space-y-2">
        <label
          htmlFor="instagram_reel_url"
          className="block text-sm font-medium text-gray-200"
        >
          Add the URL of your favourite speaking to the camera/talking head style reel
        </label>
        <input
          id="instagram_reel_url"
          type="url"
          value={data.social.instagram_reel_url}
          onChange={(e) =>
            updateData("social", { instagram_reel_url: e.target.value })
          }
          placeholder="https://instagram.com/reel/..."
          className="w-full rounded-md border border-gray-600 bg-gray-800 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#fa2a00]"
        />
        <p className="text-sm text-gray-400">
          For scanning your tone and generating ads in your voice
        </p>
      </div>

      {/* Meta Account */}
      <div className="space-y-2">
        <label
          htmlFor="meta_account"
          className="block text-sm font-medium text-gray-200"
        >
          Your Instagram/TikTok/Facebook @
        </label>
        <input
          id="meta_account"
          type="text"
          value={data.social.meta_account}
          onChange={(e) =>
            updateData("social", { meta_account: e.target.value })
          }
          placeholder="@your Instagram/TikTok/Facebook handle"
          className="w-full rounded-md border border-gray-600 bg-gray-800 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#fa2a00]"
        />
        <p className="text-sm text-gray-400">
          I suggest adding your strongest platform
        </p>
      </div>

      {/* Competitor URLs */}
      <div className="space-y-2">
        <label
          htmlFor="competitor_urls"
          className="block text-sm font-medium text-gray-200"
        >
          Competitor URLs (comma separated)
        </label>
        <textarea
          id="competitor_urls"
          value={data.social.competitor_urls.join(", ")}
          onChange={(e) =>
            updateData("social", {
              competitor_urls: e.target.value
                .split(",")
                .map((url) => url.trim())
                .filter(Boolean),
            })
          }
          placeholder="https://competitor1.com, https://competitor2.com"
          rows={3}
          className="w-full rounded-md border border-gray-600 bg-gray-800 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#fa2a00]"
        />
        <p className="text-sm text-gray-400">
          Helps us analyze your competition
        </p>
      </div>
    </div>
  );
};

export default StepFour;
