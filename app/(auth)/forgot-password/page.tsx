'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { StepProgressBar } from '@/components/auth/step-progress';
import { resetPasswordAction, sendPasswordResetCodeAction, verifyPasswordResetCodeAction } from '@/actions/auth';
import toast from 'react-hot-toast';

export default function ForgotPasswordPage() {
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState('');
    const [verificationCode, setVerificationCode] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const router = useRouter();

    const handleSendVerificationCode = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) {
            toast.error('Email is required')
            return
        }
        const result = await sendPasswordResetCodeAction(email);
        if (result.success) {
            setStep(2);
        } else {
            alert(result.message);
        }
    };

    const handleVerifyCode = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email || !verificationCode) {
            toast.error('Email or verificationCode is empty');
            return;
        }
        const result = await verifyPasswordResetCodeAction(email, verificationCode);
        if (result.success) {
            setStep(3);
        } else {
            toast.error(result.message);
        }
    };

    const handleResetPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }
        if (!email || !verificationCode || !newPassword) {
            toast.error('Some fields are empty');
            return;
        }
        const result = await resetPasswordAction(email, verificationCode, newPassword);
        if (result.success) {
            toast.success(result.message);
            router.push('/signin');
        } else {
            toast.error(result.message);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 to-purple-500">
            <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-lg p-8 shadow-lg w-full max-w-md">
                <h1 className="text-3xl font-bold mb-6 text-center text-white">Forgot Password</h1>
                <StepProgressBar currentStep={step} totalSteps={3} />
                {step === 1 && (
                    <form onSubmit={handleSendVerificationCode} className="space-y-4">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                            className="w-full p-3 bg-white bg-opacity-20 border border-white border-opacity-30 rounded-lg text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 transition duration-300"
                            required
                        />
                        <button type="submit" className="w-full p-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition duration-300">
                            Send Verification Code
                        </button>
                    </form>
                )}
                {step === 2 && (
                    <form onSubmit={handleVerifyCode} className="space-y-4">
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
                            Verify Code
                        </button>
                    </form>
                )}
                {step === 3 && (
                    <form onSubmit={handleResetPassword} className="space-y-4">
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                placeholder="New Password"
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
                                placeholder="Confirm New Password"
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
                            Reset Password
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}