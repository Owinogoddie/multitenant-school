import { redirect } from 'next/navigation';
import { getUser } from '@/lib/auth';
import { getSchoolById } from '@/lib/schoolUtils';
import SchoolCustomizationForm from '@/components/SchoolCustomizationForm';

export default async function CustomizeSchoolPage({
  params,
}: {
  params: { schoolId: string };
}) {
  const user = await getUser();
  if (!user) {
    redirect('/login');
  }

  const school = await getSchoolById(params.schoolId);
  if (!school || school.headTeacherUserId !== user.id) {
    redirect('/dashboard');
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Customize Your School</h1>
      <SchoolCustomizationForm school={school} />
    </div>
  );
}