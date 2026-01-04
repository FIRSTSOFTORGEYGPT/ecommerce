/**
 * ContactInfo Puck Configuration - Full Professional Settings
 */

import type { ComponentConfig } from "@measured/puck";
import ContactInfoBlock from "../../containers/contact-info";

export interface ContactInfoProps {
    // Layout Settings
    layout: "row" | "column";
    columns: 2 | 3 | 4;
    gridGap: "none" | "small" | "medium" | "large";
    containerWidth: "full" | "container" | "narrow";

    // Content Settings
    iconSize: "small" | "medium" | "large";
    textSize: "small" | "medium" | "large";
    alignment: "left" | "center" | "right";
    showIcon: boolean;
}

export const ContactInfoConfig: ComponentConfig<ContactInfoProps> = {
    label: "Contact Info",
    fields: {
        layout: {
            type: "select",
            label: "Layout Direction",
            options: [
                { label: "Row (Horizontal)", value: "row" },
                { label: "Column (Vertical)", value: "column" },
            ],
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
        containerWidth: {
            type: "select",
            label: "Container Width",
            options: [
                { label: "Full Width", value: "full" },
                { label: "Container", value: "container" },
                { label: "Narrow", value: "narrow" },
            ],
        },
        iconSize: {
            type: "select",
            label: "Icon Size",
            options: [
                { label: "Small", value: "small" },
                { label: "Medium", value: "medium" },
                { label: "Large", value: "large" },
            ],
        },
        textSize: {
            type: "select",
            label: "Text Size",
            options: [
                { label: "Small", value: "small" },
                { label: "Medium", value: "medium" },
                { label: "Large", value: "large" },
            ],
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
        showIcon: {
            type: "radio",
            label: "Show Icons",
            options: [{ label: "Show", value: true }, { label: "Hide", value: false }],
        },
    },
    defaultProps: {
        layout: "column",
        columns: 3,
        gridGap: "medium",
        containerWidth: "container",
        iconSize: "medium",
        textSize: "medium",
        alignment: "left",
        showIcon: true,
    },
    render: (props) => <ContactInfoBlock {...props} />,
};
