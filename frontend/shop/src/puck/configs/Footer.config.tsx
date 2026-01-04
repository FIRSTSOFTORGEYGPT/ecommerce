/**
 * Footer Puck Configuration - Full Professional Settings
 */

import type { ComponentConfig } from "@measured/puck";
import Footer from "../../components/layout/footer/footer";

export interface FooterProps {
    // Layout Settings
    columns: 3 | 4 | 5;
    gridGap: "none" | "small" | "medium" | "large";
    containerWidth: "full" | "container" | "narrow";

    // Content Settings
    showSocialLinks: boolean;
    showNewsletter: boolean;
    showPaymentIcons: boolean;
    alignment: "left" | "center" | "right";

    // Style Settings
    backgroundColor: string;
    textColor: string;
}

export const FooterConfig: ComponentConfig<FooterProps> = {
    label: "Footer",
    fields: {
        columns: {
            type: "select",
            label: "Columns",
            options: [
                { label: "3 Columns", value: 3 },
                { label: "4 Columns", value: 4 },
                { label: "5 Columns", value: 5 },
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
        containerWidth: {
            type: "select",
            label: "Container Width",
            options: [
                { label: "Full Width", value: "full" },
                { label: "Container", value: "container" },
                { label: "Narrow", value: "narrow" },
            ],
        },
        showSocialLinks: {
            type: "radio",
            label: "Social Links",
            options: [{ label: "Show", value: true }, { label: "Hide", value: false }],
        },
        showNewsletter: {
            type: "radio",
            label: "Newsletter Signup",
            options: [{ label: "Show", value: true }, { label: "Hide", value: false }],
        },
        showPaymentIcons: {
            type: "radio",
            label: "Payment Icons",
            options: [{ label: "Show", value: true }, { label: "Hide", value: false }],
        },
        alignment: {
            type: "select",
            label: "Text Alignment",
            options: [
                { label: "Left", value: "left" },
                { label: "Center", value: "center" },
                { label: "Right", value: "right" },
            ],
        },
        backgroundColor: { type: "text", label: "Background Color", placeholder: "#f8f8f8" },
        textColor: { type: "text", label: "Text Color", placeholder: "#333333" },
    },
    defaultProps: {
        columns: 4,
        gridGap: "large",
        containerWidth: "container",
        showSocialLinks: true,
        showNewsletter: true,
        showPaymentIcons: true,
        alignment: "left",
        backgroundColor: "#f8f8f8",
        textColor: "#333333",
    },
    render: (props) => <Footer {...props} />,
};
