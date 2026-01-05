import type { ComponentConfig } from "@measured/puck";
import ProductsSection from "../../containers/products-section";

export interface ProductsSectionProps {
  // Content Settings
  sectionHeading: string;
  layout: "grid" | "featured" | "flash_sale_sidebar" | "banner_with_products" | "sale_banner_with_products";
  filterType: "tag" | "category";
  tagSlug?: string;
  categorySlug?: string;

  gridSettings?: {
    limit: number;
    gridColumns: number;
    gridGap: "none" | "small" | "medium" | "large";
  }[];

  featuredSettings?: {
    featuredVariant?: "flat" | "left" | "center" | "combined" | "fashion";
  }[];

  sidebarSettings?: {
    sidebarEnabled?: boolean;
    sidebarPosition?: "left" | "right";
    sidebarSource?: "popular" | "filtered";
    sidebarLimit?: number;
    sidebarHeading?: string;
    sidebarLinkSlug?: string;
  }[];

  bannerSettings?: {
    bannerTitle?: string;
    bannerSlug?: string;
    bannerDesktopImageUrl?: string;
    bannerMobileImageUrl?: string;
    bannerLayout?: "default" | "reverse";
  }[];

  saleBannerSettings?: {
    saleBanners?: {
      title: string;
      slug: string;
      desktop_image_url: string;
      mobile_image_url: string;
    }[];
    saleBannerLayout?: "default" | "left";
    saleProductVariant?: "grid" | "gridSlim" | "list" | "listSmall";
  }[];
}

