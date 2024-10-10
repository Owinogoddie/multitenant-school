// actions/subscriptionActions.ts

'use server'

import { PrismaClient, Subscription, Plan } from '@prisma/client';
import { calculateSubscriptionEndDate, getSubscriptionStatus } from '@/lib/subscriptionUtils';
import prisma from '@/lib/prisma';

export type SubscriptionWithPlan=Subscription &{plan:Plan}

export async function getActiveSubscription(schoolId: string): Promise<SubscriptionWithPlan | null> {
    const subscription = await prisma.subscription.findFirst({
      where: {
        schoolId,
        status: 'ACTIVE',
      },
      include: {
        plan: true,  // Fetch the related plan
      },
    });
  
    return subscription;
  }
  
export async function getPlans() {
  return prisma.plan.findMany({
    orderBy: {
      price: 'asc',
    },
  });
}

export async function updateSubscription(subscriptionId: string, data: Partial<Subscription>) {
  return prisma.subscription.update({
    where: { id: subscriptionId },
    data,
  });
}

export async function upgradePlan(schoolId: string, newPlanId: string) {
  const plan = await prisma.plan.findUnique({
    where: { id: newPlanId },
  });

  if (!plan) {
    throw new Error('Invalid plan ID');
  }

  const startDate = new Date();
  const endDate = calculateSubscriptionEndDate(startDate, plan.duration);

  return prisma.subscription.upsert({
    where: { schoolId },
    update: {
      planId: plan.id,
      status: getSubscriptionStatus(endDate),
      startDate,
      endDate,
    },
    create: {
      schoolId,
      planId: plan.id,
      status: getSubscriptionStatus(endDate),
      startDate,
      endDate,
    },
  });
}