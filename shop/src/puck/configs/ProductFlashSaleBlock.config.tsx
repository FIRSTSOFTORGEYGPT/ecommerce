/**
 * ProductFlashSaleBlock Puck Configuration - Essential Settings Only
 */

import type { ComponentConfig } from "@measured/puck";
import ProductsFlashSaleBlock from "../../containers/product-flash-sale-block";

export interface ProductFlashSaleBlockProps {
    sectionHeading: string;
    dataSource: string;
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
        sectionHeading: "Flash Sale",
        dataSource: "Flash Sale Products",
        limit: 10,
        gridColumns: 5,
        gridGap: "medium",
    },
    render: (props) => <ProductsFlashSaleBlock {...props} />,
};
