import React from "react";
import type { ComponentConfig } from "@measured/puck";
import BrandBlock from "../../containers/brand-block";
import BrandGridBlock from "../../containers/brand-grid-block";

export interface BrandSectionProps {
  layout: "carousel" | "grid";
  sectionHeading: string;
  limit: number;

  carouselSettings?: {
    autoplay: boolean;
    autoplaySpeed: number;
    loop: boolean;
    showArrows: boolean;
  }[];

  gridSettings?: {
    gridColumns: number;
    gridGap: "none" | "small" | "medium" | "large";
  }[];
}

export const BrandSectionConfig: ComponentConfig<BrandSectionProps> = {
  label: "Brands Section",
  fields: {
    layout: {
      type: "select",
      label: "Layout",
      options: [
        { label: "Carousel", value: "carousel" },
        { label: "Grid", value: "grid" },
      ],
    },
    sectionHeading: {
      type: "text",
      label: "Section Heading",
    },
    limit: {
      type: "number",
      label: "Number of Brands",
      min: 2,
      max: 40,
    },
    carouselSettings: {
      type: "array",
      label: "Carousel Settings",
      max: 1,
      getItemSummary: () => "Carousel Settings",
      arrayFields: {
        autoplay: {
          type: "radio",
          label: "Auto-Rotate",
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
            { label: "6 Columns", value: 6 },
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
  },
  defaultProps: {
    layout: "carousel",
    sectionHeading: "Shop by Brand",
    limit: 12,
    carouselSettings: [
      {
        autoplay: true,
        autoplaySpeed: 3000,
        loop: true,
        showArrows: true,
      },
    ],
    gridSettings: [{ gridColumns: 6, gridGap: "medium" }],
  },
  render: ({ layout, sectionHeading, limit, carouselSettings, gridSettings }) => {
    if (layout === "grid") {
      const gridColumns = gridSettings?.[0]?.gridColumns ?? 6;
      const gridGap = gridSettings?.[0]?.gridGap ?? "medium";
      return (
        <BrandGridBlock
          sectionHeading={sectionHeading}
          limit={limit}
          gridColumns={gridColumns}
          gridGap={gridGap}
        />
      );
    }

    const autoplay = carouselSettings?.[0]?.autoplay ?? true;
    const autoplaySpeed = carouselSettings?.[0]?.autoplaySpeed ?? 3000;
    const loop = carouselSettings?.[0]?.loop ?? true;
    const showArrows = carouselSettings?.[0]?.showArrows ?? true;

    return (
      <BrandBlock
        sectionHeading={sectionHeading}
        limit={limit}
        autoplay={autoplay}
        autoplaySpeed={autoplaySpeed}
        loop={loop}
        showArrows={showArrows}
      />
    );
  },
};
