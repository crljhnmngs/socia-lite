import supabaseClient from '@/lib/supabase/client';
import { Post } from '@/types';
import { CreatePostInput } from '@/types';

export async function createPost({
    user_id,
    content,
}: CreatePostInput): Promise<Post> {
    const query = supabaseClient
        .from('posts')
        .insert([{ user_id, content }])
        .select()
        .single();

    const { data, error } = await query;

    if (error) {
        console.error('Error creating post:', error);
        throw new Error('Failed to create post');
    }

    return data as Post;
}
