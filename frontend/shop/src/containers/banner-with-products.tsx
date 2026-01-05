import BannerCard from '@components/common/banner-card';
import SectionHeader from '@components/common/section-header';
import ProductCard from '@components/product/product-card';
import ProductCardListSmallLoader from '@components/ui/loaders/product-card-small-list-loader';
import { useProducts } from '@framework/products';
import Alert from '@components/ui/alert';
import { ROUTES } from '@lib/routes';
import { useTranslation } from 'next-i18next';
import isEmpty from 'lodash/isEmpty';
import NotFoundItem from '@components/404/not-found-item';
import { StaticBanner } from '@type/index';
import classNames from 'classnames';

interface ProductsProps {
  data: StaticBanner[];
  sectionHeading: string;
  categorySlug?: string;
  className?: string;
  variant?: 'default' | 'reverse';
  limit?: number;
  filterType?: 'tag' | 'category';
  tagSlug?: string;
}

const BannerWithProducts: React.FC<ProductsProps> = ({
  sectionHeading,
  categorySlug,
  variant = 'default',
  className = 'mb-12 md:mb-14 xl:mb-16',
  limit = 9,
  data,
  filterType = 'tag',
  tagSlug,
}) => {
  const { t } = useTranslation();

  const queryOptions: any = { limit };
  if (filterType === 'tag' && tagSlug) queryOptions.tags = tagSlug;
  if (filterType === 'category' && categorySlug) queryOptions.category = categorySlug;

  const {
    data: products,
    isLoading: loading,
    error,
  } = useProducts(queryOptions);

  if (!loading && isEmpty(products)) {
    return <NotFoundItem text={t('text-no-on-selling-products-found')} />;
  }

  return (
    <div className={className}>
      <SectionHeader
        sectionHeading={sectionHeading}
        categorySlug={categorySlug}
      />
      {error ? (
        <Alert message={error?.message} />
      ) : (
        <div className="grid grid-cols-1 gap-3 md:grid-cols-4 md:gap-x-5 xl:gap-x-7">
          {data?.[0] ? (
            <BannerCard
              data={data[0]}
              href={`${ROUTES.COLLECTIONS}/${data[0].slug}`}
              className={classNames('md:col-span-1', {
                'md:order-2': variant === 'reverse',
              })}
              classNameInner="aspect-[2/2.78] h-full"
              effectActive={true}
            />
          ) : null}
          <div
            className={`${
              variant === 'reverse' ? 'md:order-1' : ''
            } md:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-5 xl:gap-7 ${
              variant === 'reverse' ? 'row-span-full' : ''
            }`}
          >
            {loading
              ? Array.from({ length: products?.length ?? 4 }).map((_, idx) => (
                  <ProductCardListSmallLoader
                    key={idx}
                    uniqueKey={`on-selling-${idx}`}
                  />
                ))
              : products?.map((product: any) => (
                  <ProductCard
                    key={`product--key${product.id}`}
                    product={product}
                    variant="listSmall"
                  />
                ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BannerWithProducts;
