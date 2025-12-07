/**
 * BannerWithProducts Puck Configuration - Essential Settings Only
 */

import type { ComponentConfig } from "@measured/puck";
import BannerWithProducts from "../../containers/banner-with-products";

export interface BannerWithProductsProps {
    sectionHeading: string;
    banners: {
        title: string;
        slug: string;
        desktop_image_url: string;
        mobile_image_url: string;
    }[];
    variant: "default" | "reverse";
    limit: number;
}

export const BannerWithProductsConfig: ComponentConfig<BannerWithProductsProps> = {
    label: "Banner with Products",
    fields: {
        sectionHeading: {
            type: "text",
            label: "Section Heading",
        },
        banners: {
            type: "array",
            label: "Banners",
            getItemSummary: (item) => item.title || "Banner",
            arrayFields: {
                title: { type: "text", label: "Title" },
                slug: { type: "text", label: "Link Slug" },
                desktop_image_url: { type: "text", label: "Desktop Image" },
                mobile_image_url: { type: "text", label: "Mobile Image" },
            },
        },
        variant: {
            type: "select",
            label: "Layout",
            options: [
                { label: "Banner Left", value: "default" },
                { label: "Banner Right", value: "reverse" },
            ],
        },
        limit: {
            type: "number",
            label: "Product Limit",
            min: 4,
            max: 12,
        },
    },
    defaultProps: {
        sectionHeading: "On Sale Now",
        banners: [{
            title: "Sale Banner",
            slug: "sale",
            desktop_image_url: "/assets/images/banner/banner-sale-offer.jpg",
            mobile_image_url: "/assets/images/banner/banner-sale-offer.jpg",
        }],
        variant: "default",
        limit: 9,
    },
    render: ({ banners, sectionHeading, variant, limit }) => {
        const mappedBanners = banners.map((b, i) => ({
            id: i + 1,
            title: b.title,
            slug: b.slug,
            image: {
                mobile: { url: b.mobile_image_url, width: 480, height: 600 },
                desktop: { url: b.desktop_image_url, width: 560, height: 700 },
            },
        }));

        return <BannerWithProducts data={mappedBanners} sectionHeading={sectionHeading} variant={variant} limit={limit} />;
    },
};
