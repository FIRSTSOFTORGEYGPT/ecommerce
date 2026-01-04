/**
 * TestimonialCarousel Puck Configuration - Essential Settings Only
 */

import type { ComponentConfig } from "@measured/puck";
import TestimonialCarousel from "../../containers/testimonial-carousel";

export interface TestimonialCarouselProps {
    transitionSpeed: string;
    showArrows: boolean;
}

export const TestimonialCarouselConfig: ComponentConfig<TestimonialCarouselProps> = {
    label: "Testimonial Carousel",
    fields: {
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
        transitionSpeed: "5000",
        showArrows: true,
    },
    render: (props) => {
        const speed = parseInt(props.transitionSpeed) || 5000;
        return <TestimonialCarousel {...props} autoplaySpeed={speed} autoplay={true} loop={true} />;
    },
};
