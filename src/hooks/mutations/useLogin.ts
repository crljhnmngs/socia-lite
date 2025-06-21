import { useMutation } from '@tanstack/react-query';
import { LoginFormData } from '@/lib/validation/loginSchema';
import { login } from '@/lib/api/auth/login';

export function useLogin() {
    const mutation = useMutation({
        mutationFn: async (data: LoginFormData) => {
            const result = await login(data);
            return result;
        },
    });
    return {
        userLogin: mutation.mutate,
        isLoading: mutation.isPending,
        ...mutation,
    };
}
