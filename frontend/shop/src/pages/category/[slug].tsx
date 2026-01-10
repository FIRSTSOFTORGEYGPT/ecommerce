import Container from "@components/ui/container";
import { getLayout } from "@components/layout/layout";
import Subscription from "@components/common/subscription";
import CategoryBanner from "@containers/category-banner";
import { useRouter } from "next/router";
import CategoryProductsGrid from "@components/category/category-products-grid";
import { NextSeo } from 'next-seo';
import { useTranslation } from 'next-i18next';

export { getStaticPaths, getStaticProps } from "@framework/category-page.ssr";

export default function Category() {
  const { query } = useRouter();
  const { t } = useTranslation('common');
  const categorySlug = query?.slug as string;
  const categoryTitle = t('seo-category-title', { category: categorySlug?.replace(/-/g, ' ') || 'Category' });
  const categoryDescription = t('seo-category-description', { category: categorySlug?.replace(/-/g, ' ') || 'Category' });

  return (
    <>
      <NextSeo
        title={categoryTitle}
        description={categoryDescription}
        openGraph={{
          title: categoryTitle,
          description: categoryDescription,
          type: 'website',
        }}
      />
      <div className="border-t-2 border-borderBottom">
        <Container>
          <CategoryBanner className="my-4" />
          <div className="pb-16 lg:pb-20">
            <CategoryProductsGrid
              classname="3xl:grid-cols-6"
              categorySlug={query?.slug as string}
            />
          </div>
          <Subscription />
        </Container>
      </div>
    </>
  );
}

Category.getLayout = getLayout;

