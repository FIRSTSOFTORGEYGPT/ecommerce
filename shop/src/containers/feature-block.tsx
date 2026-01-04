import TextInformation from "@components/common/text-information";
import React from "react";
import { FaShippingFast, FaRegCreditCard } from "react-icons/fa";
import { FiRefreshCcw } from "react-icons/fi";
import { RiSecurePaymentLine } from "react-icons/ri";

interface Props {
  className?: string;

  // Essential Settings
  columns?: 2 | 3 | 4;
  gridGap?: 'none' | 'small' | 'medium' | 'large';
}

const data = [
  {
    id: 1,
    icon: <FaShippingFast size={40} />,
    title: "feature-title-one",
    description: "feature-description-one",
  },
  {
    id: 2,
    icon: <FiRefreshCcw size={40} />,
    title: "feature-title-two",
    description: "feature-description-two",
  },
  {
    id: 3,
    icon: <RiSecurePaymentLine size={40} />,
    title: "feature-title-three",
    description: "feature-description-three",
  },
  {
    id: 4,
    icon: <FaRegCreditCard size={40} />,
    title: "feature-title-four",
    description: "feature-description-four",
  },
];

const FeatureBlock: React.FC<Props> = ({
  className = "mb-12 md:mb-14 xl:mb-16",
  columns = 4,
  gridGap = 'medium',
}) => {

  // Grid gap classes
  const gapClasses: Record<string, string> = {
    none: 'gap-0',
    small: 'gap-2 md:gap-3',
    medium: 'gap-4 md:gap-6',
    large: 'gap-6 md:gap-8',
  };

  // Column classes
  const getColumnClasses = () => {
    switch (columns) {
      case 2: return 'grid-cols-1 md:grid-cols-2';
      case 3: return 'grid-cols-1 md:grid-cols-3';
      case 4: return 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-4';
      default: return 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-4';
    }
  };

  return (
    <div
      className={`${className} bg-gray-200 feature-block-wrapper border border-gray-300 rounded-md grid ${getColumnClasses()} ${gapClasses[gridGap]} overflow-hidden py-12 xl:py-0 sm:px-4 md:px-8 lg:px-16 xl:px-0`}
    >
      {data?.map((item) => (
        <TextInformation key={item.id} item={item} />
      ))}
    </div>
  );
};

export default FeatureBlock;
