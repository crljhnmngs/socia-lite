import { useInfiniteQuery, QueryFunctionContext } from '@tanstack/react-query';
import { getPosts } from '@/lib/api/post/get';
import { GetPostsReturn } from '@/types';

const LIMIT = Number(process.env.NEXT_PUBLIC_POST_LIMIT) || 10;

export function usePosts() {
    return useInfiniteQuery<GetPostsReturn, Error>({
        queryKey: ['posts'],
        queryFn: ({ pageParam }: QueryFunctionContext) =>
            getPosts({
                pageParam: typeof pageParam === 'number' ? pageParam : 0,
                limit: LIMIT,
            }),
        initialPageParam: 0,
        getNextPageParam: (lastPage) =>
            lastPage.posts.length >= LIMIT ? lastPage.nextPage : undefined,
    });
}
