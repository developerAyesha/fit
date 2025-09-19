"use client";

export default function ChatGPTDriveSection() {
  const badgePhrases = [
    "This isn't just another program",
    "We're not like the other guys",
    "Results guaranteed - or your money back",
    "Our proven system has helped thousands",
    "You're just one step away",
    "Ready to take things to the next level?",
    "Sound familiar?",
    "It's time to stop settling",
    "No fluff - just results",
    "Don't wait - act now",
  ];

  const rightBadgePhrases = [
    "Are you tired of feeling stuck?",
    "Unlock your full potential",
    "Step into your power",
    "Game-changing offer",
    "Crush your goals",
    "Discover the secret to success",
    "Live the life you deserve",
    "What if I told you...",
    "It's not your fault",
    "Join a community of like-minded individuals",
    "Click the link below to get started",
  ];

  const floatingEmojis = [
    { src: "/lovable-uploads/0e7dfd69-d2c4-4337-9a53-f7083d24feef.png", top: "20%", left: "-60px" },
    { src: "/lovable-uploads/380a2309-f988-4fc4-94e0-0efd0501082a.png", top: "60%", left: "-50px" },
    { src: "/lovable-uploads/b08c3395-c0c6-48d2-a16d-838dc51a2d36.png", top: "30%", right: "-60px" },
    { src: "/lovable-uploads/156100f0-a562-4072-927d-e95b76e42ab5.png", top: "70%", right: "-70px" },
  ];

  const leftFloatingEmojis = [
    { src: "/lovable-uploads/b4a1dafd-17d8-4e57-be39-7bba36123b1e.png", top: "15%", left: "-60px" },
    { src: "/lovable-uploads/bb03f84d-37a1-4b96-b1f4-573b3c7c8ce6.png", top: "45%", left: "-50px" },
    { src: "/lovable-uploads/8fc795c7-b7fa-477b-940a-aa5a24328099.png", top: "25%", right: "-60px" },
    { src: "/lovable-uploads/3f3b8dbd-5ce2-430a-a79e-f092a8d6e332.png", top: "65%", right: "-70px" },
  ];

  return (
    <section
      className="py-16 px-4 relative overflow-hidden"
      style={{
        backgroundImage: `url('/lovable-uploads/5ab46530-2ea7-444d-b47c-765e37a84154.png')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Top Section */}
        <div className="flex flex-col lg:flex-row gap-8 mb-8 relative">
          {/* Left Content */}
          <div className="lg:w-3/5 relative">
            <h2 className="text-2xl md:text-4xl font-black text-white mb-6 font-klein">
              <span className="block">Recognise Any of This</span>
              <span className="block">ChatGPT Drive?</span>
            </h2>
            <p className="text-lg text-white/90 leading-relaxed mb-8">
              What's the secret sauce? How can I give ChatGPT a wedgie so bad his cousin Claude feels it? PLUS,
              make better ads that beat 99% of copywriters? It's in my proprietary private data set. Lemme explain…
            </p>

            {/* Left Badges */}
            <div className="flex flex-col gap-3 items-start max-w-md relative">
              {badgePhrases.map((phrase, index) => (
                <div
                  key={index}
                  className="bg-gray-700/30 backdrop-blur-sm border border-gray-600/30 rounded-lg px-4 py-2 text-sm hover:bg-gray-600/40 transition-all duration-200 hover:scale-105 text-white"
                >
                  {phrase}
                </div>
              ))}

              {/* Left Floating Emojis */}
              {leftFloatingEmojis.map((emoji, index) => (
                <img
                  key={index}
                  src={emoji.src}
                  alt="emoji"
                  className="absolute w-12 h-12 animate-bounce"
                  style={{
                    top: emoji.top,
                    ...(emoji.left ? { left: emoji.left } : { right: emoji.right }),
                    animationDelay: `${index * 0.5}s`,
                    animationDuration: "2s",
                  }}
                />
              ))}
            </div>
          </div>

          {/* Right Badges */}
          <div className="lg:absolute lg:right-0 lg:top-0 lg:w-80 lg:pt-16 relative">
            <div className="flex flex-col gap-3 items-start">
              {rightBadgePhrases.map((phrase, index) => (
                <div
                  key={index}
                  className="bg-gray-700/30 backdrop-blur-sm border border-gray-600/30 rounded-lg px-4 py-2 text-sm hover:bg-gray-600/40 transition-all duration-200 hover:scale-105 text-white"
                >
                  {phrase}
                </div>
              ))}
            </div>

            {/* Right Floating Emojis */}
            {floatingEmojis.map((emoji, index) => (
              <img
                key={index}
                src={emoji.src}
                alt="emoji"
                className="absolute w-12 h-12 animate-bounce"
                style={{
                  top: emoji.top,
                  ...(emoji.left ? { left: emoji.left } : { right: emoji.right }),
                  animationDelay: `${index * 0.5}s`,
                  animationDuration: "2s",
                }}
              />
            ))}
          </div>
        </div>

        {/* Bottom Paragraph */}
        <div className="flex justify-start pl-[50%] -mt-16">
          <div className="w-full max-w-2xl">
            <p className="font-inter text-left text-lg leading-relaxed text-white">
              AI is only as good as the data sets you give it. And my Daddy (Sabri Suby) runs a digital marketing agency
              that's generated over $7.8 billion (with a B) in ROAS. We've taken that data and fed it into Kong.
              Creating a large language model (LLM) on the best-performing ad copy and creatives from over $200m in ad
              spend.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}