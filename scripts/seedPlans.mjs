// scripts/seedPlans.ts

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const PLANS = [
  {
    name: 'Free Trial',
    description: 'Try EduManage for 30 days',
    price: 0,
    duration: 30,
    features: ['Basic school management', 'Up to 50 students', 'Basic reporting'],
  },
  {
    name: 'Basic Plan',
    description: 'Essential features for small schools',
    price: 29.99,
    duration: 30,
    features: ['Up to 200 students', 'Advanced reporting', 'Email support'],
  },
  {
    name: 'Premium Plan',
    description: 'Comprehensive solution for larger schools',
    price: 99.99,
    duration: 30,
    features: ['Unlimited students', 'Advanced analytics', '24/7 support', 'Custom integrations'],
  },
];

async function seedPlans() {
  for (const plan of PLANS) {
    await prisma.plan.create({
      data: plan,
    });
  }
  console.log('Plans seeded successfully');
}

seedPlans()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });