'use client';

import { Subscription, Plan } from '@prisma/client';
import Link from 'next/link';

interface SubscriptionInfoProps {
  subscription: (Subscription & { plan: Plan }) | null;
  schoolId: string;
}

export default function SubscriptionInfo({ subscription, schoolId }: SubscriptionInfoProps) {
  if (!subscription) {
    return (
      <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4">
        <p className="font-bold">No active subscription</p>
        <p>Please upgrade to continue using EduManage.</p>
        {/* Append schoolId as a query parameter */}
        <Link href={`/upgrade?schoolId=${schoolId}`} className="text-blue-500 hover:underline">
          Upgrade Now
        </Link>
      </div>
    );
  }

  const daysLeft = Math.ceil((subscription.endDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24));

  return (
    <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 mb-4">
      <p className="font-bold">{subscription.plan.name}</p>
      <p>Valid until: {subscription.endDate.toLocaleDateString()}</p>
      <p>{daysLeft} days left</p>
      {subscription.plan.name === 'Free Trial' && (
        // Append schoolId as a query parameter
        <Link href={`/upgrade?schoolId=${schoolId}`} className="text-blue-500 hover:underline">
          Upgrade to Full Plan
        </Link>
      )}
    </div>
  );
}
