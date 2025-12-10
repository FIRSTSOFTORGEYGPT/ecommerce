/**
 * BrandGridBlock Puck Configuration - Essential Settings Only
 */

import type { ComponentConfig } from "@measured/puck";
import BrandGridBlock from "../../containers/brand-grid-block";

export interface BrandGridBlockProps {
    // Content Settings
    sectionHeading: string;

    // Essential Settings
    limit: number;
    variant: "6column" | "4column";
    gridGap: "none" | "small" | "medium" | "large";
}

export const BrandGridBlockConfig: ComponentConfig<BrandGridBlockProps> = {
    label: "Brands Grid",
    fields: {
        sectionHeading: {
            type: "text",
            label: "Section Heading",
            placeholder: "e.g., Popular Brands",
        },
        limit: {
            type: "number",
            label: "Number of Brands",
            min: 4,
            max: 16,
        },
        variant: {
            type: "select",
            label: "Layout Variant",
            options: [
                { label: "4 Columns", value: "4column" },
                { label: "6 Columns", value: "6column" },
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
        sectionHeading: "Popular Brands",
        limit: 8,
        variant: "4column",
        gridGap: "medium",
    },
    render: (props) => <BrandGridBlock {...props} />,
};
