import Link from 'next/link';
import Image from 'next/image';
import { LoginForm } from '@/components/auth/LoginForm';

const LoginPage = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div className="text-center">
                    <Link
                        href="/"
                        className="flex items-center justify-center space-x-2 mb-6"
                    >
                        <Image
                            src="/globe.svg"
                            alt="SociaLite"
                            width={32}
                            height={32}
                        />
                        <span className="text-2xl font-bold text-gray-900">
                            SociaLite
                        </span>
                    </Link>
                    <h2 className="text-3xl font-bold text-gray-900">
                        Welcome back
                    </h2>
                    <p className="mt-2 text-sm text-gray-600">
                        Sign in to your account to continue
                    </p>
                </div>

                <LoginForm />

                <div className="text-center">
                    <p className="text-sm text-gray-600">
                        Don&apos;t have an account?{' '}
                        <Link
                            href="/signup"
                            className="font-medium text-blue-600 hover:text-blue-500"
                        >
                            Sign up for free
                        </Link>
                    </p>
                </div>

                <div className="text-center space-y-2">
                    <Link
                        href="/forgot-password"
                        className="text-sm text-gray-500 hover:text-gray-700"
                    >
                        Forgot your password?
                    </Link>
                    <div className="text-xs text-gray-400">
                        By signing in, you agree to our{' '}
                        <Link href="/terms" className="hover:text-gray-600">
                            Terms of Service
                        </Link>{' '}
                        and{' '}
                        <Link href="/privacy" className="hover:text-gray-600">
                            Privacy Policy
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
