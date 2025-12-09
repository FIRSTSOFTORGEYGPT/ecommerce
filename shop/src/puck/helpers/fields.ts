/**
 * Puck Field Helpers
 * 
 * Reusable field definitions for common patterns
 */

import type { Fields } from "@measured/puck";

// =============================================================================
// COMMON FIELD DEFINITIONS
// =============================================================================

/**
 * Standard CSS class field
 */
export const classNameField = {
    type: "text" as const,
    label: "Custom CSS Classes (Advanced)",
    placeholder: "e.g., my-custom-class",
};

/**
 * Section heading field
 */
export const sectionHeadingField = {
    type: "text" as const,
    label: "Section Heading",
    placeholder: "e.g., Featured Products",
};

/**
 * Category/link slug field
 */
export const slugField = {
    type: "text" as const,
    label: "Link Slug",
    placeholder: "e.g., featured-collection",
};

/**
 * Standard image URL field
 */
export const imageUrlField = {
    type: "text" as const,
    label: "Image URL",
    placeholder: "/assets/images/example.jpg",
};

/**
 * Desktop image URL field
 */
export const desktopImageField = {
    type: "text" as const,
    label: "Desktop Image URL",
    placeholder: "/assets/images/banners/desktop.jpg",
};

/**
 * Mobile image URL field
 */
export const mobileImageField = {
    type: "text" as const,
    label: "Mobile Image URL",
    placeholder: "/assets/images/banners/mobile.jpg",
};

/**
 * Alt text field for accessibility
 */
export const altTextField = {
    type: "text" as const,
    label: "Alt Text (Accessibility)",
    placeholder: "Describe the image for screen readers",
};

/**
 * Autoplay delay field (milliseconds)
 */
export const autoplayDelayField = {
    type: "number" as const,
    label: "Autoplay Delay (milliseconds)",
    min: 2000,
    max: 10000,
};

/**
 * Product limit field
 */
export const productLimitField = {
    type: "number" as const,
    label: "Number of Products",
    min: 3,
    max: 20,
};

// =============================================================================
// TOGGLE FIELD HELPERS
// =============================================================================

/**
 * Creates a show/hide toggle field
 */
export function createToggleField(label: string, defaultValue = true) {
    return {
        type: "radio" as const,
        label,
        options: [
            { label: "Show", value: true },
            { label: "Hide", value: false },
        ],
    };
}

/**
 * Creates an enabled/disabled toggle field
 */
export function createEnabledField(label: string, defaultValue = true) {
    return {
        type: "radio" as const,
        label,
        options: [
            { label: "Enabled", value: true },
            { label: "Disabled", value: false },
        ],
    };
}

// =============================================================================
// BANNER FIELD HELPERS
// =============================================================================

/**
 * Standard banner array fields
 */
export const bannerArrayFields = {
    title: {
        type: "text" as const,
        label: "Banner Title",
        placeholder: "e.g., Summer Sale 2024",
    },
    slug: slugField,
    desktop_image_url: desktopImageField,
    mobile_image_url: mobileImageField,
    alt_text: altTextField,
};

/**
 * Banner array fields with type/size selector
 */
export const bannerWithTypeArrayFields = {
    ...bannerArrayFields,
    type: {
        type: "select" as const,
        label: "Banner Size",
        options: [
            { label: "Large", value: "large" },
            { label: "Medium", value: "medium" },
            { label: "Small", value: "small" },
        ],
    },
};

// =============================================================================
// VARIANT SELECT HELPERS
// =============================================================================

/**
 * Layout variant select options
 */
export const layoutVariantOptions = [
    { label: "Default", value: "default" },
    { label: "Modern", value: "modern" },
    { label: "Center", value: "center" },
    { label: "Left", value: "left" },
    { label: "Fashion", value: "fashion" },
];

/**
 * Category variant select options
 */
export const categoryVariantOptions = [
    { label: "Rounded", value: "rounded" },
    { label: "Circle", value: "circle" },
    { label: "Modern", value: "modern" },
    { label: "Elegant", value: "elegant" },
];

/**
 * Product card variant options
 */
export const productVariantOptions = [
    { label: "Grid", value: "grid" },
    { label: "Grid Slim", value: "gridSlim" },
    { label: "List", value: "list" },
    { label: "List Small", value: "listSmall" },
];

// =============================================================================
// DATA TRANSFORMATION HELPERS
// =============================================================================

/**
 * Maps Puck banner data to component-compatible format
 */
export function mapBannerData(
    banners: Array<{
        title: string;
        slug: string;
        desktop_image_url: string;
        mobile_image_url: string;
        type?: string;
    }>
) {
    return banners.map((b, i) => ({
        id: i + 1,
        title: b.title,
        slug: b.slug,
        type: b.type,
        image: {
            mobile: { url: b.mobile_image_url, width: 450, height: 180 },
            desktop: { url: b.desktop_image_url, width: 1800, height: 450 },
        },
    }));
}
