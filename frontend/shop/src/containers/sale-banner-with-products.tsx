import BannerCard from '@components/common/banner-card';
import SectionHeader from '@components/common/section-header';
import ProductCard from '@components/product/product-card';
import ProductCardListSmallLoader from '@components/ui/loaders/product-card-small-list-loader';
import { useProducts } from '@framework/products';
import { saleBannerWithProducts as banner } from '@data/static/banners';
import Alert from '@components/ui/alert';
import { ROUTES } from '@lib/routes';
import { Product } from '@type/index';

import cn from 'classnames';

interface ProductsProps {
  sectionHeading: string;
  categorySlug?: string;
  className?: string;
  variant?: 'default' | 'left';
  productVariant?: 'grid' | 'gridSlim' | 'list' | 'listSmall';
  limit?: number;
  bannerData?: any;
  filterType?: 'tag' | 'category';
  tagSlug?: string;
}

const SaleBannerWithProducts: React.FC<ProductsProps> = ({
  sectionHeading,
  categorySlug,
  className = 'mb-12 md:mb-14 xl:mb-16',
  variant = 'default',
  productVariant = 'listSmall',
  limit = 4,
  bannerData = banner,
  filterType = 'tag',
  tagSlug,
}) => {

  const queryOptions: any = { limit };
  if (filterType === 'tag' && tagSlug) queryOptions.tags = tagSlug;
  // Use the passed categorySlug for filtering if type is category
  if (filterType === 'category' && categorySlug) queryOptions.category = categorySlug;

  const { data, isLoading, error } = useProducts(queryOptions);

  return (
    <div className={className}>
      <SectionHeader
        sectionHeading={sectionHeading}
        categorySlug={categorySlug}
      />
      {error ? (
        <Alert message={error?.message} />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 md:gap-6 lg:gap-5 xl:gap-7">
          <div
            className={cn(
              'lg:col-span-4',
              variant === 'left' ? 'lg:order-1' : 'lg:order-2'
            )}
          >
            <BannerCard
              data={bannerData[0]}
              href={`${ROUTES.COLLECTIONS}/${bannerData[0].slug}`}
              effectActive={true}
              className="w-full"
              classNameInner="aspect-[430/600]"
            />
          </div>
          <div
            className={cn(
              'grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6 lg:gap-5 xl:gap-7 lg:col-span-8',
              variant === 'left' ? 'lg:order-2' : 'lg:order-1'
            )}
          >
            {isLoading
              ? Array.from({ length: 2 }).map((_, idx) => (
                <ProductCardListSmallLoader
                  key={idx}
                  uniqueKey={`on-selling-${idx}`}
                />
              ))
              : data?.map((product: Product) => (
                <ProductCard
                  key={`product--key${product.id}`}
                  product={product}
                  variant={productVariant}
                />
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SaleBannerWithProducts;
