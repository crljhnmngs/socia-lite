import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';

export const metadata: Metadata = {
    title: 'SociaLite - Connect and Share',
    description: 'A modern social media platform for meaningful connections',
};

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex flex-col flex-1 bg-white">
            <Navbar />
            <main className="flex-1">{children}</main>
        </div>
    );
};

export default HomeLayout;
