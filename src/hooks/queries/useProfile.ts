import { useQuery } from '@tanstack/react-query';
import { Profile } from '@/types';
import { getProfileByUserId } from '@/lib/api/user/profile';

export function useProfile(userId?: string) {
    const query = useQuery<Profile | null, Error>({
        queryKey: ['profile', userId],
        queryFn: () =>
            userId ? getProfileByUserId(userId) : Promise.resolve(null),
        enabled: !!userId,
        staleTime: 600000, // 10 minutes
    });
    const { data: profile, isLoading, error, ...rest } = query;
    return {
        profile,
        isLoading,
        error,
        ...rest,
    };
}
