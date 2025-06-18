import { LoadingProps, LoadingSize } from '@/types';

export const Loading = ({
    variant = 'fullscreen',
    size = 'md',
    text = 'Loading...',
}: LoadingProps) => {
    if (variant === 'fullscreen') {
        return <FullscreenLoading text={text} />;
    }

    if (variant === 'skeleton') {
        return <SkeletonLoading size={size} />;
    }

    return <InlineLoading size={size} text={text} />;
};

const FullscreenLoading = ({ text }: { text: string }) => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-white">
            <div className="text-center">
                <div className="mb-6">
                    <div className="w-12 h-12 animate-spin mx-auto">
                        <svg
                            className="w-full h-full text-blue-600"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                            />
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            />
                        </svg>
                    </div>
                </div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                    {text}
                </h2>
                <p className="text-gray-600">
                    Please wait while we prepare everything for you
                </p>
            </div>
        </div>
    );
};

const InlineLoading = ({ size, text }: { size: LoadingSize; text: string }) => {
    const sizeClasses = {
        sm: 'w-4 h-4',
        md: 'w-6 h-6',
        lg: 'w-8 h-8',
    };

    const textSizes = {
        sm: 'text-sm',
        md: 'text-base',
        lg: 'text-lg',
    };

    return (
        <div className="flex items-center justify-center space-x-3">
            <div className={`${sizeClasses[size]} animate-spin`}>
                <svg
                    className="w-full h-full text-blue-600"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                    />
                    <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                </svg>
            </div>
            <span className={`${textSizes[size]} text-gray-600 font-medium`}>
                {text}
            </span>
        </div>
    );
};

const SkeletonLoading = ({ size }: { size: LoadingSize }) => {
    const sizeClasses = {
        sm: 'h-4',
        md: 'h-6',
        lg: 'h-8',
    };

    return (
        <div className="animate-pulse">
            <div className={`${sizeClasses[size]} bg-gray-200 rounded`}></div>
        </div>
    );
};

// Specific loading components for common use cases
export const PostSkeleton = () => {
    return (
        <div className="animate-pulse space-y-4">
            <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                <div className="flex-1">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2 mt-1"></div>
                </div>
            </div>
            <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                <div className="h-4 bg-gray-200 rounded w-4/6"></div>
            </div>
            <div className="flex space-x-4">
                <div className="h-4 bg-gray-200 rounded w-16"></div>
                <div className="h-4 bg-gray-200 rounded w-16"></div>
                <div className="h-4 bg-gray-200 rounded w-16"></div>
            </div>
        </div>
    );
};

export const ProfileSkeleton = () => {
    return (
        <div className="animate-pulse space-y-6">
            <div className="flex items-center space-x-4">
                <div className="w-20 h-20 bg-gray-200 rounded-full"></div>
                <div className="flex-1">
                    <div className="h-6 bg-gray-200 rounded w-1/3 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
            </div>
            <div className="space-y-3">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                <div className="h-4 bg-gray-200 rounded w-4/6"></div>
            </div>
        </div>
    );
};

export const FeedSkeleton = () => {
    return (
        <div className="space-y-6">
            {[1, 2, 3].map((i) => (
                <div key={i} className="animate-pulse space-y-4">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                        <div className="flex-1">
                            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                            <div className="h-3 bg-gray-200 rounded w-1/6 mt-1"></div>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <div className="h-4 bg-gray-200 rounded"></div>
                        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                    </div>
                    <div className="flex space-x-4">
                        <div className="h-4 bg-gray-200 rounded w-16"></div>
                        <div className="h-4 bg-gray-200 rounded w-16"></div>
                        <div className="h-4 bg-gray-200 rounded w-16"></div>
                    </div>
                </div>
            ))}
        </div>
    );
};
