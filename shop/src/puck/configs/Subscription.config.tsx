import type { ComponentConfig } from "@measured/puck";
import Subscription from "../../components/common/subscription";

export interface SubscriptionProps {
    className?: string;
}

export const SubscriptionConfig: ComponentConfig<SubscriptionProps> = {
    label: "Subscription Form",
    fields: {
        className: {
            type: "text",
            label: "Class Name",
        },
    },
    defaultProps: {
        className: "px-5 py-12 bg-opacity-0 sm:px-16 xl:px-0 md:py-14 xl:py-16", // Default from index.tsx
    },
    render: (props) => <Subscription {...props} />,
};
