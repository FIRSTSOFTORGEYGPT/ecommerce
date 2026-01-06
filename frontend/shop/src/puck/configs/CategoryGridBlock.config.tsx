/**
 * CategoryGridBlock Puck Configuration - Essential Settings Only
 */

import type { ComponentConfig } from "@measured/puck";
import CategoryGridBlock from "../../containers/category-grid-block";

export interface CategoryGridBlockProps {
    sectionHeading: string;
    limit: number;
    gridColumns: number;
    gridGap: "none" | "small" | "medium" | "large";
}

export const CategoryGridBlockConfig: ComponentConfig<CategoryGridBlockProps> = {
    label: "Categories Grid",
    fields: {
        sectionHeading: {
            type: "text",
            label: "Section Heading",
        },
        limit: {
            type: "number",
            label: "Number of Categories",
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
        sectionHeading: "Featured Categories",
        limit: 6,
        gridColumns: 4,
        gridGap: "medium",
    },
    render: (props) => <CategoryGridBlock {...props} />,
};
