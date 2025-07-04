import Image from 'next/image';
import { FeedContent } from '@/components/feed/FeedContent';
import { LogoutButton } from '@/components/auth/LogoutButton';

const FeedPage = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            <header className="bg-white border-b border-gray-100">
                <div className="max-w-2xl mx-auto px-4 flex justify-between items-center h-16">
                    <div className="flex items-center space-x-2">
                        <Image
                            src="/globe.svg"
                            alt="SociaLite Logo"
                            width={32}
                            height={32}
                        />
                        <span className="text-xl font-bold text-gray-900">
                            SociaLite
                        </span>
                    </div>
                    <LogoutButton />
                </div>
            </header>
            <FeedContent />
        </div>
    );
};

export default FeedPage;
