import type { ComponentConfig } from "@measured/puck";
import Support from "../../components/common/support";

export interface SupportProps {
    className?: string; // Support component might accept className, good to have just in case
    titleKey?: string;
    descriptionKey?: string;
    buttonTextKey?: string;
    supportImageUrl?: string;
    buttonUrlOverride?: string;
}

export const SupportConfig: ComponentConfig<SupportProps> = {
    label: "Support Section",
    fields: {
        className: {
            type: "text",
            label: "Class Name",
        },
        titleKey: {
            type: "text",
            label: "Title Translation Key",
        },
        descriptionKey: {
            type: "text",
            label: "Description Translation Key",
        },
        buttonTextKey: {
            type: "text",
            label: "Button Text Key",
        },
        supportImageUrl: {
            type: "text",
            label: "Support Image URL",
        },
        buttonUrlOverride: {
            type: "text",
            label: "Button URL Override",
        },
    },
    defaultProps: {
        className: "",
        titleKey: "support-heading",
        descriptionKey: "support-sub-heading",
        buttonTextKey: "button-chat-services",
        supportImageUrl: "/assets/images/support.png",
        buttonUrlOverride: "",
    },
    render: (props) => <Support {...props} />,
};
