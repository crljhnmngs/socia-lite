'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginFormData, loginSchema } from '@/lib/validation/loginSchema';
import { useLogin } from '@/hooks/mutations/useLogin';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { useState } from 'react';

const getLoginErrorMessage = (error: unknown): string => {
    if (
        error &&
        typeof error === 'object' &&
        'details' in error &&
        'message' in error
    ) {
        const errorDetails = String(error.details).toLowerCase();

        if (errorDetails.includes('invalid login credentials')) {
            return 'Invalid email or password. Please check your credentials and try again.';
        }
        if (errorDetails.includes('email not confirmed')) {
            return 'Please verify your email address before logging in.';
        }
        if (errorDetails.includes('too many requests')) {
            return 'Too many login attempts. Please wait a few minutes before trying again.';
        }
        if (errorDetails.includes('user not found')) {
            return 'No account found with this email address.';
        }
        if (errorDetails.includes('invalid email')) {
            return 'Please enter a valid email address.';
        }
        if (errorDetails.includes('password is incorrect')) {
            return 'Incorrect password. Please try again.';
        }
        if (errorDetails.includes('account locked')) {
            return 'Your account has been temporarily locked due to multiple failed attempts.';
        }
        if (errorDetails.includes('email rate limit')) {
            return 'Too many login attempts. Please try again later.';
        }
        if (errorDetails.includes('invalid credentials')) {
            return 'Invalid email or password. Please check your credentials and try again.';
        }
        if (errorDetails.includes('email not verified')) {
            return 'Please verify your email address before logging in.';
        }

        // Return the original error message if no specific case matches
        return String(error.message);
    }

    // Handle plain Error
    if (error instanceof Error) {
        return error.message;
    }

    // Handle string errors
    if (typeof error === 'string') {
        return error;
    }

    return 'Login failed. Please try again.';
};

export const LoginForm = () => {
    const router = useRouter();
    const { userLogin, isLoading } = useLogin();
    const [showPassword, setShowPassword] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = (data: LoginFormData) => {
        userLogin(data, {
            onSuccess: (result) => {
                if (result.error) {
                    const message = getLoginErrorMessage(result.error);
                    toast.error(message, {
                        position: 'top-right',
                    });
                    return;
                }

                if (result.user && result.session) {
                    reset();
                    toast.success('Login successful!', {
                        position: 'top-right',
                    });
                    router.push('/feed');
                }
            },
            onError: (error) => {
                console.error('Login error:', error);
                const message = getLoginErrorMessage(error);
                toast.error(message, {
                    position: 'top-right',
                });
            },
        });
    };

    const handleSocialLogin = async (provider: 'google' | 'github') => {
        // TODO: Implement social login with Supabase
        console.log(`${provider} login attempt`);
        // Simulate API call
        setTimeout(() => {}, 2000);
    };

    return (
        <div className="space-y-6">
            <div className="space-y-3">
                <button
                    onClick={() => handleSocialLogin('google')}
                    disabled={isLoading}
                    className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg shadow-sm bg-white text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
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
                    onClick={() => handleSocialLogin('github')}
                    disabled={isLoading}
                    className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg shadow-sm bg-white text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
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
                        Or continue with
                    </span>
                </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
                        className={`mt-1 text-black block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed ${
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
                            autoComplete="current-password"
                            className={`mt-1 text-black block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed ${
                                errors.password
                                    ? 'border-red-300'
                                    : 'border-gray-300'
                            }`}
                            placeholder="Enter your password"
                            disabled={isLoading}
                        />
                        {errors.password && (
                            <p className="mt-1 text-sm text-red-600">
                                {errors.password.message}
                            </p>
                        )}
                        <button
                            type="button"
                            tabIndex={-1}
                            className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 focus:outline-none"
                            onClick={() => setShowPassword((v: boolean) => !v)}
                        >
                            {showPassword ? (
                                <FiEyeOff className="h-5 w-5" />
                            ) : (
                                <FiEye className="h-5 w-5" />
                            )}
                        </button>
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <input
                            id="remember-me"
                            name="remember-me"
                            type="checkbox"
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label
                            htmlFor="remember-me"
                            className="ml-2 block text-sm text-gray-900"
                        >
                            Remember me
                        </label>
                    </div>
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
                            Signing in...
                        </div>
                    ) : (
                        'Sign in'
                    )}
                </button>
            </form>
        </div>
    );
};
