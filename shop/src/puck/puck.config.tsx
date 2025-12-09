/**
 * Main Puck Configuration
 * 
 * Imports and registers all component configs
 */

import type { Config } from "@measured/puck";
import {
  // Phase 2: Core Components
  BannerCarouselBlockConfig,
  BannerCarouselBlockProps,
  HeroBlockConfig,
  HeroBlockProps,
  ProductsBlockConfig,
  ProductsBlockProps,
  CategoryBlockConfig,
  CategoryBlockProps,
  TestimonialCarouselConfig,
  TestimonialCarouselProps,
  FooterConfig,
  FooterProps,
  // Phase 3: Additional Components
  BannerBlockConfig,
  BannerBlockProps,
  BannerGridBlockConfig,
  BannerGridBlockProps,
  BannerSliderBlockConfig,
  BannerSliderBlockProps,
  BrandBlockConfig,
  BrandBlockProps,
  BrandGridBlockConfig,
  BrandGridBlockProps,
  FeatureBlockConfig,
  FeatureBlockProps,
  ProductsFeaturedConfig,
  ProductsFeaturedProps,
  ContactInfoConfig,
  ContactInfoProps,
  // Phase 4: Advanced Components
  HeroSliderConfig,
  HeroSliderProps,
  HeroWithCategoryConfig,
  HeroWithCategoryProps,
  HeroWithCategoryFlashConfig,
  HeroWithCategoryFlashProps,
  BannerWithProductsConfig,
  BannerWithProductsProps,
  ProductFlashSaleBlockConfig,
  ProductFlashSaleBlockProps,
  ProductsWithFlashSaleConfig,
  ProductsWithFlashSaleProps,
  SaleBannerWithProductsConfig,
  SaleBannerWithProductsProps,
  // Additional Containers
  ExclusiveBlockConfig,
  ExclusiveBlockProps,
  CollectionBlockConfig,
  CollectionBlockProps,
  ProductsTopBlockConfig,
  ProductsTopBlockProps,
  CategoryGridBlockConfig,
  CategoryGridBlockProps,
} from "./configs";

// Props type mapping for all components
type Props = {
  // Phase 2
  BannerCarouselBlock: BannerCarouselBlockProps;
  HeroBlock: HeroBlockProps;
  ProductsBlock: ProductsBlockProps;
  CategoryBlock: CategoryBlockProps;
  TestimonialCarousel: TestimonialCarouselProps;
  Footer: FooterProps;
  // Phase 3
  BannerBlock: BannerBlockProps;
  BannerGridBlock: BannerGridBlockProps;
  BannerSliderBlock: BannerSliderBlockProps;
  BrandBlock: BrandBlockProps;
  BrandGridBlock: BrandGridBlockProps;
  FeatureBlock: FeatureBlockProps;
  ProductsFeatured: ProductsFeaturedProps;
  ContactInfo: ContactInfoProps;
  // Phase 4
  HeroSlider: HeroSliderProps;
  HeroWithCategory: HeroWithCategoryProps;
  HeroWithCategoryFlash: HeroWithCategoryFlashProps;
  BannerWithProducts: BannerWithProductsProps;
  ProductFlashSaleBlock: ProductFlashSaleBlockProps;
  ProductsWithFlashSale: ProductsWithFlashSaleProps;
  SaleBannerWithProducts: SaleBannerWithProductsProps;
  // Additional
  ExclusiveBlock: ExclusiveBlockProps;
  CollectionBlock: CollectionBlockProps;
  ProductsTopBlock: ProductsTopBlockProps;
  CategoryGridBlock: CategoryGridBlockProps;
};

export const config: Config<Props> = {
  categories: {
    heroes: {
      title: "Hero Sections",
      components: [
        "HeroBlock",
        "HeroSlider",
        "HeroWithCategory",
        "HeroWithCategoryFlash",
      ],
    },
    banners: {
      title: "Banners",
      components: [
        "BannerCarouselBlock",
        "BannerBlock",
        "BannerGridBlock",
        "BannerSliderBlock",
        "BannerWithProducts",
      ],
    },
    products: {
      title: "Product Displays",
      components: [
        "ProductsBlock",
        "ProductsFeatured",
        "ProductsTopBlock",
        "ProductFlashSaleBlock",
        "ProductsWithFlashSale",
        "SaleBannerWithProducts",
      ],
    },
    categories: {
      title: "Categories & Brands",
      components: [
        "CategoryBlock",
        "CategoryGridBlock",
        "BrandBlock",
        "BrandGridBlock",
      ],
    },
    content: {
      title: "Content Blocks",
      components: [
        "TestimonialCarousel",
        "CollectionBlock",
        "ExclusiveBlock",
        "FeatureBlock",
        "ContactInfo",
      ],
    },
    layout: {
      title: "Layout",
      components: ["Footer"],
    },
  },
  components: {
    // Phase 2: Core Components
    BannerCarouselBlock: BannerCarouselBlockConfig,
    HeroBlock: HeroBlockConfig,
    ProductsBlock: ProductsBlockConfig,
    CategoryBlock: CategoryBlockConfig,
    TestimonialCarousel: TestimonialCarouselConfig,
    Footer: FooterConfig,
    // Phase 3: Additional Components
    BannerBlock: BannerBlockConfig,
    BannerGridBlock: BannerGridBlockConfig,
    BannerSliderBlock: BannerSliderBlockConfig,
    BrandBlock: BrandBlockConfig,
    BrandGridBlock: BrandGridBlockConfig,
    FeatureBlock: FeatureBlockConfig,
    ProductsFeatured: ProductsFeaturedConfig,
    ContactInfo: ContactInfoConfig,
    // Phase 4: Advanced Components
    HeroSlider: HeroSliderConfig,
    HeroWithCategory: HeroWithCategoryConfig,
    HeroWithCategoryFlash: HeroWithCategoryFlashConfig,
    BannerWithProducts: BannerWithProductsConfig,
    ProductFlashSaleBlock: ProductFlashSaleBlockConfig,
    ProductsWithFlashSale: ProductsWithFlashSaleConfig,
    SaleBannerWithProducts: SaleBannerWithProductsConfig,
    // Additional Containers
    ExclusiveBlock: ExclusiveBlockConfig,
    CollectionBlock: CollectionBlockConfig,
    ProductsTopBlock: ProductsTopBlockConfig,
    CategoryGridBlock: CategoryGridBlockConfig,
  },
};

export default config;
