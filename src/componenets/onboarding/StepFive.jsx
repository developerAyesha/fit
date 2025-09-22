import React from "react";
import { useFormContext } from "react-hook-form";

const StepFive = () => {
  const { register } = useFormContext();
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center mb-6">
        <p className="text-gray-400">
          Help us understand your brand language and voice
        </p>
      </div>

      {/* Coaching Style */}
      <div className="space-y-2">
        <label
          htmlFor="coaching_style"
          className="block text-sm font-medium text-gray-200"
        >
          Describe your coaching style in 3 words
        </label>
        <input
          id="coaching_style"
          type="text"
          {...register("brand.coaching_style")}
          placeholder="Motivational supportive results-driven"
          className="w-full rounded-md border border-gray-600 bg-gray-800 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#fa2a00]"
        />
        <p className="text-sm text-gray-400">
          Three words that best describe how you coach your clients
        </p>
      </div>

      {/* Brand Words */}
      <div className="space-y-2">
        <label
          htmlFor="brand_words"
          className="block text-sm font-medium text-gray-200"
        >
          Drop any words/phrases you say all the time and are "you"
        </label>
        <textarea
          id="brand_words"
          {...register("brand.brand_words")}
          placeholder="Transform your body, beast mode, unleash your potential..."
          rows={4}
          className="w-full rounded-md border border-gray-600 bg-gray-800 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#fa2a00]"
        />
        <p className="text-sm text-gray-400">
          Enter key phrases, catchphrases, or words that define your brand
        </p>
      </div>

      {/* Words to Avoid */}
      <div className="space-y-2">
        <label
          htmlFor="words_to_avoid"
          className="block text-sm font-medium text-gray-200"
        >
          Are there any words or phrases you want to avoid in your marketing?
        </label>
        <textarea
          id="words_to_avoid"
          {...register("brand.words_to_avoid")}
          placeholder="Diet, skinny, quick fix, magic pill..."
          rows={4}
          className="w-full rounded-md border border-gray-600 bg-gray-800 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#fa2a00]"
        />
        <p className="text-sm text-gray-400">
          Words or phrases that don't align with your brand or that you want to
          avoid
        </p>
      </div>
    </div>
  );
};

export default StepFive;
