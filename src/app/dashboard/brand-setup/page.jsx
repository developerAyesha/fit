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
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="flex justify-between items-start mb-12">
          <div>
            <h1 className="text-4xl font-bold mb-2">Brand Setup</h1>
            <p className="text-lg text-gray-400">
              View and update your brand settings to improve ad personalization
            </p>
          </div>
          <div className="flex gap-3">
            {isEditing ? (
              <>
                <button
                  onClick={handleCancel}
                  disabled={saving}
                  className="flex items-center gap-2 px-6 py-2 border rounded-lg hover:bg-gray-800"
                >
                  <X className="w-5 h-5" /> Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="flex items-center gap-2 px-6 py-2 bg-red-600 rounded-lg hover:bg-red-700"
                >
                  <Save className="w-5 h-5" />
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => alert("Retake Onboarding Quiz")}
                  className="flex items-center gap-2 px-6 py-2 border rounded-lg hover:bg-gray-800"
                >
                  <RefreshCw className="w-5 h-5" />
                  Retake Quiz
                </button>
                <button
                  onClick={handleEdit}
                  className="flex items-center gap-2 px-6 py-2 bg-red-600 rounded-lg hover:bg-red-700"
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
            icon={<Edit className="w-6 h-6 text-red-500" />}
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
            icon={<Zap className="w-6 h-6 text-red-500" />}
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
            icon={<RefreshCw className="w-6 h-6 text-red-500" />}
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
            icon={<Zap className="w-6 h-6 text-red-500" />}
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
    <div className="border border-gray-700 rounded-lg bg-gray-900">
      <div
        className="flex justify-between items-center px-6 py-4 cursor-pointer hover:bg-gray-800"
        onClick={onToggle}
      >
        <div className="flex items-center gap-3">
          {icon}
          <h2 className="text-xl font-bold">{title}</h2>
        </div>
        <span className="text-gray-400">{isOpen ? "−" : "+"}</span>
      </div>
      {isOpen && <div className="px-6 py-4 space-y-4">{children}</div>}
    </div>
  );
}

function Field({ label, value, isEditing, onChange }) {
  return (
    <div>
      <label className="block text-sm text-gray-400 mb-1">{label}</label>
      {isEditing ? (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-3 py-2 bg-gray-800 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500"
        />
      ) : (
        <p className="text-white">{value}</p>
      )}
    </div>
  );
}
