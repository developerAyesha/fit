"use client";

import { useState } from "react";
import { Edit, Save, X, RefreshCw, Zap } from "lucide-react";

export default function BrandSetup() {
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  // Dummy brand data
  const [data, setData] = useState({
    business_name: "Fitness Pro Gym",
    website: "https://fitnesspro.com",
    target_market: "Busy professionals",
    offer: "6 Week Challenge",
    voice_tone_style: "Motivational & energetic",
    pain_points: "Lack of time, no consistency",
    outcomes: "Lose weight, gain strength, feel confident",
  });

  const [openSections, setOpenSections] = useState({
    general: true,
    audience: true,
    voice: true,
    psychology: true,
  });

  const [editedData, setEditedData] = useState({ ...data });

  const handleEdit = () => {
    setIsEditing(true);
    setEditedData({ ...data });
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedData({ ...data });
  };

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setData({ ...editedData });
      setIsEditing(false);
      setSaving(false);
    }, 1000);
  };

  const handleFieldUpdate = (field, value) => {
    setEditedData({ ...editedData, [field]: value });
  };

  const toggleSection = (section) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const currentData = isEditing ? editedData : data;

  return (
    <div className="min-h-screen text-white">
      <div className="container mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-6 mb-12">
          <div>
            <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Brand Setup
            </h1>
            <p className="text-lg text-gray-400">
              View and update your brand settings to improve ad personalization
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            {isEditing ? (
              <>
                <button
                  onClick={handleCancel}
                  disabled={saving}
                  className="flex items-center justify-center gap-2 px-6 py-3 border border-gray-600 rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50"
                >
                  <X className="w-5 h-5" /> Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-brand rounded-lg hover:bg-brand/90 transition-colors disabled:opacity-50"
                >
                  <Save className="w-5 h-5" />
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => alert("Retake Onboarding Quiz")}
                  className="flex items-center justify-center gap-2 px-6 py-3 border border-gray-600 rounded-lg hover:bg-gray-800 transition-colors"
                >
                  <RefreshCw className="w-5 h-5" />
                  Retake Quiz
                </button>
                <button
                  onClick={handleEdit}
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-brand rounded-lg hover:bg-brand-dark transition-colors"
                >
                  <Edit className="w-5 h-5" /> Edit Info
                </button>
              </>
            )}
          </div>
        </div>

        {/* Sections */}
        <div className="space-y-6 max-w-4xl">
          {/* General Info */}
          <Section
            title="General Information"
            icon={<Edit className="w-6 h-6 text-brand" />}
            isOpen={openSections.general}
            onToggle={() => toggleSection("general")}
          >
            <Field
              label="Business Name"
              value={currentData.business_name}
              isEditing={isEditing}
              onChange={(val) => handleFieldUpdate("business_name", val)}
            />
            <Field
              label="Website"
              value={currentData.website}
              isEditing={isEditing}
              onChange={(val) => handleFieldUpdate("website", val)}
            />
          </Section>

          {/* Audience & Offer */}
          <Section
            title="Audience & Offer"
            icon={<Zap className="w-6 h-6 text-brand" />}
            isOpen={openSections.audience}
            onToggle={() => toggleSection("audience")}
          >
            <Field
              label="Target Market"
              value={currentData.target_market}
              isEditing={isEditing}
              onChange={(val) => handleFieldUpdate("target_market", val)}
            />
            <Field
              label="Offer"
              value={currentData.offer}
              isEditing={isEditing}
              onChange={(val) => handleFieldUpdate("offer", val)}
            />
          </Section>

          {/* Brand Voice */}
          <Section
            title="Brand Voice & Tone"
            icon={<RefreshCw className="w-6 h-6 text-brand" />}
            isOpen={openSections.voice}
            onToggle={() => toggleSection("voice")}
          >
            <Field
              label="Voice Style"
              value={currentData.voice_tone_style}
              isEditing={isEditing}
              onChange={(val) => handleFieldUpdate("voice_tone_style", val)}
            />
          </Section>

          {/* Psychology */}
          <Section
            title="Disruptive Ad Psychology"
            icon={<Zap className="w-6 h-6 text-brand" />}
            isOpen={openSections.psychology}
            onToggle={() => toggleSection("psychology")}
          >
            <Field
              label="Pain Points"
              value={currentData.pain_points}
              isEditing={isEditing}
              onChange={(val) => handleFieldUpdate("pain_points", val)}
            />
            <Field
              label="Desired Outcomes"
              value={currentData.outcomes}
              isEditing={isEditing}
              onChange={(val) => handleFieldUpdate("outcomes", val)}
            />
          </Section>
        </div>
      </div>
    </div>
  );
}

/* --- Components --- */

function Section({ title, icon, children, isOpen, onToggle }) {
  return (
    <div className="border border-background rounded-xl bg-bg-dark hover:border-brand/30 transition-all duration-300 overflow-hidden">
      <div
        className="flex justify-between items-center px-6 py-5 cursor-pointer hover:bg-background/50 transition-colors"
        onClick={onToggle}
      >
        <div className="flex items-center gap-3">
          {icon}
          <h2 className="text-xl font-bold text-white">{title}</h2>
        </div>
        <span className={`text-gray-400 text-2xl font-light transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}>
          +
        </span>
      </div>
      <div className={`transition-all duration-500 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="px-6 pb-5 space-y-4 border-t border-bg-dark">
          {children}
        </div>
      </div>
    </div>
  );
}

function Field({ label, value, isEditing, onChange }) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-300">{label}</label>
      {isEditing ? (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-4 py-3 bg-gray-800 rounded-lg border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand transition-colors"
        />
      ) : (
        <p className="text-white text-lg py-2 px-1">{value}</p>
      )}
    </div>
  );
}
