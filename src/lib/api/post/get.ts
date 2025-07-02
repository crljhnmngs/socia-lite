import supabaseClient from '@/lib/supabase/client';

export async function getPosts() {
    const { data, error } = await supabaseClient
        .from('posts')
        .select(`
            *,
            profiles (
                firstName,
                lastName,
                avatar_url
            )
        `)
        .order('created_at', { ascending: false });
    if (error) throw new Error(error.message);
    return data;
} 