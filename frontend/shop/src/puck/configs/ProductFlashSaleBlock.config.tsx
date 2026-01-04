/**
 * ProductFlashSaleBlock Puck Configuration - Essential Settings Only
 */

import type { ComponentConfig } from "@measured/puck";
import ProductsFlashSaleBlock from "../../containers/product-flash-sale-block";

export interface ProductFlashSaleBlockProps {
    sectionHeading: string;
    filterType: "tag" | "category";
    tagSlug?: string;
    categorySlug?: string;
    limit: number;
    gridColumns: number;
    gridGap: "none" | "small" | "medium" | "large";
}

export const ProductFlashSaleBlockConfig: ComponentConfig<ProductFlashSaleBlockProps> = {
    label: "Flash Sale Products (Grid)",
    fields: {
        sectionHeading: {
            type: "text",
            label: "Section Heading",
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
            min: 4,
            max: 20,
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
        sectionHeading: "Flash Sale",
        filterType: "tag",
        tagSlug: "flash-sale",
        categorySlug: "",
        limit: 10,
        gridColumns: 5,
        gridGap: "medium",
    },
    render: (props) => <ProductsFlashSaleBlock {...props} />,
};
