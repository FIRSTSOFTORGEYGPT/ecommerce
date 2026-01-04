import React from 'react';
import SectionHeader from '@components/common/section-header';
import ProductCard from '@components/product/product-card';
import ProductFeedLoader from '@components/ui/loaders/product-feed-loader';
import { Product } from '@type/index';
import Alert from '@components/ui/alert';

interface ProductsProps {
  sectionHeading: string;
  dataSource?: string;
  className?: string;
  products?: Product[];
  loading: boolean;
  error?: string;
  uniqueKey?: string;

  // Essential Settings
  limit?: number;
  gridColumns?: number;
  gridGap?: "none" | "small" | "medium" | "large";
}

// Static column classes - Tailwind needs full class names at build time
const columnClasses: Record<number, string> = {
  2: 'grid-cols-2',
  3: 'grid-cols-2 sm:grid-cols-3',
  4: 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4',
  5: 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5',
  6: 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6',
};

const ProductsBlock: React.FC<ProductsProps> = ({
  sectionHeading,
  className = 'mb-9 md:mb-9 lg:mb-10 xl:mb-12',
  products,
  loading,
  error,
  uniqueKey,
  gridColumns = 5,
  gridGap = 'medium',
}) => {

  // Grid gap classes
  const gapClasses = {
    none: 'gap-0',
    small: 'gap-x-2 gap-y-2 md:gap-x-3 md:gap-y-3',
    medium: 'gap-x-3 md:gap-x-5 xl:gap-x-7 gap-y-3 xl:gap-y-5 2xl:gap-y-8',
    large: 'gap-x-5 md:gap-x-7 xl:gap-x-10 gap-y-5 xl:gap-y-7 2xl:gap-y-10',
  };

  return (
    <div className={`w-full ${className}`}>
      <SectionHeader
        sectionHeading={sectionHeading}
      />

      {error ? (
        <Alert message={error} />
      ) : (
        <div className={`grid ${columnClasses[gridColumns] || columnClasses[5]} ${gapClasses[gridGap]}`}>
          {loading && !products?.length ? (
            <ProductFeedLoader limit={10} uniqueKey={uniqueKey} />
          ) : (
            products?.map((product: Product) => (
              <ProductCard
                key={`product--key${product.id}`}
                product={product}
                variant="grid"
              />
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default ProductsBlock;
