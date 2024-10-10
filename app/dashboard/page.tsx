// app/dashboard/page.tsx
import { getUser } from '@/lib/auth';
import { getSchoolByHeadTeacher } from '@/actions/schoolActions';
import { getActiveSubscription } from '@/actions/subscriptionActions';
import SubscriptionInfo from '@/components/SubscriptionInfo';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export default async function DashboardPage() {
  const user = await getUser();
  
  if (!user) {
    redirect('/login');
  }

  const school = await getSchoolByHeadTeacher(user.id);
  if (!school) {
    redirect('/create-school');
  }

  const subscription = await getActiveSubscription(school.id);
  const schoolUrl = `${school.subdomain}.edumanage.com`;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-2xl font-semibold mb-4">School Information</h2>
        <p><strong>School Name:</strong> {school.name}</p>
        <p><strong>School URL:</strong> <a href={`https://${schoolUrl}`} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">{schoolUrl}</a></p>
        <p><strong>Subdomain:</strong> {school.subdomain}</p>
      </div>

      <SubscriptionInfo subscription={subscription} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <Link href="/onboarding" className="bg-blue-500 text-white p-4 rounded-lg text-center hover:bg-blue-600 transition duration-300">
          Complete Onboarding
        </Link>
        <Link href="/settings" className="bg-green-500 text-white p-4 rounded-lg text-center hover:bg-green-600 transition duration-300">
          School Settings
        </Link>
        <Link href="/users" className="bg-purple-500 text-white p-4 rounded-lg text-center hover:bg-purple-600 transition duration-300">
          Manage Users
        </Link>
        <Link href="/classes" className="bg-yellow-500 text-white p-4 rounded-lg text-center hover:bg-yellow-600 transition duration-300">
          Manage Classes
        </Link>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Quick Stats</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white shadow-md rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-2">Total Students</h3>
            <p className="text-3xl font-bold">0</p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-2">Total Teachers</h3>
            <p className="text-3xl font-bold">0</p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-2">Active Classes</h3>
            <p className="text-3xl font-bold">0</p>
          </div>
        </div>
      </div>
    </div>
  );
}