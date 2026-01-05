# CMS Analysis & Optimization Report

## Executive Summary
The analyzed codebase contains a solid foundation for a Puck-based CMS but suffers from **significant redundancy** and **hardcoded data constraints** that limit production flexibility.

Key findings:
*   **Redundancy**: Multiple components (e.g., `BannerCarousel` vs. `BannerSlider`) perform nearly identical functions with only minor configuration differences.
*   **Static Data**: Critical components like `ExclusiveBlock` and parts of `ProductsWithFlashSale` rely on hardcoded JSON or locale keys, rendering them uneditable in the CMS.
*   **Hidden Logic**: Several components possess layout variants or logic (e.g., `BannerWithProducts` "modern" variant) that are implemented in code but not exposed to the editor.
*   **Dynamic Data Pattern**: The pattern for injecting tags/categories in `client.tsx` is sound, though some specific block implementations (e.g., `ProductsFeatured`) handle these override rules inconsistently.

## 1. Redundant Components Analysis

The following components overlap significantly in purpose and implementation.

| Component Group | Redundant Items | Reason for Redundancy | Recommendation |
| :--- | :--- | :--- | :--- |
| **Banner Carousels** | `BannerCarouselBlock`<br>`BannerSliderBlock` | Both implement a Swiper carousel of banners. Differences are only in default breakpoints (slides per view) and aspect ratios. | **Merge**: Create a single `BannerCarousel` with a "Layout Mode" option (Standard vs Full Width) that toggles the breakpoint presets. |
| **Banner Grids** | `BannerBlock`<br>`BannerGridBlock` | `BannerBlock` implements a specific, rigid 5-column "masonry" layout. `BannerGridBlock` offers a flexible grid system (2-5 cols). | **Deprecate `BannerBlock`**: Recreate the specific masonry layout as a preset within `BannerGridBlock` or a specialized "Layout Variant" if strictly needed. |
| **Product Grids** | `ProductsBlock`<br>`ProductsFlashSaleBlock`<br>`ProductsTopBlock` | `ProductsFlashSaleBlock` is identical to `ProductsBlock` but forces a "Slim" card variant and hardcodes the tag filter default. `ProductsTopBlock` hardcodes the data source. | **Merge**: Use a single `ProductsGrid` component. Add a "Card Style" option (Default, Slim, Overlay) and a "Data Source" selector (Dynamic, Flash Sale, Popular, etc). |
| **Category Lists** | `CategoryBlock`<br>`CategoryGridBlock` | `CategoryGridBlock` behaves as a Carousel on mobile, duplicating `CategoryBlock` logic. | **Merge**: Create `CategoryCollection` with "Desktop Layout" option (Carousel vs Grid). Mobile behavior can remain carousel for both. |

## 2. Option Consistency & UX

### Naming & Behavior
*   **Columns**: Inconsistently implemented. `BannerGridBlock` and `ProductsBlock` use `gridColumns` (2-6), but `BannerBlock` uses implicit sizing via `type` ("medium" vs "small").
*   **Data Limits**:
    *   `BrandGridBlock` exposes a `limit` field (max 12), but the container hardcodes a fetch limit of `16` in the hook, then slices the result.
    *   `CollectionBlock` exposes a `collections` array (unlimited), but the container hardcodes a slice of `(0, 3)`. The editor UI suggests you can add more, but they won't show.
*   **Sidebar Configuration**: `ProductsWithFlashSale` has a sidebar that looks configurable ("Top Products") but is hardcoded to fetch "Popular Products" and link to `/search`. The Config `limit` applies only to the main flash sale area, which is confusing UX.

### Missing Options
*   **`BannerWithProducts`**: The component accepts a `categorySlug` prop to filter the products shown. However, the **Config does not expose this field**. It relies on `siteSettings` "On Sale" slug or falls back to `categorySlug` (which is undefined from config). This makes the block usable *only* for the specific "On Sale" section.
*   **`HeroBlock`**: Supports an "Overlay" feature, but implements it as a global overlay on the *wrapper* div in the Render function, not per-slide. This prevents per-slide text readability adjustments.

## 3. Bugs & Risk Detection

### 🔴 High Severity (Breaks CMS Value)
*   **`ExclusiveBlock` Static Data**: The container imports data from `@data/static/exclusive-block`. The CMS Config exposes layout options (height, overlay) but **zero content options**. Users **cannot** change the images, links, or text of this block via the CMS.
    *   *Fix*: Move the `exclusiveData` structure into the Config `fields` array.

### 🟠 Medium Severity (Confusing/Fragile)
*   **`ProductsFeatured` Data Logic**: The logic to handle overrides is fragile:
    ```typescript
    // In products-featured.tsx
    tagSlug?: string; // Overrides existing categorySlug prop usage
    ```
    If a user selects "Filter By: Category" but a `tagSlug` happens to remain in the config (orphaned data), behavior might be unpredictable depending on the hook implementation.
*   **Hidden Variants**: `BannerWithProducts` has a `'modern'` variant in the container code (`3xl:col-span-2`, etc.) but the Config `options` only expose `default` and `reverse`. This features is effectively dead code.

### 🟡 Low Severity (Cleanup)
*   **Dummy Fields**: `CategoryGridBlock` and `ProductsTopBlock` have a `dataSource` text field in the Config that is completely ignored by the container (which uses hardcoded hooks). This misleads the editor user.

## 4. Production-Upgrade Plan

### I. Data Architecture Refactor
1.  **Dynamic Options Source**: The pattern in `client.tsx` is good. Ensure `ProductsFeatured`, `ProductsWithFlashSale`, and others consistently use these injected options without override collisions.
2.  **Expose Content**:
    *   Refactor `ExclusiveBlock` to accept an array of items (Image + Button Text + Link) via props.
    *   Refactor `ProductsWithFlashSale` to allow configuring the Sidebar usage (e.g., "Show Sidebar: Yes/No", "Sidebar Source: Popular/New/Featured").

### II. Component Consolidation (The "System" Approach)
Instead of 30+ specific blocks, reduce to ~12 powerful, configurable blocks:

1.  **`UniversalBanner`**: Handles Slider, Carousel, and Grid modes.
    *   *Options*: `layoutMode` (Slider, Carousel, Grid), `cardStyle` (Overlay, Card, Split), `columns` (responsive breakpoints).
2.  **`UniversalProductGrid`**: Handles all product feeds.
    *   *Options*: `sourceType` (Tag, Category, FlashSale, Top), `variant` (Grid, Slim, Featured), `limit`, `pagination`.
3.  **`UniversalCategoryList`**:
    *   *Options*: `displayMode` (Carousel/Grid), `cardStyle` (Circle, Rounded, Modern).

### III. Editor UX Improvements
*   **Conditional Fields**: Use Puck's `resolveFields` (if supported in this version) or dynamic field visibility to hide "Grid Gap" when "Layout" is "Slider".
*   **Validation**: Add strict min/max constraints matching the API limits.
*   **Helpers**: Add descriptions to "Slug" fields explaining they must match the backend exactly.
