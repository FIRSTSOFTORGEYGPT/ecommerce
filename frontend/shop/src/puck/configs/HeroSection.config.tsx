import React from "react";
import type { ComponentConfig } from "@measured/puck";
import HeroBlock from "../../containers/hero-block";
import HeroSlider from "../../containers/hero-slider";
import HeroWithCategory from "../../containers/hero-with-category";
import HeroWithCategoryFlash from "../../containers/hero-with-category-flash";

export interface HeroSectionProps {
  layout: "hero" | "slider" | "withCategory" | "withCategoryFlash";

  slides: {
    title: string;
    slug: string;
    desktop_image_url: string;
    mobile_image_url: string;
  }[];

  flashBanners?: {
    title: string;
    slug: string;
    type: "large" | "small";
    desktop_image_url: string;
    mobile_image_url: string;
  }[];

  settings?: {
    autoplay: boolean;
    autoplaySpeed: number;
    loop: boolean;
  }[];

  overlaySettings?: {
    overlayEnabled: boolean;
    overlayColor: string;
    overlayOpacity: number;
  }[];

  sliderSettings?: {
    variant: "box" | "fullWidth" | "fashion";
    showArrows: boolean;
  }[];

  withCategorySettings?: {
    categoryLimit: number;
    paginationPosition: "left" | "center" | "right";
  }[];

  flashSettings?: {
    categoryLimit: number;
    flashSaleLimit: number;
  }[];
}

