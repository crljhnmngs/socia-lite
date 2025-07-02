import supabaseClient from '@/lib/supabase/client';
import { Profile } from '@/types';

export async function getProfileByUserId(
    userId: string
): Promise<Profile | null> {
    const { data, error } = await supabaseClient
        .from('profiles')
        .select('*')
        .eq('user_id', userId)
        .single();

    if (!data && !error) return null;

    if (error && error.code === 'PGRST116') return null;

    if (error) throw new Error(error.message);

    return data;
}
