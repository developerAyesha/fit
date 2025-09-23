"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const StatCard = ({ label, value, dateRange, index, isInView }) => {
  return (
    <motion.div 
      className="p-4 rounded-lg"
      style={{ backgroundColor: "var(--color-brand-dark)" }}
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={isInView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.8, y: 20 }}
      transition={{
        duration: 0.5,
        delay: 0.8 + index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      whileHover={{ 
        scale: 1.05,
        boxShadow: "0 10px 30px rgba(250, 42, 0, 0.3)"
      }}
    >
      <p className="text-sm text-white/90 font-medium">{label}</p>
      <motion.p 
        className="text-xl font-bold text-white"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 1.0 + index * 0.1 }}
      >
        {value}
      </motion.p>
      <p className="text-xs text-white/70 font-medium">{dateRange}</p>
    </motion.div>
  );
};

const PerformanceBlock = ({ title, stats, fbMetrics, blockIndex, isInView }) => {
  return (
    <motion.div 
      className="bg-background p-6 rounded-xl border border-gray-800 transition-colors"
      style={{ "--hover-border": "var(--color-brand)" }}
      onMouseEnter={(e) => e.target.style.borderColor = "var(--color-brand)"}
      onMouseLeave={(e) => e.target.style.borderColor = "rgb(30, 26, 38)"}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{
        duration: 0.6,
        delay: 0.5 + blockIndex * 0.2,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      whileHover={{ 
        y: -5,
        boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)"
      }}
    >
      <motion.h3 
        className="text-white font-bold text-lg mb-4"
        initial={{ opacity: 0, x: -20 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
        transition={{
          duration: 0.5,
          delay: 0.7 + blockIndex * 0.2
        }}
      >
        {title}
      </motion.h3>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        {stats.map((stat, index) => (
          <StatCard
            key={index}
            label={stat.label}
            value={stat.value}
            dateRange={stat.dateRange}
            index={blockIndex * 4 + index}
            isInView={isInView}
          />
        ))}
      </div>

      {/* Facebook Metrics */}
      <motion.div 
        className="bg-bg-dark p-4 rounded-lg border border-gray-700"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{
          duration: 0.5,
          delay: 1.2 + blockIndex * 0.2
        }}
      >
        <div className="text-gray-300 text-sm space-y-2">
          <motion.div 
            className="flex justify-between"
            initial={{ opacity: 0, x: -10 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
            transition={{ delay: 1.4 + blockIndex * 0.2 }}
          >
            <span>Cost per lead:</span>
            <span className="font-bold" style={{ color: "var(--color-brand)" }}>{fbMetrics.costPerLead}</span>
          </motion.div>
          <motion.div 
            className="flex justify-between"
            initial={{ opacity: 0, x: -10 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
            transition={{ delay: 1.5 + blockIndex * 0.2 }}
          >
            <span>Amount spent:</span>
            <span className="font-bold" style={{ color: "var(--color-brand)" }}>{fbMetrics.amountSpent}</span>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default function ResultsShowcase() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-100px" });

  const performanceData = [
    {
      title: "Weight Loss Challenge",
      stats: [
        { label: "Leads", value: "327", dateRange: "7 days" },
        { label: "Calls Booked", value: "89", dateRange: "7 days" },
        { label: "Sign-ups", value: "43", dateRange: "7 days" },
        { label: "Revenue", value: "£2.1k", dateRange: "7 days" },
      ],
      fbMetrics: {
        costPerLead: "£4.32",
        amountSpent: "£1,412.64",
      },
    },
    {
      title: "Strength Training Program",
      stats: [
        { label: "Leads", value: "189", dateRange: "5 days" },
        { label: "Calls Booked", value: "67", dateRange: "5 days" },
        { label: "Conversions", value: "31", dateRange: "5 days" },
        { label: "Revenue", value: "£1.8k", dateRange: "5 days" },
      ],
      fbMetrics: {
        costPerLead: "£3.89",
        amountSpent: "£735.21",
      },
    },
    {
      title: "Nutrition Coaching",
      stats: [
        { label: "Leads", value: "412", dateRange: "10 days" },
        { label: "Calls Booked", value: "124", dateRange: "10 days" },
        { label: "Sign-ups", value: "78", dateRange: "10 days" },
        { label: "Revenue", value: "£3.9k", dateRange: "10 days" },
      ],
      fbMetrics: {
        costPerLead: "£2.97",
        amountSpent: "£1,223.64",
      },
    },
    {
      title: "Transformation Challenge",
      stats: [
        { label: "Leads", value: "298", dateRange: "6 days" },
        { label: "Calls Booked", value: "95", dateRange: "6 days" },
        { label: "Conversions", value: "52", dateRange: "6 days" },
        { label: "Revenue", value: "£2.6k", dateRange: "6 days" },
      ],
      fbMetrics: {
        costPerLead: "£3.67",
        amountSpent: "£1,093.66",
      },
    },
  ];

  return (
    <motion.section 
      ref={ref}
      className="py-12 px-4 bg-gray-950"
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Heading */}
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <motion.h2 
            className="text-3xl md:text-4xl font-black text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            The Ads That Print Money Every Season.
          </motion.h2>
          <motion.p 
            className="text-lg text-gray-300 max-w-3xl mx-auto mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            From Black Friday to the New Year Waitlist – the exact campaigns that built fitness empires are now built into FitnessAds.ai.
          </motion.p>
          <motion.h3 
            className="text-xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Results Like This:
          </motion.h3>
        </motion.div>

        {/* Grid of Performance Blocks */}
        <div className="grid md:grid-cols-2 gap-6">
          {performanceData.map((block, index) => (
            <PerformanceBlock
              key={index}
              title={block.title}
              stats={block.stats}
              fbMetrics={block.fbMetrics}
              blockIndex={index}
              isInView={isInView}
            />
          ))}
        </div>
      </div>
    </motion.section>
  );
}