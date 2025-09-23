"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";

export default function Footer() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.footer 
      ref={ref}
      className="py-12 px-4 border-t border-gray-800 bg-gray-900"
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      <div className="max-w-6xl mx-auto">
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Links */}
          <motion.div 
            className="flex flex-wrap justify-center gap-6 mb-6"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Link 
              href="/terms" 
              className="text-sm text-gray-400 hover:text-white transition-colors duration-200"
            >
              Terms & Conditions
            </Link>
            <Link 
              href="/privacy" 
              className="text-sm text-gray-400 hover:text-white transition-colors duration-200"
            >
              Privacy Policy
            </Link>
          </motion.div>

          {/* Copyright */}
          <motion.p 
            className="text-sm text-gray-400"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            © 2025 FitnessAds.ai. All rights reserved. Built by coaches, for coaches.
          </motion.p>
        </motion.div>
      </div>
    </motion.footer>
  );
}