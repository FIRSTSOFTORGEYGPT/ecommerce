import type { ComponentConfig } from "@measured/puck";
import BannerCard from "../../components/common/banner-card";
import { ROUTES } from "@lib/routes";

interface BannerData {
    id: number;
    title: string;
    slug: string;
    image: {
        mobile: {
            url: string;
            width: number;
            height: number;
        };
        desktop: {
            url: string;
            width: number;
            height: number;
        };
    };
    type?: string;
}

export interface SingleBannerBlockProps {
    title: string;
    slug: string;
    desktop_image_url: string;
    mobile_image_url: string;
    className?: string;
    classNameInner?: string;
}

export const SingleBannerBlockConfig: ComponentConfig<SingleBannerBlockProps> = {
    label: "Single Banner",
    fields: {
        title: { type: "text" },
        slug: { type: "text" },
        desktop_image_url: { type: "text", label: "Desktop Image URL" },
        mobile_image_url: { type: "text", label: "Mobile Image URL" },
        className: { type: "text" },
        classNameInner: { type: "text" },
    },
    defaultProps: {
        title: "Banner Title",
        slug: "banner-slug",
        desktop_image_url: "/assets/images/banner/banner-3.jpg",
        mobile_image_url: "/assets/images/banner/banner-mobile-3.jpg",
    },
    render: ({ title, slug, desktop_image_url, mobile_image_url, className, classNameInner }) => {
        const data: BannerData = {
            id: 1, // Dummy ID
            title,
            slug,
            image: {
                mobile: { url: mobile_image_url, width: 450, height: 180 }, // Defaults
                desktop: { url: desktop_image_url, width: 1800, height: 570 }, // Defaults
            },
        };

        return (
            <BannerCard
                data={data}
                href={`${ROUTES.COLLECTIONS}/${slug}`}
                className={className}
                classNameInner={classNameInner}
            />
        );
    },
};
