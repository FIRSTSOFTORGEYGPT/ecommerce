import SectionHeader from "@components/common/section-header";
import ProductOverlayCard from "@components/product/product-overlay-card";
import { useProducts } from "@framework/products";
import Alert from "@components/ui/alert";
import { Product } from "@type/index";
import Spinner from "@components/ui/loaders/spinner/spinner";
import { siteSettings } from "@settings/site.settings";
import { useTranslation } from "next-i18next";
import isEmpty from "lodash/isEmpty";
import NotFoundItem from "@components/404/not-found-item";

interface ProductsProps {
  // Content Settings
  sectionHeading: string;
  categorySlug?: string;
  className?: string;

  // Essential Settings
  limit?: number;
  variant?: "flat" | "left" | "center" | "combined" | "fashion";
  gridColumns?: number;
  gridGap?: 'none' | 'small' | 'medium' | 'large';
}

// Static column classes - Tailwind needs full class names at build time
const columnClasses: Record<number, string> = {
  2: 'grid-cols-2',
  3: 'grid-cols-2 md:grid-cols-3',
  4: 'grid-cols-2 md:grid-cols-4',
  5: 'grid-cols-2 md:grid-cols-4 lg:grid-cols-5',
  6: 'grid-cols-2 md:grid-cols-4 lg:grid-cols-6',
};

const ProductsFeatured: React.FC<ProductsProps> = ({
  sectionHeading,
  categorySlug,
  className = "mb-12 md:mb-14 xl:mb-16",
  limit = 5,
  variant = 'left',
  gridColumns = 4,
  gridGap = 'medium',
}) => {
  const { t } = useTranslation();

  const featuredProductsSettings =
    siteSettings?.homePageBlocks?.featuredProducts;
  const {
    data: products,
    isLoading: loading,
    error,
  } = useProducts({
    limit,
    tags: featuredProductsSettings?.slug,
  });

  if (!loading && isEmpty(products)) {
    return <NotFoundItem text={t("text-no-featured-products-found")} />;
  }

  // Grid gap classes
  const gapClasses: Record<string, string> = {
    none: 'gap-0',
    small: 'gap-2 md:gap-3',
    medium: 'gap-3 md:gap-5 xl:gap-7',
    large: 'gap-5 md:gap-7 xl:gap-10',
  };

  return (
    <div className={className}>
      <SectionHeader
        sectionHeading={sectionHeading}
        categorySlug={categorySlug}
      />

      {error && <Alert message={error.message} />}

      <div className={`grid ${columnClasses[gridColumns] || columnClasses[4]} ${gapClasses[gridGap]}`}>
        {loading ? (
          <Spinner showText={false} />
        ) : (
          <>
            {products?.map((product: Product, idx: number) => (
              <ProductOverlayCard
                key={`product--key${product.id}`}
                product={product}
                variant={variant}
                index={idx}
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default ProductsFeatured;
