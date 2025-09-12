"use client";

export default function FinalCTA() {
  return (
    <section className="py-12 px-4 bg-[#232127]">
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-lg mb-4 text-white">🔥 What are you waiting for? 🔥</p>

        <h2 className="text-3xl md:text-5xl font-black mb-6 leading-tight font-klein text-white">
          Still{" "}
          <span className="bg-white text-black px-3 py-1 rounded-lg inline-block">
            Reading
          </span>
        </h2>

        <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto">
          You've seen what generic AI can do. Now meet the weapon built for
          fitness business owners who want better clients, cheaper leads, and
          profitable ads fast.
        </p>

        <button className="px-8 py-4 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl">
          Get Started
        </button>
      </div>
    </section>
  );
}
