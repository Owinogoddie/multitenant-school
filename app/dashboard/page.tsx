import { getUser } from '@/lib/auth';
import { getSchoolByHeadTeacher } from '@/actions/schoolActions';
import { getActiveSubscription } from '@/actions/subscriptionActions';
import SubscriptionInfo from '@/components/SubscriptionInfo';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { FaUserCog, FaSchool, FaUsers, FaChalkboardTeacher } from 'react-icons/fa';
import { getSchoolUrl } from '@/lib/urlUtils';

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
  
  const schoolUrl = getSchoolUrl(school.subdomain);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">Welcome to Your Dashboard</h1>
      
      <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
        <h2 className="text-3xl font-semibold text-gray-700 mb-4">School Information</h2>
        <p><strong>School Name:</strong> {school.name}</p>
        <p>
          <strong>School URL:</strong> 
          <a 
            href={schoolUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-blue-500 hover:underline"
          >
            {schoolUrl}
          </a>
        </p>
        <p><strong>Subdomain:</strong> {school.subdomain}</p>
      </div>

      <SubscriptionInfo subscription={subscription} schoolId={school.id} />


      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <Link href="/onboarding" className="bg-blue-500 text-white p-4 rounded-lg text-center flex items-center justify-center hover:bg-blue-600 transition duration-300">
          <FaSchool className="mr-2" /> Complete Onboarding
        </Link>
        <Link href="/settings" className="bg-green-500 text-white p-4 rounded-lg text-center flex items-center justify-center hover:bg-green-600 transition duration-300">
          <FaUserCog className="mr-2" /> School Settings
        </Link>
        <Link href="/users" className="bg-purple-500 text-white p-4 rounded-lg text-center flex items-center justify-center hover:bg-purple-600 transition duration-300">
          <FaUsers className="mr-2" /> Manage Users
        </Link>
        <Link href="/classes" className="bg-yellow-500 text-white p-4 rounded-lg text-center flex items-center justify-center hover:bg-yellow-600 transition duration-300">
          <FaChalkboardTeacher className="mr-2" /> Manage Classes
        </Link>
      </div>

      <div className="mt-8">
        <h2 className="text-3xl font-semibold text-gray-700 mb-6">Quick Stats</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white shadow-lg rounded-lg p-6 text-center">
            <h3 className="text-lg font-semibold mb-2">Total Students</h3>
            <p className="text-4xl font-bold text-blue-500">0</p>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-6 text-center">
            <h3 className="text-lg font-semibold mb-2">Total Teachers</h3>
            <p className="text-4xl font-bold text-green-500">0</p>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-6 text-center">
            <h3 className="text-lg font-semibold mb-2">Active Classes</h3>
            <p className="text-4xl font-bold text-purple-500">0</p>
          </div>
        </div>
      </div>
    </div>
  );
}
