import React from "react";
import { FaInstagram } from "react-icons/fa";
import cn from "classnames";
import { useTranslation } from "next-i18next";
import { useInstagram } from "@framework/instagram";
import Image from "next/image";

interface Props {
  className?: string;
  limit?: number;
  columnsMobile?: 2 | 3 | 4;
  columnsDesktop?: 4 | 5 | 6 | 8;
  gap?: "none" | "small" | "medium";
  rounded?: "none" | "md" | "lg";
  showOverlayIcon?: boolean;
  openInNewTab?: boolean;
}

const columnsMobileClasses: Record<NonNullable<Props["columnsMobile"]>, string> = {
  2: "grid-cols-2",
  3: "grid-cols-3",
  4: "grid-cols-4",
};

const columnsDesktopClasses: Record<NonNullable<Props["columnsDesktop"]>, string> = {
  4: "md:grid-cols-4",
  5: "md:grid-cols-5",
  6: "md:grid-cols-6",
  8: "md:grid-cols-8",
};

const gapClasses: Record<NonNullable<Props["gap"]>, string> = {
  none: "gap-0",
  small: "gap-0.5 sm:gap-1",
  medium: "gap-1 sm:gap-2",
};

const roundedClasses: Record<NonNullable<Props["rounded"]>, string> = {
  none: "",
  md: "rounded-md",
  lg: "rounded-lg",
};

const Instagram: React.FC<Props> = ({
  className = "",
  limit = 6,
  columnsMobile = 3,
  columnsDesktop = 6,
  gap = "small",
  rounded = "md",
  showOverlayIcon = true,
  openInNewTab = true,
}) => {
  const {
    data: instagramFeed,
    isLoading: loading,
    error,
  } = useInstagram({
    limit,
  });
  const { t } = useTranslation("common");

  const items = !loading && instagramFeed?.length ? instagramFeed : [];
  const placeholderCount = limit;
  const showPlaceholders = loading || !!error || items.length === 0;

  return (
    <div
      className={cn(
        "grid overflow-hidden",
        columnsMobileClasses[columnsMobile],
        columnsDesktopClasses[columnsDesktop],
        gapClasses[gap],
        roundedClasses[rounded],
        className
      )}
    >
      {showPlaceholders
        ? Array.from({ length: placeholderCount }).map((_, idx) => (
          <div
            key={`instagram-placeholder-${idx}`}
            className="relative w-full bg-gray-200 aspect-square"
          />
        ))
        : items.map((item) => (
          <a
            className="group flex justify-center text-center relative w-full aspect-square"
            href={item?.permalink}
            key={`instagram--key${item?.id}`}
            target={openInNewTab ? "_blank" : undefined}
            rel={openInNewTab ? "noreferrer" : undefined}
          >
            <Image
              src={item?.media_url ?? "/assets/placeholder/instagram.svg"}
              alt={t(`${item?.caption}`) || t("text-instagram-thumbnail")}
              width={400}
              height={400}
              className="bg-gray-300 object-cover w-full h-full"
            />
            {showOverlayIcon && (
              <>
                <div className="absolute inset-0 bg-black opacity-0 transition-opacity duration-300 group-hover:opacity-50" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <FaInstagram className="text-white text-base sm:text-xl md:text-3xl lg:text-5xl xl:text-6xl transform opacity-0 scale-400 transition-all duration-300 ease-in-out group-hover:opacity-100 group-hover:scale-100" />
                </div>
              </>
            )}
          </a>
        ))}
    </div>
  );
};

export default Instagram;
