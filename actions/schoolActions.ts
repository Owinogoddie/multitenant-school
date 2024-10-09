'use server';

import { PrismaClient, School } from '@prisma/client';
import { generateUniqueSubdomain } from '@/lib/subdomainGenerator';

const prisma = new PrismaClient();

export async function createSchool(schoolName: string, headTeacherUserId: string) {
  try {
    const subdomain = await generateUniqueSubdomain(schoolName);
    
    const school = await prisma.school.create({
      data: {
        name: schoolName,
        subdomain,
        headTeacherUserId,
        users: {
          connect: { id: headTeacherUserId }
        }
      },
    });

    // Update the user's role to ADMIN
    await prisma.user.update({
      where: { id: headTeacherUserId },
      data: { role: 'ADMIN' }
    });

    return { success: true, school };
  } catch (error) {
    console.error('Error creating school:', error);
    return { success: false, error: 'Failed to create school' };
  }
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