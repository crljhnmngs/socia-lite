import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createPost } from '@/lib/api/post/create';
import { CreatePostInput } from '@/types';

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
