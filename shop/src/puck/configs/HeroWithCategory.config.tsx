/**
 * HeroWithCategory Puck Configuration - Essential Settings Only
 */

import type { ComponentConfig } from "@measured/puck";
import HeroWithCategory from "../../containers/hero-with-category";

export interface HeroWithCategoryProps {
    slides: {
        title: string;
        slug: string;
        desktop_image_url: string;
        mobile_image_url: string;
    }[];
    transitionSpeed: string;
    categoryLimit: number;
    // Overlay Settings
    overlayEnabled: boolean;
    overlayColor: string;
    overlayOpacity: number;
}

export const HeroWithCategoryConfig: ComponentConfig<HeroWithCategoryProps> = {
    label: "Hero with Category Menu",
    fields: {
        slides: {
            type: "array",
            label: "Hero Slides",
            getItemSummary: (item) => item.title || "Slide",
            arrayFields: {
                title: { type: "text", label: "Title" },
                slug: { type: "text", label: "Link Slug" },
                desktop_image_url: { type: "text", label: "Desktop Image (1920×600)" },
                mobile_image_url: { type: "text", label: "Mobile Image (600×300)" },
            },
        },
        transitionSpeed: {
            type: "text",
            label: "Transition Speed (ms)",
            placeholder: "5000",
        },
        categoryLimit: {
            type: "number",
            label: "Category Limit",
            min: 3,
            max: 15,
        },
        overlayEnabled: {
            type: "radio",
            label: "Overlay",
            options: [{ label: "Enabled", value: true }, { label: "Disabled", value: false }],
        },
        overlayColor: {
            type: "text",
            label: "Overlay Color",
        },
        overlayOpacity: {
            type: "number",
            label: "Overlay Opacity (%)",
            min: 0,
            max: 100,
        },
    },
    defaultProps: {
        slides: [{
            title: "Hero Slide",
            slug: "collection",
            desktop_image_url: "/assets/images/hero/hero-banner.png",
            mobile_image_url: "/assets/images/hero/hero-banner-mobile.png",
        }],
        transitionSpeed: "5000",
        categoryLimit: 10,
        overlayEnabled: false,
        overlayColor: "#000000",
        overlayOpacity: 30,
    },
    render: ({ slides, overlayEnabled, overlayColor, overlayOpacity, transitionSpeed, categoryLimit }) => {
        const mappedSlides = slides.map((s, i) => ({
            id: i + 1,
            title: s.title,
            slug: s.slug,
            image: {
                mobile: { url: s.mobile_image_url, width: 600, height: 300 },
                desktop: { url: s.desktop_image_url, width: 1920, height: 600 },
            },
        }));

        const wrapperStyle: React.CSSProperties = overlayEnabled ? { position: "relative" } : {};
        const speed = parseInt(transitionSpeed) || 5000;

        return (
            <div style={wrapperStyle}>
                {overlayEnabled && (
                    <div
                        style={{
                            position: "absolute",
                            inset: 0,
                            backgroundColor: overlayColor,
                            opacity: overlayOpacity / 100,
                            zIndex: 10,
                            pointerEvents: "none",
                        }}
                    />
                )}
                <HeroWithCategory
                    data={mappedSlides}
                    paginationPosition="center"
                    autoplaySpeed={speed}
                    loop={true}
                    autoplay={true}
                    categoryLimit={categoryLimit}
                />
            </div>
        );
    },
};
