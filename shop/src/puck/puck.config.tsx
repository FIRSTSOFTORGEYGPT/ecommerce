import type { Config } from "@measured/puck";
import BannerCarouselBlock from "../containers/banner-carousel-block";
import Footer from "../components/layout/footer/footer";

type Props = {
  HeadingBlock: { title: string };
  test: { title: string };
  BannerCarouselBlock: {
    banners: {
      title: string;
      slug: string;
      desktop_image_url: string;
      mobile_image_url: string;
    }[];
    showNavigation: boolean;
  };
  Footer: {};
};

export const config: Config<Props> = {
  components: {
    HeadingBlock: {
      fields: {
        title: { type: "text" },
      },
      defaultProps: {
        title: "Heading",
      },
      render: ({ title }) => (
        <div style={{ padding: 64 }}>
          <h1>{title}</h1>
        </div>
      ),
    },
    test: {
      fields: {
        title: { type: "textarea" },
      },
      defaultProps: {
        title: "this is title",
      },
      render: ({ title }) => (
        <div style={{ backgroundColor: "red" }}>
          <p>{title}</p>
        </div>
      ),
    },
    BannerCarouselBlock: {
      fields: {
        banners: {
          type: "array",
          getItemSummary: (item) => item.title || "Banner",
          arrayFields: {
            title: { type: "text" },
            slug: { type: "text" },
            desktop_image_url: { type: "text" },
            mobile_image_url: { type: "text" },
          },
        },
        showNavigation: {
          type: "radio",
          options: [
            { label: "Yes", value: true },
            { label: "No", value: false },
          ],
        },
      },
      defaultProps: {
        banners: [
          {
            title: "Banner 1",
            slug: "banner-1",
            desktop_image_url: "/assets/images/placeholders/1800x450.svg",
            mobile_image_url: "/assets/images/placeholders/450x180.svg",
          },
        ],
        showNavigation: true,
      },
      render: ({ banners, showNavigation }) => {
        const mappedBanners = banners.map((b, i) => ({
          id: i,
          title: b.title,
          slug: b.slug,
          image: {
            mobile: {
              url: b.mobile_image_url,
              width: 450,
              height: 180,
            },
            desktop: {
              url: b.desktop_image_url,
              width: 1800,
              height: 450,
            },
          },
        }));
        return (
          <BannerCarouselBlock
            banners={mappedBanners}
            showNavigation={showNavigation}
          />
        );
      },
    },
    Footer: {
      fields: {},
      render: () => <Footer />,
    },
  },
};

export default config;
