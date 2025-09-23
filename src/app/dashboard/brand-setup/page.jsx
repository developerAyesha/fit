"use client";

import { useEffect, useState } from "react";
import { Edit, Save, X, RefreshCw, Zap } from "lucide-react";
import Axios from "@/Config/Axios";
import { useOnboarding } from "@/hooks/useOnboarding";

export default function BrandSetup() {
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  const { brandData, loading } = useOnboarding();
  const [data, setData] = useState({
    business_name: "",
    website_url: "",
    target_market: "",
    voice_tone_style: "",
    pain_points: "",
    outcomes: "",
    business_type: "",
    business_city: "",
    brand_colors: "",
    coaching_style: "",
    brand_words: "",
    words_to_avoid: "",
    instagram_reel_url: "",
    meta_account: "",
    competitor_urls: "",
    campaign_types: "",
    seasonal_launch_options: "",
    offer_type: "",
  });

  useEffect(() => {
    if (brandData) {
      setData({
        business_name: brandData.business_name || "",
        website_url: brandData.website_url || "",
        target_market: brandData.target_market || "",
        voice_tone_style: brandData.voice_tone_style || "",
        pain_points: brandData.main_problem || "",
        outcomes: brandData.magic_wand_result || "",
        business_type: brandData.business_type || "",
        business_city: brandData.business_city || "",
        brand_colors: Array.isArray(brandData.brand_colors) ? brandData.brand_colors.join(", ") : (brandData.brand_colors || ""),
        coaching_style: brandData.coaching_style || "",
        brand_words: Array.isArray(brandData.brand_words) ? brandData.brand_words.join(", ") : (brandData.brand_words || ""),
        words_to_avoid: Array.isArray(brandData.words_to_avoid) ? brandData.words_to_avoid.join(", ") : (brandData.words_to_avoid || ""),
        instagram_reel_url: brandData.instagram_reel_url || "",
        meta_account: brandData.meta_account || "",
        competitor_urls: Array.isArray(brandData.competitor_urls) ? brandData.competitor_urls.join(", ") : (brandData.competitor_urls || ""),
        campaign_types: Array.isArray(brandData.campaign_types) ? brandData.campaign_types.join(", ") : (brandData.campaign_types || ""),
        seasonal_launch_options: Array.isArray(brandData.seasonal_launch_options) ? brandData.seasonal_launch_options.join(", ") : (brandData.seasonal_launch_options || ""),
        offer_type: brandData.offer_type || "",
      });
    }
  }, [brandData]);

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

  const handleSave = async () => {
    try {
      setSaving(true);
      const payload = {
        business_name: editedData.business_name,
        website_url: editedData.website_url,
        business_type: editedData.business_type,
        business_city: editedData.business_city,
        brand_colors: editedData.brand_colors,
        target_market: editedData.target_market,
        voice_tone_style: editedData.voice_tone_style,
        coaching_style: editedData.coaching_style,
        brand_words: editedData.brand_words,
        words_to_avoid: editedData.words_to_avoid,
        instagram_reel_url: editedData.instagram_reel_url,
        meta_account: editedData.meta_account,
        competitor_urls: editedData.competitor_urls,
        campaign_types: editedData.campaign_types,
        seasonal_launch_options: editedData.seasonal_launch_options,
        offer_type: editedData.offer_type,
        main_problem: editedData.pain_points,
        magic_wand_result: editedData.outcomes,
      };
      await Axios.put("/onboarding/update-brand", payload);
      setData({ ...editedData });
      setIsEditing(false);
    } catch (e) {
      console.error(e);
    } finally {
      setSaving(false);
    }
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
        {loading && (
          <div className="py-10 text-gray-400">Loading brand setup...</div>
        )}
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
              <button
                onClick={handleEdit}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-brand rounded-lg hover:bg-brand-dark transition-colors"
              >
                <Edit className="w-5 h-5" /> Edit Info
              </button>
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
              value={currentData.website_url}
              isEditing={isEditing}
              onChange={(val) => handleFieldUpdate("website_url", val)}
            />
            {isEditing ? (
              <RadioField
                label="Business Type"
                value={currentData.business_type}
                options={[
                  { value: "online", label: "Online" },
                  { value: "in-person", label: "In person" }
                ]}
                onChange={(val) => handleFieldUpdate("business_type", val)}
              />
            ) : (
              <Field
                label="Business Type"
                value={currentData.business_type}
                isEditing={false}
                onChange={() => {}}
              />
            )}
            {currentData.business_type === 'in-person' && (
              <Field
                label="City"
                value={currentData.business_city}
                isEditing={isEditing}
                onChange={(val) => handleFieldUpdate("business_city", val)}
              />
            )}
            <Field
              label="Brand Colors (comma separated)"
              value={currentData.brand_colors}
              isEditing={isEditing}
              onChange={(val) => handleFieldUpdate("brand_colors", val)}
            />
            {!isEditing && (
              <ColorSwatches csvColors={currentData.brand_colors} />
            )}
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
              label="Offer Type"
              value={currentData.offer_type}
              isEditing={isEditing}
              onChange={(val) => handleFieldUpdate("offer_type", val)}
            />
            <Field
              label="Campaign Types (comma separated)"
              value={currentData.campaign_types}
              isEditing={isEditing}
              onChange={(val) => handleFieldUpdate("campaign_types", val)}
            />
            {!isEditing && (
              <Chips label="Selected Campaign Types" csv={currentData.campaign_types} variant="secondary" />
            )}
            <Field
              label="Seasonal Launch Options (comma separated)"
              value={currentData.seasonal_launch_options}
              isEditing={isEditing}
              onChange={(val) => handleFieldUpdate("seasonal_launch_options", val)}
            />
            {!isEditing && (
              <Chips label="Selected Seasonal Options" csv={currentData.seasonal_launch_options} variant="outline" />
            )}
          </Section>

          {/* Brand Voice */}
          <Section
            title="Brand Voice & Tone"
            icon={<RefreshCw className="w-6 h-6 text-brand" />}
            isOpen={openSections.voice}
            onToggle={() => toggleSection("voice")}
          >
            {isEditing ? (
              <SelectField
                label="Voice Style"
                value={currentData.voice_tone_style}
                options={[
                  { value: "Bold", label: "Bold" },
                  { value: "Playful", label: "Playful" },
                  { value: "Premium", label: "Premium" },
                  { value: "Aggressive", label: "Aggressive" }
                ]}
                onChange={(val) => handleFieldUpdate("voice_tone_style", val)}
              />
            ) : (
              <Field
                label="Voice Style"
                value={currentData.voice_tone_style}
                isEditing={false}
                onChange={() => {}}
              />
            )}
            <Field
              label="Coaching Style"
              value={currentData.coaching_style}
              isEditing={isEditing}
              onChange={(val) => handleFieldUpdate("coaching_style", val)}
            />
            <Field
              label="Brand Words (comma separated)"
              value={currentData.brand_words}
              isEditing={isEditing}
              onChange={(val) => handleFieldUpdate("brand_words", val)}
            />
            {!isEditing && (
              <Chips label="Common Phrases" csv={currentData.brand_words} />
            )}
            <Field
              label="Words To Avoid (comma separated)"
              value={currentData.words_to_avoid}
              isEditing={isEditing}
              onChange={(val) => handleFieldUpdate("words_to_avoid", val)}
            />
            {!isEditing && (
              <Chips label="Avoid" csv={currentData.words_to_avoid} variant="outline" />
            )}
            <Field
              label="Instagram Reel URL"
              value={currentData.instagram_reel_url}
              isEditing={isEditing}
              onChange={(val) => handleFieldUpdate("instagram_reel_url", val)}
            />
            <Field
              label="Instagram/TikTok/Facebook @"
              value={currentData.meta_account}
              isEditing={isEditing}
              onChange={(val) => handleFieldUpdate("meta_account", val)}
            />
            <Field
              label="Competitor URLs (comma separated)"
              value={currentData.competitor_urls}
              isEditing={isEditing}
              onChange={(val) => handleFieldUpdate("competitor_urls", val)}
            />
            {!isEditing && (
              <LinkList csv={currentData.competitor_urls} />
            )}
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
    <div className="border border-background rounded-xl bg-bg-light hover:border-brand/30 transition-all duration-300 overflow-hidden">
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
      <div className={`transition-all duration-500 ease-in-out ${isOpen ? 'max-h-[600px] opacity-100 overflow-y-auto' : 'max-h-0 opacity-0 overflow-hidden'}`}>
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
        <p className="text-white text-lg py-2 px-1">{value?.toString()?.trim() ? value : <span className="text-gray-400">Not provided</span>}</p>
      )}
    </div>
  );
}

