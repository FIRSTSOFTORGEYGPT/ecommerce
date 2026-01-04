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
        filterType: "tag",
        tagSlug: "",
        categorySlug: "",
    },
    render: (props) => <ProductsWithFlashSale {...props} />,
};
