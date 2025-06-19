import Link from 'next/link';
import Image from 'next/image';
import { SignupForm } from '@/components/auth/SignupForm';

const SignupPage = () => {
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
                        Create your account
                    </h2>
                    <p className="mt-2 text-sm text-gray-600">
                        Join SociaLite and start connecting with friends
                    </p>
                </div>

                <SignupForm />

                <div className="text-center">
                    <p className="text-sm text-gray-600">
                        Already have an account?{' '}
                        <Link
                            href="/login"
                            className="font-medium text-blue-600 hover:text-blue-500"
                        >
                            Sign in here
                        </Link>
                    </p>
                </div>

                <div className="text-center">
                    <div className="text-xs text-gray-400">
                        By creating an account, you agree to our{' '}
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

export default SignupPage;