export const HeroSectionConfig: ComponentConfig<HeroSectionProps> = {
  label: "Hero Section",
  fields: {
    layout: {
      type: "select",
      label: "Layout",
      options: [
        { label: "Hero (Simple)", value: "hero" },
        { label: "Hero Slider (Advanced)", value: "slider" },
        { label: "Hero with Category Menu", value: "withCategory" },
        { label: "Hero with Category + Flash Sale", value: "withCategoryFlash" },
      ],
    },
    slides: {
      type: "array",
      label: "Slides",
      getItemSummary: (item) => item.title || "Untitled Slide",
      arrayFields: {
        title: { type: "text", label: "Title" },
        slug: { type: "text", label: "Link Slug" },
        desktop_image_url: { type: "text", label: "Desktop Image URL" },
        mobile_image_url: { type: "text", label: "Mobile Image URL" },
      },
    },
    flashBanners: {
      type: "array",
      label: "Flash Banners (1 large + 2 small)",
      getItemSummary: (item) => `${item.type}: ${item.title || "Banner"}`,
      arrayFields: {
        title: { type: "text", label: "Title" },
        slug: { type: "text", label: "Link Slug" },
        type: {
          type: "select",
          label: "Size",
          options: [
            { label: "Large (Main)", value: "large" },
            { label: "Small (Side)", value: "small" },
          ],
        },
        desktop_image_url: { type: "text", label: "Desktop Image URL" },
        mobile_image_url: { type: "text", label: "Mobile Image URL" },
      },
    },
    settings: {
      type: "array",
      label: "Playback Settings",
      max: 1,
      getItemSummary: () => "Playback Settings",
      arrayFields: {
        autoplay: {
          type: "radio",
          label: "Autoplay",
          options: [
            { label: "Enabled", value: true },
            { label: "Disabled", value: false },
          ],
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
          options: [
            { label: "Enabled", value: true },
            { label: "Disabled", value: false },
          ],
        },
      },
    },
    overlaySettings: {
      type: "array",
      label: "Overlay Settings",
      max: 1,
      getItemSummary: () => "Overlay Settings",
      arrayFields: {
        overlayEnabled: {
          type: "radio",
          label: "Overlay",
          options: [
            { label: "Enabled", value: true },
            { label: "Disabled", value: false },
          ],
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
    },
    sliderSettings: {
      type: "array",
      label: "Slider Settings",
      max: 1,
      getItemSummary: () => "Slider Settings",
      arrayFields: {
        variant: {
          type: "select",
          label: "Layout Style",
          options: [
            { label: "Box (Contained)", value: "box" },
            { label: "Full Width", value: "fullWidth" },
            { label: "Fashion (Multi-slide)", value: "fashion" },
          ],
        },
        showArrows: {
          type: "radio",
          label: "Navigation Arrows",
          options: [
            { label: "Show", value: true },
            { label: "Hide", value: false },
          ],
        },
      },
    },
    withCategorySettings: {
      type: "array",
      label: "Category Menu Settings",
      max: 1,
      getItemSummary: () => "Category Menu Settings",
      arrayFields: {
        categoryLimit: {
          type: "number",
          label: "Category Limit",
          min: 3,
          max: 15,
        },
        paginationPosition: {
          type: "select",
          label: "Pagination Position",
          options: [
            { label: "Left", value: "left" },
            { label: "Center", value: "center" },
            { label: "Right", value: "right" },
          ],
        },
      },
    },
    flashSettings: {
      type: "array",
      label: "Flash Sale Settings",
      max: 1,
      getItemSummary: () => "Flash Sale Settings",
      arrayFields: {
        categoryLimit: {
          type: "number",
          label: "Category Limit",
          min: 3,
          max: 15,
        },
        flashSaleLimit: {
          type: "number",
          label: "Flash Sale Product Limit",
          min: 3,
          max: 20,
        },
      },
    },
  },
  defaultProps: {
    layout: "hero",
    slides: [
      {
        title: "Hero Slide 1",
        slug: "featured",
        desktop_image_url: "/assets/images/hero/hero-banner.png",
        mobile_image_url: "/assets/images/hero/hero-banner-mobile.png",
      },
    ],
    flashBanners: [
      {
        title: "Main Banner",
        slug: "collection",
        type: "large",
        desktop_image_url: "/assets/images/hero/hero-banner.png",
        mobile_image_url: "/assets/images/hero/hero-banner-mobile.png",
      },
      {
        title: "Side Banner 1",
        slug: "promo-1",
        type: "small",
        desktop_image_url: "/assets/images/banner/banner-1.jpg",
        mobile_image_url: "/assets/images/banner/banner-1.jpg",
      },
      {
        title: "Side Banner 2",
        slug: "promo-2",
        type: "small",
        desktop_image_url: "/assets/images/banner/banner-2.jpg",
        mobile_image_url: "/assets/images/banner/banner-2.jpg",
      },
    ],
    settings: [
      {
        autoplay: true,
        autoplaySpeed: 5000,
        loop: true,
      },
    ],
    overlaySettings: [
      {
        overlayEnabled: false,
        overlayColor: "#000000",
        overlayOpacity: 30,
      },
    ],
    sliderSettings: [
      {
        variant: "box",
        showArrows: false,
      },
    ],
    withCategorySettings: [
      {
        categoryLimit: 10,
        paginationPosition: "center",
      },
    ],
    flashSettings: [
      {
        categoryLimit: 10,
        flashSaleLimit: 10,
      },
    ],
  },
  render: ({
    layout,
    slides,
    flashBanners,
    settings,
    overlaySettings,
    sliderSettings,
    withCategorySettings,
    flashSettings,
  }) => {
    const autoplay = settings?.[0]?.autoplay ?? true;
    const autoplaySpeed = settings?.[0]?.autoplaySpeed ?? 5000;
    const loop = settings?.[0]?.loop ?? true;

    const overlayEnabled = overlaySettings?.[0]?.overlayEnabled ?? false;
    const overlayColor = overlaySettings?.[0]?.overlayColor ?? "#000000";
    const overlayOpacity = overlaySettings?.[0]?.overlayOpacity ?? 30;

    const wrapperStyle: React.CSSProperties = overlayEnabled
      ? { position: "relative" }
      : {};

    const mappedSlides = slides.map((slide, index) => ({
      id: index + 1,
      title: slide.title,
      slug: slide.slug,
      image: {
        mobile: {
          url: slide.mobile_image_url,
          width: 600,
          height: 300,
        },
        desktop: {
          url: slide.desktop_image_url,
          width: 1920,
          height: 800,
        },
      },
    }));

    if (layout === "slider") {
      const variant = sliderSettings?.[0]?.variant ?? "box";
      const showArrows = sliderSettings?.[0]?.showArrows ?? false;

      return (
        <HeroSlider
          data={mappedSlides}
          variant={variant}
          variantRounded="rounded"
          paginationPosition="center"
          buttonClassName={showArrows ? "" : "hidden"}
          autoplay={autoplay}
          autoplaySpeed={autoplaySpeed}
          loop={loop}
        />
      );
    }

    if (layout === "withCategory") {
      const categoryLimit = withCategorySettings?.[0]?.categoryLimit ?? 10;
      const paginationPosition =
        withCategorySettings?.[0]?.paginationPosition ?? "center";

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
            paginationPosition={paginationPosition}
            autoplay={autoplay}
            autoplaySpeed={autoplaySpeed}
            loop={loop}
            categoryLimit={categoryLimit}
          />
        </div>
      );
    }

    if (layout === "withCategoryFlash") {
      const categoryLimit = flashSettings?.[0]?.categoryLimit ?? 10;
      const flashSaleLimit = flashSettings?.[0]?.flashSaleLimit ?? 10;

      const source =
        flashBanners && flashBanners.length > 0
          ? flashBanners
          : [
              {
                title: slides?.[0]?.title ?? "Main Banner",
                slug: slides?.[0]?.slug ?? "collection",
                type: "large" as const,
                desktop_image_url: slides?.[0]?.desktop_image_url ?? "",
                mobile_image_url: slides?.[0]?.mobile_image_url ?? "",
              },
            ];

      const mappedBanners = source.map((b, i) => ({
        id: i + 1,
        title: b.title,
        slug: b.slug,
        type: b.type,
        image: {
          mobile: { url: b.mobile_image_url, width: 600, height: 300 },
          desktop: { url: b.desktop_image_url, width: 1920, height: 600 },
        },
      }));

      return (
        <HeroWithCategoryFlash
          data={mappedBanners}
          categoryLimit={categoryLimit}
          flashSaleLimit={flashSaleLimit}
        />
      );
    }

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
          autoplay={autoplay}
          autoplaySpeed={autoplaySpeed}
          loop={loop}
        />
      </div>
    );
  },
};
