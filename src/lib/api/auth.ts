import supabaseClient from '../supabase/client';
import { SignupFormData } from '../validation/signupSchema';

export const signUp = async (data: SignupFormData) => {
    const { email, password, firstName, lastName } = data;

    const { data: signUpData, error: signUpError } =
        await supabaseClient.auth.signUp({
            email,
            password,
            options: {
                data: {
                    firstName,
                    lastName,
                },
            },
        });

    if (signUpError) throw signUpError;

    const user_id = signUpData.user?.id;

    if (user_id) {
        const { error: profileError } = await supabaseClient
            .from('profiles')
            .insert([
                {
                    user_id,
                    firstName,
                    lastName,
                },
            ]);

        if (profileError) {
            // TODO: Roll back the user sign-up (e.g. delete the user via Supabase Admin API)
            throw profileError;
        }
    }

    return signUpData;
};
