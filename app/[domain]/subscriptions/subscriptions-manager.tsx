"use client"
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import toast, { Toaster } from 'react-hot-toast'
import { subscribeAction } from './actions'
import { Plan } from '@/lib/types'

interface SubscriptionManagerProps {
  domain: string
  plans: Plan[]
}

export default function SubscriptionManager({ domain, plans }: SubscriptionManagerProps) {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubscribe = async (planId: string) => {
    setIsLoading(true)
    try {
      const result = await subscribeAction(domain, planId)
      if (result.success) {
        toast.success("Subscription updated successfully.")
        router.push(`/${domain}`)
      } else {
        throw new Error(result.error || 'Subscription update failed')
      }
    } catch (error) {
      console.error('Error updating subscription:', error)
      toast.error("Failed to update subscription. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Toaster position="top-right" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <div key={plan.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
              <p className="text-gray-600 mb-4">{plan.description}</p>
              <p className="text-3xl font-bold mb-2">${plan.price.toFixed(2)}</p>
              <p className="text-gray-600 mb-4">Duration: {plan.duration} days</p>
              <ul className="list-disc list-inside mb-6">
                {plan.features.map((feature, index) => (
                  <li key={index} className="text-gray-600">{feature}</li>
                ))}
              </ul>
            </div>
            <div className="px-6 py-4 bg-gray-50">
              <button
                onClick={() => handleSubscribe(plan.id)}
                disabled={isLoading}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              >
                {isLoading ? 'Processing...' : 'Subscribe'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}