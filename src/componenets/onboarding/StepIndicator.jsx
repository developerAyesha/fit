import React from "react";

const StepIndicator = ({ currentStep, totalSteps, stepTitles, completedSteps = [] }) => {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Bar */}
      <div className="relative mb-8">
        <div className="h-2 bg-white/20 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#fa2a00] to-[#fa2a00e6] rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Step Indicators */}
        <div className="flex justify-between mt-4">
          {Array.from({ length: totalSteps }, (_, i) => {
            const stepNumber = i + 1;
            const isActive = stepNumber === currentStep;
            const isCompleted = completedSteps.includes(stepNumber) || stepNumber < currentStep;

            return (
              <div key={stepNumber} className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                    isActive
                      ? "bg-[#fa2a00] text-white scale-110 shadow-lg shadow-[#fa2a00]/50"
                      : isCompleted
                      ? "bg-green-500 text-white"
                      : "bg-white/20 text-white/60"
                  }`}
                >
                  {isCompleted ? "✓" : stepNumber}
                </div>
                <span
                  className={`text-xs mt-2 text-center max-w-20 ${
                    isActive ? "text-white font-semibold" : "text-white/60"
                  }`}
                >
                  {stepTitles[i].split(" ")[0]}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Current Step Info */}
      <div className="text-center">
        <span className="text-sm text-[#fa2a00] font-semibold">
          Step {currentStep} of {totalSteps}
        </span>
      </div>
    </div>
  );
};

export default StepIndicator;
