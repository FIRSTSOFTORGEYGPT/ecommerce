import SectionHeader from '@components/common/section-header';
import Carousel from '@components/ui/carousel/carousel';
import { SwiperSlide } from 'swiper/react';
import CategoryCard from '@components/common/category-card';
import CategoryCardLoader from '@components/ui/loaders/category-card-loader';
import Alert from '@components/ui/alert';
import { useFeaturedCategories } from '@framework/categories';
import isEmpty from 'lodash/isEmpty';
import NotFoundItem from '@components/404/not-found-item';
import { useTranslation } from 'next-i18next';

interface CategoriesProps {
  // Content Settings
  sectionHeading: string;
  className?: string;

  // Essential Settings
  limit?: number;
  gridColumns?: number;
  gridGap?: 'none' | 'small' | 'medium' | 'large';
}

const breakpoints = {
  '1220': { slidesPerView: 4, spaceBetween: 28 },
  '800': { slidesPerView: 3, spaceBetween: 20 },
  '440': { slidesPerView: 2, spaceBetween: 20 },
  '0': { slidesPerView: 1, spaceBetween: 12 },
};

// Static column classes - Tailwind needs to see full class names at build time
const columnClasses: Record<number, string> = {
  1: 'grid-cols-1',
  2: 'grid-cols-1 md:grid-cols-2',
  3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
  4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  5: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-5',
  6: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-6',
};

const CategoryGridBlock: React.FC<CategoriesProps> = ({
  sectionHeading = 'text-section-title',
  className = 'mb-12 md:mb-14 xl:mb-16',
  limit = 6,
  gridColumns = 4,
  gridGap = 'medium',
}) => {
  const { t } = useTranslation();

  const {
    data: categories,
    isLoading: loading,
    error,
  } = useFeaturedCategories({
    limit,
  });

  if (!loading && isEmpty(categories)) {
    return <NotFoundItem text={t('text-no-categories-found')} />;
  }

  // Grid gap classes
  const gapClasses: Record<string, string> = {
    none: 'gap-0',
    small: 'gap-3',
    medium: 'gap-5 xl:gap-7',
    large: 'gap-8 xl:gap-10',
  };

  return (
    <div className={className}>
      <SectionHeader sectionHeading={sectionHeading} />
      {error ? (
        <Alert message={error?.message} />
      ) : (
        <>
          {/* Mobile Carousel */}
          <div className="relative block lg:hidden">
            <Carousel
              breakpoints={breakpoints}
              prevActivateId="featuredCategoriesPrev"
              nextActivateId="featuredCategoriesNext"
              autoplay={{ delay: 4000 }}
            >
              {loading
                ? Array.from({ length: limit }).map((_, idx) => (
                  <SwiperSlide key={idx}>
                    <CategoryCardLoader uniqueKey={`featured-category-${idx}`} />
                  </SwiperSlide>
                ))
                : categories?.data?.map((category: any) => (
                  <SwiperSlide key={`category--key${category.id}`}>
                    <CategoryCard category={category} />
                  </SwiperSlide>
                ))}
            </Carousel>
          </div>
          {/* Desktop Grid */}
          <div className={`hidden lg:grid ${columnClasses[gridColumns] || columnClasses[4]} ${gapClasses[gridGap]}`}>
            {loading
              ? Array.from({ length: limit }).map((_, idx) => (
                <CategoryCardLoader key={idx} uniqueKey={`featured-category-${idx}`} />
              ))
              : categories?.data?.map((category: any) => (
                <CategoryCard key={`category--key${category.id}`} category={category} />
              ))}
          </div>
        </>
      )}
    </div>
  );
};

export default CategoryGridBlock;
