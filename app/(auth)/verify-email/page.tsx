'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import toast from 'react-hot-toast'
import { verifyEmailAction } from '@/actions/auth'

export default function VerifyEmail() {
  const [verificationStatus, setVerificationStatus] = useState<'verifying' | 'success' | 'error'>('verifying')
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const verifyEmail = async () => {
      const token = searchParams.get('token')
      if (!token) {
        setVerificationStatus('error')
        toast.error('Invalid verification link')
        return
      }

      try {
        const result = await verifyEmailAction(token, token) // Using token as both email and code for this example
        if (result.success) {
          setVerificationStatus('success')
          toast.success(result.message)
          setTimeout(() => router.push('/signin'), 3000)
        } else {
          setVerificationStatus('error')
          toast.error(result.message)
        }
      } catch (error) {
        setVerificationStatus('error')
        toast.error('An error occurred during verification')
      }
    }

    verifyEmail()
  }, [router, searchParams])

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Email Verification</h2>
        <div className="mt-8 bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {verificationStatus === 'verifying' && <p className="text-center">Verifying your email...</p>}
          {verificationStatus === 'success' && (
            <p className="text-center text-green-600">Your email has been verified successfully. Redirecting to login...</p>
          )}
          {verificationStatus === 'error' && (
            <p className="text-center text-red-600">There was an error verifying your email. Please try again or contact support.</p>
          )}
        </div>
      </div>
    </div>
  )
}