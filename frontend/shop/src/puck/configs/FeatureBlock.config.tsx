/**
 * FeatureBlock Puck Configuration - Essential Settings Only
 */

import type { ComponentConfig } from "@measured/puck";
import FeatureBlock from "../../containers/feature-block";

export interface FeatureBlockProps {
    columns: 2 | 3 | 4;
    gridGap: "none" | "small" | "medium" | "large";
    items?: {
        icon: "shipping" | "refresh" | "secure" | "card";
        title: string;
        description: string;
    }[];
}

export const FeatureBlockConfig: ComponentConfig<FeatureBlockProps> = {
    label: "Features Block",
    fields: {
        items: {
            type: "array",
            label: "Features",
            min: 1,
            max: 6,
            getItemSummary: (item) => item.title || "Feature",
            arrayFields: {
                icon: {
                    type: "select",
                    label: "Icon",
                    options: [
                        { label: "Shipping", value: "shipping" },
                        { label: "Refresh", value: "refresh" },
                        { label: "Secure Payment", value: "secure" },
                        { label: "Card", value: "card" },
                    ],
                },
                title: { type: "text", label: "Title Key" },
                description: { type: "text", label: "Description Key" },
            },
        },
        columns: {
            type: "select",
            label: "Columns",
            options: [
                { label: "2 Columns", value: 2 },
                { label: "3 Columns", value: 3 },
                { label: "4 Columns", value: 4 },
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
        items: [
            { icon: "shipping", title: "feature-title-one", description: "feature-description-one" },
            { icon: "refresh", title: "feature-title-two", description: "feature-description-two" },
            { icon: "secure", title: "feature-title-three", description: "feature-description-three" },
            { icon: "card", title: "feature-title-four", description: "feature-description-four" },
        ],
        columns: 4,
        gridGap: "medium",
    },
    render: (props) => <FeatureBlock {...props} />,
};
