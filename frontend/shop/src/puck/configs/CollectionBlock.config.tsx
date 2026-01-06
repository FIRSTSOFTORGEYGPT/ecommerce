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

	columns?: 1 | 2 | 3 | 4;
	gridGap?: "none" | "small" | "medium" | "large";
	limit?: number;
}

export const CollectionBlockConfig: ComponentConfig<CollectionBlockProps> = {
    label: "Collections Grid",
    fields: {
        collections: {
            type: "array",
            label: "Collections (3 recommended)",
            min: 1,
            max: 12,
            getItemSummary: (item) => item.title || "Collection",
            arrayFields: {
                title: { type: "text", label: "Title" },
                slug: { type: "text", label: "Link Slug" },
                description: { type: "textarea", label: "Description" },
                image_url: { type: "text", label: "Image URL (450×450)" },
            },
        },
        columns: {
            type: "select",
            label: "Columns (Desktop)",
            options: [
                { label: "1 Column", value: 1 },
                { label: "2 Columns", value: 2 },
                { label: "3 Columns", value: 3 },
                { label: "4 Columns", value: 4 },
            ],
        },
        gridGap: {
            type: "select",
            label: "Grid Gap",
            options: [
                { label: "None", value: "none" },
                { label: "Small", value: "small" },
                { label: "Medium", value: "medium" },
                { label: "Large", value: "large" },
            ],
        },
        limit: {
            type: "number",
            label: "Number of Items",
            min: 1,
            max: 12,
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
        columns: 3,
        gridGap: "medium",
        limit: 3,
        variant: "default",
    },
    render: ({ collections, variant, columns, gridGap, limit }) => {
        const mappedCollections = (collections || []).map((c, i) => ({
            id: i + 1,
            title: c.title,
            slug: c.slug && c.slug.trim().length > 0 ? c.slug : "/#",
            description: c.description,
            image: c.image_url && c.image_url.trim().length > 0 ? c.image_url : "/assets/images/collection/1.jpg",
        }));

        return (
            <CollectionBlock
                data={mappedCollections}
                variant={variant}
                columns={columns}
                gridGap={gridGap}
                limit={limit}
            />
        );
    },
};
