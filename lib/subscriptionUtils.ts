// lib/subscriptionUtils.ts

import { SubscriptionStatus } from '@prisma/client';

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