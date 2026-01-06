import type { ComponentConfig } from "@measured/puck";
import Instagram from "../../components/common/instagram";

export interface InstagramProps {
    className?: string;
    limit?: number;
    columnsMobile?: 2 | 3 | 4;
    columnsDesktop?: 4 | 5 | 6 | 8;
    gap?: "none" | "small" | "medium";
    rounded?: "none" | "md" | "lg";
    showOverlayIcon?: boolean;
    openInNewTab?: boolean;
}

export const InstagramConfig: ComponentConfig<InstagramProps> = {
    label: "Instagram Feed",
    fields: {
        className: {
            type: "text",
            label: "Class Name",
        },
        limit: {
            type: "number",
            label: "Items",
            min: 2,
            max: 24,
        },
        columnsMobile: {
            type: "select",
            label: "Columns (Mobile)",
            options: [
                { label: "2", value: 2 },
                { label: "3", value: 3 },
                { label: "4", value: 4 },
            ],
        },
        columnsDesktop: {
            type: "select",
            label: "Columns (Desktop)",
            options: [
                { label: "4", value: 4 },
                { label: "5", value: 5 },
                { label: "6", value: 6 },
                { label: "8", value: 8 },
            ],
        },
        gap: {
            type: "select",
            label: "Gap",
            options: [
                { label: "None", value: "none" },
                { label: "Small", value: "small" },
                { label: "Medium", value: "medium" },
            ],
        },
        rounded: {
            type: "select",
            label: "Rounded Corners",
            options: [
                { label: "None", value: "none" },
                { label: "Medium", value: "md" },
                { label: "Large", value: "lg" },
            ],
        },
        showOverlayIcon: {
            type: "radio",
            label: "Hover Overlay",
            options: [
                { label: "Enabled", value: true },
                { label: "Disabled", value: false },
            ],
        },
        openInNewTab: {
            type: "radio",
            label: "Open Links",
            options: [
                { label: "New tab", value: true },
                { label: "Same tab", value: false },
            ],
        },
    },
    defaultProps: {
        className: "",
        limit: 6,
        columnsMobile: 3,
        columnsDesktop: 6,
        gap: "small",
        rounded: "md",
        showOverlayIcon: true,
        openInNewTab: true,
    },
    render: (props) => <Instagram {...props} />,
};
