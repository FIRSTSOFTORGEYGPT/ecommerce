/**
 * ExclusiveBlock Puck Configuration - Full Professional Settings
 */

import type { ComponentConfig } from "@measured/puck";
import ExclusiveBlock from "../../containers/exclusive-block";

export interface ExclusiveBlockProps {
    // Display Settings
    imageFit: "cover" | "contain";
    height: "auto" | "small" | "medium" | "large";

    // Overlay Settings
    overlayEnabled: boolean;
    overlayColor: string;
    overlayOpacity: number;

    // Layout Settings
    containerWidth: "full" | "container" | "narrow";
    gridGap: "none" | "small" | "medium" | "large";
}

export const ExclusiveBlockConfig: ComponentConfig<ExclusiveBlockProps> = {
    label: "Exclusive Collection Block",
    fields: {
        imageFit: {
            type: "select",
            label: "Image Fit",
            options: [{ label: "Cover", value: "cover" }, { label: "Contain", value: "contain" }],
        },
        height: {
            type: "select",
            label: "Height",
            options: [
                { label: "Auto", value: "auto" },
                { label: "Small", value: "small" },
                { label: "Medium", value: "medium" },
                { label: "Large", value: "large" },
            ],
        },
        overlayEnabled: {
            type: "radio",
            label: "Overlay",
            options: [{ label: "Enabled", value: true }, { label: "Disabled", value: false }],
        },
        overlayColor: { type: "text", label: "Overlay Color", placeholder: "#000000" },
        overlayOpacity: { type: "number", label: "Overlay Opacity (%)", min: 0, max: 100 },
        containerWidth: {
            type: "select",
            label: "Container Width",
            options: [
                { label: "Full Width", value: "full" },
                { label: "Container", value: "container" },
                { label: "Narrow", value: "narrow" },
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
        imageFit: "cover",
        height: "auto",
        overlayEnabled: false,
        overlayColor: "#000000",
        overlayOpacity: 20,
        containerWidth: "full",
        gridGap: "none",
    },
    render: (props) => <ExclusiveBlock {...props} />,
};
