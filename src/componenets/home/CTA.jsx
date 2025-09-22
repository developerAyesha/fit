"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function FinalCTA() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.section 
      ref={ref}
      className="py-12 px-4 bg-[#232127]"
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      <div className="max-w-4xl mx-auto text-center">
        <motion.p 
          className="text-lg mb-4 text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          🔥 What are you waiting for? 🔥
        </motion.p>

        <motion.h2 
          className="text-3xl md:text-5xl font-black mb-6 leading-tight font-klein text-white"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          Still{" "}
          <motion.span 
            className="bg-white text-black px-3 py-1 rounded-lg inline-block"
            initial={{ scale: 0, rotate: -5 }}
            animate={isInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -5 }}
            transition={{ 
              duration: 0.5, 
              delay: 0.5,
              type: "spring",
              damping: 15,
              stiffness: 200
            }}
          >
            Reading
          </motion.span>
        </motion.h2>

        <motion.p 
          className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          You've seen what generic AI can do. Now meet the weapon built for
          fitness business owners who want better clients, cheaper leads, and
          profitable ads fast.
        </motion.p>

        <motion.button 
          className="px-8 py-4 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={isInView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.8, y: 20 }}
          transition={{ 
            duration: 0.6, 
            delay: 0.6,
            type: "spring",
            damping: 12,
            stiffness: 100
          }}
          whileHover={{ 
            scale: 1.05,
            boxShadow: "0 20px 40px rgba(239, 68, 68, 0.4)"
          }}
          whileTap={{ scale: 0.95 }}
        >
          Get Started
        </motion.button>
      </div>
    </motion.section>
  );
}