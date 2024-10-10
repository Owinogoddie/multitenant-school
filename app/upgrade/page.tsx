// pages/upgrade.tsx
'use client';

import { useState } from 'react';
import { PLANS } from '@/lib/subscriptionUtils';
import { upgradePlan } from '@/actions/subscriptionActions';

export default function UpgradePage() {
  const [selectedPlanId, setSelectedPlanId] = useState('');
  const [error, setError] = useState('');

  const handleUpgrade = async () => {
    if (!selectedPlanId) {
      setError('Please select a plan');
      return;
    }

    try {
      // Assume we have the schoolId available, e.g., from context or props
      const schoolId = 'your-school-id';
      await upgradePlan(schoolId, selectedPlanId);
      // Redirect or show success message
    } catch (err) {
      setError('Failed to upgrade plan. Please try again.');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Upgrade Your Plan</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {PLANS.map((plan:any) => (
          <div key={plan.id} className="border p-4 rounded">
            <h2 className="text-xl font-semibold">{plan.name}</h2>
            <p>{plan.description}</p>
            <p className="text-lg font-bold mt-2">${plan.price}/month</p>
            <ul className="mt-4">
              {plan.features.map((feature:any, index:any) => (
                <li key={index} className="list-disc list-inside">{feature}</li>
              ))}
            </ul>
            <button
              onClick={() => setSelectedPlanId(plan.id)}
              className={`mt-4 px-4 py-2 rounded ${
                selectedPlanId === plan.id ? 'bg-blue-500 text-white' : 'bg-gray-200'
              }`}
            >
              Select
            </button>
          </div>
        ))}
      </div>
      {error && <p className="text-red-500 mt-4">{error}</p>}
      <button
        onClick={handleUpgrade}
        className="mt-8 bg-green-500 text-white px-6 py-3 rounded"
      >
        Upgrade Now
      </button>
    </div>
  );
}