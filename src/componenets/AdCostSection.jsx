"use client";

export default function AdCostSection() {
  return (
    <section className="py-16 px-4 bg-[#0B0B0B]">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Left Content */}
          <div className="lg:w-1/2">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-6 font-klein leading-tight">
              The cost to advertise
              <br />
              on <span style={{ color: "#1478ED" }}>FACEBOOK</span> has
              <br />
              <br />
              <span className="bg-white text-black px-3 py-1 rounded-lg">
                almost doubled!
              </span>
            </h2>
            <p className="text-lg text-white/90 leading-relaxed mb-6">
              The cost of traffic is going to keep going up. The businesses that
              will win are the ones that can get the most leverage from traffic.
            </p>
            <p className="text-sm text-muted-foreground">Source: enhencer.com</p>
          </div>

          {/* Right Side - Chart */}
          <div className="lg:w-1/2 flex justify-center">
            <img
              src="/lovable-uploads/e5c0642e-d7f1-491f-933b-10802e0174d2.png"
              alt="Facebook advertising cost chart showing increase from $7.29 in 2017 to $13.20 in 2024"
              className="max-w-full h-auto rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
}