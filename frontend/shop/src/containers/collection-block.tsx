import CollectionCard from "@components/common/collection-card";
import { CollectionBanner } from "@type/index";


interface Props {
	className?: string;
  	data: CollectionBanner[];
	variant?: "default" | "modern";
	columns?: 1 | 2 | 3 | 4;
	gridGap?: "none" | "small" | "medium" | "large";
	limit?: number;
}

const CollectionBlock: React.FC<Props> = ({
	className = "mb-12 md:mb-14 xl:mb-16 pb-0.5 lg:pt-1 xl:pt-0",
  	data,
	variant = "default",
	columns = 3,
	gridGap = "medium",
	limit = 3,
}) => {
	const isEven = (value: number) => {
		return value % 2;
	};

	const gapClasses = {
		none: "gap-0",
		small: "gap-3 md:gap-4",
		medium: "gap-5 xl:gap-7",
		large: "gap-7 xl:gap-10",
	};

	const getColumnClasses = () => {
		switch (columns) {
			case 1:
				return "grid-cols-1";
			case 2:
				return "grid-cols-1 sm:grid-cols-2";
			case 3:
				return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";
			case 4:
				return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4";
			default:
				return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";
		}
	};

	const resolvedLimit = Math.max(1, Math.min(12, limit || 3));
	return (
		<div
			className={`${className} grid ${getColumnClasses()} ${gapClasses[gridGap]}`}
		>
			{data?.slice(0, resolvedLimit)?.map((item: any, index: any) => (
				<CollectionCard
					key={item.id}
					collection={item}
					variant={variant}
					contactClassName={
						isEven(index + 1) == 0 && variant !== "modern"
							? "sm:pb-4 md:pb-5 lg:pb-4 2xl:pb-5 3xl:pb-6 pt-3.5 sm:pt-0.5 lg:pt-1 px-4 sm:px-0"
							: "pt-3.5 lg:pt-4 xl:pt-5 3xl:pt-7 px-4 sm:px-0"
					}
				/>
			))}
		</div>
	);
};

export default CollectionBlock;
