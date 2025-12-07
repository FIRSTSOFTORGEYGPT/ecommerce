/**
 * BannerBlock Puck Configuration - Essential Settings Only
 */

import type { ComponentConfig } from "@measured/puck";
import BannerBlock from "../../containers/banner-block";

export interface BannerBlockProps {
    banners: {
        title: string;
        slug: string;
        type: "medium" | "small";
        desktop_image_url: string;
        mobile_image_url: string;
    }[];
}

export const BannerBlockConfig: ComponentConfig<BannerBlockProps> = {
    label: "Banner Grid (Masonry)",
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
                        { label: "Medium (5 columns)", value: "medium" },
                        { label: "Small (2 columns)", value: "small" },
                    ],
                },
                desktop_image_url: { type: "text", label: "Desktop Image" },
                mobile_image_url: { type: "text", label: "Mobile Image" },
            },
        },
    },
    defaultProps: {
        banners: [
            { title: "Main Banner", slug: "main", type: "medium", desktop_image_url: "/assets/images/banner/masonry/banner-1.jpg", mobile_image_url: "/assets/images/banner/masonry/banner-1.jpg" },
            { title: "Side 1", slug: "side-1", type: "small", desktop_image_url: "/assets/images/banner/masonry/banner-2.jpg", mobile_image_url: "/assets/images/banner/masonry/banner-2.jpg" },
            { title: "Side 2", slug: "side-2", type: "small", desktop_image_url: "/assets/images/banner/masonry/banner-3.jpg", mobile_image_url: "/assets/images/banner/masonry/banner-3.jpg" },
        ],
    },
    render: ({ banners }) => {
        const mappedBanners = banners.map((b, i) => ({
            id: i + 1,
            title: b.title,
            slug: b.slug,
            type: b.type,
            image: {
                mobile: { url: b.mobile_image_url, width: 480, height: 275 },
                desktop: { url: b.desktop_image_url, width: 560, height: 350 },
            },
        }));

        return <BannerBlock data={mappedBanners} />;
    },
};
