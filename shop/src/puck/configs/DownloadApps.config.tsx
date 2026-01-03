import type { ComponentConfig } from "@measured/puck";
import DownloadApps from "../../components/common/download-apps";

export interface DownloadAppsProps {
    className?: string;
}

export const DownloadAppsConfig: ComponentConfig<DownloadAppsProps> = {
    label: "Download Apps",
    fields: {
        className: {
            type: "text",
            label: "Class Name",
        },
    },
    defaultProps: {
        className: "",
    },
    render: (props) => <DownloadApps {...props} />,
};
