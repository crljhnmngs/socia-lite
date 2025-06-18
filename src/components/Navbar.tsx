import Link from 'next/link';
import Image from 'next/image';

const Navbar = () => {
    return (
        <nav className="bg-white border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <Link href="/" className="flex items-center space-x-2">
                        <Image
                            src="/globe.svg"
                            alt="SociaLite Logo"
                            width={32}
                            height={32}
                        />
                        <span className="text-xl font-bold text-gray-900">
                            SociaLite
                        </span>
                    </Link>
                    <div className="flex items-center space-x-4">
                        <Link
                            href="/"
                            className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                        >
                            Home
                        </Link>
                        <Link
                            href="/login"
                            className="bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-md text-sm font-medium transition-colors"
                        >
                            Login
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
