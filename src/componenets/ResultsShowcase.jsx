"use client";

const StatCard = ({ label, value, dateRange }) => {
  return (
    <div className="bg-[#FE0010] p-4 rounded-lg ">
      <p className="text-sm text-gray-400">{label}</p>
      <p className="text-xl font-bold text-white">{value}</p>
      <p className="text-xs text-gray-500">{dateRange}</p>
    </div>
  );
};

const PerformanceBlock = ({ title, stats, fbMetrics }) => {
  return (
    <div className="bg-gray-900 p-6 rounded-xl border border-gray-800 hover:border-[#FE0010] transition-colors">
      <h3 className="text-white font-bold text-lg mb-4">{title}</h3>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        {stats.map((stat, index) => (
          <StatCard
            key={index}
            label={stat.label}
            value={stat.value}
            dateRange={stat.dateRange}
          />
        ))}
      </div>

      {/* Facebook Metrics */}
      <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
        <div className="text-gray-300 text-sm space-y-2">
          <div className="flex justify-between">
            <span>Cost per lead:</span>
            <span className="text-white font-medium">{fbMetrics.costPerLead}</span>
          </div>
          <div className="flex justify-between">
            <span>Amount spent:</span>
            <span className="text-white font-medium">{fbMetrics.amountSpent}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function ResultsShowcase() {
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
    <section className="py-12 px-4 bg-gray-950">
      <div className="max-w-6xl mx-auto">
        {/* Section Heading */}
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
            The Ads That Print Money Every Season.
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto mb-6">
            From Black Friday to the New Year Waitlist – the exact campaigns that built fitness empires are now built into FitnessAds.ai.
          </p>
          <h3 className="text-xl font-bold text-white mb-6">Results Like This:</h3>
        </div>

        {/* Grid of Performance Blocks */}
        <div className="grid md:grid-cols-2 gap-6">
          {performanceData.map((block, index) => (
            <PerformanceBlock
              key={index}
              title={block.title}
              stats={block.stats}
              fbMetrics={block.fbMetrics}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
