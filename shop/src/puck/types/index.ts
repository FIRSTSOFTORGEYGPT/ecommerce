/**
 * Shared Puck Type Definitions
 * 
 * Common types used across Puck component configurations
 */

// =============================================================================
// BANNER TYPES
// =============================================================================

/** Base banner image structure */
export interface BannerImage {
    title: string;
    slug: string;
    desktop_image_url: string;
    mobile_image_url: string;
    alt_text?: string;
}

/** Banner with size variant */
export interface BannerWithType extends BannerImage {
    type: "large" | "medium" | "small" | "normal";
}

/** Mapped banner for component consumption */
export interface MappedBanner {
    id: number;
    title: string;
    slug: string;
    image: {
        mobile: { url: string; width?: number; height?: number };
        desktop: { url: string; width?: number; height?: number };
    };
    type?: string;
}

// =============================================================================
// PRODUCT TYPES
// =============================================================================

/** Product display variants */
export type ProductVariant = "grid" | "gridSlim" | "list" | "listSmall";

/** Product card layout options */
export type ProductGridColumns = 4 | 5;

/** Data source for products */
export type ProductDataSource = "featured" | "recent" | "category" | "flash" | "popular";

// =============================================================================
// CATEGORY TYPES
// =============================================================================

/** Category display variants */
export type CategoryVariant = "rounded" | "circle" | "modern" | "elegant";

/** Category effect position */
export type CategoryEffectPosition = "imageOnly" | "fullBody";

/** Category image type */
export type CategoryImageType = "image" | "vector";

// =============================================================================
// LAYOUT TYPES
// =============================================================================

/** Section heading alignment */
export type HeadingAlignment = "left" | "center" | "right";

/** Pagination position */
export type PaginationPosition = "left" | "center" | "right" | "none";

/** Common layout variants */
export type LayoutVariant = "default" | "modern" | "center" | "fashion" | "left" | "reverse";

// =============================================================================
// COMPONENT CATEGORIES
// =============================================================================

/** Component category for sidebar grouping */
export type ComponentCategory =
    | "heroes"
    | "banners"
    | "products"
    | "categories"
    | "content"
    | "layout";

// =============================================================================
// UTILITY TYPES
// =============================================================================

/** Common props shared by most components */
export interface BaseComponentProps {
    className?: string;
}

/** Section component props with heading */
export interface SectionComponentProps extends BaseComponentProps {
    sectionHeading: string;
    categorySlug?: string;
}

/** Carousel component props */
export interface CarouselComponentProps extends BaseComponentProps {
    autoplay?: boolean;
    autoplayDelay?: number;
    showNavigation?: boolean;
    showPagination?: boolean;
}
