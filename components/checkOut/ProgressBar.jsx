// ProgressBar.js
import React from "react";

const ProgressBar = ({ currentStep, totalSteps, titles }) => {
  const widthPercentage = ((currentStep / totalSteps) * 100).toFixed(0);

  return (
    <div className="flex flex-col items-center space-y-2">
      <div className="w-full bg-gray-300 h-2 rounded-lg overflow-hidden">
        <div
          className="bg-light h-2 rounded-lg transition-width duration-300 ease-in-out"
          style={{ width: `${widthPercentage}%` }}
        ></div>
      </div>
      <div className="flex justify-between w-full">
        {titles.map((title, index) => (
          <div key={index} className="text-center">
            <div
              className={`text-sm font-bold font-oswald  ${
                currentStep === index + 1 ? "text-light " : "text-cream"
              }`}
            >
              {index + 1}
            </div>
            <div
              className={`text-xs font-bold font-oswald  ${
                currentStep === index + 1 ? "text-light" : "text-cream"
              }`}
            >
              {title}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressBar;
