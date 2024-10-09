"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaGoogle, FaGithub, FaEye, FaFacebook, FaEyeSlash } from "react-icons/fa";
import toast from 'react-hot-toast';
import { loginAction } from '@/actions/auth';
import LoadingButton from "@/components/loading";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await loginAction(email, password);

    setIsLoading(true);
    try {
      if (result.success) {
        toast.success(result.message);
        router.push("/dashboard");
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error("Something went wrong")
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = () => {
    window.location.href = "/api/auth/google";
  };

  const handleGithubSignIn = () => {
    window.location.href = "/api/auth/github";
  };

  const handleFacebookSignIn = () => {
    window.location.href = "/api/auth/facebook";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 to-purple-500">
      <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-lg p-8 shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center text-white">
          Sign In
        </h1>
        <form onSubmit={handleSignIn} className="space-y-4">
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
          {/* <button
            type="submit"
            className="w-full p-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition duration-300"
          >
            Sign In
          </button> */}
          <LoadingButton type="submit" isLoading={isLoading} loadingText="Signing In...">
            Sign In
          </LoadingButton>
        </form>
        <div className="mt-4 flex items-center justify-between">
          <span className="border-b w-1/5 md:w-1/4"></span>
          <span className="text-xs text-white uppercase">or sign in with</span>
          <span className="border-b w-1/5 md:w-1/4"></span>
        </div>
        <div className="flex justify-center space-x-4 mt-4">
          <button
            onClick={handleGoogleSignIn}
            className="flex items-center justify-center p-2 bg-white rounded-full hover:bg-gray-200 transition duration-300"
          >
            <FaGoogle className="text-red-500" />
          </button>
          <button
            onClick={handleGithubSignIn}
            className="flex items-center justify-center p-2 bg-white rounded-full hover:bg-gray-200 transition duration-300"
          >
            <FaGithub className="text-gray-800" />
          </button>
          <button
            onClick={handleFacebookSignIn}
            className="flex items-center justify-center p-2 bg-white rounded-full hover:bg-gray-200 transition duration-300"
          >
            <FaFacebook className="text-blue-600" />
          </button>
        </div>
        <p className="mt-6 text-center text-white">
          Don't have an account?{" "}
          <Link href="/signup" className="text-blue-300 hover:underline">
            Sign up
          </Link>
        </p>

        <p className="mt-6 text-center text-white">
          <Link
            href="/forgot-password"
            className="text-lg text-blue-300 hover:underline"
          >
            Forgot Password?
          </Link>
        </p>
      </div>
    </div>
  );
}