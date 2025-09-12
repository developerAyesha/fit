import React from "react";

const StepSix = ({ data, updateData }) => {
  // Safely access customer object
  const customer = data?.customer || {};

  const targetMarkets = [
    "General Population (Fat Loss & Fitness)",
    "Busy Professionals",
    "Parents / Mums / Dads",
    "Men Over 30",
    "Women Over 30",
    "Menopause / Perimenopause",
    "Pre/Postnatal Women",
    "Beginners (New to Fitness)",
    "Advanced Lifters / Athletes",
    "People with Injuries / Rehab Clients",
    "Over 40s / Over 50s",
    "Transformation Seekers (6–12 Week Programs)",
    "Strength & Performance Clients",
    "Body Confidence / Mental Health Focus",
    "Time-Poor / At-Home Clients",
    "LGBTQ+ Inclusive Fitness",
    "Wedding / Holiday Shred Clients",
    "Ex-Gym Members Returning After a Break",
    "Local Community Members (Geo-Specific)",
    "Other",
  ];

  return (
    <div className="space-y-6">
      {/* Intro text */}
      <div className="text-center mb-6">
        <p className="text-gray-400">
          These psychology insights help create more compelling and converting ads
        </p>
      </div>

      {/* Target Market */}
      <div className="space-y-2">
        <label
          htmlFor="target_market"
          className="block text-sm font-medium text-gray-200"
        >
          Target Market
        </label>
        <select
          id="target_market"
          value={customer.target_market || ""}
          onChange={(e) => updateData("customer", { target_market: e.target.value })}
          className="w-full rounded-md border border-gray-600 bg-gray-800 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#fa2a00]"
        >
          <option value="">Select your target market</option>
          {targetMarkets.map((market) => (
            <option key={market} value={market}>
              {market}
            </option>
          ))}
        </select>

        {customer.target_market === "Other" && (
          <input
            type="text"
            placeholder="Specify your target market"
            value={customer.target_market === "Other" ? "" : customer.target_market}
            onChange={(e) => updateData("customer", { target_market: e.target.value })}
            className="mt-2 w-full rounded-md border border-gray-600 bg-gray-800 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#fa2a00]"
          />
        )}
      </div>

      {/* Main Problem */}
      <div className="space-y-2">
        <label
          htmlFor="main_problem"
          className="block text-sm font-medium text-gray-200"
        >
          What's the #1 problem you solve? *
        </label>
        <textarea
          id="main_problem"
          value={customer.main_problem || ""}
          onChange={(e) => updateData("customer", { main_problem: e.target.value })}
          placeholder="Busy professionals who want to lose weight but don't have time for 2-hour gym sessions..."
          rows={3}
          className="w-full rounded-md border border-gray-600 bg-gray-800 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#fa2a00]"
        />
      </div>

      {/* Failed Solutions */}
      <div className="space-y-2">
        <label
          htmlFor="failed_solutions"
          className="block text-sm font-medium text-gray-200"
        >
          What's something clients tried before that didn't work? *
        </label>
        <textarea
          id="failed_solutions"
          value={customer.failed_solutions || ""}
          onChange={(e) => updateData("customer", { failed_solutions: e.target.value })}
          placeholder="Extreme diets, expensive gym memberships they never used, complicated workout plans..."
          rows={3}
          className="w-full rounded-md border border-gray-600 bg-gray-800 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#fa2a00]"
        />
      </div>

      {/* Client Words */}
      <div className="space-y-2">
        <label
          htmlFor="client_words"
          className="block text-sm font-medium text-gray-200"
        >
          What exact words do clients say before signing up? *
        </label>
        <textarea
          id="client_words"
          value={customer.client_words || ""}
          onChange={(e) => updateData("customer", { client_words: e.target.value })}
          placeholder="I need something that fits my schedule, I'm tired of starting over, I want to feel confident again..."
          rows={3}
          className="w-full rounded-md border border-gray-600 bg-gray-800 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#fa2a00]"
        />
      </div>

      {/* Magic Wand Result */}
      <div className="space-y-2">
        <label
          htmlFor="magic_wand_result"
          className="block text-sm font-medium text-gray-200"
        >
          If they had a magic wand, what result would they wish for? *
        </label>
        <textarea
          id="magic_wand_result"
          value={customer.magic_wand_result || ""}
          onChange={(e) => updateData("customer", { magic_wand_result: e.target.value })}
          placeholder="Wake up feeling energized, fit into their favorite clothes, feel confident at the beach..."
          rows={3}
          className="w-full rounded-md border border-gray-600 bg-gray-800 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#fa2a00]"
        />
      </div>
    </div>
  );
};

export default StepSix;
