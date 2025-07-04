import { useQuery } from '@tanstack/react-query';
import { getPosts } from '@/lib/api/post/get';

export function usePosts() {
    const {
        data: posts,
        isLoading,
        error,
        ...rest
    } = useQuery({
        queryKey: ['posts'],
        queryFn: getPosts,
        staleTime: 60 * 1000, // 1 minute
    });

    return {
        posts,
        isLoading,
        error,
        ...rest,
    };
}
