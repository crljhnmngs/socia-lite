'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SignupFormData, signUpSchema } from '@/lib/validation/signupSchema';
import { useSignup } from '@/hooks/mutations/useSignup';
import toast from 'react-hot-toast';
import { isAxiosError } from 'axios';
import { useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';

const getSignupErrorMessage = (error: unknown): string => {
    if (isAxiosError(error)) {
        const apiError = error.response?.data?.error;
        const details: string =
            (typeof apiError?.details === 'string' && apiError.details) ||
            (typeof apiError?.message === 'string' && apiError.message) ||
            (typeof error.message === 'string' && error.message) ||
            '';

        if (details.includes('request this after')) {
            return 'You are signing up too quickly. Please wait a minute before trying again.';
        }
        if (details.includes('duplicate key value')) {
            return 'An account with this email already exists.';
        }
        if (details.toLowerCase().includes('invalid email')) {
            return 'Please enter a valid email address.';
        }
        if (details.toLowerCase().includes('password should be at least')) {
            return 'Password is too weak. Please use a stronger password.';
        }
        if (details.toLowerCase().includes('email rate limit')) {
            return 'Too many sign up attempts. Please try again later.';
        }
        if (details.toLowerCase().includes('already registered')) {
            return 'This email is already registered.';
        }
        if (details) {
            return details;
        }
    }
    // Handle plain Error
    if (error instanceof Error) {
        return error.message;
    }
    return 'Sign up failed. Please try again.';
};

export const SignupForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<SignupFormData>({
        resolver: zodResolver(signUpSchema),
    });

    const { userSignup, isLoading } = useSignup();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const onSubmit = (data: SignupFormData) => {
        userSignup(data, {
            onSuccess: () => {
                reset();
                toast.success('Account created! Check your email to verify.', {
                    position: 'top-right',
                });
            },
            onError: (error) => {
                const message = getSignupErrorMessage(error);
                toast.error(message, { position: 'top-right' });
            },
        });
    };

    const handleSocialSignup = async (provider: 'google' | 'github') => {
        // TODO: Implement social signup with Supabase
        console.log(`${provider} signup attempt`);
        // Simulate API call
        setTimeout(() => {
            reset();
        }, 2000);
    };

    return (
        <div className="space-y-6">
            <div className="space-y-3">
                <button
                    onClick={() => handleSocialSignup('google')}
                    disabled={isLoading}
                    className="w-full flex cursor-pointer items-center justify-center px-4 py-3 border border-gray-300 rounded-lg shadow-sm bg-white text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors mb-2"
                >
                    <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                        <path
                            fill="#4285F4"
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        />
                        <path
                            fill="#34A853"
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        />
                        <path
                            fill="#FBBC05"
                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        />
                        <path
                            fill="#EA4335"
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        />
                    </svg>
                    Continue with Google
                </button>

                <button
                    onClick={() => handleSocialSignup('github')}
                    disabled={isLoading}
                    className="w-full flex cursor-pointer items-center justify-center px-4 py-3 border border-gray-300 rounded-lg shadow-sm bg-white text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                    <svg
                        className="w-5 h-5 mr-3"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                    Continue with GitHub
                </button>
            </div>

            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-gray-50 text-gray-500">
                        Or sign up with email
                    </span>
                </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label
                            htmlFor="firstName"
                            className="block text-sm font-medium text-gray-700"
                        >
                            First name
                        </label>
                        <input
                            id="firstName"
                            {...register('firstName')}
                            type="text"
                            autoComplete="given-name"
                            className={`mt-1 block w-full text-black px-3 py-2 border rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed ${
                                errors.firstName
                                    ? 'border-red-300'
                                    : 'border-gray-300'
                            }`}
                            placeholder="First name"
                            disabled={isLoading}
                        />
                        {errors.firstName && (
                            <p className="mt-1 text-sm text-red-600">
                                {errors.firstName.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <label
                            htmlFor="lastName"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Last name
                        </label>
                        <input
                            id="lastName"
                            {...register('lastName')}
                            type="text"
                            autoComplete="family-name"
                            className={`mt-1 block w-full text-black px-3 py-2 border rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed ${
                                errors.lastName
                                    ? 'border-red-300'
                                    : 'border-gray-300'
                            }`}
                            placeholder="Last name"
                            disabled={isLoading}
                        />
                        {errors.lastName && (
                            <p className="mt-1 text-sm text-red-600">
                                {errors.lastName.message}
                            </p>
                        )}
                    </div>
                </div>
                <div>
                    <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Email address
                    </label>
                    <input
                        id="email"
                        {...register('email')}
                        type="email"
                        autoComplete="email"
                        className={`mt-1 block text-black w-full px-3 py-2 border rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed ${
                            errors.email ? 'border-red-300' : 'border-gray-300'
                        }`}
                        placeholder="Enter your email"
                        disabled={isLoading}
                    />
                    {errors.email && (
                        <p className="mt-1 text-sm text-red-600">
                            {errors.email.message}
                        </p>
                    )}
                </div>
                <div>
                    <label
                        htmlFor="password"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Password
                    </label>
                    <div className="relative">
                        <input
                            id="password"
                            {...register('password')}
                            type={showPassword ? 'text' : 'password'}
                            autoComplete="new-password"
                            className={`mt-1 block text-black w-full px-3 py-2 pr-10 border rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed ${
                                errors.password
                                    ? 'border-red-300'
                                    : 'border-gray-300'
                            }`}
                            placeholder="Create a password"
                            disabled={isLoading}
                        />
                        <button
                            type="button"
                            tabIndex={-1}
                            className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 focus:outline-none"
                            onClick={() => setShowPassword((v) => !v)}
                        >
                            {showPassword ? (
                                <FiEyeOff className="h-5 w-5" />
                            ) : (
                                <FiEye className="h-5 w-5" />
                            )}
                        </button>
                    </div>
                    {errors.password && (
                        <p className="mt-1 text-sm text-red-600">
                            {errors.password.message}
                        </p>
                    )}
                </div>
                <div>
                    <label
                        htmlFor="confirmPassword"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Confirm password
                    </label>
                    <div className="relative">
                        <input
                            id="confirmPassword"
                            {...register('confirmPassword')}
                            type={showConfirmPassword ? 'text' : 'password'}
                            autoComplete="new-password"
                            className={`mt-1 block text-black w-full px-3 py-2 pr-10 border rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed ${
                                errors.confirmPassword
                                    ? 'border-red-300'
                                    : 'border-gray-300'
                            }`}
                            placeholder="Confirm your password"
                            disabled={isLoading}
                        />
                        <button
                            type="button"
                            tabIndex={-1}
                            className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 focus:outline-none"
                            onClick={() => setShowConfirmPassword((v) => !v)}
                        >
                            {showConfirmPassword ? (
                                <FiEyeOff className="h-5 w-5" />
                            ) : (
                                <FiEye className="h-5 w-5" />
                            )}
                        </button>
                    </div>
                    {errors.confirmPassword && (
                        <p className="mt-1 text-sm text-red-600">
                            {errors.confirmPassword.message}
                        </p>
                    )}
                </div>
                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                    {isLoading ? (
                        <div className="flex items-center">
                            <svg
                                className="animate-spin -ml-1 mr-3 h-4 w-4 text-white"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                ></circle>
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                ></path>
                            </svg>
                            Creating account...
                        </div>
                    ) : (
                        'Create account'
                    )}
                </button>
            </form>
        </div>
    );
};
