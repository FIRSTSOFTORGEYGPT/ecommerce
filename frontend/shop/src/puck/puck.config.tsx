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
  BannerSectionConfig,
  BannerSectionProps,
  HeroBlockConfig,
  HeroBlockProps,
  HeroSectionConfig,
  HeroSectionProps,
  ProductsBlockConfig,
  ProductsBlockProps,
  ProductsSectionConfig,
  ProductsSectionProps,
  CategoryBlockConfig,
  CategoryBlockProps,
  CategorySectionConfig,
  CategorySectionProps,
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
  BrandSectionConfig,
  BrandSectionProps,
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
  // Homepage Components
  DownloadAppsConfig,
  DownloadAppsProps,
  SupportConfig,
  SupportProps,
  InstagramConfig,
  InstagramProps,
  SubscriptionConfig,
  SubscriptionProps,
  NewArrivalsProductFeedConfig,
  NewArrivalsProductFeedProps,
  SingleBannerBlockConfig,
  SingleBannerBlockProps,
} from "./configs";

// Props type mapping for all components
type Props = {
  // Phase 2
  BannerCarouselBlock: BannerCarouselBlockProps;
  BannerSection: BannerSectionProps;
  HeroBlock: HeroBlockProps;
  HeroSection: HeroSectionProps;
  ProductsBlock: ProductsBlockProps;
  ProductsSection: ProductsSectionProps;
  CategoryBlock: CategoryBlockProps;
  CategorySection: CategorySectionProps;
  TestimonialCarousel: TestimonialCarouselProps;
  Footer: FooterProps;
  // Phase 3
  BannerBlock: BannerBlockProps;
  BannerGridBlock: BannerGridBlockProps;
  BannerSliderBlock: BannerSliderBlockProps;
  BrandBlock: BrandBlockProps;
  BrandSection: BrandSectionProps;
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
  // Homepage
  DownloadApps: DownloadAppsProps;
  Support: SupportProps;
  Instagram: InstagramProps;
  Subscription: SubscriptionProps;
  NewArrivalsProductFeed: NewArrivalsProductFeedProps;
  SingleBannerBlock: SingleBannerBlockProps;
};

export const config: Config<Props> = {
  root: {
    fields: {
      title: { type: "text", label: "Page Title" },
      slug: { type: "text", label: "Page Slug" },
      pageId: { type: "number", label: "Page ID" },
    },
  },
  categories: {
    heroes: {
      title: "Hero Sections",
      components: [
        "HeroSection",
      ],
    },
    other: {
      visible: false,
    },
    banners: {
      title: "Banners",
      components: [
        "BannerSection",
      ],
    },
    products: {
      title: "Product Displays",
      components: [
        "ProductsSection",
        // "ProductsTopBlock",
        // "ProductFlashSaleBlock",
      ],
    },
    categories: {
      title: "Categories & Brands",
      components: [
        "CategorySection",
        "BrandSection",
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
    homepage: {
      title: "Homepage",
      components: [
        "DownloadApps",
        "Support",
        "Instagram",
        "Subscription",
      ],
    },
  },
  components: {
    // Phase 2: Core Components
    BannerCarouselBlock: BannerCarouselBlockConfig,
    BannerSection: BannerSectionConfig,
    HeroBlock: HeroBlockConfig,
    HeroSection: HeroSectionConfig,
    ProductsBlock: ProductsBlockConfig,
    ProductsSection: ProductsSectionConfig,
    CategoryBlock: CategoryBlockConfig,
    CategorySection: CategorySectionConfig,
    TestimonialCarousel: TestimonialCarouselConfig,
    Footer: FooterConfig,
    // Phase 3: Additional Components
    BannerBlock: BannerBlockConfig,
    BannerGridBlock: BannerGridBlockConfig,
    BannerSliderBlock: BannerSliderBlockConfig,
    BrandBlock: BrandBlockConfig,
    BrandSection: BrandSectionConfig,
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
    // Homepage
    DownloadApps: DownloadAppsConfig,
    Support: SupportConfig,
    Instagram: InstagramConfig,
    Subscription: SubscriptionConfig,
    NewArrivalsProductFeed: NewArrivalsProductFeedConfig,
    SingleBannerBlock: SingleBannerBlockConfig,
  },
};

export default config;
