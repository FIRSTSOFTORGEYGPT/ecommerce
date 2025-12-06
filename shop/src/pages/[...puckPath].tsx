import type { Data } from "@measured/puck";
import { Render } from "@measured/puck";
import config from "../puck/puck.config";
import { getPage } from "../lib/get-page";
import { GetStaticPaths, GetStaticProps } from "next";

interface PageProps {
    data: Data | null;
    path: string;
}

export default function PuckPage({ data, path }: PageProps) {
    if (!data) {
        return (
            <div style={{ padding: "2rem", textAlign: "center" }}>
                <h1>Page Not Found</h1>
                <p>
                    No content found for <strong>{path}</strong>
                </p>
                <p>
                    <a href={`${path}/edit`} style={{ color: "blue", textDecoration: "underline" }}>
                        Create this page in the editor
                    </a>
                </p>
            </div>
        );
    }

    return <Render config={config} data={data} />;
}

export const getStaticProps: GetStaticProps<PageProps> = async (context) => {
    const { params } = context;
    const puckPath = params?.puckPath as string[] | undefined;
    const path = `/${(puckPath || []).join("/")}`;

    const data = getPage(path);

    return {
        props: {
            data,
            path,
        },
        // Enable Incremental Static Regeneration
        revalidate: 10, // Revalidate every 10 seconds
    };
};

export const getStaticPaths: GetStaticPaths = async () => {
    // Return empty paths initially, pages will be generated on-demand
    return {
        paths: [],
        fallback: "blocking", // Generate pages on-demand
    };
};
