import React from "react";
import { useFormContext, useWatch } from "react-hook-form";

const StepThree = () => {
  const campaignTypes = [
    "Evergreen Lead Gen",
    "Seasonal Launch",
    "Reactivation",
    "Time-Sensitive Promo",
    "New Offer",
    "Other",
  ];

  const seasonalOptions = [
    "January/New Year",
    "Summer",
    "Back to School",
    "Black Friday",
    "Christmas",
    "Other",
  ];

  const { setValue, control, register, formState: { errors } } = useFormContext();
  const campaign = useWatch({ control, name: "campaign" }) || { campaign_types: [], seasonal_launch_options: [] };

  const handleToggle = (field, value, checked) => {
    const current = Array.isArray(campaign[field]) ? campaign[field] : [];
    const next = checked
      ? [...current, value]
      : current.filter((v) => v !== value);
    setValue(`campaign.${field}`, next, { shouldDirty: true, shouldValidate: true });
  };

  return (
    <div className="space-y-6">
      {/* Campaign Type */}
      <div className="space-y-4">
        <label className="block text-sm font-medium text-gray-200">
          Campaign Type (select all that apply)
        </label>
        <div className="grid grid-cols-1 gap-3">
          {campaignTypes.map((type) => (
            <div key={type} className="flex items-center space-x-2">
              <div className="relative">
                <input
                  type="checkbox"
                  id={type}
                  checked={campaign.campaign_types?.includes(type)}
                  onChange={(e) => handleToggle("campaign_types", type, e.target.checked)}
                  style={{
                    appearance: 'none',
                    WebkitAppearance: 'none',
                    MozAppearance: 'none',
                    width: '16px',
                    height: '16px',
                    border: campaign.campaign_types?.includes(type) ? '2px solid #fa2a00' : '2px solid #6b7280',
                    borderRadius: '4px',
                    backgroundColor: campaign.campaign_types?.includes(type) ? '#fa2a00' : 'transparent',
                    position: 'relative',
                    cursor: 'pointer',
                    outline: 'none'
                  }}
                />
                {campaign.campaign_types?.includes(type) && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      color: 'white',
                      fontSize: '12px',
                      fontWeight: 'bold',
                      transform: 'translate(-50%, -50%)',
                      pointerEvents: 'none'
                    }}
                  >
                    ✓
                  </div>
                )}
              </div>
              <label htmlFor={type} className="text-sm font-normal text-gray-200">
                {type}
              </label>
            </div>
          ))}
        </div>

        {/* Other Campaign Type Input */}
        {campaign.campaign_types?.includes("Other") && (
          <input
            type="text"
            placeholder="Specify other campaign type"
            {...register("campaign.other_campaign_details")}
            className="mt-2 w-full rounded-md border border-gray-600 bg-gray-800 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#fa2a00]"
          />
        )}
      </div>

      {/* Seasonal Launch Options */}
      {campaign.campaign_types?.includes("Seasonal Launch") && (
        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-200">
            Seasonal Launch Options
          </label>
          <div className="grid grid-cols-1 gap-3">
            {seasonalOptions.map((option) => (
              <div key={option} className="flex items-center space-x-2">
                <div className="relative">
                  <input
                    type="checkbox"
                    id={option}
                    checked={campaign.seasonal_launch_options?.includes(option)}
                    onChange={(e) => handleToggle("seasonal_launch_options", option, e.target.checked)}
                    style={{
                      appearance: 'none',
                      WebkitAppearance: 'none',
                      MozAppearance: 'none',
                      width: '16px',
                      height: '16px',
                      border: campaign.seasonal_launch_options?.includes(option) ? '2px solid #fa2a00' : '2px solid #6b7280',
                      borderRadius: '4px',
                      backgroundColor: campaign.seasonal_launch_options?.includes(option) ? '#fa2a00' : 'transparent',
                      position: 'relative',
                      cursor: 'pointer',
                      outline: 'none'
                    }}
                  />
                  {campaign.seasonal_launch_options?.includes(option) && (
                    <div
                      style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        color: 'white',
                        fontSize: '12px',
                        fontWeight: 'bold',
                        transform: 'translate(-50%, -50%)',
                        pointerEvents: 'none'
                      }}
                    >
                      ✓
                    </div>
                  )}
                </div>
                <label
                  htmlFor={option}
                  className="text-sm font-normal text-gray-200"
                >
                  {option}
                </label>
              </div>
            ))}
          </div>

          {/* Other Seasonal Option Input */}
          {campaign.seasonal_launch_options?.includes("Other") && (
            <input
              type="text"
              placeholder="Specify other seasonal option"
              className="mt-2 w-full rounded-md border border-gray-600 bg-gray-800 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#fa2a00]"
            />
          )}
        </div>
      )}
    </div>
  );
};

export default StepThree;
