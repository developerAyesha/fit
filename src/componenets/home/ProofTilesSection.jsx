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
  const duplicatedCards = [...proofCards, ...proofCards];

  // Calculate the width of one set of cards (3 cards * 384px width + 24px gap * 2)
  const cardWidth = 384; // w-96 = 384px
  const gap = 24; // gap-6 = 24px
  const oneSetWidth = (cardWidth + gap) * proofCards.length;

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
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#0B0B0B] to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#0B0B0B] to-transparent z-10 pointer-events-none"></div>
          
          <motion.div
            className="flex gap-6"
            animate={{
              x: [-oneSetWidth, 0] // Move from -oneSetWidth to 0
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 15, // Adjust speed as needed
                ease: "linear"
              }
            }}
            style={{
              width: `${oneSetWidth * 2}px` // Exactly 2 sets of cards
            }}
          >
            {duplicatedCards.map((card, index) => (
              <div
                key={`${card.id}-${Math.floor(index / proofCards.length)}`}
                 className="flex-shrink-0 w-96 p-6 bg-[#1A1A1A] border border-gray-800 rounded-xl transition-colors"
                 style={{ "--hover-border": "var(--color-brand)" }}
                 onMouseEnter={(e) => e.target.style.borderColor = "var(--color-brand)"}
                 onMouseLeave={(e) => e.target.style.borderColor = "rgb(31, 41, 55)"}
              >
                <div className="text-center">
                  <h3 className="text-xl font-bold text-white mb-2">
                    {card.name}
                  </h3>
                  <p className="text-sm text-gray-400 mb-4">
                    {card.title}
                  </p>
                   <div className="rounded-lg p-4 border"
                        style={{ 
                          backgroundColor: "rgba(250, 42, 0, 0.1)",
                          borderColor: "rgba(250, 42, 0, 0.2)"
                        }}>
                     <p className="text-2xl font-bold mb-2" style={{ color: "var(--color-brand)" }}>
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
             className="px-8 py-4 text-white text-lg font-bold rounded-md shadow-lg transition"
             style={{ backgroundColor: "var(--color-brand)" }}
             onMouseEnter={(e) => e.target.style.backgroundColor = "var(--color-brand-dark)"}
             onMouseLeave={(e) => e.target.style.backgroundColor = "var(--color-brand)"}
          >
            Join the Movement Now
          </button>
        </div>
      </div>
    </section>
  );
}