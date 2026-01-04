import GoogleStaticMap from '@components/common/google-static-map';
import ContactInfoItem from '@components/ui/contact-info-block';
import HorizontalSocialLink from '@components/ui/horizontal-social-list';
import { useSettings } from '@contexts/settings.context';
import { formatAddress } from '@lib/format-address';
import isEmpty from 'lodash/isEmpty';
import { useTranslation } from 'next-i18next';
import { FC } from 'react';
import { IoCallSharp, IoLocationSharp, IoMail } from 'react-icons/io5';

interface Props {
  image?: HTMLImageElement;
  // Layout Settings
  layout?: "row" | "column";
  columns?: 2 | 3 | 4;
  gridGap?: "none" | "small" | "medium" | "large";
  containerWidth?: "full" | "container" | "narrow";
  // Content Settings
  iconSize?: "small" | "medium" | "large";
  textSize?: "small" | "medium" | "large";
  alignment?: "left" | "center" | "right";
  showIcon?: boolean;
}

const ContactInfoBlock: FC<Props> = ({
  layout = 'column',
  columns = 3,
  gridGap = 'medium',
  containerWidth = 'container',
  iconSize = 'medium',
  textSize = 'medium',
  alignment = 'left',
  showIcon = true,
}) => {
  const settings = useSettings();
  const { t } = useTranslation('common');

  // Container width classes
  const containerClasses = {
    full: 'w-full',
    container: 'container mx-auto',
    narrow: 'max-w-4xl mx-auto',
  };

  // Grid gap classes
  const gapClasses = {
    none: 'gap-0',
    small: 'gap-2',
    medium: 'gap-4',
    large: 'gap-6',
  };

  // Icon size classes
  const iconSizeClasses = {
    small: 'text-lg',
    medium: 'text-2xl',
    large: 'text-3xl',
  };

  // Text size classes
  const textSizeClasses = {
    small: 'text-sm',
    medium: 'text-base',
    large: 'text-lg',
  };

  // Alignment classes
  const alignmentClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };

  return (
    <div className={`${containerClasses[containerWidth]} mb-6 lg:border lg:rounded-md border-gray-300 lg:p-7`}>
      <h4 className={`text-2xl md:text-lg font-bold text-heading pb-7 md:pb-10 lg:pb-6 -mt-1 ${alignmentClasses[alignment]}`}>
        {t('text-find-us-here')}
      </h4>

      <div className={`flex ${layout === 'row' ? 'flex-row' : 'flex-col'} ${gapClasses[gridGap]}`}>
        {/* Address */}
        <ContactInfoItem
          title={t('text-address')}
          data={
            !isEmpty(settings?.contactDetails?.location)
              ? formatAddress(settings?.contactDetails?.location)
              : t('text-no-address')
          }
        >
          {showIcon && <IoLocationSharp className={iconSizeClasses[iconSize]} />}
        </ContactInfoItem>

        {/* Email */}
        <ContactInfoItem
          title={t('text-email')}
          data={
            settings?.contactDetails?.emailAddress
              ? settings?.contactDetails?.emailAddress
              : t('text-no-email')
          }
        >
          {showIcon && <IoMail className={iconSizeClasses[iconSize]} />}
        </ContactInfoItem>

        {/* Phone */}
        <ContactInfoItem
          title={t('text-phone')}
          data={
            settings?.contactDetails?.contact ? (
              settings?.contactDetails?.contact
            ) : (
              <p className="text-red-500">{t('text-no-phone')}</p>
            )
          }
        >
          {showIcon && <IoCallSharp className={iconSizeClasses[iconSize]} />}
        </ContactInfoItem>
      </div>

      {!isEmpty(settings?.contactDetails?.socials) ? (
        <HorizontalSocialLink socials={settings?.contactDetails?.socials} />
      ) : (
        ''
      )}

      {/* Google Map */}
      {!isEmpty(settings?.contactDetails?.location) && (
        <GoogleStaticMap
          lat={settings?.contactDetails?.location?.lat}
          lng={settings?.contactDetails?.location?.lng}
        />
      )}
    </div>
  );
};

export default ContactInfoBlock;
