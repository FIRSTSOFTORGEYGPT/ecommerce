import React, { Component, ErrorInfo, ReactNode } from 'react';
import { toast } from 'react-toastify';

interface Props {
    children: ReactNode;
    fallback?: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
}

/**
 * ErrorBoundary - A React error boundary component.
 *
 * Catches JavaScript errors anywhere in the child component tree,
 * logs them, displays a fallback UI, and shows a toast notification.
 */
class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
        error: null,
    };

    public static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        // Log to console in development
        console.error('ErrorBoundary caught an error:', error, errorInfo);

        // Show toast notification
        toast.error('Something went wrong. Please try again or refresh the page.', {
            toastId: 'error-boundary-toast', // Prevent duplicate toasts
            autoClose: 5000,
        });

        // TODO: In production, send to error monitoring service (e.g., Sentry)
        // if (process.env.NODE_ENV === 'production') {
        //   Sentry.captureException(error);
        // }
    }

    private handleRetry = () => {
        this.setState({ hasError: false, error: null });
    };

    public render() {
        if (this.state.hasError) {
            // Custom fallback UI or default
            if (this.props.fallback) {
                return this.props.fallback;
            }

            return (
                <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
                    <div className="max-w-md w-full text-center">
                        {/* Error Icon */}
                        <div className="mx-auto w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mb-6">
                            <svg
                                className="w-12 h-12 text-red-500"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                                />
                            </svg>
                        </div>

                        {/* Title */}
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">
                            Oops! Something went wrong
                        </h1>

                        {/* Description */}
                        <p className="text-gray-600 mb-6">
                            We're sorry, but something unexpected happened. Please try refreshing
                            the page or click the button below.
                        </p>

                        {/* Error details (development only) */}
                        {process.env.NODE_ENV === 'development' && this.state.error && (
                            <div className="mb-6 p-4 bg-red-50 rounded-lg text-left">
                                <p className="text-sm font-mono text-red-700 break-all">
                                    {this.state.error.message}
                                </p>
                            </div>
                        )}

                        {/* Actions */}
                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                            <button
                                onClick={this.handleRetry}
                                className="px-6 py-3 bg-black text-white font-medium rounded-lg hover:bg-gray-800 transition-colors"
                            >
                                Try Again
                            </button>
                            <button
                                onClick={() => window.location.reload()}
                                className="px-6 py-3 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors"
                            >
                                Refresh Page
                            </button>
                        </div>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