export const ProductsSectionConfig: ComponentConfig<ProductsSectionProps> = {
  label: "Products Section",
  fields: {
    sectionHeading: {
      type: "text",
      label: "Section Heading",
      placeholder: "e.g., Featured Products",
    },
    layout: {
      type: "select",
      label: "Layout",
      options: [
        { label: "Grid", value: "grid" },
        { label: "Featured", value: "featured" },
        { label: "Flash Sale + Sidebar", value: "flash_sale_sidebar" },
        { label: "Banner + Products", value: "banner_with_products" },
        { label: "Sale Banner + Products", value: "sale_banner_with_products" },
      ],
    },
    gridSettings: {
      type: "array",
      label: "Grid Settings",
      min: 1,
      max: 1,
      getItemSummary: () => "Grid Settings",
      arrayFields: {
        limit: {
          type: "number",
          label: "Number of Products",
          min: 4,
          max: 20,
        },
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
    featuredSettings: {
      type: "array",
      label: "Featured Settings",
      min: 1,
      max: 1,
      getItemSummary: () => "Featured Settings",
      arrayFields: {
        featuredVariant: {
          type: "select",
          label: "Featured Variant",
          options: [
            { label: "Flat", value: "flat" },
            { label: "Left (Big First)", value: "left" },
            { label: "Center (Big Middle)", value: "center" },
            { label: "Combined", value: "combined" },
            { label: "Fashion", value: "fashion" },
          ],
        },
      },
    },
    sidebarSettings: {
      type: "array",
      label: "Sidebar Settings",
      min: 1,
      max: 1,
      getItemSummary: () => "Sidebar Settings",
      arrayFields: {
        sidebarEnabled: {
          type: "radio",
          label: "Show Sidebar",
          options: [
            { label: "Yes", value: true },
            { label: "No", value: false },
          ],
        },
        sidebarPosition: {
          type: "select",
          label: "Sidebar Position",
          options: [
            { label: "Left", value: "left" },
            { label: "Right", value: "right" },
          ],
        },
        sidebarSource: {
          type: "select",
          label: "Sidebar Source",
          options: [
            { label: "Popular", value: "popular" },
            { label: "Filtered (Tag/Category)", value: "filtered" },
          ],
        },
        sidebarLimit: {
          type: "number",
          label: "Sidebar Product Limit",
          min: 2,
          max: 12,
        },
        sidebarHeading: {
          type: "text",
          label: "Sidebar Heading",
        },
        sidebarLinkSlug: {
          type: "text",
          label: "Sidebar Link Slug (e.g. /search)",
        },
      },
    },
    bannerSettings: {
      type: "array",
      label: "Banner Settings",
      min: 1,
      max: 1,
      getItemSummary: () => "Banner Settings",
      arrayFields: {
        bannerTitle: { type: "text", label: "Banner Title" },
        bannerSlug: { type: "text", label: "Banner Link Slug" },
        bannerDesktopImageUrl: { type: "text", label: "Banner Desktop Image" },
        bannerMobileImageUrl: { type: "text", label: "Banner Mobile Image" },
        bannerLayout: {
          type: "select",
          label: "Banner Layout",
          options: [
            { label: "Banner Left", value: "default" },
            { label: "Banner Right", value: "reverse" },
          ],
        },
      },
    },
    saleBannerSettings: {
      type: "array",
      label: "Sale Banner Settings",
      min: 1,
      max: 1,
      getItemSummary: () => "Sale Banner Settings",
      arrayFields: {
        saleBanners: {
          type: "array",
          label: "Banners",
          getItemSummary: (item) => item.title || "Banner",
          arrayFields: {
            title: { type: "text", label: "Title" },
            slug: { type: "text", label: "Link Slug" },
            desktop_image_url: { type: "text", label: "Desktop Image" },
            mobile_image_url: { type: "text", label: "Mobile Image" },
          },
        },
        saleBannerLayout: {
          type: "select",
          label: "Layout",
          options: [
            { label: "Default", value: "default" },
            { label: "Left", value: "left" },
          ],
        },
        saleProductVariant: {
          type: "select",
          label: "Product Variant",
          options: [
            { label: "Grid", value: "grid" },
            { label: "Grid Slim", value: "gridSlim" },
            { label: "List", value: "list" },
            { label: "List Small", value: "listSmall" },
          ],
        },
      },
    },
    filterType: {
      type: "select",
      label: "Filter By",
      options: [
        { label: "Tag", value: "tag" },
        { label: "Category", value: "category" },
      ],
    },
    tagSlug: {
      type: "select",
      label: "Select Tag",
      options: [],
    },
    categorySlug: {
      type: "select",
      label: "Select Category",
      options: [],
    },
  },
  defaultProps: {
    sectionHeading: "Products",
    layout: "grid",
    filterType: "tag",
    tagSlug: "",
    categorySlug: "",
    gridSettings: [{
      limit: 10,
      gridColumns: 5,
      gridGap: "medium",
    }],
    featuredSettings: [{
      featuredVariant: "left",
    }],
    sidebarSettings: [{
      sidebarEnabled: true,
      sidebarPosition: "right",
      sidebarSource: "popular",
      sidebarLimit: 4,
      sidebarHeading: "Top Products",
      sidebarLinkSlug: "/search",
    }],
    bannerSettings: [{
      bannerTitle: "Sale Banner",
      bannerSlug: "sale",
      bannerDesktopImageUrl: "/assets/images/banner/banner-sale-offer.jpg",
      bannerMobileImageUrl: "/assets/images/banner/banner-sale-offer.jpg",
      bannerLayout: "default",
    }],
    saleBannerSettings: [{
      saleBanners: [
        {
          title: "Sale Banner",
          slug: "sale",
          desktop_image_url: "/assets/images/banner/banner-sale-offer.jpg",
          mobile_image_url: "/assets/images/banner/banner-sale-offer.jpg",
        },
      ],
      saleBannerLayout: "default",
      saleProductVariant: "listSmall",
    }],
  },
  render: (props) => {
    const safeProps = {
      ...props,
      tagSlug: props.filterType === "tag" ? props.tagSlug : undefined,
      categorySlug: props.filterType === "category" ? props.categorySlug : undefined,
    };

    const grid = safeProps.gridSettings?.[0];
    const featured = safeProps.featuredSettings?.[0];
    const sidebar = safeProps.sidebarSettings?.[0];
    const banner = safeProps.bannerSettings?.[0];
    const saleBanner = safeProps.saleBannerSettings?.[0];

    return (
      <ProductsSection
        sectionHeading={safeProps.sectionHeading}
        layout={safeProps.layout}
        filterType={safeProps.filterType}
        tagSlug={safeProps.tagSlug}
        categorySlug={safeProps.categorySlug}
        limit={grid?.limit ?? 10}
        gridColumns={grid?.gridColumns ?? 5}
        gridGap={grid?.gridGap ?? "medium"}
        featuredVariant={featured?.featuredVariant}
        sidebarEnabled={sidebar?.sidebarEnabled}
        sidebarPosition={sidebar?.sidebarPosition}
        sidebarSource={sidebar?.sidebarSource}
        sidebarLimit={sidebar?.sidebarLimit}
        sidebarHeading={sidebar?.sidebarHeading}
        sidebarLinkSlug={sidebar?.sidebarLinkSlug}
        bannerTitle={banner?.bannerTitle}
        bannerSlug={banner?.bannerSlug}
        bannerDesktopImageUrl={banner?.bannerDesktopImageUrl}
        bannerMobileImageUrl={banner?.bannerMobileImageUrl}
        bannerLayout={banner?.bannerLayout}
        saleBanners={saleBanner?.saleBanners}
        saleBannerLayout={saleBanner?.saleBannerLayout}
        saleProductVariant={saleBanner?.saleProductVariant}
      />
    );
  },
};
