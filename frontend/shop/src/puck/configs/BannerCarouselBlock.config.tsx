/**
 * BannerCarouselBlock Puck Configuration - Essential Settings Only
 */

import type { ComponentConfig } from "@measured/puck";
import BannerCarouselBlock from "../../containers/banner-carousel-block";

export interface BannerCarouselBlockProps {
    banners: {
        title: string;
        slug: string;
        desktop_image_url: string;
        mobile_image_url: string;
    }[];
    transitionSpeed: string;
    showArrows: boolean;
}

export const BannerCarouselBlockConfig: ComponentConfig<BannerCarouselBlockProps> = {
    label: "Banner Carousel",
    fields: {
        banners: {
            type: "array",
            label: "Banners",
            getItemSummary: (item) => item.title || "Banner",
            arrayFields: {
                title: { type: "text", label: "Banner Title" },
                slug: { type: "text", label: "Link Slug" },
                desktop_image_url: { type: "text", label: "Desktop Image (560×350)" },
                mobile_image_url: { type: "text", label: "Mobile Image (350×220)" },
            },
        },
        transitionSpeed: {
            type: "text",
            label: "Transition Speed (ms)",
            placeholder: "5000",
        },
        showArrows: {
            type: "radio",
            label: "Navigation Arrows",
            options: [{ label: "Show", value: true }, { label: "Hide", value: false }],
        },
    },
    defaultProps: {
        banners: [
            { title: "Promo Banner", slug: "promo", desktop_image_url: "/assets/images/banner/banner-1.jpg", mobile_image_url: "/assets/images/banner/banner-1.jpg" },
        ],
        transitionSpeed: "5000",
        showArrows: true,
    },
    render: ({ banners, showArrows, transitionSpeed }) => {
        const mappedBanners = banners.map((b, i) => ({
            id: i + 1,
            title: b.title,
            slug: b.slug,
            image: {
                mobile: { url: b.mobile_image_url, width: 350, height: 220 },
                desktop: { url: b.desktop_image_url, width: 560, height: 350 },
            },
        }));

        const speed = parseInt(transitionSpeed) || 5000;

        return (
            <BannerCarouselBlock
                banners={mappedBanners}
                showNavigation={showArrows}
                autoplay={true}
                autoplaySpeed={speed}
                loop={true}
            />
        );
    },
};
