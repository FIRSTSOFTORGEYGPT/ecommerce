/**
 * CategoryGridBlock Puck Configuration - Essential Settings Only
 */

import type { ComponentConfig } from "@measured/puck";
import CategoryGridBlock from "../../containers/category-grid-block";

export interface CategoryGridBlockProps {
    sectionHeading: string;
    dataSource: string;
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
        dataSource: {
            type: "text",
            label: "Data Source",
        },
        limit: {
            type: "number",
            label: "Number of Categories",
            min: 2,
            max: 12,
        },
        gridColumns: {
            type: "number",
            label: "Grid Columns (Desktop)",
            min: 2,
            max: 6,
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
        dataSource: "Featured Categories",
        limit: 6,
        gridColumns: 4,
        gridGap: "medium",
    },
    render: (props) => <CategoryGridBlock {...props} />,
};
