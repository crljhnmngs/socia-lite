import supabaseClient from '@/lib/supabase/client';
import { Post } from '@/types';

export async function getPosts() {
    const query = supabaseClient
        .from('posts')
        .select(
            `
      *,
      public_profiles (
        firstName,
        lastName,
        avatar_url
      )
    `
        )
        .order('created_at', { ascending: false });

    const { data, error } = await query;

    if (error) {
        console.error('Error fetching posts:', error);
        throw new Error('Failed to fetch posts');
    }

    return data as Post[];
}
