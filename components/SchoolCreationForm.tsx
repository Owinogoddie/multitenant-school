'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createSchool } from '@/actions/schoolActions';

interface SchoolCreationFormProps {
  userId: string;
}

export default function SchoolCreationForm({ userId }: SchoolCreationFormProps) {
  const [schoolName, setSchoolName] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const result = await createSchool(schoolName, userId);
      if (result.success) {
        router.push(`/customize/${result.school?.id}`);
      } else {
        setError(result.error || 'An error occurred');
      }
    } catch (err) {
      setError('An unexpected error occurred');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
      <div className="mb-4">
        <label htmlFor="schoolName" className="block mb-2 font-semibold">
          School Name
        </label>
        <input
          type="text"
          id="schoolName"
          value={schoolName}
          onChange={(e) => setSchoolName(e.target.value)}
          className="w-full px-3 py-2 border rounded-md"
          required
        />
      </div>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
      >
        Create School
      </button>
    </form>
  );
}