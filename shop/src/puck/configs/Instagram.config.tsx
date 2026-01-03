import type { ComponentConfig } from "@measured/puck";
import Instagram from "../../components/common/instagram";

export interface InstagramProps {
    className?: string;
}

export const InstagramConfig: ComponentConfig<InstagramProps> = {
    label: "Instagram Feed",
    fields: {
        className: {
            type: "text",
            label: "Class Name",
        },
    },
    defaultProps: {
    },
    render: (props) => <Instagram {...props} />,
};
