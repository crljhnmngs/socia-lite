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
