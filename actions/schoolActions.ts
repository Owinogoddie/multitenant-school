'use server'
import { School, Subscription } from '@prisma/client';
import { generateUniqueSubdomain } from '@/lib/subdomainGenerator';
import {  calculateSubscriptionEndDate, getSubscriptionStatus } from '@/lib/subscriptionUtils';
import prisma from '@/lib/prisma';

type CreateSchoolResult = 
  | { success: true; school: School; subscription: Subscription }
  | { success: false; error: string };

  export async function createSchool(schoolName: string, headTeacherUserId: string): Promise<CreateSchoolResult> {
    try {
      const subdomain = await generateUniqueSubdomain(schoolName);
      const freePlan = await prisma.plan.findFirst({ where: { name: 'Free Trial' } });
  
      if (!freePlan) {
        throw new Error('Free trial plan not found');
      }
  
      const result = await prisma.$transaction(async (tx) => {
        const school = await tx.school.create({
          data: {
            name: schoolName,
            subdomain,
            headTeacherUserId,
            users: {
              connect: { id: headTeacherUserId }
            }
          },
        });
  
        await tx.user.update({
          where: { id: headTeacherUserId },
          data: { role: 'ADMIN' }
        });
  
        const startDate = new Date();
        const endDate = calculateSubscriptionEndDate(startDate, freePlan.duration);
  
        const subscription = await tx.subscription.create({
          data: {
            schoolId: school.id,
            planId: freePlan.id,
            status: getSubscriptionStatus(endDate),
            startDate,
            endDate,
          }
        });
  
        return { school, subscription };
      });
  
      return { success: true, ...result };
    } catch (error) {
      console.error('Error creating school:', error);
      return { success: false, error: 'Failed to create school' };
    }
  }

export async function getSchoolById(schoolId: string) {
  return prisma.school.findUnique({
    where: { id: schoolId },
    include: { subscription: true }
  });
}

export async function getSchoolByHeadTeacher(headTeacherUserId: string) {
  return prisma.school.findUnique({
    where: { headTeacherUserId },
    include: { subscription: true }
  });
}

export async function updateSchool(schoolId: string, data: Partial<School>) {
  try {
    const updatedSchool = await prisma.school.update({
      where: { id: schoolId },
      data,
    });

    return { success: true, school: updatedSchool };
  } catch (error) {
    console.error('Error updating school:', error);
    return { success: false, error: 'Failed to update school' };
  }
}