function RadioField({ label, value, options, onChange }) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-300">{label}</label>
      <div className="flex gap-6">
        {options.map((option) => (
          <label key={option.value} className="flex items-center space-x-2 cursor-pointer">
            <input
              type="radio"
              value={option.value}
              checked={value === option.value}
              onChange={(e) => onChange(e.target.value)}
              className="w-4 h-4 text-brand bg-gray-800 border-gray-600 focus:ring-brand focus:ring-2"
            />
            <span className="text-white">{option.label}</span>
          </label>
        ))}
      </div>
      {!value && <p className="text-gray-400">Not specified</p>}
    </div>
  );
}

function SelectField({ label, value, options, onChange }) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-300">{label}</label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-4 py-3 bg-gray-800 rounded-lg border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand transition-colors"
        >
          <option value="">Select {label.toLowerCase()}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      {!value && <p className="text-gray-400">Not specified</p>}
    </div>
  );
}

function Chips({ label, csv, variant = "secondary" }) {
  const items = (csv || "")
    .split(',')
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-300">{label}</label>
      {items.length ? (
        <div className="flex flex-wrap gap-2">
          {items.map((it, idx) => (
            <span key={idx} className={`px-2 py-1 rounded-md text-sm ${variant === 'outline' ? 'border border-gray-600 text-gray-200' : 'bg-gray-700 text-white'}`}>{it}</span>
          ))}
        </div>
      ) : (
        <p className="text-gray-400">Not provided</p>
      )}
    </div>
  );
}

function ColorSwatches({ csvColors }) {
  const colors = (csvColors || '')
    .split(',')
    .map((c) => c.trim())
    .filter((c) => c.length > 0);
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-300">Color Preview</label>
      {colors.length ? (
        <div className="flex items-center gap-2 flex-wrap">
          {colors.map((color, index) => (
            <div key={index} className="w-7 h-7 rounded-md border border-gray-700" style={{ backgroundColor: color.startsWith('#') ? color : `#${color}` }} title={color} />
          ))}
        </div>
      ) : (
        <p className="text-gray-400">No colors provided</p>
      )}
    </div>
  );
}

function LinkList({ csv }) {
  const links = (csv || '')
    .split(',')
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-300">Competitors</label>
      {links.length ? (
        <ul className="list-disc pl-6 text-gray-200 space-y-1">
          {links.map((url, idx) => {
            const href = url.startsWith('http') ? url : `https://${url}`;
            return (
              <li key={idx}>
                <a href={href} target="_blank" rel="noreferrer" className="text-brand hover:underline break-all">{url}</a>
              </li>
            );
          })}
        </ul>
      ) : (
        <p className="text-gray-400">No competitors provided</p>
      )}
    </div>
  );
}
