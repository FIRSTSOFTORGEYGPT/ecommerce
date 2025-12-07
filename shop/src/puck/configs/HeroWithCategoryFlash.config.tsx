/**
 * HeroWithCategoryFlash Puck Configuration - Essential Settings Only
 */

import type { ComponentConfig } from "@measured/puck";
import HeroWithCategoryFlash from "../../containers/hero-with-category-flash";

export interface HeroWithCategoryFlashProps {
    banners: {
        title: string;
        slug: string;
        type: "large" | "small";
        desktop_image_url: string;
        mobile_image_url: string;
    }[];
    categoryLimit: number;
    flashSaleLimit: number;
}

export const HeroWithCategoryFlashConfig: ComponentConfig<HeroWithCategoryFlashProps> = {
    label: "Hero with Category & Flash Sale",
    fields: {
        banners: {
            type: "array",
            label: "Banners (1 large + 2 small)",
            getItemSummary: (item) => `${item.type}: ${item.title || "Banner"}`,
            arrayFields: {
                title: { type: "text", label: "Title" },
                slug: { type: "text", label: "Link Slug" },
                type: {
                    type: "select",
                    label: "Size",
                    options: [
                        { label: "Large (Main)", value: "large" },
                        { label: "Small (Side)", value: "small" },
                    ],
                },
                desktop_image_url: { type: "text", label: "Desktop Image" },
                mobile_image_url: { type: "text", label: "Mobile Image" },
            },
        },
        categoryLimit: {
            type: "number",
            label: "Category Limit",
            min: 3,
            max: 15,
        },
        flashSaleLimit: {
            type: "number",
            label: "Flash Sale Product Limit",
            min: 3,
            max: 10,
        },
    },
    defaultProps: {
        banners: [
            { title: "Main Banner", slug: "collection", type: "large", desktop_image_url: "/assets/images/hero/hero-banner.png", mobile_image_url: "/assets/images/hero/hero-banner-mobile.png" },
            { title: "Side Banner 1", slug: "promo-1", type: "small", desktop_image_url: "/assets/images/banner/banner-1.jpg", mobile_image_url: "/assets/images/banner/banner-1.jpg" },
            { title: "Side Banner 2", slug: "promo-2", type: "small", desktop_image_url: "/assets/images/banner/banner-2.jpg", mobile_image_url: "/assets/images/banner/banner-2.jpg" },
        ],
        categoryLimit: 10,
        flashSaleLimit: 5,
    },
    render: ({ banners }) => {
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

        return <HeroWithCategoryFlash data={mappedBanners} />;
    },
};
