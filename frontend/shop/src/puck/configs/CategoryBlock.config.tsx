/**
 * CategoryBlock Puck Configuration - Essential Settings Only
 */

import type { ComponentConfig } from "@measured/puck";
import CategoryBlock from "../../containers/category-block";

export interface CategoryBlockProps {
    sectionHeading: string;
    limit: number;
    visibleItems: number;
    variant: "rounded" | "circle" | "modern" | "elegant";
    autoplay: boolean;
    autoplaySpeed: string;
    loop: boolean;
    showArrows: boolean;
}

export const CategoryBlockConfig: ComponentConfig<CategoryBlockProps> = {
    label: "Categories Carousel",
    fields: {
        sectionHeading: {
            type: "text",
            label: "Section Heading",
        },
        limit: {
            type: "number",
            label: "Number of Categories",
            min: 4,
            max: 16,
        },
        visibleItems: {
            type: "select",
            label: "Visible Items (Desktop)",
            options: [
                { label: "4 Items", value: 4 },
                { label: "5 Items", value: 5 },
                { label: "6 Items", value: 6 },
                { label: "7 Items", value: 7 },
                { label: "8 Items", value: 8 },
            ],
        },
        variant: {
            type: "select",
            label: "Card Style",
            options: [
                { label: "Rounded", value: "rounded" },
                { label: "Circle", value: "circle" },
                { label: "Modern", value: "modern" },
                { label: "Elegant", value: "elegant" },
            ],
        },
        autoplay: {
            type: "radio",
            label: "Auto-Rotate",
            options: [{ label: "Enabled", value: true }, { label: "Disabled", value: false }],
        },
        autoplaySpeed: {
            type: "text",
            label: "Autoplay Speed (ms)",
            placeholder: "3500",
        },
        loop: {
            type: "radio",
            label: "Infinite Loop",
            options: [{ label: "Enabled", value: true }, { label: "Disabled", value: false }],
        },
        showArrows: {
            type: "radio",
            label: "Navigation Arrows",
            options: [{ label: "Show", value: true }, { label: "Hide", value: false }],
        },
    },
    defaultProps: {
        sectionHeading: "Shop by Category",
        limit: 10,
        visibleItems: 6,
        variant: "circle",
        autoplay: true,
        autoplaySpeed: "3500",
        loop: true,
        showArrows: true,
    },
    render: (props) => {
        const speed = parseInt(props.autoplaySpeed) || 3500;
        return <CategoryBlock {...props} autoplaySpeed={speed} />;
    },
};
