import supabaseClient from '@/lib/supabase/client';
import { Profile } from '@/types';

export async function getProfileByUserId(
    userId: string
): Promise<Profile | null> {
    const query = supabaseClient
        .from('profiles')
        .select('*')
        .eq('user_id', userId)
        .single();

    const { data, error } = await query;

    if (!data || (error && error.code === 'PGRST116')) {
        return null;
    }

    if (error) {
        console.error('Error fetching profile:', error);
        throw new Error('Failed to fetch profile');
    }

    return data as Profile;
}
