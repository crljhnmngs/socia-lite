'use client';

import { useUser } from '@/contexts/UserContext';

export const LogoutButton = () => {
    const { signOut } = useUser();

    return (
        <button
            onClick={signOut}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors cursor-pointer"
        >
            Logout
        </button>
    );
};
