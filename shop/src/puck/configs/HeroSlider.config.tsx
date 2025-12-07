/**
 * HeroSlider Puck Configuration - Essential Settings Only
 */

import type { ComponentConfig } from "@measured/puck";
import HeroSlider from "../../containers/hero-slider";

export interface HeroSliderProps {
    slides: {
        title: string;
        slug: string;
        desktop_image_url: string;
        mobile_image_url: string;
    }[];
    variant: "box" | "fullWidth" | "fashion";
    transitionSpeed: string;
    showArrows: boolean;
}

export const HeroSliderConfig: ComponentConfig<HeroSliderProps> = {
    label: "Hero Slider (Advanced)",
    fields: {
        slides: {
            type: "array",
            label: "Slides",
            getItemSummary: (item) => item.title || "Untitled Slide",
            arrayFields: {
                title: { type: "text", label: "Slide Title" },
                slug: { type: "text", label: "Link Slug" },
                desktop_image_url: { type: "text", label: "Desktop Image (1920×800)" },
                mobile_image_url: { type: "text", label: "Mobile Image (480×275)" },
            },
        },
        variant: {
            type: "select",
            label: "Layout Style",
            options: [
                { label: "Box (Contained)", value: "box" },
                { label: "Full Width", value: "fullWidth" },
                { label: "Fashion (Multi-slide)", value: "fashion" },
            ],
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
        slides: [{
            title: "Hero Slide 1",
            slug: "featured",
            desktop_image_url: "/assets/images/hero/hero-banner.png",
            mobile_image_url: "/assets/images/hero/hero-banner-mobile.png",
        }],
        variant: "box",
        transitionSpeed: "5000",
        showArrows: false,
    },
    render: ({ slides, variant, showArrows, transitionSpeed }) => {
        const mappedSlides = slides.map((slide, index) => ({
            id: index + 1,
            title: slide.title,
            slug: slide.slug,
            image: {
                mobile: { url: slide.mobile_image_url, width: 480, height: 275 },
                desktop: { url: slide.desktop_image_url, width: 1920, height: 800 },
            },
        }));

        // Parse speed string to number
        const speed = parseInt(transitionSpeed) || 5000;

        return (
            <HeroSlider
                data={mappedSlides}
                variant={variant}
                variantRounded="rounded"
                paginationPosition="center"
                buttonClassName={showArrows ? "" : "hidden"}
                autoplay={true}
                autoplaySpeed={speed}
                loop={true}
            />
        );
    },
};
