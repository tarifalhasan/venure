"use client";

import React from "react";

// Feature item coming from DB with image URL
type FeatureItem = {
  icon: string; // image URL from DB
  label: string;
};

// Component props
interface HotelFeaturesProps {
  title?: string;
  tag?: string;
  features: FeatureItem[];
}

const HotelFeatures: React.FC<HotelFeaturesProps> = ({
  title = "Features",
  tag = "Type A",
  features,
}) => {
  return (
    <div className="p-6 rounded-lg border border-gray-200 bg-white">
      <div className="flex items-center mb-6">
        <h2 className="text-xl font-semibold text-skin-black mr-3">{title}</h2>
        {tag && (
          <div className="px-3 py-1 rounded-full border border-[#959595] text-skin-black text-sm">
            {tag}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
        {features.map((feature, index) => (
          <div key={index} className="flex items-start">
            <div className="w-6 h-6 mr-3">
              <img
                src={feature.icon}
                alt={feature.label}
                className="w-6 h-6 object-contain"
              />
            </div>
            <span className="text-gray-800">{feature.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HotelFeatures;
