/**
 * HeroBlock Puck Configuration - Essential Settings Only
 */

import type { ComponentConfig } from "@measured/puck";
import HeroBlock from "../../containers/hero-block";

export interface HeroBlockProps {
    slides: {
        title: string;
        slug: string;
        desktop_image_url: string;
        mobile_image_url: string;
    }[];
    transitionSpeed: string;
    // Overlay Settings
    overlayEnabled: boolean;
    overlayColor: string;
    overlayOpacity: number;
}

export const HeroBlockConfig: ComponentConfig<HeroBlockProps> = {
    label: "Hero Banner",
    fields: {
        slides: {
            type: "array",
            label: "Hero Slides",
            getItemSummary: (item) => item.title || "Untitled Slide",
            arrayFields: {
                title: { type: "text", label: "Slide Title" },
                slug: { type: "text", label: "Link Slug" },
                desktop_image_url: { type: "text", label: "Desktop Image (1920×800)" },
                mobile_image_url: { type: "text", label: "Mobile Image (480×275)" },
            },
        },
        transitionSpeed: {
            type: "text",
            label: "Transition Speed (ms)",
            placeholder: "5000",
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
        slides: [
            {
                title: "Hero Slide 1",
                slug: "featured",
                desktop_image_url: "/assets/images/hero/hero-banner.png",
                mobile_image_url: "/assets/images/hero/hero-banner-mobile.png",
            },
        ],
        transitionSpeed: "5000",
        overlayEnabled: false,
        overlayColor: "#000000",
        overlayOpacity: 30,
    },
    render: ({ slides, overlayEnabled, overlayColor, overlayOpacity, transitionSpeed }) => {
        const mappedSlides = slides.map((slide, index) => ({
            id: index + 1,
            title: slide.title,
            slug: slide.slug,
            image: {
                mobile: { url: slide.mobile_image_url, width: 480, height: 275 },
                desktop: { url: slide.desktop_image_url, width: 1920, height: 800 },
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
                <HeroBlock
                    data={mappedSlides}
                    autoplaySpeed={speed}
                    loop={true}
                    autoplay={true}
                />
            </div>
        );
    },
};
