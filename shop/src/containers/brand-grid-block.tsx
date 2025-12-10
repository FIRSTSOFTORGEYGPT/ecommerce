import BrandCard from '@components/common/brand-card';
import SectionHeader from '@components/common/section-header';
import BrandCardLoader from '@components/ui/loaders/brand-card-loader';
import Alert from '@components/ui/alert';
import { useBrands } from '@framework/brands';
import isEmpty from 'lodash/isEmpty';
import NotFoundItem from '@components/404/not-found-item';
import { Type } from '@type/index';
import { useTranslation } from 'next-i18next';
import React from 'react';
import { filterBrands } from '@lib/filter-brands';

interface BrandProps {
  sectionHeading: string;
  className?: string;

  // Essential Settings
  limit?: number;
  variant?: '6column' | '4column';
  gridGap?: 'none' | 'small' | 'medium' | 'large';
}

const BrandGridBlock: React.FC<BrandProps> = ({
  className = 'mb-12 md:mb-14 xl:mb-16',
  sectionHeading,
  variant = '4column',
  limit = 8,
  gridGap = 'medium',
}) => {
  const { t } = useTranslation();
  const {
    data: brands,
    isLoading: loading,
    error,
  } = useBrands({
    limit: 16,
  });

  if (!loading && isEmpty(brands?.data)) {
    return <NotFoundItem text={t('text-no-brands-found')} />;
  }

  // Filter brands for grid layout
  const gridBrands: Type[] = filterBrands(brands?.data, 'grid-layout');
  const items = limit ? gridBrands?.slice(0, limit) : gridBrands;

  const columnClasses =
    variant === '4column'
      ? 'grid-cols-2 sm:grid-cols-4'
      : 'grid-cols-2 sm:grid-cols-4 2xl:grid-cols-6';

  // Grid gap classes
  const gapClasses: Record<string, string> = {
    none: 'gap-0',
    small: 'gap-2 md:gap-2.5',
    medium: 'gap-2.5 md:gap-3 lg:gap-5 xl:gap-7',
    large: 'gap-4 md:gap-5 lg:gap-7 xl:gap-10',
  };

  return (
    <div className={className}>
      <SectionHeader sectionHeading={sectionHeading} />
      {error ? (
        <Alert message={error?.message} />
      ) : (
        <div className={`grid ${columnClasses} ${gapClasses[gridGap]}`}>
          {loading
            ? Array.from({ length: limit }).map((_, idx) => (
              <BrandCardLoader key={idx} uniqueKey={`top-brand-${idx}`} />
            ))
            : items?.map((brand: Type) => (
              <BrandCard key={`brand--key${brand.id}`} brand={brand} />
            ))}
        </div>
      )}
    </div>
  );
};

export default BrandGridBlock;
