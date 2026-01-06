import React from "react";
import type { ComponentConfig } from "@measured/puck";
import CategoryBlock from "../../containers/category-block";
import CategoryGridBlock from "../../containers/category-grid-block";

export interface CategorySectionProps {
  layout: "carousel" | "grid";
  sectionHeading: string;
  limit: number;

  carouselSettings?: {
    visibleItems: number;
    variant: "rounded" | "circle" | "modern" | "elegant";
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

export const CategorySectionConfig: ComponentConfig<CategorySectionProps> = {
  label: "Categories Section",
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
      label: "Number of Categories",
      min: 2,
      max: 16,
    },
    carouselSettings: {
      type: "array",
      label: "Carousel Settings",
      max: 1,
      getItemSummary: () => "Carousel Settings",
      arrayFields: {
        visibleItems: {
          type: "select",
          label: "Visible Items (Desktop)",
          options: [
            { label: "4 Items", value: 4 },
            { label: "5 Items", value: 5 },
            { label: "6 Items", value: 6 },
            { label: "7 Items", value: 7 },
            { label: "8 Items", value: 8 },
          ],
        },
        variant: {
          type: "select",
          label: "Card Style",
          options: [
            { label: "Rounded", value: "rounded" },
            { label: "Circle", value: "circle" },
            { label: "Modern", value: "modern" },
            { label: "Elegant", value: "elegant" },
          ],
        },
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
    sectionHeading: "Shop by Category",
    limit: 10,
    carouselSettings: [
      {
        visibleItems: 6,
        variant: "circle",
        autoplay: true,
        autoplaySpeed: 3500,
        loop: true,
        showArrows: true,
      },
    ],
    gridSettings: [{ gridColumns: 4, gridGap: "medium" }],
  },
  render: ({ layout, sectionHeading, limit, carouselSettings, gridSettings }) => {
    if (layout === "grid") {
      const gridColumns = gridSettings?.[0]?.gridColumns ?? 4;
      const gridGap = gridSettings?.[0]?.gridGap ?? "medium";
      return (
        <CategoryGridBlock
          sectionHeading={sectionHeading}
          limit={limit}
          gridColumns={gridColumns}
          gridGap={gridGap}
        />
      );
    }

    const visibleItems = carouselSettings?.[0]?.visibleItems ?? 6;
    const variant = carouselSettings?.[0]?.variant ?? "circle";
    const autoplay = carouselSettings?.[0]?.autoplay ?? true;
    const autoplaySpeed = carouselSettings?.[0]?.autoplaySpeed ?? 3500;
    const loop = carouselSettings?.[0]?.loop ?? true;
    const showArrows = carouselSettings?.[0]?.showArrows ?? true;

    return (
      <CategoryBlock
        sectionHeading={sectionHeading}
        limit={limit}
        visibleItems={visibleItems}
        variant={variant}
        autoplay={autoplay}
        autoplaySpeed={autoplaySpeed}
        loop={loop}
        showArrows={showArrows}
      />
    );
  },
};
