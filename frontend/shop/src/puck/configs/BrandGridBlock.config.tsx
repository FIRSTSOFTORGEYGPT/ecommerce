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
    gridColumns: number;
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
            label: "Total Brands",
            min: 2,
            max: 12,
        },
        gridColumns: {
            type: "select",
            label: "Grid Columns (Desktop)",
            options: [
                { label: "2 Columns", value: 2 },
                { label: "3 Columns", value: 3 },
                { label: "4 Columns", value: 4 },
                { label: "5 Columns", value: 5 },
                { label: "6 Columns", value: 6 },
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
        limit: 12,
        gridColumns: 6,
        gridGap: "medium",
    },
    render: (props) => <BrandGridBlock {...props} />,
};
