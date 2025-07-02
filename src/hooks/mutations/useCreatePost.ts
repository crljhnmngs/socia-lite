import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createPost } from '@/lib/api/post/create';

type Data = {
    user_id: string;
    content: string;
};

export function useCreatePost() {
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: async (data: Data) => {
            const result = await createPost(data);
            return result;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['posts'] });
        },
    });
    return {
        createPost: mutation.mutate,
        isLoading: mutation.isPending,
        ...mutation,
    };
}
