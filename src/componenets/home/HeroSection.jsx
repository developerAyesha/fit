"use client";

import { useRouter } from "next/navigation";
import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { User, ChevronDown, LogOut, LayoutDashboard, Zap, Library, Settings } from "lucide-react";
import { useAuth } from "@/context/authContext";

export default function HeroSection() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const sectionRef = useRef(null);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100
      }
    }
  };

  const logoVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 200,
        delay: 0.2
      }
    },
    hover: {
      scale: 1.1,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 300
      }
    }
  };

  const headlineVariants = {
    hidden: { y: 100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
        staggerChildren: 0.1,
        delayChildren: 0.5
      }
    }
  };

  const wordVariants = {
    hidden: { y: 50, opacity: 0, rotateX: -90 },
    visible: {
      y: 0,
      opacity: 1,
      rotateX: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 200
      }
    }
  };

  const highlightVariants = {
    hidden: { scale: 0, rotate: -10 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 200,
        delay: 0.8
      }
    },
    hover: {
      scale: 1.05,
      rotate: 2,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 300
      }
    }
  };

  const buttonVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 200,
        delay: 1.2
      }
    },
    hover: {
      scale: 1.05,
      boxShadow: "0 20px 40px rgba(254, 0, 16, 0.4)",
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 300
      }
    },
    tap: {
      scale: 0.95
    }
  };

  // Split text into words for staggered animation
  const splitText = (text) => {
    return text.split(' ').map((word, index) => (
      <motion.span
        key={index}
        className="inline-block mr-2"
        variants={wordVariants}
      >
        {word}
      </motion.span>
    ));
  };

  const navigationItems = [
    { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { name: "Ad Generator", path: "/generate", icon: Zap },
    { name: "Campaign Library", path: "/library", icon: Library },
    { name: "Brand Setup", path: "/brand-setup", icon: Settings },
    { name: "Account", path: "/account", icon: User },
  ];

  const handleAuthAction = () => {
    if (user) {
      logout();
    } else {
      router.push("/auth");
    }
  };

  const handleLogoClick = () => {
    if (user) {
      router.push("/dashboard");
    } else {
      router.push("/");
    }
  };

  return (
    <motion.section
      ref={sectionRef}
      className="min-h-screen flex flex-col px-4 py-6 relative overflow-hidden"
      style={{
        backgroundImage: "url('/lovable-uploads/bee63c12-d6f3-4277-9edb-5f0fc8c01595.png')",
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Static Background Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Navbar */}
      <motion.nav 
        className="relative z-50 w-full"
        variants={itemVariants}
      >
        <div className="container mx-auto flex justify-between items-center">
          {/* Animated Logo */}
          <motion.div
            className="flex items-center gap-2 cursor-pointer"
            onClick={handleLogoClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <img
              src="/lovable-uploads/c4cf7462-6a0c-4f7b-ac89-546cd215771a.png"
              alt="FitnessAds.AI Logo"
              className="w-8 h-8"
            />
            <motion.span 
              className="text-xl font-bold text-white"
              whileHover={{ color: "#FE0010" }}
            >
              FITNESSADS.AI
            </motion.span>
          </motion.div>

          {/* Auth / Menu */}
          <motion.div 
            className="flex items-center gap-4 relative"
            variants={itemVariants}
          >
            {user ? (
              <div className="relative">
                <motion.button
                  onClick={() => setMenuOpen(!menuOpen)}
                  className="flex items-center gap-2 bg-white/10 border border-white/20 text-white px-3 py-2 rounded-md hover:bg-white/20"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <User className="w-4 h-4" />
                  <span className="hidden sm:inline">{user.email}</span>
                  <motion.div
                    animate={{ rotate: menuOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </motion.div>
                </motion.button>

                <motion.div
                  className="absolute right-0 mt-2 w-56 bg-gray-800 text-white rounded-md shadow-lg border border-gray-700"
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ 
                    opacity: menuOpen ? 1 : 0, 
                    y: menuOpen ? 0 : -10,
                    scale: menuOpen ? 1 : 0.95
                  }}
                  transition={{ duration: 0.2 }}
                  style={{ pointerEvents: menuOpen ? "auto" : "none" }}
                >
                  <div className="px-4 py-2 text-sm text-gray-400 border-b border-gray-700">
                    {user.email}
                  </div>
                  {navigationItems.map((item, index) => (
                    <motion.button
                      key={item.path}
                      onClick={() => {
                        setMenuOpen(false);
                        router.push(item.path);
                      }}
                      className="w-full flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-700"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ x: 5 }}
                    >
                      <item.icon className="w-4 h-4" />
                      {item.name}
                    </motion.button>
                  ))}
                  <motion.button
                    onClick={handleAuthAction}
                    className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-400 hover:bg-gray-700"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: navigationItems.length * 0.1 }}
                    whileHover={{ x: 5 }}
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </motion.button>
                </motion.div>
              </div>
            ) : (
              <motion.button
                onClick={handleAuthAction}
                className="px-4 py-2 rounded-md bg-[#FF3600] text-white font-medium hover:bg-[#e33000] transition"
                whileHover={{ scale: 1.05, boxShadow: "0 10px 20px rgba(255, 54, 0, 0.4)" }}
                whileTap={{ scale: 0.95 }}
              >
                Login
              </motion.button>
            )}
          </motion.div>
        </div>
      </motion.nav>

      {/* Hero Content */}
      <motion.div 
        className="flex-1 flex items-center justify-center relative z-10 text-center"
      >
        <motion.div 
          className="max-w-5xl mx-auto"
          variants={containerVariants}
        >
          {/* Animated Center Logo */}
          <motion.div 
            className="flex justify-center mb-8"
            variants={itemVariants}
          >
            <motion.img
              src="/lovable-uploads/36e2fe4a-6176-4447-8958-b3608de4485e.png"
              alt="FitnessAds.AI Logo"
              className="w-20 h-20 rounded-full shadow-lg"
              variants={logoVariants}
              whileHover="hover"
              animate={{
                y: [0, -10, 0]
              }}
              transition={{
                y: {
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "reverse"
                }
              }}
            />
          </motion.div>

          {/* Animated Subheading */}
          <motion.p 
            className="text-sm text-white mb-6"
            variants={itemVariants}
          >
            For gyms, studios, and coaches who want{" "}
            <motion.span 
              className="font-bold text-[#FE0010]"
              animate={{
                color: ["#FE0010", "#FF3600", "#FE0010"]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              more sign-ups without the guesswork.
            </motion.span>
          </motion.p>

          {/* Animated Main Headline */}
          <motion.h1 
            className="font-extrabold text-white text-3xl md:text-5xl leading-tight mb-6"
            variants={headlineVariants}
          >
            <motion.div variants={wordVariants}>
              Get More Fitness Clients in{" "}
              <motion.span 
                className="inline-block bg-[#FE0010] px-4 py-2 rounded-md"
                variants={highlightVariants}
                whileHover="hover"
                animate={{
                  background: [
                    "linear-gradient(45deg, #FE0010, #FF3600)",
                    "linear-gradient(45deg, #FF3600, #FE0010)",
                    "linear-gradient(45deg, #FE0010, #FF3600)"
                  ]
                }}
                transition={{
                  background: {
                    duration: 3,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }
                }}
              >
                90 Seconds
              </motion.span>
            </motion.div>
            <motion.div variants={wordVariants}>
              — With Ads Built Just for Fitness Businesses.
            </motion.div>
          </motion.h1>

          {/* Animated Tagline */}
          <motion.p 
            className="text-xl md:text-2xl font-semibold text-white mb-4"
            variants={itemVariants}
            animate={{
              opacity: [0.8, 1, 0.8]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          >
            The world&apos;s first ad engine trained on £100k/month of real
            fitness ad spend.
          </motion.p>

          {/* Animated Secondary tagline */}
          <motion.p 
            className="text-base md:text-lg text-white max-w-2xl mx-auto mb-8"
            variants={itemVariants}
          >
            No generic AI. No wasted time. Just campaigns that convert.
          </motion.p>

          {/* Animated CTA Button */}
          <motion.button 
            className="px-8 py-4 bg-[#FE0010] text-white text-lg font-bold rounded-md shadow-lg hover:bg-red-700 transition"
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            animate={{
              boxShadow: [
                "0 10px 30px rgba(254, 0, 16, 0.3)",
                "0 20px 40px rgba(254, 0, 16, 0.5)",
                "0 10px 30px rgba(254, 0, 16, 0.3)"
              ]
            }}
            transition={{
              boxShadow: {
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse"
              }
            }}
          >
            Build My First Campaign
          </motion.button>
        </motion.div>
      </motion.div>
    </motion.section>
  );
}
