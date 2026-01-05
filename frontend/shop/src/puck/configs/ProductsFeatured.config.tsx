/**
 * ProductsFeatured Puck Configuration - Essential Settings Only
 */

import type { ComponentConfig } from "@measured/puck";
import ProductsFeatured from "../../containers/products-featured";

export interface ProductsFeaturedProps {
    // Content Settings
    sectionHeading: string;
    filterType: "tag" | "category";
    tagSlug?: string;
    categorySlug?: string;

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
        // Dynamic Data Source
        filterType: {
            type: "select",
            label: "Filter By",
            options: [
                { label: "Tag", value: "tag" },
                { label: "Category", value: "category" },
            ],
        },
        // Dynamic Data Source: Tag
        tagSlug: {
            type: "select",
            label: "Select Tag",
            options: [], // Populated dynamically in client.tsx
        },
        // Dynamic Data Source: Category
        categorySlug: {
            type: "select",
            label: "Select Category",
            options: [], // Populated dynamically in client.tsx
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
        sectionHeading: "Featured Products",
        filterType: "tag",
        tagSlug: "",
        categorySlug: "",
        limit: 8,
        variant: "left",
        gridColumns: 4,
        gridGap: "medium",
    },
    render: (props) => {
        const safeProps = {
            ...props,
            tagSlug: props.filterType === "tag" ? props.tagSlug : undefined,
            categorySlug: props.filterType === "category" ? props.categorySlug : undefined,
        };

        return <ProductsFeatured {...safeProps} />;
    },
};
