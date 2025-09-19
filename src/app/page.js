"use client";

// import HeroSection from "@/componenets/HeroSection";
// import ProofTilesSection from "@/componenets/ProofTilesSection";
// import ExplainerSection from "@/componenets/ExplainerSection";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { User, ChevronDown, LogOut, LayoutDashboard, Zap, Library, Settings } from "lucide-react";
import { useAuth } from "@/context/authContext";
import ResultsShowcase from "@/componenets/ResultsShowcase";
import ChatGPTDriveSection from "@/componenets/ChatgptDriven";
import AdCostSection from "@/componenets/AdCostSection";
import ComparisonTable from "@/componenets/ComparisonTable";
import WhoItsForSection from "@/componenets/WHOITIS";
import PricingSection from "@/componenets/PricingCard";
import FAQ from "@/componenets/FAQ";
import FinalCTA from "@/componenets/CTA";
import Footer from "@/componenets/Footer";

export default function Hero() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

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
    <div className="bg-background">
   <section
      className="min-h-screen flex flex-col px-4 py-6 relative overflow-hidden"
      style={{
        backgroundImage: "url('/lovable-uploads/bee63c12-d6f3-4277-9edb-5f0fc8c01595.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Navbar */}
      <nav className="relative z-50 w-full">
        <div className="container mx-auto flex justify-between items-center">
          {/* Logo */}
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={handleLogoClick}
          >
            <img
              src="/lovable-uploads/c4cf7462-6a0c-4f7b-ac89-546cd215771a.png"
              alt="FitnessAds.AI Logo"
              className="w-8 h-8"
            />
            <span className="text-xl font-bold text-white">FITNESSADS.AI</span>
          </div>

          {/* Auth / Menu */}
          <div className="flex items-center gap-4 relative">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setMenuOpen(!menuOpen)}
                  className="flex items-center gap-2 bg-white/10 border border-white/20 text-white px-3 py-2 rounded-md hover:bg-white/20"
                >
                  <User className="w-4 h-4" />
                  <span className="hidden sm:inline">{user.email}</span>
                  <ChevronDown className="w-4 h-4" />
                </button>

                {menuOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-gray-800 text-white rounded-md shadow-lg border border-gray-700">
                    <div className="px-4 py-2 text-sm text-gray-400 border-b border-gray-700">
                      {user.email}
                    </div>
                    {navigationItems.map((item) => (
                      <button
                        key={item.path}
                        onClick={() => {
                          setMenuOpen(false);
                          router.push(item.path);
                        }}
                        className="w-full flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-700"
                      >
                        <item.icon className="w-4 h-4" />
                        {item.name}
                      </button>
                    ))}
                    <button
                      onClick={handleAuthAction}
                      className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-400 hover:bg-gray-700"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={handleAuthAction}
                className="px-4 py-2 rounded-md bg-[#FF3600] text-white font-medium hover:bg-[#e33000] transition"
              >
                Login
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Content */}
      <div className="flex-1 flex items-center justify-center relative z-10 text-center">
        <div className="max-w-5xl mx-auto">
          {/* Center Logo */}
          <div className="flex justify-center mb-8">
            <img
              src="/lovable-uploads/36e2fe4a-6176-4447-8958-b3608de4485e.png"
              alt="FitnessAds.AI Logo"
              className="w-20 h-20 rounded-full shadow-lg"
            />
          </div>

          {/* Subheading */}
          <p className="text-sm text-white mb-6">
            For gyms, studios, and coaches who want{" "}
            <span className="font-bold text-[#FE0010]">
              more sign-ups without the guesswork.
            </span>
          </p>

          {/* Main Headline */}
          <h1 className="font-extrabold text-white text-3xl md:text-5xl leading-tight mb-6">
            <span>Get More Fitness Clients in </span>
            <span className="inline-block bg-[#FE0010] px-4 py-2 rounded-md">
              90 Seconds
            </span>
            <br />
            <span>— With Ads Built Just for Fitness Businesses.</span>
          </h1>

          {/* Tagline */}
          <p className="text-xl md:text-2xl font-semibold text-white mb-4">
            The world&apos;s first ad engine trained on £100k/month of real
            fitness ad spend.
          </p>

          {/* Secondary tagline */}
          <p className="text-base md:text-lg text-white max-w-2xl mx-auto mb-8">
            No generic AI. No wasted time. Just campaigns that convert.
          </p>

          {/* CTA Button */}
          <button className="px-8 py-4 bg-[#FE0010] text-white text-lg font-bold rounded-md shadow-lg hover:bg-red-700 transition">
            Build My First Campaign
          </button>
        </div>
      </div>
    </section>

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

        {/* Proof Tiles Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {/* Rorie - Online Coach */}
          <div className="p-6 bg-[#1A1A1A] border border-gray-800 rounded-xl hover:border-red-500 transition-colors">
            <div className="text-center">
              <h3 className="text-xl font-bold text-white mb-2">Rorie</h3>
              <p className="text-sm text-gray-400 mb-4">
                Online Coach for Semi Professional Footballers
              </p>
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                <p className="text-2xl font-bold text-red-500 mb-2">£10k</p>
                <p className="text-sm text-white">
                  month online after launching FitnessAds.ai campaigns
                </p>
              </div>
            </div>
          </div>

          {/* Vanda - Studio Owner */}
          <div className="p-6 bg-[#1A1A1A] border border-gray-800 rounded-xl hover:border-red-500 transition-colors">
            <div className="text-center">
              <h3 className="text-xl font-bold text-white mb-2">Vanda</h3>
              <p className="text-sm text-gray-400 mb-4">Studio Owner</p>
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                <p className="text-2xl font-bold text-red-500 mb-2">£34,956</p>
                <p className="text-sm text-white">
                  in sales from one campaign pack
                </p>
              </div>
            </div>
          </div>

          {/* Chris - Group PT Gym */}
          <div className="p-6 bg-[#1A1A1A] border border-gray-800 rounded-xl hover:border-red-500 transition-colors">
            <div className="text-center">
              <h3 className="text-xl font-bold text-white mb-2">Chris</h3>
              <p className="text-sm text-gray-400 mb-4">Group PT Gym</p>
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                <p className="text-2xl font-bold text-red-500 mb-2">133</p>
                <p className="text-sm text-white">
                  SGPT members and expanding to a second site
                </p>
              </div>
            </div>
          </div>
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

     <section className="px-4 py-16 bg-[#1a1820]">
      <div className="max-w-6xl mx-auto">
        <div className="text-left">
          {/* Main Heading */}
          <h2 className="text-3xl md:text-4xl font-black text-white mb-6">
            This isn&apos;t ChatGPT wearing gym leggings that make its glutes look bigger
          </h2>

          {/* Intro Paragraph */}
          <p className="text-lg text-white/90 max-w-3xl leading-relaxed mb-8">
            You don&apos;t need another AI that can write a 5/10 ad for any industry under the sun.
            You need one that knows your buyers inside out. What they think, feel, and fear at the exact moment they see your ad.
          </p>

          {/* Subheading */}
          <h3 className="text-xl md:text-2xl font-bold text-white mb-4">
            FitnessAds.ai was trained on
          </h3>

          {/* Bullet Points */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-[#FE0010] rounded-full"></div>
              <p className="text-lg text-white font-medium">
                1000&apos;s of real gym + online coaching ads
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-[#FE0010] rounded-full"></div>
              <p className="text-lg text-white font-medium">Real lead data</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-[#FE0010] rounded-full"></div>
              <p className="text-lg text-white font-medium">Real buying behaviour</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-[#FE0010] rounded-full"></div>
              <p className="text-lg text-white font-medium">
                And it writes ads in your voice, your tone, your values
              </p>
            </div>
          </div>

          {/* Bottom Highlight Paragraph */}
          <div className="mt-16">
            <p className="text-white max-w-[600px] text-xl md:text-2xl font-bold leading-relaxed">
              It doesn&apos;t write generic garbage. It writes stuff that converts. Fast. 
              We&apos;ve tested them all.
              <br />
              <br />
              But it&apos;s hard to make good ad creative at scale. And the bottleneck is creative — until now…
            </p>
          </div>
        </div>
      </div>
    </section>


    <ResultsShowcase/>
    <ChatGPTDriveSection/>
    <AdCostSection/>
    <ComparisonTable/>
    <WhoItsForSection/>
    <PricingSection/>
    <FAQ/>
    <FinalCTA/>
    <Footer/>
       </div>
  );
}
