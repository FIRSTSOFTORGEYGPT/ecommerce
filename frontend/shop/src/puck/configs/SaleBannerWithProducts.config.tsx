/**
 * SaleBannerWithProducts Puck Configuration - Essential Settings Only
 */

import type { ComponentConfig } from "@measured/puck";
import SaleBannerWithProducts from "../../containers/sale-banner-with-products";

export interface SaleBannerWithProductsProps {
    sectionHeading: string;
    banners: {
        title: string;
        slug: string;
        desktop_image_url: string;
        mobile_image_url: string;
    }[];
    variant: "default" | "center" | "left" | "fashion";
    limit: number;

    // Dynamic Data Source
    filterType: "tag" | "category";
    tagSlug?: string;
    categorySlug?: string;
}

export const SaleBannerWithProductsConfig: ComponentConfig<SaleBannerWithProductsProps> = {
    label: "Sale Banner with Products",
    fields: {
        sectionHeading: {
            type: "text",
            label: "Section Heading",
        },
        banners: {
            type: "array",
            label: "Banners (2 for fashion variant)",
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
            label: "Layout Variant",
            options: [
                { label: "Default", value: "default" },
                { label: "Center", value: "center" },
                { label: "Left", value: "left" },
                { label: "Fashion (Double Banner)", value: "fashion" },
            ],
        },
        limit: {
            type: "number",
            label: "Product Limit",
            min: 2,
            max: 8,
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
        sectionHeading: "On Sale",
        banners: [{
            title: "Sale Banner",
            slug: "sale",
            desktop_image_url: "/assets/images/banner/banner-sale-offer.jpg",
            mobile_image_url: "/assets/images/banner/banner-sale-offer.jpg",
        }],
        variant: "default",
        limit: 4,
        filterType: "tag",
        tagSlug: "",
        categorySlug: "",
    },
    render: ({ sectionHeading, banners, variant, limit, filterType, tagSlug, categorySlug }) => {
        const mappedBanners = banners.map((b, i) => ({
            id: i + 1,
            title: b.title,
            slug: b.slug,
            image: { mobile: { url: b.mobile_image_url }, desktop: { url: b.desktop_image_url } },
        }));

        return (
            <SaleBannerWithProducts
                sectionHeading={sectionHeading}
                variant={variant}
                limit={limit}
                bannerData={mappedBanners}
                filterType={filterType}
                tagSlug={tagSlug}
                categorySlug={categorySlug}
            />
        );
    },
};
