import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { SignupFormData } from '@/lib/validation/signupSchema';

export function useSignup() {
    const mutation = useMutation({
        mutationFn: async (data: SignupFormData) => {
            const response = await axios.post('/api/signup', data);
            return response.data;
        },
    });
    return {
        userSignup: mutation.mutate,
        isLoading: mutation.isPending,
        ...mutation,
    };
}
