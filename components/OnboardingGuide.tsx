'use client';

import { useState } from 'react';
import { School } from '@prisma/client';
import { useRouter } from 'next/navigation';

interface OnboardingGuideProps {
  school: School;
}

export default function OnboardingGuide({ school }: OnboardingGuideProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const router = useRouter();

  const steps = [
    {
      title: 'School Created Successfully',
      content: (
        <div>
          <p>Congratulations! Your school "{school.name}" has been created.</p>
          <p>Your unique subdomain is: <strong>{school.subdomain}.edumanage.com</strong></p>
          <button
            onClick={() => navigator.clipboard.writeText(`${school.subdomain}.edumanage.com`)}
            className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
          >
            Copy URL
          </button>
        </div>
      )
    },
    {
      title: 'Customize Your School',
      content: (
        <div>
          <p>Let's personalize your school's appearance:</p>
          <ul className="list-disc list-inside">
            <li>Go to Settings → Appearance</li>
            <li>Set your school colors (primary, secondary, tertiary)</li>
            <li>Upload your school logo</li>
            <li>Add your school's motto, mission, and vision</li>
          </ul>
        </div>
      )
    },
    {
      title: 'Set Up Academic Structure',
      content: (
        <div>
          <p>Organize your school's academic structure:</p>
          <ul className="list-disc list-inside">
            <li>Create academic years</li>
            <li>Set up classes or grades</li>
            <li>Define subjects for each class</li>
          </ul>
        </div>
      )
    },
    {
      title: 'Invite Administrators',
      content: (
        <div>
          <p>Build your administrative team:</p>
          <ul className="list-disc list-inside">
            <li>Go to Users → Administrators</li>
            <li>Click "Invite Administrator"</li>
            <li>Enter their email and assign roles</li>
          </ul>
        </div>
      )
    },
    {
      title: 'Explore Features',
      content: (
        <div>
          <p>Discover EduManage's powerful features:</p>
          <ul className="list-disc list-inside">
            <li>Student Management</li>
            <li>Staff Management</li>
            <li>Attendance Tracking</li>
            <li>Grade Book</li>
            <li>Communication Tools</li>
          </ul>
        </div>
      )
    }
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      router.push(`/dashboard`);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">{steps[currentStep].title}</h2>
        {steps[currentStep].content}
      </div>
      <div className="flex justify-between">
        <button
          onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
          disabled={currentStep === 0}
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <button
          onClick={handleNext}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          {currentStep === steps.length - 1 ? 'Finish' : 'Next'}
        </button>
      </div>
    </div>
  );
}