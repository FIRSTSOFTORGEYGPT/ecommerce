import React from "react";
import type { ComponentConfig } from "@measured/puck";
import BannerCard from "../../components/common/banner-card";
import { ROUTES } from "@lib/routes";
import BannerBlock from "../../containers/banner-block";
import BannerCarouselBlock from "../../containers/banner-carousel-block";
import BannerGridBlock from "../../containers/banner-grid-block";
import BannerSliderBlock from "../../containers/banner-slider-block";

export interface BannerSectionProps {
  layout: "grid" | "masonry" | "carousel" | "slider" | "single";
  banners: {
    title: string;
    slug: string;
    type: "large" | "normal" | "medium" | "small";
    desktop_image_url: string;
    mobile_image_url: string;
  }[];

  masonryBanners?: {
    title: string;
    slug: string;
    type: "medium" | "small";
    desktop_image_url: string;
    mobile_image_url: string;
  }[];

  gridSettings?: {
    gridColumns: number;
    gridGap: "none" | "small" | "medium" | "large";
  }[];

  carouselSettings?: {
    transitionSpeed: number;
    showArrows: boolean;
  }[];

  sliderSettings?: {
    transitionSpeed: number;
  }[];

  singleSettings?: {
    title: string;
    slug: string;
    desktop_image_url: string;
    mobile_image_url: string;
    className?: string;
    classNameInner?: string;
  }[];
}

