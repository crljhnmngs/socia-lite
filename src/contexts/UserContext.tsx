'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, Session } from '@supabase/supabase-js';
import supabaseClient from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

interface UserContextType {
    user: User | null;
    session: Session | null;
    loading: boolean;
    signOut: () => Promise<void>;
    refreshUser: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};

interface UserProviderProps {
    children: ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
    const [user, setUser] = useState<User | null>(null);
    const [session, setSession] = useState<Session | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    const refreshUser = async () => {
        try {
            const { data: { user: currentUser }, error } = await supabaseClient.auth.getUser();
            if (error) {
                console.error('Error fetching user:', error);
                setUser(null);
                setSession(null);
            } else {
                setUser(currentUser);
            }
        } catch (error) {
            console.error('Error refreshing user:', error);
            setUser(null);
            setSession(null);
        }
    };

    const signOut = async () => {
        try {
            await supabaseClient.auth.signOut();
            setUser(null);
            setSession(null);
            router.push('/login');
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };

    useEffect(() => {
        // Get initial session
        const getInitialSession = async () => {
            const { data: { session: initialSession } } = await supabaseClient.auth.getSession();
            setSession(initialSession);
            setUser(initialSession?.user ?? null);
            setLoading(false);
        };

        getInitialSession();

        // Listen for auth changes
        const { data: { subscription } } = supabaseClient.auth.onAuthStateChange(
            async (event, session) => {
                setSession(session);
                setUser(session?.user ?? null);
                setLoading(false);
            }
        );

        return () => subscription.unsubscribe();
    }, []);

    const value = {
        user,
        session,
        loading,
        signOut,
        refreshUser,
    };

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
}; 