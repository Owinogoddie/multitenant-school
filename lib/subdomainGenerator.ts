import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function generateUniqueSubdomain(schoolName: string): Promise<string> {
  let subdomain = schoolName
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '')
    .slice(0, 20);

  let isUnique = false;
  let counter = 1;

  while (!isUnique) {
    const existingSchool = await prisma.school.findUnique({
      where: { subdomain },
    });

    if (!existingSchool) {
      isUnique = true;
    } else {
      subdomain = `${subdomain}${counter}`;
      counter++;
    }
  }

  return subdomain;
}