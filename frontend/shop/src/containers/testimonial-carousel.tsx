import { useTranslation } from 'next-i18next';
import Carousel from '@components/ui/carousel/carousel';
import { SwiperSlide } from 'swiper/react';
import TestimonialCard from '@components/common/testimonial-card';

interface TestimonialProps {
	className?: string;
	autoplay?: boolean;
	autoplaySpeed?: number;
	loop?: boolean;
	showArrows?: boolean;
}

const testimonials = [
	{
		id: 1,
		name: 'John Doe',
		designation: 'CEO, Company',
		avatar: {
			src: '/assets/images/testimonials/avatar-1.jpg',
			width: 90,
			height: 90,
		},
		content: 'This is an amazing product! I highly recommend it to everyone.',
		rating: 5,
	},
	{
		id: 2,
		name: 'Jane Smith',
		designation: 'Designer',
		avatar: {
			src: '/assets/images/testimonials/avatar-2.jpg',
			width: 90,
			height: 90,
		},
		content: 'Great quality and excellent customer service. Will buy again!',
		rating: 4,
	},
	{
		id: 3,
		name: 'Bob Johnson',
		designation: 'Developer',
		avatar: {
			src: '/assets/images/testimonials/avatar-3.jpg',
			width: 90,
			height: 90,
		},
		content: 'Best purchase I have made this year. Totally worth it!',
		rating: 5,
	},
];

const breakpoints = {
	'1024': { slidesPerView: 3, spaceBetween: 24 },
	'768': { slidesPerView: 2, spaceBetween: 20 },
	'0': { slidesPerView: 1, spaceBetween: 12 },
};

const TestimonialCarousel: React.FC<TestimonialProps> = ({
	className = 'mb-12 md:mb-14 xl:mb-16',
	autoplay = true,
	autoplaySpeed = 5000,
	loop = true,
	showArrows = true,
}) => {
	const { t } = useTranslation();

	return (
		<div className={className}>
			<Carousel
				breakpoints={breakpoints}
				loop={loop}
				autoplay={autoplay ? { delay: autoplaySpeed } : false}
				buttonClassName={showArrows ? "-mt-8 md:-mt-10" : "hidden"}
				prevActivateId="testimonialSlidePrev"
				nextActivateId="testimonialSlideNext"
				scrollbar={{ draggable: true, hide: false }}
			>
				{testimonials?.map((testimonial) => (
					<SwiperSlide key={`testimonial--key-${testimonial.id}`}>
						<TestimonialCard item={testimonial} />
					</SwiperSlide>
				))}
			</Carousel>
		</div>
	);
};

export default TestimonialCarousel;
