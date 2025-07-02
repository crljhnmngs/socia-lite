import supabaseClient from '@/lib/supabase/client';

export async function createPost({
    user_id,
    content,
}: {
    user_id: string;
    content: string;
}) {
    const { data, error } = await supabaseClient
        .from('posts')
        .insert([{ user_id, content }])
        .select()
        .single();
    if (error) throw new Error(error.message);
    return data;
}
