import ProductsBlock from "@containers/products-block";
import { useProducts } from "@framework/products";
import { useTranslation } from "next-i18next";
import isEmpty from "lodash/isEmpty";
import NotFoundItem from "@components/404/not-found-item";

interface Props {
  className?: string;
  filterType?: 'tag' | 'category';
  tagSlug?: string;
  categorySlug?: string;
  limit?: number;
  gridColumns?: number;
  gridGap?: "none" | "small" | "medium" | "large";
}

export default function NewArrivalsProductFeed({
  className,
  filterType = 'tag',
  tagSlug,
  categorySlug,
  limit = 10,
  gridColumns = 5,
  gridGap = 'medium',
}: Props) {
  const { t } = useTranslation();

  const queryOptions: any = {
    limit,
    orderBy: "created_at",
    sortedBy: "DESC",
  };

  if (filterType === 'tag' && tagSlug) queryOptions.tags = tagSlug;
  if (filterType === 'category' && categorySlug) queryOptions.category = categorySlug;

  const { data: products, isLoading: loading, error }: any = useProducts(queryOptions);

  if (!loading && isEmpty(products)) {
    return (
      <NotFoundItem text={t("text-no-products-found")} />
    )
  }

  return (
    <ProductsBlock
      className={className}
      sectionHeading="text-new-arrivals"
      products={products}
      loading={loading}
      error={error?.message}
      uniqueKey="new-arrivals"
      gridColumns={gridColumns}
      gridGap={gridGap}
    />
  );
}
