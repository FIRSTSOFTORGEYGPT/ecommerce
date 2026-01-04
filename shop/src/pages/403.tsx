import Layout from "@components/layout/layout";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import ForbiddenInformation from "@components/403/forbidden-information";

export default function ForbiddenPage() {
    return <ForbiddenInformation />;
}

ForbiddenPage.Layout = Layout;

export const getStaticProps = async ({ locale }: any) => {
    return {
        props: {
            ...(await serverSideTranslations(locale, [
                "common",
                "forms",
                "menu",
                "footer",
            ])),
        },
    };
};
