import type { ComponentConfig } from "@measured/puck";
import Support from "../../components/common/support";

export interface SupportProps {
    className?: string; // Support component might accept className, good to have just in case
}

export const SupportConfig: ComponentConfig<SupportProps> = {
    label: "Support Section",
    fields: {
        className: {
            type: "text",
            label: "Class Name",
        },
    },
    defaultProps: {
    },
    render: (props) => <Support {...props} />,
};
