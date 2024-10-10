'use client';

import { useState, useEffect } from 'react';
import { Plan } from '@prisma/client';
import { getActiveSubscription, upgradePlan, getPlans, SubscriptionWithPlan } from '@/actions/subscriptionActions';
import { FaCheckCircle } from 'react-icons/fa';
import { toast } from 'react-hot-toast';
import { useSearchParams } from 'next/navigation'; // Import useSearchParams

export default function UpgradePage() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [currentSubscription, setCurrentSubscription] = useState<SubscriptionWithPlan | null>(null);
  const [selectedPlanId, setSelectedPlanId] = useState('');
  const [loading, setLoading] = useState(true);

  const searchParams = useSearchParams(); // Get search params
  const schoolId = searchParams.get('schoolId');

  useEffect(() => {
    async function fetchData() {
      if (!schoolId) {
        toast.error('School ID is missing');
        return;
      }

      try {
        const [fetchedPlans, activeSubscription] = await Promise.all([
          getPlans(),
          getActiveSubscription(schoolId) // Use the extracted schoolId
        ]);
        setPlans(fetchedPlans);
        setCurrentSubscription(activeSubscription);
        if (activeSubscription) {
          setSelectedPlanId(activeSubscription.planId);
        }
      } catch (err) {
        console.error('Failed to fetch data:', err);
        toast.error('Failed to load subscription data. Please try again.');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [schoolId]);

  const handleUpgrade = async () => {
    if (!selectedPlanId || !schoolId) {
      toast.error('Please select a plan and ensure the schoolId is valid.');
      return;
    }

    try {
      setLoading(true);
      await upgradePlan(schoolId, selectedPlanId); // Use schoolId when upgrading
      toast.success('Plan upgraded successfully!');
      // Refresh subscription data
      const activeSubscription = await getActiveSubscription(schoolId);
      setCurrentSubscription(activeSubscription);
    } catch (err) {
      console.error('Failed to upgrade plan:', err);
      toast.error('Failed to upgrade plan. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-center">Upgrade Your Plan</h1>

      {currentSubscription && (
        <div className="mb-12 p-6 bg-gray-100 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Current Plan: {currentSubscription.plan.name}</h2>
          <p className="text-gray-600 mb-2">Status: {currentSubscription.status}</p>
          <p className="text-gray-600 mb-2">Start Date: {new Date(currentSubscription.startDate).toLocaleDateString()}</p>
          <p className="text-gray-600">End Date: {new Date(currentSubscription.endDate).toLocaleDateString()}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan) => (
          <div key={plan.id} className={`border rounded-lg overflow-hidden shadow-lg transition-all duration-300 ${selectedPlanId === plan.id ? 'ring-2 ring-blue-500 transform scale-105' : 'hover:shadow-xl'}`}>
            <div className="p-6 bg-white">
              <h2 className="text-2xl font-bold mb-2">{plan.name}</h2>
              <p className="text-gray-600 mb-4">{plan.description}</p>
              <p className="text-3xl font-bold mb-6">${plan.price}<span className="text-lg font-normal">/month</span></p>
              <ul className="space-y-2 mb-6">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <FaCheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => setSelectedPlanId(plan.id)}
                className={`w-full py-2 px-4 rounded-md transition-colors duration-200 ${selectedPlanId === plan.id ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800 hover:bg-blue-500 hover:text-white'}`}
              >
                {selectedPlanId === plan.id ? 'Selected' : 'Select'}
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
      <button
  onClick={handleUpgrade}
  disabled={loading || (currentSubscription && currentSubscription.planId === selectedPlanId) || false}
  className={`py-3 px-8 rounded-md text-lg font-semibold transition-colors duration-200 ${
    loading || (currentSubscription && currentSubscription.planId === selectedPlanId)
      ? 'bg-gray-400 cursor-not-allowed'
      : 'bg-green-500 hover:bg-green-600 text-white'
  }`}
>
  Upgrade
</button>

      </div>
    </div>
  );
}
