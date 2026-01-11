import type { Data } from "@measured/puck";
import { Render } from "@measured/puck";
import config from "../puck/puck.config";
import { getPage } from "../lib/get-page";
import { GetServerSideProps } from "next";

interface PageProps {
    data: Data | null;
    path: string;
}

import { useUser } from "@framework/auth";
import { isEditor } from "@lib/auth-utils";

export default function PuckPage({ data, path }: PageProps) {
    const { me, isAuthorized } = useUser();
    const canEdit = isAuthorized && isEditor(me?.role);

    if (!data) {
        return (
            <div style={{ padding: "2rem", textAlign: "center" }}>
                <h1>Page Not Found</h1>
                <p>
                    No content found for <strong>{path}</strong>
                </p>
                {canEdit && (
                    <p>
                        <a href={`${path}/edit`} style={{ color: "blue", textDecoration: "underline" }}>
                            Create this page in the editor
                        </a>
                    </p>
                )}
            </div>
        );
    }

    return <Render config={config} data={data} />;
}

export const getServerSideProps: GetServerSideProps<PageProps> = async (context) => {
    const { params } = context;
    const puckPath = params?.puckPath as string[] | undefined;

    // Exclude system paths
    if (puckPath && (puckPath[0] === '_next' || puckPath[0] === 'api')) {
        return { notFound: true };
    }

    const path = `/${(puckPath || []).join("/")}`;

    // getPage is async now
    const data = await getPage(path);

    if (!data) {
        return {
            notFound: true,
        };
    }

    return {
        props: {
            data,
            path,
        },
    };
};
