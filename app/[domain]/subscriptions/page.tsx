import { Suspense } from 'react'
import SubscriptionManager from './subscriptions-manager'
import { fetchPlans } from '@/lib/subscriptions'

export default async function SubscriptionPage({ params }: { params: { domain: string } }) {
  const plans = await fetchPlans()

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Subscription Management</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <SubscriptionManager domain={params.domain} plans={plans} />
      </Suspense>
    </div>
  )
}