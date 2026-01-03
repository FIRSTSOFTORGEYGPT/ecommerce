import Card from '@components/common/card';
import SectionHeader from '@components/common/section-header';
import Carousel from '@components/ui/carousel/carousel';
import CardLoader from '@components/ui/loaders/card-loader';
import CardRoundedLoader from '@components/ui/loaders/card-rounded-loader';
import CardIconLoader from '@components/ui/loaders/card-icon-loader';
import { useCategories } from '@framework/categories';
import { ROUTES } from '@lib/routes';
import Alert from '@components/ui/alert';
import { SwiperSlide } from 'swiper/react';
import isEmpty from 'lodash/isEmpty';
import NotFoundItem from '@components/404/not-found-item';
import { useTranslation } from 'next-i18next';
import React from 'react';
import { getCategoryTypeImage } from '@lib/get-category-type-image';

interface CategoriesProps {
  sectionHeading: string;
  className?: string;
  limit?: number;
  variant?: 'rounded' | 'circle' | 'modern' | 'elegant';
  autoplay?: boolean;
  autoplaySpeed?: number;
  loop?: boolean;
  showArrows?: boolean;
  visibleItems?: number;
}

const defaultBreakpoints = {
  '1720': { slidesPerView: 8, spaceBetween: 28 },
  '1400': { slidesPerView: 7, spaceBetween: 28 },
  '1025': { slidesPerView: 6, spaceBetween: 28 },
  '768': { slidesPerView: 5, spaceBetween: 20 },
  '500': { slidesPerView: 4, spaceBetween: 20 },
  '0': { slidesPerView: 3, spaceBetween: 12 },
};

const modernBreakpoints = {
  '1780': { slidesPerView: 6, spaceBetween: 12 },
  '1280': { slidesPerView: 5, spaceBetween: 12 },
  '768': { slidesPerView: 4, spaceBetween: 12 },
  '480': { slidesPerView: 3, spaceBetween: 12 },
  '0': { slidesPerView: 2, spaceBetween: 12 },
};

const CategoryBlock: React.FC<CategoriesProps> = ({
  className = 'mb-10 md:mb-11 lg:mb-12 xl:mb-14 lg:pb-1 xl:pb-0',
  sectionHeading,
  limit = 10,
  variant = 'circle',
  autoplay = true,
  autoplaySpeed = 3500,
  loop = true,
  showArrows = true,
  visibleItems = 6,
}) => {
  const { t } = useTranslation();

  const {
    data: categories,
    isLoading: loading,
    error,
  } = useCategories({
    limit,
    parent: null,
  });

  if (!loading && isEmpty(categories)) {
    return <NotFoundItem text={t('text-no-categories-found')} />;
  }

  // Select breakpoints based on variant and visibleItems
  // NOTE: We override the desktop (1025+) breakpoints based on visibleItems
  const baseBreakpoints = variant === 'modern' || variant === 'elegant' ? modernBreakpoints : defaultBreakpoints;

  const breakpoints = {
    ...baseBreakpoints,
    '1025': { slidesPerView: visibleItems, spaceBetween: 28 },
    '1400': { slidesPerView: visibleItems + 1, spaceBetween: 28 }, // Example scaling
    '1720': { slidesPerView: visibleItems + 2, spaceBetween: 28 },
  };

  return (
    <div className={className}>
      <SectionHeader sectionHeading={sectionHeading} />
      {error ? (
        <Alert message={error?.message} />
      ) : (
        <Carousel
          breakpoints={breakpoints}
          buttonClassName={showArrows ? "-mt-8 md:-mt-10" : "hidden"}
          autoplay={autoplay ? { delay: autoplaySpeed } : false}
          loop={loop}
          prevActivateId="categoriesSlidePrev"
          nextActivateId="categoriesSlideNext"
        >
          {loading && !categories
            ? Array.from({ length: limit }).map((_, idx) => {
              if (variant === 'rounded') {
                return (
                  <SwiperSlide key={`card-rounded-${idx}`}>
                    <CardRoundedLoader uniqueKey={`card-rounded-${idx}`} />
                  </SwiperSlide>
                );
              } else if (variant === 'modern') {
                return (
                  <SwiperSlide key={`card-icon-${idx}`}>
                    <CardIconLoader uniqueKey={`card-icon-${idx}`} />
                  </SwiperSlide>
                );
              }
              return (
                <SwiperSlide key={`card-circle-${idx}`}>
                  <CardLoader uniqueKey={`card-circle-${idx}`} />
                </SwiperSlide>
              );
            })
            : categories?.map((category: any) => (
              <SwiperSlide key={`category--key-${category.id}`}>
                <Card
                  item={category}
                  href={`${ROUTES.CATEGORY}/${category.slug}`}
                  variant={variant}
                  effectActive={true}
                  image={getCategoryTypeImage(category, 'image')}
                />
              </SwiperSlide>
            ))}
        </Carousel>
      )}
    </div>
  );
};

export default CategoryBlock;
