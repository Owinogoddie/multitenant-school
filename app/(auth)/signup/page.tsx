'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FaGoogle, FaGithub, FaEye, FaEyeSlash } from 'react-icons/fa';
import { StepProgressBar } from '@/components/auth/step-progress';
import toast from 'react-hot-toast';
import { registerAction, verifyEmailAction } from '@/actions/auth';

export default function SignUpPage() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    const result = await registerAction(email, password);
    if (result.success) {
      toast.success(result.message);
      setStep(2);
    } else {
      toast.error(result.message || 'An error occurred');
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await verifyEmailAction(email, verificationCode);
    if (result.success) {
      toast.success(result.message);
      setStep(3);
      setTimeout(() => router.push('/signin'), 3000);
    } else {
      toast.error(result.message || 'Verification failed');
      if (result.message === 'Verification code has expired') {
        setStep(1);
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setVerificationCode('');
      }
    }
  };

  const handleGoogleSignUp = () => {
    // Implement Google Sign Up logic
    console.log('Google Sign Up');
  };

  const handleGithubSignUp = () => {
    // Implement GitHub Sign Up logic
    console.log('GitHub Sign Up');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 to-purple-500">
      <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-lg p-8 shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center text-white">Sign Up</h1>
        <StepProgressBar currentStep={step} totalSteps={3} />
        {step === 1 && (
          <>
            <form onSubmit={handleSignup} className="space-y-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="w-full p-3 bg-white bg-opacity-20 border border-white border-opacity-30 rounded-lg text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 transition duration-300"
                required
              />
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="w-full p-3 bg-white bg-opacity-20 border border-white border-opacity-30 rounded-lg text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 transition duration-300"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm Password"
                  className="w-full p-3 bg-white bg-opacity-20 border border-white border-opacity-30 rounded-lg text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 transition duration-300"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white"
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              <button type="submit" className="w-full p-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition duration-300">
                Sign Up
              </button>
            </form>
            <div className="mt-4 flex items-center justify-between">
              <span className="border-b w-1/5 md:w-1/4"></span>
              <span className="text-xs text-white uppercase">or sign up with</span>
              <span className="border-b w-1/5 md:w-1/4"></span>
            </div>
            <div className="flex justify-center space-x-4 mt-4">
              <button
                onClick={handleGoogleSignUp}
                className="flex items-center justify-center p-2 bg-white rounded-full hover:bg-gray-200 transition duration-300"
              >
                <FaGoogle className="text-red-500" />
              </button>
              <button
                onClick={handleGithubSignUp}
                className="flex items-center justify-center p-2 bg-white rounded-full hover:bg-gray-200 transition duration-300"
              >
                <FaGithub className="text-gray-800" />
              </button>
            </div>
            <p className="mt-6 text-center text-white">
              Already have an account?{" "}
              <Link href="/signin" className="text-blue-300 hover:underline">
                Sign in
              </Link>
            </p>
          </>
        )}
        {step === 2 && (
          <form onSubmit={handleVerify} className="space-y-4">
            <p className="text-center text-white mb-4">Please check your email for the verification code. It will expire in 10 minutes.</p>
            <input
              type="text"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              placeholder="Verification Code"
              className="w-full p-3 bg-white bg-opacity-20 border border-white border-opacity-30 rounded-lg text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 transition duration-300"
              required
            />
            <button type="submit" className="w-full p-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition duration-300">
              Verify Email
            </button>
          </form>
        )}
        {step === 3 && (
          <div className="text-center text-white">
            <p className="mb-2">Email verified successfully!</p>
            <p>Redirecting to sign in page...</p>
          </div>
        )}
      </div>
    </div>
  );
}