export const BannerSectionConfig: ComponentConfig<BannerSectionProps> = {
  label: "Banner Section",
  fields: {
    layout: {
      type: "select",
      label: "Layout",
      options: [
        { label: "Grid (Responsive)", value: "grid" },
        { label: "Grid (Masonry)", value: "masonry" },
        { label: "Carousel", value: "carousel" },
        { label: "Slider (Full Width)", value: "slider" },
        { label: "Single Banner", value: "single" },
      ],
    },
    banners: {
      type: "array",
      label: "Banners",
      getItemSummary: (item) => `${item.type}: ${item.title || "Banner"}`,
      arrayFields: {
        title: { type: "text", label: "Banner Title" },
        slug: { type: "text", label: "Link Slug" },
        type: {
          type: "select",
          label: "Size",
          options: [
            { label: "Large", value: "large" },
            { label: "Normal", value: "normal" },
            { label: "Medium", value: "medium" },
            { label: "Small", value: "small" },
          ],
        },
        desktop_image_url: { type: "text", label: "Desktop Image URL" },
        mobile_image_url: { type: "text", label: "Mobile Image URL" },
      },
    },
    masonryBanners: {
      type: "array",
      label: "Masonry Banners",
      getItemSummary: (item) => `${item.type}: ${item.title || "Banner"}`,
      arrayFields: {
        title: { type: "text", label: "Banner Title" },
        slug: { type: "text", label: "nk Slug" },
        type: {
          type: "select",
          label: "Size",
          options: [
            { label: "Medium", value: "medium" },
            { label: "Small", value: "small" },
          ],
        },
        desktop_image_url: { type: "text", label: "Desktop Image URL" },
        mobile_image_url: { type: "text", label: "Mobile Image URL" },
      },
    },
    gridSettings: {
      type: "array",
      label: "Grid Settings",
      max: 1,
      getItemSummary: () => "Grid Settings",
      arrayFields: {
        gridColumns: {
          type: "select",
          label: "Grid Columns (Desktop)",
          options: [
            { label: "2 Columns", value: 2 },
            { label: "3 Columns", value: 3 },
            { label: "4 Columns", value: 4 },
            { label: "5 Columns", value: 5 },
          ],
        },
        gridGap: {
          type: "select",
          label: "Grid Gap",
          options: [
            { label: "None", value: "none" },
            { label: "Small", value: "small" },
            { label: "Medium", value: "medium" },
            { label: "Large", value: "large" },
          ],
        },
      },
    },
    carouselSettings: {
      type: "array",
      label: "Carousel Settings",
      max: 1,
      getItemSummary: () => "Carousel Settings",
      arrayFields: {
        transitionSpeed: {
          type: "number",
          label: "Transition Speed (ms)",
          min: 500,
          max: 20000,
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
    sliderSettings: {
      type: "array",
      label: "Slider Settings",
      max: 1,
      getItemSummary: () => "Slider Settings",
      arrayFields: {
        transitionSpeed: {
          type: "number",
          label: "Transition Speed (ms)",
          min: 500,
          max: 20000,
        },
      },
    },
    singleSettings: {
      type: "array",
      label: "Single Banner Settings",
      max: 1,
      getItemSummary: () => "Single Banner Settings",
      arrayFields: {
        title: { type: "text", label: "Banner Title" },
        slug: { type: "text", label: "Link Slug" },
        desktop_image_url: { type: "text", label: "Desktop Image URL" },
        mobile_image_url: { type: "text", label: "Mobile Image URL" },
        className: { type: "text", label: "Class Name" },
        classNameInner: { type: "text", label: "Inner Class Name" },
      },
    },
  },
  defaultProps: {
    layout: "masonry",
    banners: [
      {
        title: "Full Banner",
        slug: "full",
        type: "large",
        desktop_image_url: "/assets/images/banner/banner-sale-offer.jpg",
        mobile_image_url: "/assets/images/banner/banner-sale-offer.jpg",
      },
      {
        title: "Left",
        slug: "left",
        type: "normal",
        desktop_image_url: "/assets/images/banner/banner-1.jpg",
        mobile_image_url: "/assets/images/banner/banner-1.jpg",
      },
      {
        title: "Right",
        slug: "right",
        type: "normal",
        desktop_image_url: "/assets/images/banner/banner-2.jpg",
        mobile_image_url: "/assets/images/banner/banner-2.jpg",
      },
    ],
    masonryBanners: [
      {
        title: "Men's Collection",
        slug: "mens-collection",
        type: "medium",
        desktop_image_url: "/assets/images/banner/masonry/banner-1.jpg",
        mobile_image_url: "/assets/images/banner/masonry/banner-mobile-1.jpg",
      },
      {
        title: "New Sports",
        slug: "new-sports",
        type: "small",
        desktop_image_url: "/assets/images/banner/masonry/banner-2.jpg",
        mobile_image_url: "/assets/images/banner/masonry/banner-mobile-2.jpg",
      },
      {
        title: "Dress Women",
        slug: "womens-collection",
        type: "small",
        desktop_image_url: "/assets/images/banner/masonry/banner-3.jpg",
        mobile_image_url: "/assets/images/banner/masonry/banner-mobile-3.jpg",
      },
      {
        title: "Exclusive Sunglasses",
        slug: "exclusive-sunglasses",
        type: "small",
        desktop_image_url: "/assets/images/banner/masonry/banner-4.jpg",
        mobile_image_url: "/assets/images/banner/masonry/banner-mobile-4.jpg",
      },
      {
        title: "Product Coupons",
        slug: "product-coupons",
        type: "small",
        desktop_image_url: "/assets/images/banner/masonry/banner-5.jpg",
        mobile_image_url: "/assets/images/banner/masonry/banner-mobile-5.jpg",
      },
      {
        title: "New Backpack",
        slug: "new-backpack",
        type: "medium",
        desktop_image_url: "/assets/images/banner/masonry/banner-6.jpg",
        mobile_image_url: "/assets/images/banner/masonry/banner-mobile-6.jpg",
      },
    ],
    gridSettings: [{ gridColumns: 2, gridGap: "medium" }],
    carouselSettings: [{ transitionSpeed: 5000, showArrows: true }],
    sliderSettings: [{ transitionSpeed: 4000 }],
    singleSettings: [
      {
        title: "Banner Title",
        slug: "banner-slug",
        desktop_image_url: "/assets/images/banner/banner-3.jpg",
        mobile_image_url: "/assets/images/banner/banner-mobile-3.jpg",
      },
    ],
  },
  render: ({ layout, banners, masonryBanners, gridSettings, carouselSettings, sliderSettings, singleSettings }) => {
    if (layout === "single") {
      const single = singleSettings?.[0];
      const fallback = banners?.[0];
      if (!single && !fallback) return <></>;

      const classNameInner =
        single?.classNameInner ?? "aspect-[3/1] sm:aspect-[1800/570]";

      const mobileUrl =
        single?.mobile_image_url ??
        fallback?.mobile_image_url ??
        single?.desktop_image_url ??
        fallback?.desktop_image_url;

      const desktopUrl =
        single?.desktop_image_url ??
        fallback?.desktop_image_url ??
        single?.mobile_image_url ??
        fallback?.mobile_image_url;

      const data = {
        id: 1,
        title: single?.title ?? fallback?.title,
        slug: single?.slug ?? fallback?.slug,
        image: {
          mobile: {
            url: mobileUrl,
            width: 450,
            height: 180,
          },
          desktop: {
            url: desktopUrl,
            width: 1800,
            height: 570,
          },
        },
      };

      return (
        <BannerCard
          data={data}
          href={`${ROUTES.COLLECTIONS}/${single?.slug ?? fallback?.slug}`}
          className={single?.className}
          classNameInner={classNameInner}
        />
      );
    }

    if (layout === "masonry") {
      const source = masonryBanners && masonryBanners.length > 0 ? masonryBanners : banners;
      const mappedBanners = (source || []).map((b, i) => ({
        id: i + 1,
        title: b.title,
        slug: b.slug,
        type: b.type,
        image: {
          mobile:
            b.type === "medium"
              ? { url: b.mobile_image_url, width: 470, height: 232 }
              : { url: b.mobile_image_url, width: 232, height: 232 },
          desktop:
            b.type === "medium"
              ? { url: b.desktop_image_url, width: 1078, height: 425 }
              : { url: b.desktop_image_url, width: 425, height: 425 },
        },
      }));

      return <BannerBlock data={mappedBanners} />;
    }

    if (layout === "grid") {
      const mappedBanners = banners.map((b, i) => ({
        id: i + 1,
        title: b.title,
        slug: b.slug,
        type: b.type,
        image: {
          mobile: { url: b.mobile_image_url, width: 600, height: 300 },
          desktop: { url: b.desktop_image_url, width: 1920, height: 600 },
        },
      }));

      const gridColumns = gridSettings?.[0]?.gridColumns ?? 2;
      const gridGap = gridSettings?.[0]?.gridGap ?? "medium";

      return <BannerGridBlock data={mappedBanners} gridColumns={gridColumns} gridGap={gridGap} />;
    }

    if (layout === "slider") {
      const mappedBanners = banners.map((b, i) => ({
        id: i + 1,
        title: b.title,
        slug: b.slug,
        type: b.type,
        image: {
          mobile: { url: b.mobile_image_url, width: 600, height: 235 },
          desktop: { url: b.desktop_image_url, width: 1920, height: 750 },
        },
      }));

      const speed = sliderSettings?.[0]?.transitionSpeed ?? 4000;
      return (
        <BannerSliderBlock
          data={mappedBanners}
          autoplay={true}
          autoplaySpeed={speed}
          loop={true}
        />
      );
    }

    const mappedBanners = banners.map((b, i) => ({
      id: i + 1,
      title: b.title,
      slug: b.slug,
      type: b.type,
      image: {
        mobile: { url: b.mobile_image_url, width: 350, height: 220 },
        desktop: { url: b.desktop_image_url, width: 560, height: 350 },
      },
    }));

    const speed = carouselSettings?.[0]?.transitionSpeed ?? 5000;
    const showArrows = carouselSettings?.[0]?.showArrows ?? true;

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
