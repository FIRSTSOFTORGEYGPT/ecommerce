/**
 * CollectionBlock Puck Configuration - Essential Settings Only
 */

import type { ComponentConfig } from "@measured/puck";
import CollectionBlock from "../../containers/collection-block";

export interface CollectionBlockProps {
    collections: {
        title: string;
        slug: string;
        description: string;
        image_url: string;
    }[];
    variant: "default" | "modern";
}

export const CollectionBlockConfig: ComponentConfig<CollectionBlockProps> = {
    label: "Collections Grid",
    fields: {
        collections: {
            type: "array",
            label: "Collections (3 recommended)",
            min: 1,
            max: 3,
            getItemSummary: (item) => item.title || "Collection",
            arrayFields: {
                title: { type: "text", label: "Title" },
                slug: { type: "text", label: "Link Slug" },
                description: { type: "textarea", label: "Description" },
                image_url: { type: "text", label: "Image URL (450×450)" },
            },
        },
        variant: {
            type: "select",
            label: "Style",
            options: [
                { label: "Default", value: "default" },
                { label: "Modern", value: "modern" },
            ],
        },
    },
    defaultProps: {
        collections: [
            { title: "New Collection", slug: "new-collection", description: "Explore our latest collection", image_url: "/assets/images/collection/1.jpg" },
            { title: "Featured", slug: "featured", description: "Hand-picked items", image_url: "/assets/images/collection/2.jpg" },
            { title: "Best Sellers", slug: "best-sellers", description: "Top rated products", image_url: "/assets/images/collection/3.jpg" },
        ],
        variant: "default",
    },
    render: ({ collections, variant }) => {
        const mappedCollections = collections.map((c, i) => ({
            id: i + 1,
            title: c.title,
            slug: c.slug,
            description: c.description,
            image: c.image_url,
        }));

        return <CollectionBlock data={mappedCollections} variant={variant} />;
    },
};
