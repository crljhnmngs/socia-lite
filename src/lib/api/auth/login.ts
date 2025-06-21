import supabaseClient from '../../supabase/client';
import { LoginFormData } from '../../validation/loginSchema';

export const login = async (data: LoginFormData) => {
    try {
        const { email, password } = data;
        const { data: res, error } =
            await supabaseClient.auth.signInWithPassword({
                email,
                password,
            });

        if (error) {
            return {
                user: null,
                session: null,
                error: {
                    message: 'Login failed',
                    details: error.message,
                },
            };
        }

        return {
            user: res.user,
            session: res.session,
            error: null,
        };
    } catch (err) {
        return {
            user: null,
            session: null,
            error: {
                message: 'Unexpected error during login',
                details: err instanceof Error ? err.message : String(err),
            },
        };
    }
};
