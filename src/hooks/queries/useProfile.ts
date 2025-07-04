import { useQuery } from '@tanstack/react-query';
import { Profile } from '@/types';
import { getProfileByUserId } from '@/lib/api/user/profile';

export function useProfile(userId?: string) {
    const {
        data: profile,
        isLoading,
        error,
        ...rest
    } = useQuery<Profile | null, Error>({
        queryKey: ['profile', userId],
        queryFn: () =>
            userId ? getProfileByUserId(userId) : Promise.resolve(null),
        enabled: !!userId,
        staleTime: 10 * 60 * 1000, // 10 minutes
    });

    return {
        profile,
        isLoading,
        error,
        ...rest,
    };
}
