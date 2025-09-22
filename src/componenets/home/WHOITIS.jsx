"use client";

import { Target, MapPin, User, Star, TrendingUp } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const PersonaCard = ({ title, Icon, description, className = "", index, isInView }) => (
  <motion.div
    className={`p-6 rounded-xl border border-gray-800 bg-[#141416] hover:border-[#FE0010] transition-colors ${className}`}
    initial={{ opacity: 0, scale: 0.8, y: 30 }}
    animate={isInView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.8, y: 30 }}
    transition={{
      duration: 0.6,
      delay: 0.3 + index * 0.1,
      type: "spring",
      damping: 12,
      stiffness: 100
    }}
    whileHover={{
      scale: 1.05,
      boxShadow: "0 15px 35px rgba(254, 0, 16, 0.2)",
      borderColor: "#FE0010"
    }}
  >
    <div className="mb-2">
      <motion.h3 
        className="text-lg font-bold text-[#FE0010] mb-3"
        initial={{ opacity: 0, x: -20 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
        transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
      >
        {title}
      </motion.h3>
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
        transition={{
          duration: 0.4,
          delay: 0.5 + index * 0.1,
          ease: [0.25, 0.46, 0.45, 0.94]
        }}
      >
        <Icon className="w-8 h-8 text-[#FE0010] mb-3" />
      </motion.div>
      <motion.p 
        className="text-gray-400"
        initial={{ opacity: 0, y: 10 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
        transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
      >
        {description}
      </motion.p>
    </div>
  </motion.div>
);

export default function WhoItsForSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  
  // Debug log to check if isInView is working
  console.log("WHOITIS isInView:", isInView);

  const personaData = [
    {
      title: "Burnt-Out Online Coach",
      Icon: Target,
      description: "Done-for-you ads in your voice.",
      className: ""
    },
    {
      title: "Local Gym Owner",
      Icon: MapPin,
      description: "Hyper-local ads that stand out in a crowded feed.",
      className: ""
    },
    {
      title: "Solo PT in Big Box Gym",
      Icon: User,
      description: "Postcode-targeted campaigns, no funnel required.",
      className: ""
    },
    {
      title: "Wellness Niche Coach",
      Icon: Star,
      description: "Tone-matched ads with emotional precision.",
      className: ""
    },
    {
      title: "Studio Scaling Fast",
      Icon: TrendingUp,
      description: "Brand-cohesive campaigns, seasonally aligned.",
      className: "md:col-span-2 lg:col-span-1"
    }
  ];

  return (
    <motion.section 
      ref={ref}
      className="py-16 px-4 bg-[#0F0F12]"
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <motion.h2 
            className="text-3xl md:text-4xl font-black text-white mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Whether You&apos;re a Solo PT or Running 5 Locations — We&apos;ve Got You Covered.
          </motion.h2>
        </motion.div>

        {/* Personas Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {personaData.map((persona, index) => (
            <PersonaCard
              key={index}
              title={persona.title}
              Icon={persona.Icon}
              description={persona.description}
              className={persona.className}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>
      </div>
    </motion.section>
  );
}