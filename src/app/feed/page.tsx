'use client';

import { useUser } from '@/contexts/UserContext';

const FeedPage = () => {
    const { user, loading } = useUser();

    if (loading) return <div>Loading...</div>;

    return (
        <div>
            <h1>Welcome to your Dashboard, {user?.email || 'User'}!</h1>
        </div>
    );
};

export default FeedPage;
