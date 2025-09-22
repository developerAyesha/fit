"use client";

import { Check, X, ArrowDown } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const ComparisonTable = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const comparisonData = [
    {
      oldWay: "Wait weeks on an agency",
      newWay: "Instant ads, made for you"
    },
    {
      oldWay: "Copy & Paste Canva Ads", 
      newWay: "Bold, original, on-brand ads"
    },
    {
      oldWay: "£2k/month retainers",
      newWay: "£39/month, cancel anytime"
    },
    {
      oldWay: "Zero ROAS tracking",
      newWay: "Built-in performance tracking"
    },
    {
      oldWay: "Generic GPT tools",
      newWay: "Trained on real fitness ad data"
    },
    {
      oldWay: "Waste precious time and money on sh*tty agencies",
      newWay: "Access to elite agency-level strategies & copy"
    }
  ];

  return (
    <motion.section 
      ref={ref}
      className="py-16 px-4 bg-[#0B0B0B]"
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      <div className="max-w-6xl mx-auto">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <motion.h2 
            className="text-3xl md:text-4xl font-black text-foreground mb-4 font-klein"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <span className="block md:inline text-white">Old way vs FitnessAds.ai</span>
            <br className="md:hidden" />
            <span className="md:ml-2">
              <motion.span 
                className="inline-block px-4 py-2 rounded-xl text-white font-black"
                style={{ backgroundColor: '#FF5440' }}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
                transition={{ 
                  duration: 0.5, 
                  delay: 0.6,
                  type: "spring",
                  damping: 15,
                  stiffness: 200
                }}
              >
                New AI method
              </motion.span>
            </span>
          </motion.h2>
        </motion.div>

        {/* Desktop Layout */}
        <div className="hidden md:block">
          <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {/* Old Way Column */}
            <motion.div 
              className="space-y-4 relative"
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <motion.h3 
                className="text-2xl font-bold mb-6 text-center font-klein text-white"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                Old Way
              </motion.h3>
              {/* Vertical line connecting all boxes */}
              <motion.div 
                className="absolute left-1/2 transform -translate-x-1/2 top-20 bottom-20 w-0.5 bg-red-400 z-0"
                initial={{ scaleY: 0 }}
                animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
                transition={{ duration: 1, delay: 0.8 }}
                style={{ transformOrigin: "top" }}
              />
              {comparisonData.map((item, index) => (
                <motion.div 
                  key={index} 
                  className="p-4 rounded-lg w-[85%] max-w-xs mx-auto relative z-10" 
                  style={{ backgroundColor: '#FF5440' }}
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={isInView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.8, y: 20 }}
                  transition={{ 
                    duration: 0.5, 
                    delay: 0.9 + index * 0.1,
                    type: "spring",
                    damping: 12,
                    stiffness: 100
                  }}
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 10px 25px rgba(255, 84, 64, 0.3)"
                  }}
                >
                  <div className="flex items-start gap-3">
                    <motion.div
                      initial={{ rotate: -180, opacity: 0 }}
                      animate={isInView ? { rotate: 0, opacity: 1 } : { rotate: -180, opacity: 0 }}
                      transition={{ duration: 0.4, delay: 1.0 + index * 0.1 }}
                    >
                      <X className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: '#FFFFFF' }} />
                    </motion.div>
                    <motion.p 
                      className="font-medium" 
                      style={{ color: '#FFFFFF' }}
                      initial={{ opacity: 0, x: -10 }}
                      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                      transition={{ duration: 0.4, delay: 1.1 + index * 0.1 }}
                    >
                      {item.oldWay}
                    </motion.p>
                  </div>
                </motion.div>
              ))}
              {/* Arrow pointing down */}
              <motion.div 
                className="flex justify-center relative z-10"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 1.5 }}
              >
                <motion.div
                  animate={isInView ? { y: [0, 5, 0] } : { y: 0 }}
                  transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                >
                  <ArrowDown className="w-8 h-8" style={{ color: '#FF5440' }} />
                </motion.div>
              </motion.div>
              <motion.div 
                className="p-6 rounded-xl text-center w-[85%] max-w-xs mx-auto relative z-10" 
                style={{ backgroundColor: '#FF5440' }}
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={isInView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.8, y: 20 }}
                transition={{ 
                  duration: 0.6, 
                  delay: 1.6,
                  type: "spring",
                  damping: 12,
                  stiffness: 100
                }}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 15px 35px rgba(255, 84, 64, 0.4)"
                }}
              >
                <p className="font-bold text-lg" style={{ color: '#FFFFFF' }}>🔥 BURNED CASH AND WASTED TIME</p>
              </motion.div>
            </motion.div>

            {/* FitnessAds.ai Column */}
            <motion.div 
              className="space-y-4 relative"
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <motion.h3 
                className="text-2xl font-bold mb-6 text-center font-klein text-white"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.7 }}
              >
                FitnessAds.ai
              </motion.h3>
              {/* Vertical line connecting all boxes */}
              <motion.div 
                className="absolute left-1/2 transform -translate-x-1/2 top-20 bottom-20 w-0.5 bg-green-400 z-0"
                initial={{ scaleY: 0 }}
                animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
                transition={{ duration: 1, delay: 1.0 }}
                style={{ transformOrigin: "top" }}
              />
              {comparisonData.map((item, index) => (
                <motion.div 
                  key={index} 
                  className="p-4 rounded-lg w-[85%] max-w-xs mx-auto relative z-10" 
                  style={{ backgroundColor: '#00DD7B' }}
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={isInView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.8, y: 20 }}
                  transition={{ 
                    duration: 0.5, 
                    delay: 1.1 + index * 0.1,
                    type: "spring",
                    damping: 12,
                    stiffness: 100
                  }}
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 10px 25px rgba(0, 221, 123, 0.3)"
                  }}
                >
                  <div className="flex items-start gap-3">
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                      transition={{ 
                        duration: 0.4, 
                        delay: 1.2 + index * 0.1,
                        type: "spring",
                        damping: 15,
                        stiffness: 200
                      }}
                    >
                      <Check className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: '#242229' }} />
                    </motion.div>
                    <motion.p 
                      className="font-medium" 
                      style={{ color: '#242229' }}
                      initial={{ opacity: 0, x: -10 }}
                      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                      transition={{ duration: 0.4, delay: 1.3 + index * 0.1 }}
                    >
                      {item.newWay}
                    </motion.p>
                  </div>
                </motion.div>
              ))}
              {/* Arrow pointing down */}
              <motion.div 
                className="flex justify-center relative z-10"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 1.7 }}
              >
                <motion.div
                  animate={isInView ? { y: [0, 5, 0] } : { y: 0 }}
                  transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", delay: 0.5 }}
                >
                  <ArrowDown className="w-8 h-8" style={{ color: '#00DD7B' }} />
                </motion.div>
              </motion.div>
              <motion.div 
                className="p-6 rounded-xl text-center w-[85%] max-w-xs mx-auto relative z-10" 
                style={{ backgroundColor: '#00DD7B' }}
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={isInView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.8, y: 20 }}
                transition={{ 
                  duration: 0.6, 
                  delay: 1.8,
                  type: "spring",
                  damping: 12,
                  stiffness: 100
                }}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 15px 35px rgba(0, 221, 123, 0.4)"
                }}
              >
                <p className="font-bold text-lg" style={{ color: '#242229' }}>🤑 RECORD-BREAKING MONTHS AND PROFITS</p>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Mobile Layout - Stacked */}
        <div className="md:hidden space-y-8">
          {/* Old Way Mobile */}
          <motion.div 
            className="space-y-4 relative"
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <motion.h3 
              className="text-xl font-bold mb-4 text-center font-klein text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              Old Way
            </motion.h3>
            {/* Vertical line connecting all boxes */}
            <motion.div 
              className="absolute left-1/2 transform -translate-x-1/2 top-16 bottom-16 w-0.5 bg-red-400 z-0"
              initial={{ scaleY: 0 }}
              animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
              transition={{ duration: 1, delay: 0.8 }}
              style={{ transformOrigin: "top" }}
            />
            {comparisonData.map((item, index) => (
              <motion.div 
                key={index} 
                className="p-4 rounded-lg w-[85%] max-w-xs mx-auto relative z-10" 
                style={{ backgroundColor: '#FF5440' }}
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={isInView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.8, y: 20 }}
                transition={{ 
                  duration: 0.5, 
                  delay: 0.9 + index * 0.1,
                  type: "spring",
                  damping: 12,
                  stiffness: 100
                }}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 10px 25px rgba(255, 84, 64, 0.3)"
                }}
              >
                <div className="flex items-start gap-3">
                  <motion.div
                    initial={{ rotate: -180, opacity: 0 }}
                    animate={isInView ? { rotate: 0, opacity: 1 } : { rotate: -180, opacity: 0 }}
                    transition={{ duration: 0.4, delay: 1.0 + index * 0.1 }}
                  >
                    <X className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: '#FFFFFF' }} />
                  </motion.div>
                  <motion.p 
                    className="font-medium" 
                    style={{ color: '#FFFFFF' }}
                    initial={{ opacity: 0, x: -10 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                    transition={{ duration: 0.4, delay: 1.1 + index * 0.1 }}
                  >
                    {item.oldWay}
                  </motion.p>
                </div>
              </motion.div>
            ))}
            {/* Arrow pointing down */}
            <motion.div 
              className="flex justify-center relative z-10"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 1.5 }}
            >
              <motion.div
                animate={isInView ? { y: [0, 5, 0] } : { y: 0 }}
                transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
              >
                <ArrowDown className="w-8 h-8" style={{ color: '#FF5440' }} />
              </motion.div>
            </motion.div>
            <motion.div 
              className="p-6 rounded-xl text-center w-[85%] max-w-xs mx-auto relative z-10" 
              style={{ backgroundColor: '#FF5440' }}
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={isInView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.8, y: 20 }}
              transition={{ 
                duration: 0.6, 
                delay: 1.6,
                type: "spring",
                damping: 12,
                stiffness: 100
              }}
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 15px 35px rgba(255, 84, 64, 0.4)"
              }}
            >
              <p className="font-bold text-lg" style={{ color: '#FFFFFF' }}>🔥 BURNED CASH AND WASTED TIME</p>
            </motion.div>
          </motion.div>

          {/* FitnessAds.ai Mobile */}
          <motion.div 
            className="space-y-4 relative"
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.6, delay: 1.8 }}
          >
            <motion.h3 
              className="text-xl font-bold mb-4 text-center font-klein text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 1.9 }}
            >
              FitnessAds.ai
            </motion.h3>
            {/* Vertical line connecting all boxes */}
            <motion.div 
              className="absolute left-1/2 transform -translate-x-1/2 top-16 bottom-16 w-0.5 bg-green-400 z-0"
              initial={{ scaleY: 0 }}
              animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
              transition={{ duration: 1, delay: 2.2 }}
              style={{ transformOrigin: "top" }}
            />
            {comparisonData.map((item, index) => (
              <motion.div 
                key={index} 
                className="p-4 rounded-lg w-[85%] max-w-xs mx-auto relative z-10" 
                style={{ backgroundColor: '#00DD7B' }}
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={isInView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.8, y: 20 }}
                transition={{ 
                  duration: 0.5, 
                  delay: 2.3 + index * 0.1,
                  type: "spring",
                  damping: 12,
                  stiffness: 100
                }}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 10px 25px rgba(0, 221, 123, 0.3)"
                }}
              >
                <div className="flex items-start gap-3">
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                    transition={{ 
                      duration: 0.4, 
                      delay: 2.4 + index * 0.1,
                      type: "spring",
                      damping: 15,
                      stiffness: 200
                    }}
                  >
                    <Check className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: '#242229' }} />
                  </motion.div>
                  <motion.p 
                    className="font-medium" 
                    style={{ color: '#242229' }}
                    initial={{ opacity: 0, x: -10 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                    transition={{ duration: 0.4, delay: 2.5 + index * 0.1 }}
                  >
                    {item.newWay}
                  </motion.p>
                </div>
              </motion.div>
            ))}
            {/* Arrow pointing down */}
            <motion.div 
              className="flex justify-center relative z-10"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 2.9 }}
            >
              <motion.div
                animate={isInView ? { y: [0, 5, 0] } : { y: 0 }}
                transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", delay: 0.5 }}
              >
                <ArrowDown className="w-8 h-8" style={{ color: '#00DD7B' }} />
              </motion.div>
            </motion.div>
            <motion.div 
              className="p-6 rounded-xl text-center w-[85%] max-w-xs mx-auto relative z-10" 
              style={{ backgroundColor: '#00DD7B' }}
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={isInView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.8, y: 20 }}
              transition={{ 
                duration: 0.6, 
                delay: 3.0,
                type: "spring",
                damping: 12,
                stiffness: 100
              }}
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 15px 35px rgba(0, 221, 123, 0.4)"
              }}
            >
              <p className="font-bold text-lg" style={{ color: '#242229' }}>🤑 RECORD-BREAKING MONTHS AND PROFITS</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default ComparisonTable;