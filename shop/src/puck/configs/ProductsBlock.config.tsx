/**
 * ProductsBlock Puck Configuration - Essential Settings Only
 */

import React from "react";
import type { ComponentConfig } from "@measured/puck";
import ProductsBlock from "../../containers/products-block";
import { useProducts } from "@framework/products";

export interface ProductsBlockProps {
    // Content Settings
    sectionHeading: string;
    filterType: "tag" | "category";
    tagSlug?: string;
    categorySlug?: string;

    // Essential Settings
    limit: number;
    gridColumns: number;
    gridGap: "none" | "small" | "medium" | "large";
}

const ProductsBlockWrapper: React.FC<ProductsBlockProps> = (props) => {
    const { limit, filterType, tagSlug, categorySlug } = props;

    const queryOptions: any = { limit };
    if (filterType === 'tag' && tagSlug) queryOptions.tags = tagSlug;
    if (filterType === 'category' && categorySlug) queryOptions.category = categorySlug;

    const { data: products, isLoading, error } = useProducts(queryOptions);

    return (
        <ProductsBlock
            {...props}
            products={products || []}
            loading={isLoading}
            error={error?.message}
        />
    );
};

export const ProductsBlockConfig: ComponentConfig<ProductsBlockProps> = {
    label: "Products Grid",
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
        sectionHeading: "Products Grid",
        filterType: "tag",
        tagSlug: "",
        categorySlug: "",
        limit: 10,
        gridColumns: 5,
        gridGap: "medium",
    },
    render: (props) => <ProductsBlockWrapper {...props} />,
};
