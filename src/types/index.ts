export type ErrorProps = {
    error: Error & { digest?: string };
    reset: () => void;
};

export type ErrorBoundaryProps = {
    children: React.ReactNode;
    fallback?: React.ComponentType<{ error?: Error; resetError: () => void }>;
};

export type ErrorBoundaryState = {
    hasError: boolean;
    error?: Error;
};

export type LoadingSize = 'sm' | 'md' | 'lg';

export type LoadingProps = {
    variant?: 'fullscreen' | 'inline' | 'skeleton';
    size?: LoadingSize;
    text?: string;
};

export type Profile = {
    user_id: string;
    firstName: string;
    lastName: string;
    avatar_url?: string | null;
    role: string;
    created_at: string;
};

export type Post = {
    id: string;
    user_id: string;
    content: string;
    created_at: string;
    updated_at: string;
};

export type PostWithProfileAndLikes = Post & {
    public_profiles: Pick<
        Profile,
        'firstName' | 'lastName' | 'avatar_url'
    > | null;
    post_likes: { user_id: string }[];
    likesCount: number;
};

export type CreatePostInput = {
    user_id: string;
    content: string;
};

export type ToggleLikePostInput = {
    post_id: string;
    user_id: string;
};

export type GetPostsParams = {
    pageParam?: number;
    limit?: number;
};

export type GetPostsReturn = {
    posts: PostWithProfileAndLikes[];
    nextPage: number;
    total: number;
};
