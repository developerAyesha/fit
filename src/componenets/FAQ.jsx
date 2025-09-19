"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";

export default function FAQ() {
  const [openItems, setOpenItems] = useState([]);

  const toggleItem = (index) => {
    setOpenItems((prev) =>
      prev.includes(index)
        ? prev.filter((i) => i !== index)
        : [...prev, index]
    );
  };

  const faqs = [
    {
      question: "What exactly is FitnessAds.ai?",
      answer:
        "FitnessAds.ai is your AI-powered ad campaign engine built specifically for fitness businesses. It creates proven, psychology-backed ad campaigns in 90 seconds, tailored to your offer, location, tone, and audience. No guesswork. No generic GPT fluff. Just unicorn-level ads that convert.",
    },
    {
      question: "Who is it for?",
      answer:
        "If you're an online coach, gym owner, personal trainer, or niche fitness expert (think: menopause, pre/postnatal, rehab, etc.) making £2k/month+ and ready to grow — this is for you. It's not for hobbyists, side hustlers, or anyone who wants to 'see if it works.'",
    },
    {
      question: "What kind of ads can it generate?",
      answer:
        "FitnessAds.ai generates campaign-ready ad packs based on your business type, offer, and campaign goal. These include: Lead gen campaigns, Book-a-call flows, Local domination campaigns, Reactivation & win-back strategies, Seasonal launch campaigns, and Brand-building ads.",
    },
    {
      question: "How is this different from ChatGPT or Meta's AI tools?",
      answer:
        "They give you a horse with a cone on its head. We built the unicorn. FitnessAds.ai is trained on £100k/month of real ad spend, not scraped data. It's built with fitness-specific campaign logic, seasonal intelligence, and deep buyer psychology. Every output is brand-personalised, not cookie-cutter crap.",
    },
    {
      question: "Do I need to be tech-savvy to use it?",
      answer:
        "Not at all. It's designed for fitness business owners, not tech bros. The onboarding flow is simple, the UI is clean, and every campaign is delivered ready to copy, tweak, or deploy.",
    },
    {
      question: "Can I use this with my current ads team or VA?",
      answer:
        "100%. Use FitnessAds.ai to brief your team, speed up creative, and eliminate the 'blank page' problem. Agencies love it. VAs look like pros. You stay in control without being in the weeds.",
    },
    {
      question: "Does this replace my ad agency?",
      answer:
        "That depends. If your agency's smashing it — this will make them faster. If they're winging it or using templates... FitnessAds.ai is the replacement. Need full service? Tap the Done-For-You Ad Management option inside.",
    },
    {
      question: "What if I'm not running ads yet?",
      answer:
        "Perfect. Start right. No wasting budget on bad creative. We'll give you plug-and-play campaigns to launch strong and learn fast. Think of it as your secret weapon from day one.",
    },
    {
      question: "How do I know it'll work for my business?",
      answer:
        "Because it's not one-size-fits-all. Your input powers the output: business type, offer, niche, tone, goals, and location. You'll get campaigns that speak directly to your market. And if you're unsure, try it once. It'll earn its place.",
    },
    {
      question: "Is there a free trial or refund policy?",
      answer:
        "We offer a low-cost entry campaign pack so you can try it with zero risk. No commitment, just ROI. If you want to scale, you'll know in 90 seconds.",
    },
  ];

  return (
    <section className="py-20 px-6 bg-gradient-to-b from-[#0F0F12] to-[#1a1a20]">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-2xl md:text-3xl font-black mb-4 text-white">
            Frequently Asked{" "}
            <span className="bg-red-600 text-white px-3 py-1 rounded-lg transform -rotate-2 inline-block">
              Questions
            </span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Everything you need to know about FitnessAds.AI
          </p>
        </div>

        {/* FAQ List */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openItems.includes(index);
            return (
              <div
                key={index}
                className="bg-[#1c1c24]/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                <button
                  onClick={() => toggleItem(index)}
                  className="w-full flex justify-between items-center px-8 py-6 text-left group"
                >
                  <span className="text-lg font-bold text-white pr-6 group-hover:text-red-500 transition-colors duration-200">
                    {faq.question}
                  </span>
                  {isOpen ? (
                    <Minus className="h-6 w-6 text-red-500 transition-transform duration-200" />
                  ) : (
                    <Plus className="h-6 w-6 text-gray-400 group-hover:text-red-500 transition-colors duration-200" />
                  )}
                </button>

                {isOpen && (
                  <div className="px-8 pb-8 pt-2">
                    <div className="bg-[#2a2a35]/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/20">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-1 h-full bg-gradient-to-b from-red-600 to-red-400 rounded-full"></div>
                        <div className="flex-1">
                          <p className="text-gray-300 leading-relaxed text-base font-medium">
                            {faq.answer}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}