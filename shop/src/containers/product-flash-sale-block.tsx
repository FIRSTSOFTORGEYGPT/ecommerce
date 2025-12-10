import SectionHeader from "@components/common/section-header";
import ProductCard from "@components/product/product-card";
import ProductCardGridLoader from "@components/ui/loaders/product-card-grid-loader";
import { useProducts } from "@framework/products";
import { siteSettings } from "@settings/site.settings";
import Alert from "@components/ui/alert";
import { Product } from "@type/index";

interface ProductsFlashSaleProps {
  // Content Settings
  sectionHeading: string;
  className?: string;

  // Essential Settings
  limit?: number;
  gridColumns?: number;
  gridGap?: 'none' | 'small' | 'medium' | 'large';
}

// Static column classes - Tailwind needs full class names at build time
const columnClasses: Record<number, string> = {
  2: 'grid-cols-2',
  3: 'grid-cols-2 sm:grid-cols-3',
  4: 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4',
  5: 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5',
  6: 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6',
};

const ProductsFlashSaleBlock: React.FC<ProductsFlashSaleProps> = ({
  sectionHeading = "Flash Sale",
  className = "mb-12 md:mb-14 xl:mb-16",
  limit = 10,
  gridColumns = 5,
  gridGap = 'medium',
}) => {
  const flashSaleSettings = siteSettings?.homePageBlocks?.flashSale;

  const {
    data: products,
    isLoading: loading,
    error,
  } = useProducts({
    limit,
    tags: flashSaleSettings?.slug,
  });

  // Grid gap classes
  const gapClasses: Record<string, string> = {
    none: 'gap-0',
    small: 'gap-2 md:gap-3',
    medium: 'gap-3 md:gap-5 xl:gap-7',
    large: 'gap-5 md:gap-7 xl:gap-10',
  };

  return (
    <div className={className}>
      <SectionHeader sectionHeading={sectionHeading} />

      {error ? (
        <Alert message={error?.message} />
      ) : (
        <div className={`grid ${columnClasses[gridColumns] || columnClasses[5]} ${gapClasses[gridGap]}`}>
          {loading ? (
            Array.from({ length: limit }).map((_, idx) => (
              <ProductCardGridLoader key={idx} uniqueKey={`flash-sale-${idx}`} />
            ))
          ) : (
            products?.map((product: Product) => (
              <ProductCard
                key={`product--key${product.id}`}
                product={product}
                variant="gridSlim"
              />
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default ProductsFlashSaleBlock;
