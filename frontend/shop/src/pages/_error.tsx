import { NextPageContext } from 'next';
import Link from 'next/link';

interface ErrorProps {
    statusCode?: number;
}

/**
 * Custom Error Page
 *
 * This page is rendered when an error occurs on the server or client.
 * It provides a user-friendly error message with options to go back or refresh.
 */
function Error({ statusCode }: ErrorProps) {
    const title =
        statusCode === 404
            ? 'Page Not Found'
            : statusCode === 500
                ? 'Server Error'
                : 'An Error Occurred';

    const message =
        statusCode === 404
            ? "We couldn't find the page you're looking for."
            : statusCode === 500
                ? 'Something went wrong on our end. Please try again later.'
                : 'An unexpected error occurred. Please try again.';

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="max-w-md w-full text-center">
                {/* Error Code */}
                <h1 className="text-8xl font-bold text-gray-200 mb-4">
                    {statusCode || '?'}
                </h1>

                {/* Title */}
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{title}</h2>

                {/* Description */}
                <p className="text-gray-600 mb-8">{message}</p>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Link
                        href="/"
                        className="px-6 py-3 bg-black text-white font-medium rounded-lg hover:bg-gray-800 transition-colors"
                    >
                        Go Home
                    </Link>
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

Error.getInitialProps = ({ res, err }: NextPageContext): ErrorProps => {
    const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
    return { statusCode };
};

export default Error;
