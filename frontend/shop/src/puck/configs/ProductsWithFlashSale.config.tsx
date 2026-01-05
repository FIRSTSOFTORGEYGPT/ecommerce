/**
 * ProductsWithFlashSale Puck Configuration - Essential Settings Only
 */

import type { ComponentConfig } from "@measured/puck";
import ProductsWithFlashSale from "../../containers/products-with-flash-sale";

export interface ProductsWithFlashSaleProps {
    // Essential Settings
    limit: number;
    sidebarPosition: "left" | "right";
    gridGap: "none" | "small" | "medium" | "large";

    // Sidebar Settings
    sidebarEnabled: boolean;
    sidebarSource: "popular" | "filtered";
    sidebarLimit: number;
    sidebarHeading: string;
    sidebarLinkSlug: string;

    // Dynamic Data Source
    filterType: "tag" | "category";
    tagSlug?: string;
    categorySlug?: string;
}

export const ProductsWithFlashSaleConfig: ComponentConfig<ProductsWithFlashSaleProps> = {
    label: "Products with Flash Sale Sidebar",
    fields: {
        limit: {
            type: "number",
            label: "Flash Sale Product Limit",
            min: 4,
            max: 15,
        },
        sidebarPosition: {
            type: "select",
            label: "Flash Sale Sidebar Position",
            options: [
                { label: "Left", value: "left" },
                { label: "Right", value: "right" },
            ],
        },
        sidebarEnabled: {
            type: "radio",
            label: "Show Sidebar",
            options: [
                { label: "Yes", value: true },
                { label: "No", value: false },
            ],
        },
        sidebarSource: {
            type: "select",
            label: "Sidebar Source",
            options: [
                { label: "Popular", value: "popular" },
                { label: "Filtered (Tag/Category)", value: "filtered" },
            ],
        },
        sidebarLimit: {
            type: "number",
            label: "Sidebar Product Limit",
            min: 2,
            max: 12,
        },
        sidebarHeading: {
            type: "text",
            label: "Sidebar Heading",
        },
        sidebarLinkSlug: {
            type: "text",
            label: "Sidebar Link Slug (e.g. /search)",
        },
        // Dynamic Data Source
        filterType: {
            type: "select",
            label: "Filter Flash Sale By",
            options: [
                { label: "Tag", value: "tag" },
                { label: "Category", value: "category" },
            ],
        },
        tagSlug: {
            type: "select",
            label: "Select Tag",
            options: [],
        },
        categorySlug: {
            type: "select",
            label: "Select Category",
            options: [],
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
        limit: 10,
        sidebarPosition: "right",
        gridGap: "medium",
        sidebarEnabled: true,
        sidebarSource: "popular",
        sidebarLimit: 4,
        sidebarHeading: "Top Products",
        sidebarLinkSlug: "/search",
        filterType: "tag",
        tagSlug: "",
        categorySlug: "",
    },
    render: (props) => {
        const safeProps = {
            ...props,
            tagSlug: props.filterType === "tag" ? props.tagSlug : undefined,
            categorySlug: props.filterType === "category" ? props.categorySlug : undefined,
        };

        return <ProductsWithFlashSale {...safeProps} />;
    },
};
