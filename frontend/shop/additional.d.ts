declare module "react-rating-stars-component";

// Fix for Swiper React type compatibility with React 18
// This addresses the "SwiperSlide cannot be used as JSX component" error
// The issue is a type conflict between Swiper's bundled types and @types/react

declare module 'swiper/react' {
    import * as React from 'react';

    interface SwiperSlideProps {
        tag?: string;
        zoom?: boolean;
        lazy?: boolean;
        virtualIndex?: number;
        className?: string;
        style?: React.CSSProperties;
        children?: React.ReactNode;
        [key: string]: any;
    }

    export const SwiperSlide: React.FC<SwiperSlideProps>;

    interface SwiperProps {
        children?: React.ReactNode;
        [key: string]: any;
    }

    export const Swiper: React.FC<SwiperProps>;
}