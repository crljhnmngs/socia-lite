import Image from 'next/image';
import Link from 'next/link';

const Home = () => {
    return (
        <main className="flex flex-col items-center justify-center min-h-0 flex-1">
            <div className="w-full">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16 lg:py-24 text-center">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6">
                        Connect, Share, and Thrive
                        <span className="block text-blue-600">
                            with SociaLite
                        </span>
                    </h1>
                    <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto mb-6 sm:mb-10">
                        Experience a faster, lighter way to stay connected with
                        friends and share what matters most to you.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4">
                        <Link
                            href="/signup"
                            className="bg-blue-600 text-white hover:bg-blue-700 px-6 sm:px-8 py-3 rounded-lg text-base sm:text-lg font-semibold transition-colors"
                        >
                            Get Started
                        </Link>
                        <Link
                            href="/about"
                            className="bg-gray-100 text-gray-700 hover:bg-gray-200 px-6 sm:px-8 py-3 rounded-lg text-base sm:text-lg font-semibold transition-colors"
                        >
                            Learn More
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mt-12 sm:mt-16 lg:mt-20">
                        <div className="p-4 sm:p-6 rounded-xl bg-gray-50 shadow-sm hover:shadow-md transition-shadow">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3 sm:mb-4">
                                <Image
                                    src="/globe.svg"
                                    alt="Share Icon"
                                    width={20}
                                    height={20}
                                    className="sm:w-6 sm:h-6"
                                />
                            </div>
                            <h3 className="text-lg sm:text-xl font-semibold mb-2 text-gray-900">
                                Share Your Story
                            </h3>
                            <p className="text-sm sm:text-base text-gray-600">
                                Post updates, photos, and stories that matter to
                                you and your community.
                            </p>
                        </div>
                        <div className="p-4 sm:p-6 rounded-xl bg-gray-50 shadow-sm hover:shadow-md transition-shadow">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3 sm:mb-4">
                                <Image
                                    src="/window.svg"
                                    alt="Connect Icon"
                                    width={20}
                                    height={20}
                                    className="sm:w-6 sm:h-6"
                                />
                            </div>
                            <h3 className="text-lg sm:text-xl font-semibold mb-2 text-gray-900">
                                Real Connections
                            </h3>
                            <p className="text-sm sm:text-base text-gray-600">
                                Build meaningful relationships with friends and
                                like-minded people.
                            </p>
                        </div>
                        <div className="p-4 sm:p-6 rounded-xl bg-gray-50 shadow-sm hover:shadow-md transition-shadow">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3 sm:mb-4">
                                <Image
                                    src="/file.svg"
                                    alt="Privacy Icon"
                                    width={20}
                                    height={20}
                                    className="sm:w-6 sm:h-6"
                                />
                            </div>
                            <h3 className="text-lg sm:text-xl font-semibold mb-2 text-gray-900">
                                Privacy First
                            </h3>
                            <p className="text-sm sm:text-base text-gray-600">
                                Your data is yours. Enjoy complete control over
                                your privacy settings.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Home;
