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
    },
    render: (props) => <ProductsWithFlashSale {...props} />,
};
