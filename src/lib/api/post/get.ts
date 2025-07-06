import supabaseClient from '@/lib/supabase/client';
import { PostWithProfileAndLikes } from '@/types';

export async function getPosts(): Promise<PostWithProfileAndLikes[]> {
    const { data, error } = await supabaseClient
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
    `
        )
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching posts:', error);
        throw new Error('Failed to fetch posts');
    }

    return (data as PostWithProfileAndLikes[]).map((post) => ({
        ...post,
        likesCount: post.post_likes.length,
    }));
}
