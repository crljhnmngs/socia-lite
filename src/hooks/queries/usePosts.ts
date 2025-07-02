import { useQuery } from '@tanstack/react-query';
import { getPosts } from '@/lib/api/post/get';

export function usePosts() {
    const query = useQuery({
        queryKey: ['posts'],
        queryFn: getPosts,
        staleTime: 60000, // 1 minute
    });
    const { data: posts, isLoading, error, ...rest } = query;

    return {
        posts,
        isLoading,
        error,
        ...rest,
    };
}
