/**
 * TestimonialCarousel Puck Configuration - Essential Settings Only
 */

import type { ComponentConfig } from "@measured/puck";
import TestimonialCarousel from "../../containers/testimonial-carousel";

export interface TestimonialCarouselProps {
    testimonials?: {
        name: string;
        designation: string;
        avatarUrl: string;
        content: string;
        rating: number;
    }[];

    settings?: {
        autoplay: boolean;
        autoplaySpeed: number;
        loop: boolean;
        showArrows: boolean;
    }[];

    transitionSpeed?: string;
    showArrows?: boolean;
}

export const TestimonialCarouselConfig: ComponentConfig<TestimonialCarouselProps> = {
    label: "Testimonial Carousel",
    fields: {
        testimonials: {
            type: "array",
            label: "Testimonials",
            min: 1,
            getItemSummary: (item) => item.name || "Testimonial",
            arrayFields: {
                name: { type: "text", label: "Name" },
                designation: { type: "text", label: "Role / Title" },
                avatarUrl: { type: "text", label: "Avatar Image URL" },
                content: { type: "textarea", label: "Quote" },
                rating: { type: "number", label: "Rating (1-5)", min: 1, max: 5 },
            },
        },
        settings: {
            type: "array",
            label: "Carousel Settings",
            max: 1,
            getItemSummary: () => "Carousel Settings",
            arrayFields: {
                autoplay: {
                    type: "radio",
                    label: "Autoplay",
                    options: [{ label: "Enabled", value: true }, { label: "Disabled", value: false }],
                },
                autoplaySpeed: {
                    type: "number",
                    label: "Autoplay Speed (ms)",
                    min: 500,
                    max: 20000,
                },
                loop: {
                    type: "radio",
                    label: "Infinite Loop",
                    options: [{ label: "Enabled", value: true }, { label: "Disabled", value: false }],
                },
                showArrows: {
                    type: "radio",
                    label: "Navigation Arrows",
                    options: [{ label: "Show", value: true }, { label: "Hide", value: false }],
                },
            },
        },
    },
    defaultProps: {
        testimonials: [
            {
                name: "John Doe",
                designation: "CEO, Company",
                avatarUrl: "/assets/images/testimonials/avatar-1.jpg",
                content: "This is an amazing product! I highly recommend it to everyone.",
                rating: 5,
            },
            {
                name: "Jane Smith",
                designation: "Designer",
                avatarUrl: "/assets/images/testimonials/avatar-2.jpg",
                content: "Great quality and excellent customer service. Will buy again!",
                rating: 4,
            },
            {
                name: "Bob Johnson",
                designation: "Developer",
                avatarUrl: "/assets/images/testimonials/avatar-3.jpg",
                content: "Best purchase I have made this year. Totally worth it!",
                rating: 5,
            },
        ],
        settings: [{ autoplay: true, autoplaySpeed: 5000, loop: true, showArrows: true }],
    },
    render: ({ testimonials, settings, transitionSpeed, showArrows }) => {
        const autoplay = settings?.[0]?.autoplay ?? true;
        const autoplaySpeed = settings?.[0]?.autoplaySpeed ?? (parseInt(transitionSpeed || "") || 5000);
        const loop = settings?.[0]?.loop ?? true;
        const resolvedShowArrows = settings?.[0]?.showArrows ?? showArrows ?? true;

        const mappedTestimonials = (testimonials || []).map((t, i) => ({
            id: i + 1,
            name: t.name,
            designation: t.designation,
            avatar: { src: t.avatarUrl, width: 90, height: 90 },
            content: t.content,
            rating: Math.min(5, Math.max(1, t.rating || 5)),
        }));

        return (
            <TestimonialCarousel
                data={mappedTestimonials.length > 0 ? mappedTestimonials : undefined}
                autoplay={autoplay}
                autoplaySpeed={autoplaySpeed}
                loop={loop}
                showArrows={resolvedShowArrows}
            />
        );
    },
};
