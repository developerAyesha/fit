import React from "react";

const StepThree = ({ data, updateData }) => {
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

  const handleCampaignTypeChange = (type, checked) => {
    if (checked) {
      updateData("campaign", {
        campaign_types: [...data.campaign.campaign_types, type],
      });
    } else {
      updateData("campaign", {
        campaign_types: data.campaign.campaign_types.filter((t) => t !== type),
      });
    }
  };

  const handleSeasonalOptionChange = (option, checked) => {
    if (checked) {
      updateData("campaign", {
        seasonal_launch_options: [...data.campaign.seasonal_launch_options, option],
      });
    } else {
      updateData("campaign", {
        seasonal_launch_options: data.campaign.seasonal_launch_options.filter(
          (o) => o !== option
        ),
      });
    }
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
                  checked={data.campaign.campaign_types.includes(type)}
                  onChange={(e) => handleCampaignTypeChange(type, e.target.checked)}
                  style={{
                    appearance: 'none',
                    WebkitAppearance: 'none',
                    MozAppearance: 'none',
                    width: '16px',
                    height: '16px',
                    border: data.campaign.campaign_types.includes(type) ? '2px solid #fa2a00' : '2px solid #6b7280',
                    borderRadius: '4px',
                    backgroundColor: data.campaign.campaign_types.includes(type) ? '#fa2a00' : 'transparent',
                    position: 'relative',
                    cursor: 'pointer',
                    outline: 'none'
                  }}
                />
                {data.campaign.campaign_types.includes(type) && (
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
        {data.campaign.campaign_types.includes("Other") && (
          <input
            type="text"
            placeholder="Specify other campaign type"
            value={data.campaign.other_campaign_details || ""}
            onChange={(e) =>
              updateData("campaign", { other_campaign_details: e.target.value })
            }
            className="mt-2 w-full rounded-md border border-gray-600 bg-gray-800 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#fa2a00]"
          />
        )}
      </div>

      {/* Seasonal Launch Options */}
      {data.campaign.campaign_types.includes("Seasonal Launch") && (
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
                    checked={data.campaign.seasonal_launch_options.includes(option)}
                    onChange={(e) =>
                      handleSeasonalOptionChange(option, e.target.checked)
                    }
                    style={{
                      appearance: 'none',
                      WebkitAppearance: 'none',
                      MozAppearance: 'none',
                      width: '16px',
                      height: '16px',
                      border: data.campaign.seasonal_launch_options.includes(option) ? '2px solid #fa2a00' : '2px solid #6b7280',
                      borderRadius: '4px',
                      backgroundColor: data.campaign.seasonal_launch_options.includes(option) ? '#fa2a00' : 'transparent',
                      position: 'relative',
                      cursor: 'pointer',
                      outline: 'none'
                    }}
                  />
                  {data.campaign.seasonal_launch_options.includes(option) && (
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
          {data.campaign.seasonal_launch_options.includes("Other") && (
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
