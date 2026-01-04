import Card from '@components/common/card';
import SectionHeader from '@components/common/section-header';
import Carousel from '@components/ui/carousel/carousel';
import { SwiperSlide } from 'swiper/react';
import CardRoundedLoader from '@components/ui/loaders/card-rounded-loader';
import { useBrands } from '@framework/brands';
import { ROUTES } from '@lib/routes';
import Alert from '@components/ui/alert';
import isEmpty from 'lodash/isEmpty';
import NotFoundItem from '@components/404/not-found-item';
import React from 'react';
import { useTranslation } from 'next-i18next';
import { Type } from '@type/index';
import { filterBrandImages, filterBrands } from '@lib/filter-brands';

interface BrandProps {
  sectionHeading: string;
  className?: string;
  limit?: number;
  autoplay?: boolean;
  autoplaySpeed?: number;
  loop?: boolean;
  showArrows?: boolean;
}

const breakpoints = {
  '1720': { slidesPerView: 8, spaceBetween: 20 },
  '1400': { slidesPerView: 7, spaceBetween: 20 },
  '1025': { slidesPerView: 6, spaceBetween: 20 },
  '768': { slidesPerView: 5, spaceBetween: 16 },
  '500': { slidesPerView: 4, spaceBetween: 16 },
  '0': { slidesPerView: 3, spaceBetween: 12 },
};

const BrandBlock: React.FC<BrandProps> = ({
  className = 'mb-11 md:mb-11 lg:mb-12 xl:mb-14 lg:pb-1 xl:pb-0',
  sectionHeading,
  limit = 16,
  autoplay = true,
  autoplaySpeed = 3000,
  loop = true,
  showArrows = true,
}) => {
  const { t } = useTranslation();
  const {
    data: brands,
    isLoading: loading,
    error,
  } = useBrands({
    limit,
  });

  if (!loading && isEmpty(brands?.data)) {
    return <NotFoundItem text={t('text-no-brands-found')} />;
  }

  // Filter brands for slider layout
  const sliderBrand: Type[] = filterBrands(brands?.data, 'slider-layout');

  return (
    <div className={className}>
      <SectionHeader sectionHeading={sectionHeading} />

      {error ? (
        <Alert message={error?.message} />
      ) : (
        <Carousel
          breakpoints={breakpoints}
          loop={loop}
          autoplay={autoplay ? { delay: autoplaySpeed } : false}
          buttonClassName={showArrows ? "-mt-8 md:-mt-12" : "hidden"}
          prevActivateId="brandsSlidePrev"
          nextActivateId="brandsSlideNext"
        >
          {loading && !brands?.data
            ? Array.from({ length: 7 }).map((_, idx) => (
              <SwiperSlide key={idx}>
                <CardRoundedLoader uniqueKey={`brand-${idx}`} />
              </SwiperSlide>
            ))
            : sliderBrand?.map((brand) => (
              <SwiperSlide key={`brand--key${brand.id}`}>
                <Card
                  item={brand}
                  variant="rounded"
                  href={{
                    pathname: ROUTES.SEARCH,
                    query: { brand: brand.slug },
                  }}
                  image={
                    filterBrandImages(brand?.images, 'slider-layout')
                      ?.image?.[0]
                  }
                />
              </SwiperSlide>
            ))}
        </Carousel>
      )}
    </div>
  );
};

export default BrandBlock;
