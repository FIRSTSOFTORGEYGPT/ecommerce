import type { Data } from "@measured/puck";
import { Render } from "@measured/puck";
import config from "../puck/puck.config";
import { getPage } from "../lib/get-page";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

interface PageProps {
    data: Data;
}

import Container from "@components/ui/container";
import { getLayout } from "@components/layout/layout";

export default function HomepageTest({ data }: PageProps) {
    return (
        <>
            <Head>
                <title>Homepage Test (Dynamic)</title>
            </Head>
            <Container>
                <Render config={config} data={data} />
            </Container>
        </>
    );
}

HomepageTest.getLayout = getLayout;

export const getServerSideProps: GetServerSideProps<PageProps> = async (context) => {
    // Explicitly fetch the 'homepage' slug for this test route
    const data = await getPage("/homepage");

    if (!data) {
        return {
            notFound: true,
        };
    }

    return {
        props: {
            data,
            ...(await serverSideTranslations(context.locale!, ["common"])),
        },
    };
};
