"use client";

import { Eye, FileText, Trash2, Calendar, Clock } from "lucide-react";
import Button from "@/utils/Button";

export default function CampaignCard({ campaign, onView, onExport, onDelete }) {
  return (
    <div className="group bg-bg-dark border border-gray-800 rounded-xl p-6 hover:border-[#FE0010] hover:shadow-lg hover:shadow-[#FE0010]/10 transition-all duration-300">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-bold text-white mb-1 truncate">
            {campaign.name}
          </h3>
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <Calendar className="w-4 h-4 flex-shrink-0" />
            <span>{campaign.date}</span>
          </div>
        </div>
        
        {/* Status Badge */}
        <div className="flex-shrink-0">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-brand/10 text-brand border border-brand/20">
            Active
          </span>
        </div>
      </div>

      {/* Description */}
      <p className="text-gray-400 mb-4 line-clamp-2 leading-relaxed">
        {campaign.description}
      </p>

      {/* Footer Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        {/* Created Info */}
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Clock className="w-4 h-4 flex-shrink-0" />
          <span>Created {campaign.created}</span>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-2 sm:gap-3">
          <button
            onClick={() => onView(campaign)}
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-background text-white hover:bg-gray-700 transition-colors text-sm font-medium"
          >
            <Eye className="w-4 h-4" />
            <span className="hidden sm:inline">View</span>
          </button>

          <Button
            onClick={() => onExport(campaign)}
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-brand text-white hover:bg-brand-dark transition-colors text-sm font-medium"
          >
            <FileText className="w-4 h-4" />
            <span className="hidden sm:inline">Export</span>
          </Button>

          <button
            onClick={() => onDelete(campaign)}
            className="flex items-center justify-center px-3 py-2 rounded-lg bg-background text-red-500 hover:bg-red-500/10 hover:text-red-400 transition-colors"
            title="Delete campaign"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
