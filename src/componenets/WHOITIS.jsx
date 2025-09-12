"use client";

import { Target, MapPin, User, Star, TrendingUp } from "lucide-react";

const PersonaCard = ({ title, Icon, description, className = "" }) => (
  <div
    className={`p-6 rounded-xl border border-gray-800 bg-[#141416] hover:border-[#FE0010] transition-colors ${className}`}
  >
    <div className="mb-2">
      <h3 className="text-lg font-bold text-[#FE0010] mb-3">{title}</h3>
      <Icon className="w-8 h-8 text-[#FE0010] mb-3" />
      <p className="text-gray-400">{description}</p>
    </div>
  </div>
);

export default function WhoItsForSection() {
  return (
    <section className="py-16 px-4 bg-[#0F0F12]">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-8">
            Whether You&apos;re a Solo PT or Running 5 Locations — We&apos;ve Got You Covered.
          </h2>
        </div>

        {/* Personas Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <PersonaCard
            title="Burnt-Out Online Coach"
            Icon={Target}
            description="Done-for-you ads in your voice."
          />

          <PersonaCard
            title="Local Gym Owner"
            Icon={MapPin}
            description="Hyper-local ads that stand out in a crowded feed."
          />

          <PersonaCard
            title="Solo PT in Big Box Gym"
            Icon={User}
            description="Postcode-targeted campaigns, no funnel required."
          />

          <PersonaCard
            title="Wellness Niche Coach"
            Icon={Star}
            description="Tone-matched ads with emotional precision."
          />

          <PersonaCard
            title="Studio Scaling Fast"
            Icon={TrendingUp}
            description="Brand-cohesive campaigns, seasonally aligned."
            className="md:col-span-2 lg:col-span-1"
          />
        </div>
      </div>
    </section>
  );
}
