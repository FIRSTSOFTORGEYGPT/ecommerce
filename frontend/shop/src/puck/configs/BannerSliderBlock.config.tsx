/**
 * BannerSliderBlock Puck Configuration - Essential Settings Only
 */

import type { ComponentConfig } from "@measured/puck";
import BannerSliderBlock from "../../containers/banner-slider-block";

export interface BannerSliderBlockProps {
    banners: {
        title: string;
        slug: string;
        desktop_image_url: string;
        mobile_image_url: string;
    }[];
    transitionSpeed: string;
}

export const BannerSliderBlockConfig: ComponentConfig<BannerSliderBlockProps> = {
    label: "Banner Slider (Full Width)",
    fields: {
        banners: {
            type: "array",
            label: "Banners",
            getItemSummary: (item) => item.title || "Banner",
            arrayFields: {
                title: { type: "text", label: "Title" },
                slug: { type: "text", label: "Link Slug" },
                desktop_image_url: { type: "text", label: "Desktop Image (1920×750)" },
                mobile_image_url: { type: "text", label: "Mobile Image (600×235)" },
            },
        },
        transitionSpeed: {
            type: "text",
            label: "Transition Speed (ms)",
            placeholder: "4000",
        },
    },
    defaultProps: {
        banners: [{
            title: "Banner Slide",
            slug: "collection",
            desktop_image_url: "/assets/images/banner/banner-sale-offer.jpg",
            mobile_image_url: "/assets/images/banner/banner-sale-offer.jpg",
        }],
        transitionSpeed: "4000",
    },
    render: ({ banners, transitionSpeed }) => {
        const mappedBanners = banners.map((b, i) => ({
            id: i + 1,
            title: b.title,
            slug: b.slug,
            image: {
                mobile: { url: b.mobile_image_url, width: 600, height: 235 },
                desktop: { url: b.desktop_image_url, width: 1920, height: 750 },
            },
        }));

        // Parse speed string to number
        const speed = parseInt(transitionSpeed) || 4000;

        return (
            <BannerSliderBlock
                data={mappedBanners}
                autoplay={true}
                autoplaySpeed={speed}
                loop={true}
            />
        );
    },
};
