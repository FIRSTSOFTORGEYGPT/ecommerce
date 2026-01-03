import BannerCard from '@components/common/banner-card';
import Carousel from '@components/ui/carousel/carousel';
import { SwiperSlide } from 'swiper/react';
import { ROUTES } from '@lib/routes';
import { StaticBanner } from '@type/index';

interface BannerProps {
  data: StaticBanner[];
  className?: string;
  autoplay?: boolean;
  autoplaySpeed?: number;
  loop?: boolean;
}

const breakpoints = {
  '1024': {
    slidesPerView: 1.75,
    spaceBetween: 24,
  },
  '768': {
    slidesPerView: 1.5,
    spaceBetween: 20,
  },
  '480': {
    slidesPerView: 1.25,
    spaceBetween: 16,
  },
  '0': {
    slidesPerView: 1.1,
    spaceBetween: 12,
  },
};

const BannerSliderBlock: React.FC<BannerProps> = ({
  className = 'mb-12 md:mb-14 xl:mb-16',
  data,
  autoplay = true,
  autoplaySpeed = 4000,
  loop = true,
}) => {
  // Swiper loop mode requires at least 2 * slidesPerView slides
  // With slidesPerView ~1.75, we need at least 4 slides.
  // We duplicate the data if we have fewer than 4 items to ensure smooth looping and centering.
  const validData = data.length > 0 && data.length < 4 ? [...data, ...data] : data;

  return (
    <div className={`${className} mx-auto max-w-[1920px] overflow-hidden`}>
      <div className="relative">
        <Carousel
          breakpoints={breakpoints}
          centeredSlides={true}
          autoplay={autoplay ? { delay: autoplaySpeed } : false}
          loop={loop}
          pagination={{
            clickable: true,
          }}
          paginationVariant="circle"
          buttonClassName="hidden"
          className="mx-0"
        >
          {validData.map((banner: any, idx: number) => (
            // @ts-ignore
            <SwiperSlide
              key={`banner--key${banner.id}-${idx}`}
              className="px-2"
            >
              <BannerCard
                data={banner}
                effectActive={true}
                href={`${ROUTES.COLLECTIONS}/${banner.slug}`}
                classNameInner="aspect-[2.55/1]"
              />
            </SwiperSlide>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default BannerSliderBlock;
