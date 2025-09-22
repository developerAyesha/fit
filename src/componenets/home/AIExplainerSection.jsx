import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function AIExplainerSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const fadeUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const slideFromLeftVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.7,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const bulletVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const dotVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const highlightVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        delay: 0.3,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  // Split text function for word-by-word reveal
  const splitText = (text) => {
    return text.split(' ').map((word, index) => (
      <motion.span
        key={index}
        className="inline-block mr-1"
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: {
            opacity: 1,
            y: 0,
            transition: {
              duration: 0.4,
              delay: index * 0.05
            }
          }
        }}
      >
        {word}
      </motion.span>
    ));
  };

  // Bullet point data
  const bulletPoints = [
    "1000's of real gym + online coaching ads",
    "Real lead data",
    "Real buying behaviour",
    "And it writes ads in your voice, your tone, your values"
  ];

  return (
    <motion.section 
      ref={ref}
      className="px-4 py-16 bg-[#1a1820]"
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-left">
          {/* Main Heading with Slide from Edge + Split Text */}
          <motion.h2 
            className="text-3xl md:text-4xl font-black text-white mb-6"
            variants={slideFromLeftVariants}
          >
            {splitText("This isn't ChatGPT wearing gym leggings that make its glutes look bigger")}
          </motion.h2>

          {/* Intro Paragraph with Fade + Rise */}
          <motion.p 
            className="text-lg text-white/90 max-w-3xl leading-relaxed mb-8"
            variants={fadeUpVariants}
          >
            You don&apos;t need another AI that can write a 5/10 ad for any industry under the sun.
            You need one that knows your buyers inside out. What they think, feel, and fear at the exact moment they see your ad.
          </motion.p>

          {/* Subheading */}
          <motion.h3 
            className="text-xl md:text-2xl font-bold text-white mb-4"
            variants={fadeUpVariants}
          >
            FitnessAds.ai was trained on
          </motion.h3>

          {/* Bullet Points with Cascade Entrance + Dot Pop */}
          <motion.div className="space-y-3">
            {bulletPoints.map((text, index) => (
              <motion.div
                key={index}
                className="flex items-center gap-3"
                variants={bulletVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                transition={{ delay: 0.8 + index * 0.1 }}
              >
                {/* Dot Pop Animation */}
                <motion.div
                  className="w-2 h-2 bg-[#FE0010] rounded-full relative"
                  variants={dotVariants}
                  animate={{
                    boxShadow: [
                      "0 0 0 0 rgba(254, 0, 16, 0.7)",
                      "0 0 0 4px rgba(254, 0, 16, 0)",
                      "0 0 0 0 rgba(254, 0, 16, 0)"
                    ]
                  }}
                  transition={{
                    boxShadow: {
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "loop",
                      delay: index * 0.2
                    }
                  }}
                />
                <motion.p 
                  className="text-lg text-white font-medium"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 + 0.2 }}
                >
                  {text}
                </motion.p>
              </motion.div>
            ))}
          </motion.div>

          {/* Bottom Highlight Paragraph */}
          <motion.div 
            className="mt-16"
            variants={highlightVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <p className="text-white max-w-[600px] text-xl md:text-2xl font-bold leading-relaxed">
              It doesn&apos;t write generic garbage. It writes stuff that converts. Fast. 
              We&apos;ve tested them all.
              <br />
              <br />
              But it&apos;s hard to make good ad creative at scale. And the bottleneck is creative — until now…
            </p>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
