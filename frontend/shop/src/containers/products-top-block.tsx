import ProductCard from "@components/product/product-card";
import { usePopularProducts } from "@framework/products";
import ProductListFeedLoader from "@components/ui/loaders/product-list-feed-loader";
import SectionHeader from "@components/common/section-header";
import Alert from "@components/ui/alert";

interface Props {
	// Content Settings
	sectionHeading: string;
	className?: string;

	// Essential Settings
	limit?: number;
	gridColumns?: number;
	gridGap?: 'none' | 'small' | 'medium' | 'large';
}

// Static column classes - Tailwind needs full class names at build time
const columnClasses: Record<number, string> = {
	1: 'grid-cols-1',
	2: 'grid-cols-1 md:grid-cols-2',
	3: 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3',
	4: 'grid-cols-1 md:grid-cols-2 xl:grid-cols-4',
	5: 'grid-cols-2 md:grid-cols-3 xl:grid-cols-5',
	6: 'grid-cols-2 md:grid-cols-3 xl:grid-cols-6',
};

const ProductsTopBlock: React.FC<Props> = ({
	sectionHeading,
	className = "mb-12 md:mb-14 xl:mb-16",
	limit = 6,
	gridColumns = 4,
	gridGap = 'medium',
}) => {
	const { data, isLoading, error } = usePopularProducts({
		limit,
	});

	// Grid gap classes
	const gapClasses: Record<string, string> = {
		none: 'gap-0',
		small: 'gap-2 md:gap-3',
		medium: 'gap-3 md:gap-5 xl:gap-7',
		large: 'gap-5 md:gap-7 xl:gap-10',
	};

	return (
		<div className={className}>
			<SectionHeader sectionHeading={sectionHeading} />
			<div className={`grid ${columnClasses[gridColumns] || columnClasses[4]} ${gapClasses[gridGap]} xl:-mt-1.5 2xl:mt-0`}>
				{error ? (
					<div className="col-span-full">
						<Alert message={error?.message} />
					</div>
				) : isLoading && !data?.length ? (
					<ProductListFeedLoader limit={limit} />
				) : (
					data?.map((product) => (
						<ProductCard
							key={`product--key-${product.id}`}
							product={product}
							imageContentClassName="flex-shrink-0 w-32 sm:w-44 md:w-40 lg:w-52 2xl:w-56 3xl:w-64"
							contactClassName="ltr:pl-3.5 ltr:sm:pl-5 ltr:md:pl-4 ltr:xl:pl-5 ltr:2xl:pl-6 ltr:3xl:pl-10 rtl:pr-3.5 rtl:sm:pr-5 rtl:md:pr-4 rtl:xl:pr-5 rtl:2xl:pr-6 rtl:3xl:pr-10"
						/>
					))
				)}
			</div>
		</div>
	);
};

export default ProductsTopBlock;
