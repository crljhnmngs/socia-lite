'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ErrorBoundaryProps, ErrorBoundaryState } from '@/types';

class ErrorBoundary extends React.Component<
    ErrorBoundaryProps,
    ErrorBoundaryState
> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: Error): ErrorBoundaryState {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        console.error('Error caught by boundary:', error, errorInfo);
    }

    resetError = () => {
        this.setState({ hasError: false, error: undefined });
    };

    render() {
        if (this.state.hasError) {
            if (this.props.fallback) {
                const FallbackComponent = this.props.fallback;
                return (
                    <FallbackComponent
                        error={this.state.error}
                        resetError={this.resetError}
                    />
                );
            }

            return (
                <DefaultErrorFallback
                    error={this.state.error}
                    resetError={this.resetError}
                />
            );
        }

        return this.props.children;
    }
}

const DefaultErrorFallback = ({
    error,
    resetError,
}: {
    error?: Error;
    resetError: () => void;
}) => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="max-w-md w-full mx-auto text-center">
                <div className="mb-6">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
                        <svg
                            className="w-8 h-8 text-red-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                            />
                        </svg>
                    </div>
                </div>

                <div className="mb-8">
                    <h1 className="text-2xl font-semibold text-gray-900 mb-3">
                        Something went wrong
                    </h1>
                    <p className="text-gray-600 leading-relaxed">
                        We&apos;re sorry, but something unexpected happened. Our
                        team has been notified and is working to fix the issue.
                    </p>
                </div>

                {process.env.NODE_ENV === 'development' && error && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-left">
                        <h3 className="text-sm font-semibold text-red-800 mb-2">
                            Error Details:
                        </h3>
                        <p className="text-xs text-red-700 font-mono break-all">
                            {error.message}
                        </p>
                    </div>
                )}

                <div className="space-y-3">
                    <button
                        onClick={resetError}
                        className="block w-full bg-blue-600 text-white hover:bg-blue-700 px-6 py-3 rounded-lg font-medium transition-colors"
                    >
                        Try Again
                    </button>
                    <Link
                        href="/"
                        className="block w-full bg-gray-100 text-gray-700 hover:bg-gray-200 px-6 py-3 rounded-lg font-medium transition-colors"
                    >
                        Go Home
                    </Link>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-200">
                    <p className="text-sm text-gray-500 mb-3">
                        Still having issues?
                    </p>
                    <div className="flex flex-wrap justify-center gap-4 text-sm">
                        <Link
                            href="/help"
                            className="text-blue-600 hover:text-blue-700 hover:underline"
                        >
                            Help Center
                        </Link>
                        <Link
                            href="/contact"
                            className="text-blue-600 hover:text-blue-700 hover:underline"
                        >
                            Contact Support
                        </Link>
                    </div>
                </div>

                <div className="mt-8 opacity-20">
                    <Image
                        src="/globe.svg"
                        alt="SociaLite"
                        width={32}
                        height={32}
                        className="mx-auto"
                    />
                </div>
            </div>
        </div>
    );
};

export default ErrorBoundary;
