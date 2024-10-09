import { redirect } from 'next/navigation';
import SchoolCreationForm from '@/components/SchoolCreationForm';
import { getUser } from '@/lib/auth';

export default async function CreateSchoolPage() {
  const user = await getUser();
  
  if (!user) {
    redirect('/login');
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Create Your School</h1>
      <SchoolCreationForm userId={user.id} />
    </div>
  );
}