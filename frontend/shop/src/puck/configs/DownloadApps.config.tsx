import type { ComponentConfig } from "@measured/puck";
import DownloadApps from "../../components/common/download-apps";

export interface DownloadAppsProps {
    className?: string;
    titleKey?: string;
    subTitleKey?: string;
    appImageUrl?: string;
    appButtons?: {
        slug: string;
        altTextKey: string;
        appButton: string;
        buttonWidth: number;
        buttonHeight: number;
    }[];
}

export const DownloadAppsConfig: ComponentConfig<DownloadAppsProps> = {
    label: "Download Apps",
    fields: {
        className: {
            type: "text",
            label: "Class Name",
        },
        titleKey: {
            type: "text",
            label: "Title Translation Key",
        },
        subTitleKey: {
            type: "text",
            label: "Subtitle Translation Key",
        },
        appImageUrl: {
            type: "text",
            label: "App Image URL",
        },
        appButtons: {
            type: "array",
            label: "Store Buttons",
            getItemSummary: (item) => item.altTextKey || "Button",
            arrayFields: {
                slug: { type: "text", label: "Link" },
                altTextKey: { type: "text", label: "Alt Text Key" },
                appButton: { type: "text", label: "Button Image URL" },
                buttonWidth: { type: "number", label: "Width" },
                buttonHeight: { type: "number", label: "Height" },
            },
        },
    },
    defaultProps: {
        className: "",
        titleKey: "app-heading",
        subTitleKey: "app-sub-heading",
        appImageUrl: "/assets/images/app.png",
        appButtons: [
            {
                slug: "/#",
                altTextKey: "button-app-store",
                appButton: "/assets/images/app-store.png",
                buttonWidth: 209,
                buttonHeight: 60,
            },
            {
                slug: "/#",
                altTextKey: "button-play-store",
                appButton: "/assets/images/play-store.png",
                buttonWidth: 209,
                buttonHeight: 60,
            },
        ],
    },
    render: (props) => {
        const buttons = props.appButtons?.map((b, idx) => ({
            ...b,
            slug: b.slug && b.slug.trim().length > 0 ? b.slug : "/#",
            id: idx + 1,
        }));
        return <DownloadApps {...props} appButtons={buttons} />;
    },
};
