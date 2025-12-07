/**
 * ProductsFeatured Puck Configuration - Essential Settings Only
 */

import type { ComponentConfig } from "@measured/puck";
import ProductsFeatured from "../../containers/products-featured";

export interface ProductsFeaturedProps {
    // Content Settings
    sectionHeading: string;
    categorySlug: string; // Data Source

    // Essential Settings
    limit: number;
    variant: "flat" | "left" | "center" | "combined" | "fashion";
    gridColumns: number;
    gridGap: "none" | "small" | "medium" | "large";
}

export const ProductsFeaturedConfig: ComponentConfig<ProductsFeaturedProps> = {
    label: "Products Featured",
    fields: {
        sectionHeading: {
            type: "text",
            label: "Section Heading",
            placeholder: "e.g., Featured Products",
        },
        categorySlug: {
            type: "text",
            label: "Data Source (Category Slug)",
            placeholder: "e.g., /search",
        },
        limit: {
            type: "number",
            label: "Number of Products",
            min: 2,
            max: 12,
        },
        variant: {
            type: "select",
            label: "Layout Variant",
            options: [
                { label: "Flat", value: "flat" },
                { label: "Left (Big First)", value: "left" },
                { label: "Center (Big Middle)", value: "center" },
                { label: "Combined", value: "combined" },
                { label: "Fashion", value: "fashion" },
            ],
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
        sectionHeading: "Featured Products",
        categorySlug: "/search",
        limit: 8,
        variant: "left",
        gridColumns: 4,
        gridGap: "medium",
    },
    render: (props) => <ProductsFeatured {...props} />,
};
