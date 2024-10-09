// File: lib/schoolUtils.ts

import { PrismaClient, School } from '@prisma/client';

const prisma = new PrismaClient();

export async function getSchoolById(id: string): Promise<School | null> {
  try {
    const school = await prisma.school.findUnique({
      where: { id },
      include: {
        headTeacher: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        users: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
          },
        },
        subscription: {
          include: {
            plan: true,
          },
        },
      },
    });

    return school;
  } catch (error) {
    console.error('Error fetching school by ID:', error);
    return null;
  }
}