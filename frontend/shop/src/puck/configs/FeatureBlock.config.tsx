/**
 * FeatureBlock Puck Configuration - Essential Settings Only
 */

import type { ComponentConfig } from "@measured/puck";
import FeatureBlock from "../../containers/feature-block";

export interface FeatureBlockProps {
    columns: 2 | 3 | 4;
    gridGap: "none" | "small" | "medium" | "large";
}

export const FeatureBlockConfig: ComponentConfig<FeatureBlockProps> = {
    label: "Features Block",
    fields: {
        columns: {
            type: "select",
            label: "Columns",
            options: [
                { label: "2 Columns", value: 2 },
                { label: "3 Columns", value: 3 },
                { label: "4 Columns", value: 4 },
            ],
        },
        gridGap: {
            type: "select",
            label: "Grid Gap",
            options: [
                { label: "None", value: "none" },
                { label: "Small", value: "small" },
                { label: "Medium", value: "medium" },
                { label: "Large", value: "large" },
            ],
        },
    },
    defaultProps: {
        columns: 4,
        gridGap: "medium",
    },
    render: (props) => <FeatureBlock {...props} />,
};
