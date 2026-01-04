/**
 * BannerGridBlock Puck Configuration - Essential Settings Only
 */

import type { ComponentConfig } from "@measured/puck";
import BannerGridBlock from "../../containers/banner-grid-block";

export interface BannerGridBlockProps {
    banners: {
        title: string;
        slug: string;
        type: "large" | "normal";
        desktop_image_url: string;
        mobile_image_url: string;
    }[];
    gridColumns: number;
    gridGap: "none" | "small" | "medium" | "large";
}

export const BannerGridBlockConfig: ComponentConfig<BannerGridBlockProps> = {
    label: "Banner Grid (Responsive)",
    fields: {
        banners: {
            type: "array",
            label: "Banners",
            getItemSummary: (item) => `${item.type}: ${item.title || "Banner"}`,
            arrayFields: {
                title: { type: "text", label: "Title" },
                slug: { type: "text", label: "Link Slug" },
                type: {
                    type: "select",
                    label: "Size",
                    options: [
                        { label: "Large (Full Width)", value: "large" },
                        { label: "Normal (Half)", value: "normal" },
                    ],
                },
                desktop_image_url: { type: "text", label: "Desktop Image" },
                mobile_image_url: { type: "text", label: "Mobile Image" },
            },
        },
        gridColumns: {
            type: "select",
            label: "Grid Columns (Desktop)",
            options: [
                { label: "2 Columns", value: 2 },
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
    },
    defaultProps: {
        banners: [
            { title: "Full Banner", slug: "full", type: "large", desktop_image_url: "/assets/images/banner/banner-sale-offer.jpg", mobile_image_url: "/assets/images/banner/banner-sale-offer.jpg" },
            { title: "Left", slug: "left", type: "normal", desktop_image_url: "/assets/images/banner/banner-1.jpg", mobile_image_url: "/assets/images/banner/banner-1.jpg" },
            { title: "Right", slug: "right", type: "normal", desktop_image_url: "/assets/images/banner/banner-2.jpg", mobile_image_url: "/assets/images/banner/banner-2.jpg" },
        ],
        gridColumns: 2,
        gridGap: "medium",
    },
    render: ({ banners, gridColumns, gridGap }) => {
        const mappedBanners = banners.map((b, i) => ({
            id: i + 1,
            title: b.title,
            slug: b.slug,
            type: b.type,
            image: {
                mobile: { url: b.mobile_image_url, width: 600, height: 300 },
                desktop: { url: b.desktop_image_url, width: 1920, height: 600 },
            },
        }));

        return <BannerGridBlock data={mappedBanners} gridColumns={gridColumns} gridGap={gridGap} />;
    },
};
