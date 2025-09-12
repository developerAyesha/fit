import React from "react";

const StepTwo = ({ data, updateData }) => {
  const voiceTones = ["Bold", "Playful", "Premium", "Aggressive"];

  return (
    <div className="space-y-6">
      {/* Brand Colors */}
      <div className="space-y-2">
        <label
          htmlFor="brand_colors"
          className="block text-sm font-medium text-gray-200"
        >
          Brand Colours
        </label>
        <input
          id="brand_colors"
          value={data.visual.brand_colors}
          onChange={(e) =>
            updateData("visual", { brand_colors: e.target.value })
          }
          placeholder="#FF0000, #00FF00, #0000FF or Red, Green, Blue"
          className="w-full rounded-md border border-gray-600 bg-gray-800 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#fa2a00]"
        />
        <p className="text-sm text-gray-400">
          Enter hex codes or color names separated by commas
        </p>
      </div>

      {/* Voice/Tone Style */}
      <div className="space-y-2">
        <label
          htmlFor="voice_tone_style"
          className="block text-sm font-medium text-gray-200"
        >
          Voice/Tone Style
        </label>
        <select
          id="voice_tone_style"
          value={data.visual.voice_tone_style}
          onChange={(e) =>
            updateData("visual", { voice_tone_style: e.target.value })
          }
          className="w-full rounded-md border border-gray-600 bg-gray-800 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#fa2a00]"
        >
          <option value="">Select your brand voice</option>
          {voiceTones.map((tone) => (
            <option key={tone} value={tone}>
              {tone}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default StepTwo;
