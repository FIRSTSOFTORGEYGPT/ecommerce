import { useUser } from '@framework/auth';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { MdEdit } from 'react-icons/md';

/**
 * EditPageButton - A button that appears in the header for editor users.
 * 
 * When clicked, navigates to the current page + "/edit" to open the Puck editor.
 * Only visible for authenticated users with the "editor" role.
 */
const EditPageButton: React.FC = () => {
    const { t } = useTranslation('common');
    const { me, isAuthorized } = useUser();
    const router = useRouter();

    // Only show for authenticated editors
    if (!isAuthorized || me?.role !== 'editor') {
        return null;
    }

    // Don't show on edit pages (already in editor)
    if (router.asPath.endsWith('/edit')) {
        return null;
    }

    const editUrl = `${router.asPath.replace(/\/$/, '')}/edit`;

    return (
        <a
            href={editUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5 px-3 py-2 text-sm font-medium text-white bg-black hover:bg-black/80 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
            aria-label={t('text-edit-this-page')}
        >
            <MdEdit className="w-4 h-4" />
            <span className="hidden sm:inline">{t('text-edit-this-page')}</span>
        </a>
    );
};

export default EditPageButton;
