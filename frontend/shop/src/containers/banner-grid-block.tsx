import BannerCard from '@components/common/banner-card';
import Carousel from '@components/ui/carousel/carousel';
import { SwiperSlide } from 'swiper/react';
import { ROUTES } from '@lib/routes';
import { StaticBanner } from '@type/index';

const breakpoints = {
  '1025': {
    slidesPerView: 3,
    spaceBetween: 28,
  },
  '480': {
    slidesPerView: 2,
    spaceBetween: 20,
  },
  '0': {
    slidesPerView: 1,
    spaceBetween: 12,
  },
};

interface BannerProps {
  data: StaticBanner[];
  className?: string;
  gridColumns?: number;
  gridGap?: "none" | "small" | "medium" | "large";
}

// Static column classes
const columnClasses: Record<number, string> = {
  2: 'grid-cols-2',
  3: 'grid-cols-2 sm:grid-cols-3',
  4: 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4',
  5: 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5',
};

// Grid gap classes
const gapClasses: Record<string, string> = {
  none: 'gap-0',
  small: 'gap-2 md:gap-3',
  medium: 'gap-3 md:gap-5 xl:gap-7',
  large: 'gap-5 md:gap-7 xl:gap-10',
};

const BannerGridBlock: React.FC<BannerProps> = ({
  data = [],
  className = 'mb-12 lg:mb-14 xl:mb-16 lg:pb-1 xl:pb-0',
  gridColumns = 2,
  gridGap = "medium",
}) => {
  return (
    <div className={`${className}`}>
      <div className="block md:hidden">
        <Carousel
          breakpoints={breakpoints}
          autoplay={{ delay: 5000 }}
          prevActivateId="gridBannerPrev"
          nextActivateId="gridBannerNext"
        >
          {data?.map((banner: any) => (
            <SwiperSlide key={`banner--key${banner.id}`}>
              <BannerCard
                data={banner}
                href={`${ROUTES.COLLECTIONS}/${banner.slug}`}
                className="h-full"
                classNameInner="aspect-[3/1] sm:aspect-[2/1]"
              />
            </SwiperSlide>
          ))}
        </Carousel>
      </div>

      <div className={`relative hidden md:grid ${columnClasses[gridColumns] || columnClasses[2]} ${gapClasses[gridGap]}`}>
        {data?.map((banner: any) => (
          <BannerCard
            key={`banner--key${banner.id}`}
            data={banner}
            href={`${ROUTES.COLLECTIONS}/${banner.slug}`}
            className={banner.type === 'large' ? 'col-span-2' : 'col-span-1'}
            classNameInner={
              banner.type === 'large' ? 'aspect-[4.15/1]' : 'aspect-[2.05/1]'
            }
          />
        ))}
      </div>
    </div>
  );
};

export default BannerGridBlock;
