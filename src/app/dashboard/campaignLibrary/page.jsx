"use client";

import { useState } from "react";
import { Library, Zap, ArrowLeft } from "lucide-react";
import CampaignCard from "@/componenets/Campaign/libraryCard";
// Dummy campaigns
const dummyCampaigns = [
  {
    id: "1",
    name: "6 Week Challenge",
    description:
      "Build compelling ads that position your offer as a 6-week transformation, perfect for driving quick-start commitments. - Generated on 03/09/2025",
    date: "03/09/2025",
    created: "1 day ago",
  },
  {
    id: "2",
    name: "21 Day Challenge",
    description:
      "Write high-intensity challenge ads that promise quick results and keep participants engaged for 3 weeks. - Generated on 03/09/2025",
    date: "03/09/2025",
    created: "1 day ago",
  },
];



export default function CampaignLibrary() {
  const [search, setSearch] = useState("");
  const [selectedCampaign, setSelectedCampaign] = useState(null);

  const filteredCampaigns = dummyCampaigns.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );
  const handleView = (c) => alert("Viewing " + c.name);
  const handleExport = (c) => alert("Exporting " + c.name + " to PDF");
  const handleDelete = (c) => alert("Deleting " + c.name);

  return (
    <div className="min-h-screen text-white">
      <div className="container mx-auto ">
        {/* Heading */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Campaign Library</h1>
          <p className="text-gray-400">
            View and manage all your generated ad campaigns
          </p>
        </div>

        {/* Search */}
        {!selectedCampaign && (
          <div className="mb-6">
            <input
              type="text"
              placeholder="Search campaigns..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={`w-full max-w-md rounded-lg border border-gray-700 px-4 py-2 text-white placeholder-gray-500 focus:border-red-500 
              focus:outline-none ${search.length > 0 ? 'bg-bg-dark text-black' : 'bg-transparent '}`}
            />
          </div>
        )}

       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 py-8">
      {filteredCampaigns.map((campaign) => (
        <CampaignCard
          key={campaign.id}
          campaign={campaign}
          onView={handleView}
          onExport={handleExport}
          onDelete={handleDelete}
        />
      ))}
    </div>
      </div>
    </div>
  );
}
