import React from "react";
import { useProducts } from "@framework/products";
import ProductsBlock from "./products-block";
import ProductsFeatured from "./products-featured";
import ProductsWithFlashSale from "./products-with-flash-sale";
import BannerWithProducts from "./banner-with-products";
import SaleBannerWithProducts from "./sale-banner-with-products";

interface ProductsSectionProps {
  // Content Settings
  sectionHeading: string;
  className?: string;

  // Layout
  layout: "grid" | "featured" | "flash_sale_sidebar" | "banner_with_products" | "sale_banner_with_products";
  featuredVariant?: "flat" | "left" | "center" | "combined" | "fashion";

  // Banner with products
  bannerTitle?: string;
  bannerSlug?: string;
  bannerDesktopImageUrl?: string;
  bannerMobileImageUrl?: string;
  bannerLayout?: "default" | "reverse";

  // Sale banner with products
  saleBanners?: {
    title: string;
    slug: string;
    desktop_image_url: string;
    mobile_image_url: string;
  }[];
  saleBannerLayout?: "default" | "left";
  saleProductVariant?: "grid" | "gridSlim" | "list" | "listSmall";

  // Flash sale sidebar settings
  sidebarEnabled?: boolean;
  sidebarPosition?: "left" | "right";
  sidebarSource?: "popular" | "filtered";
  sidebarLimit?: number;
  sidebarHeading?: string;
  sidebarLinkSlug?: string;

  // Dynamic Data Source
  filterType: "tag" | "category";
  tagSlug?: string;
  categorySlug?: string;

  // Essential Settings
  limit: number;
  gridColumns: number;
  gridGap: "none" | "small" | "medium" | "large";
}

const ProductsSection: React.FC<ProductsSectionProps> = (props) => {
  const { limit, filterType } = props;

  const safeProps = {
    ...props,
    tagSlug: filterType === "tag" ? props.tagSlug : undefined,
    categorySlug: filterType === "category" ? props.categorySlug : undefined,
  };

  if (safeProps.layout === "featured") {
    return (
      <ProductsFeatured
        sectionHeading={safeProps.sectionHeading}
        className={safeProps.className}
        filterType={safeProps.filterType}
        tagSlug={safeProps.tagSlug}
        categorySlug={safeProps.categorySlug}
        limit={safeProps.limit}
        variant={safeProps.featuredVariant}
        gridColumns={safeProps.gridColumns}
        gridGap={safeProps.gridGap}
      />
    );
  }

  if (safeProps.layout === "banner_with_products") {
    const mappedBanners = safeProps.bannerTitle && safeProps.bannerSlug && safeProps.bannerDesktopImageUrl && safeProps.bannerMobileImageUrl
      ? [{
          id: 1,
          title: safeProps.bannerTitle,
          slug: safeProps.bannerSlug,
          image: {
            mobile: { url: safeProps.bannerMobileImageUrl, width: 480, height: 600 },
            desktop: { url: safeProps.bannerDesktopImageUrl, width: 560, height: 700 },
          },
        }]
      : [];

    return (
      <BannerWithProducts
        data={mappedBanners}
        sectionHeading={safeProps.sectionHeading}
        className={safeProps.className}
        variant={safeProps.bannerLayout}
        limit={safeProps.limit}
        filterType={safeProps.filterType}
        tagSlug={safeProps.tagSlug}
        categorySlug={safeProps.categorySlug}
      />
    );
  }

  if (safeProps.layout === "sale_banner_with_products") {
    const mappedSaleBanners = (safeProps.saleBanners || []).map((b, i) => ({
      id: i + 1,
      title: b.title,
      slug: b.slug,
      image: { mobile: { url: b.mobile_image_url }, desktop: { url: b.desktop_image_url } },
    }));

    return (
      <SaleBannerWithProducts
        sectionHeading={safeProps.sectionHeading}
        className={safeProps.className}
        variant={safeProps.saleBannerLayout}
        productVariant={safeProps.saleProductVariant}
        limit={safeProps.limit}
        bannerData={mappedSaleBanners}
        filterType={safeProps.filterType}
        tagSlug={safeProps.tagSlug}
        categorySlug={safeProps.categorySlug}
      />
    );
  }

  if (safeProps.layout === "flash_sale_sidebar") {
    return (
      <ProductsWithFlashSale
        className={safeProps.className}
        limit={safeProps.limit}
        gridGap={safeProps.gridGap}
        sidebarEnabled={safeProps.sidebarEnabled}
        sidebarPosition={safeProps.sidebarPosition}
        sidebarSource={safeProps.sidebarSource}
        sidebarLimit={safeProps.sidebarLimit}
        sidebarHeading={safeProps.sidebarHeading}
        sidebarLinkSlug={safeProps.sidebarLinkSlug}
        filterType={safeProps.filterType}
        tagSlug={safeProps.tagSlug}
        categorySlug={safeProps.categorySlug}
      />
    );
  }

  const queryOptions: any = { limit };
  if (safeProps.filterType === "tag" && safeProps.tagSlug) queryOptions.tags = safeProps.tagSlug;
  if (safeProps.filterType === "category" && safeProps.categorySlug) queryOptions.category = safeProps.categorySlug;

  const { data: products, isLoading, error } = useProducts(queryOptions);

  return (
    <ProductsBlock
      sectionHeading={safeProps.sectionHeading}
      className={safeProps.className}
      products={products || []}
      loading={isLoading}
      error={error?.message}
      limit={safeProps.limit}
      gridColumns={safeProps.gridColumns}
      gridGap={safeProps.gridGap}
    />
  );
};

export default ProductsSection;
