import { Plan, SubscriptionStatus } from '@prisma/client';

export const PLANS: Plan[] = [
  {
    id: 'free-trial',
    name: 'Free Trial',
    description: 'Try EduManage for 30 days',
    price: 0,
    duration: 30,
    features: ['Basic school management', 'Up to 50 students', 'Basic reporting'],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'basic',
    name: 'Basic Plan',
    description: 'Essential features for small schools',
    price: 29.99,
    duration: 30,
    features: ['Up to 200 students', 'Advanced reporting', 'Email support'],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'premium',
    name: 'Premium Plan',
    description: 'Comprehensive solution for larger schools',
    price: 99.99,
    duration: 30,
    features: ['Unlimited students', 'Advanced analytics', '24/7 support', 'Custom integrations'],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export function getFreePlan(): Plan {
  return PLANS.find(plan => plan.id === 'free-trial')!;
}

export function getPlanById(planId: string): Plan | undefined {
  return PLANS.find(plan => plan.id === planId);
}

export function calculateSubscriptionEndDate(startDate: Date, durationInDays: number): Date {
  const endDate = new Date(startDate);
  endDate.setDate(endDate.getDate() + durationInDays);
  return endDate;
}

export function isSubscriptionActive(endDate: Date): boolean {
  return endDate.getTime() > Date.now();
}

export function getSubscriptionStatus(endDate: Date): SubscriptionStatus {
  return isSubscriptionActive(endDate) ? 'ACTIVE' : 'EXPIRED';
}