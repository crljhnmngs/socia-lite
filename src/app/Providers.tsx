'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'react-hot-toast';
import { useState } from 'react';
import { UserProvider } from '@/contexts/UserContext';

const Providers = ({ children }: { children: React.ReactNode }) => {
    const [queryClient] = useState(() => new QueryClient());
    return (
        <QueryClientProvider client={queryClient}>
            <UserProvider>
                <Toaster />
                {children}
                <ReactQueryDevtools initialIsOpen={false} />
            </UserProvider>
        </QueryClientProvider>
    );
};

export default Providers;
