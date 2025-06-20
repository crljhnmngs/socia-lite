import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';
import Providers from './Providers';

const poppins = Poppins({
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

export const metadata: Metadata = {
    title: {
        template: '%s | SociaLite',
        default: 'SociaLite - Connect and Share',
    },
    description: 'A modern social media platform for meaningful connections',
    keywords: [
        'social media',
        'connections',
        'community',
        'sharing',
        'friends',
    ],
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <html lang="en">
            <body
                className={`${poppins.className} antialiased min-h-screen flex flex-col`}
            >
                <Providers>{children}</Providers>
            </body>
        </html>
    );
};

export default RootLayout;
