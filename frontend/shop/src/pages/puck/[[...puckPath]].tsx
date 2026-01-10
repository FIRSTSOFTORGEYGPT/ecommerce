/**
 * This file implements a *magic* catch-all route that renders the Puck editor.
 *
 * This route exposes /puck/[[...puckPath]], but is disabled by middleware.ts. The middleware
 * then rewrites all URL requests ending in `/edit` to this route, allowing you to visit any
 * page in your application and add /edit to the end to spin up a Puck editor.
 *
 * This approach enables public pages to be statically rendered whilst the /puck route can
 * remain dynamic.
 *
 * Access is restricted to users with the "editor" role via EditorRoute.
 */

import "@measured/puck/puck.css";
import { Client } from "../../puck/client";
import { getPage } from "../../lib/get-page";
import { GetServerSideProps } from "next";
import type { Data } from "@measured/puck";
import Head from "next/head";
import EditorRoute from "@lib/editor-route";

interface PuckEditorProps {
    path: string;
    data: Partial<Data> | null;
}

export default function PuckEditor({ path, data }: PuckEditorProps) {
    if (!data) {
        return (
            <EditorRoute>
                <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4 text-center">
                    <h1 className="text-6xl font-bold text-gray-200 mb-4">404</h1>
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">Edit is not supported for this page</h2>
                    <p className="text-gray-600 mb-6 max-w-md">
                        The page you are trying to edit does not exist in the CMS or cannot be edited through this interface.
                    </p>
                    <a
                        href="/"
                        className="px-6 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors"
                    >
                        Go Home
                    </a>
                </div>
            </EditorRoute>
        );
    }

    return (
        <EditorRoute>
            <Head>
                <title>Puck Editor: {path}</title>
            </Head>
            <Client path={path} data={data} />
        </EditorRoute>
    );
}

import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export const getServerSideProps: GetServerSideProps<PuckEditorProps> = async (
    context
) => {
    const { puckPath = [] } = context.params as { puckPath?: string[] };
    const path = `/${puckPath.join("/")}`;
    const data = await getPage(path);

    return {
        props: {
            path,
            // Pass null if data is missing, so the component can handle it
            data: data || null,
            ...(await serverSideTranslations(context.locale!, ["common", "forms"])),
        },
    };
};
