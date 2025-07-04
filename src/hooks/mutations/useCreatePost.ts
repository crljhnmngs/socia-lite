import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createPost } from '@/lib/api/post/create';

type CreatePostInput = {
    user_id: string;
    content: string;
};

export function useCreatePost() {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: (data: CreatePostInput) => createPost(data),
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
