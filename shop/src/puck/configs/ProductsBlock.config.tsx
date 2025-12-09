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
    dataSource: string;

    // Essential Settings
    limit: number;
    gridColumns: number;
    gridGap: "none" | "small" | "medium" | "large";
}

const ProductsBlockWrapper: React.FC<ProductsBlockProps> = (props) => {
    const { limit } = props;
    const { data: products, isLoading, error } = useProducts({
        limit,
        // Using a general fetch or "featured" query if category slug is not passed (or defaulting)
    });

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
        dataSource: {
            type: "text",
            label: "Data Source",
        },
        limit: {
            type: "number",
            label: "Number of Products",
            min: 4,
            max: 20,
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
        sectionHeading: "Products Grid",
        dataSource: "Products",
        limit: 10,
        gridColumns: 5,
        gridGap: "medium",
    },
    render: (props) => <ProductsBlockWrapper {...props} />,
};
