import supabaseClient from '@/lib/supabase/client';
import { ToggleLikePostInput } from '@/types';

export async function toggleLikePost({
    post_id,
    user_id,
}: ToggleLikePostInput): Promise<'liked' | 'unliked'> {
    // Check if the user already liked the post
    const { data: existingLike, error: selectError } = await supabaseClient
        .from('post_likes')
        .select('id')
        .eq('post_id', post_id)
        .eq('user_id', user_id)
        .maybeSingle();

    if (selectError) {
        console.error('Error checking existing like:', selectError);
        throw new Error('Failed to toggle like');
    }

    if (existingLike) {
        // Unlike
        const { error: deleteError } = await supabaseClient
            .from('post_likes')
            .delete()
            .eq('post_id', post_id)
            .eq('user_id', user_id);

        if (deleteError) {
            console.error('Error unliking post:', deleteError);
            throw new Error('Failed to unlike post');
        }

        return 'unliked';
    } else {
        // Like
        const { error: insertError } = await supabaseClient
            .from('post_likes')
            .insert([{ post_id, user_id }]);

        if (insertError) {
            console.error('Error liking post:', insertError);
            throw new Error('Failed to like post');
        }

        return 'liked';
    }
}
