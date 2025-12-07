/**
 * BrandBlock Puck Configuration - Essential Settings Only
 */

import type { ComponentConfig } from "@measured/puck";
import BrandBlock from "../../containers/brand-block";

export interface BrandBlockProps {
    sectionHeading: string;
    limit: number;
    autoplay: boolean;
    autoplaySpeed: string;
    loop: boolean;
    showArrows: boolean;
}

export const BrandBlockConfig: ComponentConfig<BrandBlockProps> = {
    label: "Brands Carousel",
    fields: {
        sectionHeading: {
            type: "text",
            label: "Section Heading",
        },
        limit: {
            type: "number",
            label: "Number of Brands",
            min: 6,
            max: 20,
        },
        autoplay: {
            type: "radio",
            label: "Auto-Rotate",
            options: [{ label: "Enabled", value: true }, { label: "Disabled", value: false }],
        },
        autoplaySpeed: {
            type: "text",
            label: "Autoplay Speed (ms)",
            placeholder: "3000",
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
        sectionHeading: "Shop by Brand",
        limit: 16,
        autoplay: true,
        autoplaySpeed: "3000",
        loop: true,
        showArrows: true,
    },
    render: (props) => {
        const speed = parseInt(props.autoplaySpeed) || 3000;
        return <BrandBlock {...props} autoplaySpeed={speed} />;
    },
};
