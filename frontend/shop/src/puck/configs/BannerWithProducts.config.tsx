/**
 * BannerWithProducts Puck Configuration - Essential Settings Only
 */

import type { ComponentConfig } from "@measured/puck";
import BannerWithProducts from "../../containers/banner-with-products";

export interface BannerWithProductsProps {
    sectionHeading: string;
    title: string;
    slug: string;
    desktop_image_url: string;
    mobile_image_url: string;
    variant: "default" | "reverse";
    limit: number;

    // Dynamic Data Source
    filterType: "tag" | "category";
    tagSlug?: string;
    categorySlug?: string;
}

export const BannerWithProductsConfig: ComponentConfig<BannerWithProductsProps> = {
    label: "Banner with Products",
    fields: {
        sectionHeading: {
            type: "text",
            label: "Section Heading",
        },
        title: { type: "text", label: "Banner Title" },
        slug: { type: "text", label: "Banner Link Slug" },
        desktop_image_url: { type: "text", label: "Banner Desktop Image" },
        mobile_image_url: { type: "text", label: "Banner Mobile Image" },
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
        // Dynamic Data Source
        filterType: {
            type: "select",
            label: "Filter Products By",
            options: [
                { label: "Tag", value: "tag" },
                { label: "Category", value: "category" },
            ],
        },
        tagSlug: {
            type: "select",
            label: "Product Tag",
            options: [],
        },
        categorySlug: {
            type: "select",
            label: "Product Category",
            options: [],
        },
    },
    defaultProps: {
        sectionHeading: "On Sale Now",
        title: "Sale Banner",
        slug: "sale",
        desktop_image_url: "/assets/images/banner/banner-sale-offer.jpg",
        mobile_image_url: "/assets/images/banner/banner-sale-offer.jpg",
        variant: "default",
        limit: 9,
        filterType: "tag",
        tagSlug: "",
        categorySlug: "",
    },
    render: ({ title, slug, desktop_image_url, mobile_image_url, sectionHeading, variant, limit, filterType, tagSlug, categorySlug }) => {
        const mappedBanners = [{
            id: 1,
            title,
            slug,
            image: {
                mobile: { url: mobile_image_url, width: 480, height: 600 },
                desktop: { url: desktop_image_url, width: 560, height: 700 },
            },
        }];

        return (
            <BannerWithProducts
                data={mappedBanners}
                sectionHeading={sectionHeading}
                variant={variant}
                limit={limit}
                filterType={filterType}
                tagSlug={filterType === "tag" ? tagSlug : undefined}
                categorySlug={filterType === "category" ? categorySlug : undefined}
            />
        );
    },
};
