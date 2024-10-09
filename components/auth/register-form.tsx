"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter } from 'next/navigation';
import { registerAction } from '@/actions/auth';

const schema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
  schoolName: z.string().min(2, { message: 'School name must be at least 2 characters' }),
  domain: z.string().min(3, { message: 'Domain must be at least 3 characters' })
    .regex(/^[a-z0-9]+$/, { message: 'Domain can only contain lowercase letters and numbers' }),
});

export default function RegisterForm() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: z.infer<typeof schema>) => {
    setIsLoading(true);
    try {
      const result = await registerAction(data.name, data.email, data.password, data.schoolName, data.domain);
      if (result.success) {
        alert("Your account has been created. You are now logged in.");
        router.push(`/${data.domain}/dashboard`);
      } else {
        throw new Error(result.error || 'Registration failed');
      }
    } catch (error) {
      alert("Failed to register. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <input
          type="text"
          placeholder="Name"
          {...register('name')}
          className={`w-full px-3 py-2 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500`}
        />
        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
      </div>
      <div>
        <input
          type="email"
          placeholder="Email"
          {...register('email')}
          className={`w-full px-3 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500`}
        />
        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
      </div>
      <div>
        <input
          type="password"
          placeholder="Password"
          {...register('password')}
          className={`w-full px-3 py-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500`}
        />
        {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
      </div>
      <div>
        <input
          type="text"
          placeholder="School Name"
          {...register('schoolName')}
          className={`w-full px-3 py-2 border ${errors.schoolName ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500`}
        />
        {errors.schoolName && <p className="text-red-500 text-sm mt-1">{errors.schoolName.message}</p>}
      </div>
      <div>
        <input
          type="text"
          placeholder="Domain (e.g., myschool)"
          {...register('domain')}
          className={`w-full px-3 py-2 border ${errors.domain ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500`}
        />
        {errors.domain && <p className="text-red-500 text-sm mt-1">{errors.domain.message}</p>}
      </div>
      <button
        type="submit"
        className="w-full px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-400"
        disabled={isLoading}
      >
        {isLoading ? 'Registering...' : 'Register'}
      </button>
    </form>
  );
}
