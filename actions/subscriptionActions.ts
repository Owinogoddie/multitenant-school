import { PrismaClient, Subscription } from '@prisma/client';
import { getPlanById, calculateSubscriptionEndDate, getSubscriptionStatus } from '@/lib/subscriptionUtils';
import prisma from '@/lib/prisma';


export async function getActiveSubscription(schoolId: string) {
  const subscription = await prisma.subscription.findFirst({
    where: {
      schoolId,
      status: 'ACTIVE',
    },
  });

  if (subscription) {
    const plan = getPlanById(subscription.planId);
    if (plan) {
      return { ...subscription, plan };
    }
  }

  return null;
}

export async function updateSubscription(subscriptionId: string, data: Partial<Subscription>) {
  return prisma.subscription.update({
    where: { id: subscriptionId },
    data,
  });
}

export async function upgradePlan(schoolId: string, newPlanId: string) {
  const plan = getPlanById(newPlanId);
  
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