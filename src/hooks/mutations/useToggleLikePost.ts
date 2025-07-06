import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ToggleLikePostInput } from '@/types';
import { toggleLikePost } from '@/lib/api/post/toggleLike';

export function useToggleLikePost() {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: (data: ToggleLikePostInput) => toggleLikePost(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['posts'] });
        },
    });

    return {
        toggleLikePost: mutation.mutate,
        isLoading: mutation.isPending,
        ...mutation,
    };
}
