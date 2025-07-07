import supabaseClient from '@/lib/supabase/client';
import {
    GetPostsParams,
    GetPostsReturn,
    PostWithProfileAndLikes,
} from '@/types';

export async function getPosts({
    pageParam = 0,
    limit = 10,
}: GetPostsParams): Promise<GetPostsReturn> {
    const from = pageParam * limit;
    const to = from + limit - 1;

    const { data, count, error } = await supabaseClient
        .from('posts')
        .select(
            `
      *,
      public_profiles (
        firstName,
        lastName,
        avatar_url
      ),
      post_likes (
        user_id
      )
    `,
            { count: 'exact' }
        )
        .order('created_at', { ascending: false })
        .range(from, to);

    if (error) {
        console.error('Error fetching posts:', error);
        throw new Error('Failed to fetch posts');
    }

    const posts =
        data?.map((post: PostWithProfileAndLikes) => ({
            ...post,
            likesCount: post.post_likes?.length ?? 0,
        })) ?? [];

    return {
        posts,
        nextPage: pageParam + 1,
        total: count ?? 0,
    };
}
