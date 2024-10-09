import React from 'react';

interface StepProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

export const StepProgressBar: React.FC<StepProgressBarProps> = ({ currentStep, totalSteps }) => {
  return (
    <div className="w-full mb-8">
      <div className="flex justify-between mb-2">
        {Array.from({ length: totalSteps }, (_, i) => (
          <div
            key={i}
            className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
              i < currentStep ? 'bg-blue-500 text-white' : 'bg-white text-gray-400 border-2 border-gray-200'
            }`}
          >
            {i + 1}
          </div>
        ))}
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-blue-500 h-2 rounded-full transition-all duration-300"
          style={{ width: `${(currentStep / totalSteps) * 100}%` }}
        ></div>
      </div>
    </div>
  );
};