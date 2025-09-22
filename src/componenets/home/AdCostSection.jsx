"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function AdCostSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Split text function for word-by-word reveal
  const splitText = (text) => {
    return text.split(' ').map((word, index) => (
      <motion.span
        key={index}
        className="inline-block mr-1"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.4, delay: 0.5 + index * 0.05 }}
      >
        {word}
      </motion.span>
    ));
  };

  return (
    <motion.section 
      ref={ref}
      className="py-16 px-4 bg-[#0B0B0B]"
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Left Content */}
          <motion.div 
            className="lg:w-1/2"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <motion.h2 
              className="text-3xl md:text-4xl font-black text-white mb-6 font-klein leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              The cost to advertise
              <br />
              on <motion.span 
                style={{ color: "#1478ED" }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                FACEBOOK
              </motion.span> has
              <br />
              <br />
              <motion.span 
                className="bg-white text-black px-3 py-1 rounded-lg"
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={isInView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.8, y: 20 }}
                transition={{ 
                  duration: 0.6, 
                  delay: 1.2,
                  type: "spring",
                  damping: 15,
                  stiffness: 200
                }}
              >
                almost doubled!
              </motion.span>
            </motion.h2>
            <motion.p 
              className="text-lg text-white/90 leading-relaxed mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 1.4 }}
            >
              {splitText("The cost of traffic is going to keep going up. The businesses that will win are the ones that can get the most leverage from traffic.")}
            </motion.p>
            <motion.p 
              className="text-sm text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.4, delay: 2.0 }}
            >
              Source: enhencer.com
            </motion.p>
          </motion.div>

          {/* Right Side - Chart */}
          <motion.div 
            className="lg:w-1/2 flex justify-center"
            initial={{ opacity: 0, x: 50, scale: 0.9 }}
            animate={isInView ? { opacity: 1, x: 0, scale: 1 } : { opacity: 0, x: 50, scale: 0.9 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <motion.img
              src="/lovable-uploads/e5c0642e-d7f1-491f-933b-10802e0174d2.png"
              alt="Facebook advertising cost chart showing increase from $7.29 in 2017 to $13.20 in 2024"
              className="max-w-full h-auto rounded-lg shadow-lg"
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)"
              }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}