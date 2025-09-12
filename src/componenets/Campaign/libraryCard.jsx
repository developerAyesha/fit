"use client";

import { Eye, FileText, Trash2 } from "lucide-react";
import Button from "@/utils/Button";

export default function CampaignCard({ campaign, onView, onExport, onDelete }) {
  return (
    <div className="border border-gray-700 rounded-xl p-6 bg-gray-900 hover:border-red-500 transition">
      {/* Title + Date */}
      <h3 className="text-lg font-bold mb-2">
        {campaign.name} - {campaign.date}
      </h3>

      {/* Description */}
      <p className="text-gray-400 mb-4">{campaign.description}</p>

     <div className="flex justify-between">
      {/* Created Info */}
      <p className="text-sm text-gray-500 mb-4">
        Created {campaign.created}
      </p>

      {/* Actions */}
      <div className="flex gap-3">
        <button
          onClick={() => onView(campaign)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-800 text-white hover:bg-gray-700 transition"
        >
          <Eye className="w-4 h-4" />
          View Details
        </button>

        <Button
          onClick={() => onExport(campaign)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
        >
          <FileText className="w-4 h-4" />
          Export PDF
        </Button>

        <button
          onClick={() => onDelete(campaign)}
          className="flex items-center justify-center px-3 py-2 rounded-lg bg-gray-800 text-red-500 hover:bg-gray-700 transition"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
      </div>
    </div>
  );
}
