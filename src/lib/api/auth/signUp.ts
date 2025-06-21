import supabaseAdmin from '../../supabase/admin';
import { SignupFormData } from '../../validation/signupSchema';

export const signUp = async (data: SignupFormData) => {
    const { email, password, firstName, lastName } = data;
    let user_id: string | undefined = undefined;
    try {
        const { data: existing, error: listError } =
            await supabaseAdmin.auth.admin.listUsers();
        if (listError) {
            return {
                user: null,
                session: null,
                error: {
                    message: 'Sign up failed',
                    details: listError.message,
                },
            };
        }

        const found = existing.users.find((u) => u.email === email);

        if (found) {
            return {
                user: null,
                session: null,
                error: {
                    message: 'Sign up failed',
                    details: 'User with this email already exists.',
                },
            };
        }

        const { data: signUpData, error: signUpError } =
            await supabaseAdmin.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        firstName,
                        lastName,
                    },
                },
            });

        if (signUpError) {
            return {
                user: null,
                session: null,
                error: {
                    message: 'Sign up failed',
                    details: signUpError.message,
                },
            };
        }

        user_id = signUpData.user?.id;

        if (user_id) {
            const { error: profileError } = await supabaseAdmin
                .from('profiles')
                .insert([
                    {
                        user_id,
                        firstName,
                        lastName,
                    },
                ]);

            if (profileError) {
                await supabaseAdmin.auth.admin.deleteUser(user_id);
                return {
                    user: signUpData.user,
                    session: signUpData.session,
                    error: {
                        message: 'Sign up failed',
                        details: profileError.message,
                    },
                };
            }
        }

        return {
            user: signUpData.user,
            session: signUpData.session,
            error: null,
        };
    } catch (err) {
        if (user_id) {
            await supabaseAdmin.auth.admin.deleteUser(user_id);
        }
        return {
            user: null,
            session: null,
            error: {
                message: 'Unexpected error during sign up',
                details: err instanceof Error ? err.message : String(err),
            },
        };
    }
};
