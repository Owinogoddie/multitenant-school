'use client';

import { useRouter } from 'next/navigation';

export default function SignOutButton() {
  const router = useRouter();

  const handleSignOut = async () => {
    const response = await fetch('/api/signout', {
      method: 'POST',
    });
    if (response.ok) {
      router.push('/signin');
    } else {
      alert('Failed to sign out');
    }
  };

  return (
    <button onClick={handleSignOut} className="p-2 bg-red-500 text-white rounded">
      Sign Out
    </button>
  );
}