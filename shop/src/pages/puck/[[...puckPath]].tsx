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
    data: Partial<Data>;
}

export default function PuckEditor({ path, data }: PuckEditorProps) {
    return (
        <EditorRoute>
            <Head>
                <title>Puck Editor: {path}</title>
            </Head>
            <Client path={path} data={data || {}} />
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
            data: data || {},
            ...(await serverSideTranslations(context.locale!, ["common"])),
        },
    };
};
