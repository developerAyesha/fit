"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function ProofTilesSection() {
  const router = useRouter();

  // Card data
  const proofCards = [
    {
      id: 1,
      name: "Rorie",
      title: "Online Coach for Semi Professional Footballers",
      amount: "£10k",
      description: "month online after launching FitnessAds.ai campaigns"
    },
    {
      id: 2,
      name: "Vanda",
      title: "Studio Owner",
      amount: "£34,956",
      description: "in sales from one campaign pack"
    },
    {
      id: 3,
      name: "Chris",
      title: "Group PT Gym",
      amount: "133",
      description: "SGPT members and expanding to a second site"
    }
  ];

  // Duplicate cards for seamless infinite scroll
  const duplicatedCards = [...proofCards, ...proofCards, ...proofCards];

  return (
    <section className="py-16 px-4 bg-[#0B0B0B]">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
            Who Else Is Already Winning With FitnessAds.ai?
          </h2>
          <p className="text-lg text-white/80 max-w-3xl mx-auto">
            From solo PTs to multi-location studios, early adopters are getting results 
            that would&apos;ve taken weeks — now in minutes.
          </p>
        </div>

        {/* Infinite Horizontal Scroll Container */}
        <div className="relative overflow-hidden mb-12">
          {/* Gradient fade effects */}
          {/* <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#0B0B0B] to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#0B0B0B] to-transparent z-10 pointer-events-none"></div> */}
          <motion.div
            className="flex gap-6"
            animate={{
              x: [0, -100] // Move by 100% (one full set of cards)
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 5,
                ease: "linear"
              }
            }}
            style={{
              width: "300%" // 3 sets of cards
            }}
          >
            {duplicatedCards.map((card, index) => (
              <div
                key={`${card.id}-${index}`}
                className="flex-shrink-0 w-96 p-6 bg-[#1A1A1A] border border-gray-800 rounded-xl hover:border-red-500 transition-colors"
              >
                <div className="text-center">
                  <h3 className="text-xl font-bold text-white mb-2">
                    {card.name}
                  </h3>
                  <p className="text-sm text-gray-400 mb-4">
                    {card.title}
                  </p>
                  <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                    <p className="text-2xl font-bold text-red-500 mb-2">
                      {card.amount}
                    </p>
                    <p className="text-sm text-white">
                      {card.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <button
            onClick={() => router.push("/auth")}
            className="px-8 py-4 bg-[#FE0010] text-white text-lg font-bold rounded-md shadow-lg hover:bg-red-700 transition"
          >
            Join the Movement Now
          </button>
        </div>
      </div>
    </section>
  );
}
