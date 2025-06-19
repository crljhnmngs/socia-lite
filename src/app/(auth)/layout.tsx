import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Authentication - SociaLite',
    description: 'Sign in or create your SociaLite account',
};

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-gray-50">
            {children}
        </div>
    );
} 