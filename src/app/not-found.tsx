import Link from 'next/link';
import Image from 'next/image';

const NotFound = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="max-w-md w-full mx-auto text-center px-4">
                <div className="mb-8">
                    <h1 className="text-8xl sm:text-9xl font-bold text-gray-800 select-none">
                        404
                    </h1>
                </div>

                <div className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                        Page Not Found
                    </h2>
                    <p className="text-gray-600 leading-relaxed">
                        Oops! The page you&apos;re looking for doesn&apos;t
                        exist. It might have been moved, deleted, or you entered
                        the wrong URL.
                    </p>
                </div>

                <div className="space-y-3">
                    <Link
                        href="/"
                        className="block w-full bg-blue-600 text-white hover:bg-blue-700 px-6 py-3 rounded-lg font-medium transition-colors"
                    >
                        Go Back Home
                    </Link>
                    <Link
                        href="/login"
                        className="block w-full bg-gray-100 text-gray-700 hover:bg-gray-200 px-6 py-3 rounded-lg font-medium transition-colors"
                    >
                        Sign In
                    </Link>
                </div>

                <div className="mt-8 pt-8 border-t border-gray-200">
                    <p className="text-sm text-gray-500 mb-4">
                        Need help? Try these links:
                    </p>
                    <div className="flex flex-wrap justify-center gap-4 text-sm">
                        <Link
                            href="/about"
                            className="text-blue-600 hover:text-blue-700 hover:underline"
                        >
                            About Us
                        </Link>
                        <Link
                            href="/contact"
                            className="text-blue-600 hover:text-blue-700 hover:underline"
                        >
                            Contact
                        </Link>
                        <Link
                            href="/help"
                            className="text-blue-600 hover:text-blue-700 hover:underline"
                        >
                            Help Center
                        </Link>
                    </div>
                </div>

                <div className="mt-12 opacity-20">
                    <Image
                        src="/globe.svg"
                        alt="SociaLite"
                        width={48}
                        height={48}
                        className="mx-auto"
                    />
                </div>
            </div>
        </div>
    );
};

export default NotFound;
