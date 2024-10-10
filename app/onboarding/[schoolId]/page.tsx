import { redirect } from 'next/navigation';
import { getUser } from '@/lib/auth';
import { getSchoolById } from '@/actions/schoolActions';
import OnboardingGuide from '@/components/OnboardingGuide';

export default async function OnboardingPage({ params }: { params: { schoolId: string } }) {
  const user = await getUser();
  
  if (!user) {
    redirect('/login');
  }

  const school = await getSchoolById(params.schoolId);

  if (!school) {
    redirect('/dashboard');
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Welcome to EduManage!</h1>
      <OnboardingGuide school={school} />
    </div>
  );
}