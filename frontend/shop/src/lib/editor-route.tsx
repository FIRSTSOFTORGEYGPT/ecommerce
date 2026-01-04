import { useUser } from '@framework/auth';
import { useRouter } from 'next/router';
import { useAtom } from 'jotai';
import { authorizationAtom } from '@store/authorization-atom';
import { BackArrowRound } from '@components/icons/back-arrow-round';
import LoginForm from '@components/auth/login-form';
import { useHasMounted } from './use-has-mounted';
import dynamic from 'next/dynamic';

import { useEffect, useState } from 'react';

const Spinner = dynamic(
    () => import('@components/ui/loaders/spinner/spinner'),
    { ssr: false }
);

/**
 * EditorRoute - A wrapper component that restricts access to editor-only routes.
 * 
 * This component checks if the current user has the "editor" role.
 * - Not authenticated: Shows login form
 * - Authenticated but not editor: Redirects to 403 Forbidden page
 * - Authenticated editor: Renders children
 */
const EditorRoute: React.FC<{ children?: React.ReactNode }> = ({
    children,
}) => {
    const router = useRouter();
    const [isAuthorized] = useAtom(authorizationAtom);
    const hasMounted = useHasMounted();
    const { me, loading } = useUser();

    const [isRedirecting, setIsRedirecting] = useState(false);
    const isUser = !!me;

    // Handle redirect for non-editor users
    useEffect(() => {
        if (!loading && isAuthorized && me && me.role !== 'editor' && !isRedirecting) {
            setIsRedirecting(true);
            router.replace('/403');
        }
    }, [loading, isAuthorized, me, router, isRedirecting]);

    // Show spinner while loading or redirecting
    if (loading || isRedirecting) {
        return (
            <div className="flex items-center justify-center w-full h-screen">
                <Spinner showText={false} />
            </div>
        );
    }

    // Not authenticated - show login form
    if (!isUser && !isAuthorized && hasMounted) {
        return (
            <div className="relative flex justify-center w-full py-5 md:py-8">
                <button
                    className="absolute flex items-center justify-center w-8 h-8 text-gray-200 transition-colors md:w-16 md:h-16 top-5 md:top-1/2 ltr:left-5 ltr:md:left-10 rtl:right-5 rtl:md:right-10 md:-mt-8 md:text-gray-300 hover:text-gray-400"
                    onClick={router.back}
                >
                    <BackArrowRound />
                </button>
                <div className="py-16 lg:py-24">
                    <LoginForm />
                </div>
            </div>
        );
    }

    // Authenticated editor - render children
    if (isUser && isAuthorized && me?.role === 'editor') {
        return <>{children}</>;
    }

    // Fallback spinner (session being fetched)
    return (
        <div className="flex items-center justify-center w-full h-screen">
            <Spinner showText={false} />
        </div>
    );
};

export default EditorRoute;
