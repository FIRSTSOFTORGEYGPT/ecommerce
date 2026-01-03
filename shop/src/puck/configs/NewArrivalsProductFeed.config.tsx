import type { ComponentConfig } from "@measured/puck";
import NewArrivalsProductFeed from "../../components/product/feeds/new-arrivals-product-feed";

export interface NewArrivalsProductFeedProps {
    className?: string;
    filterType: "tag" | "category";
    tagSlug?: string;
    categorySlug?: string;
    limit: number;
    gridColumns: number;
    gridGap: "none" | "small" | "medium" | "large";
}

export const NewArrivalsProductFeedConfig: ComponentConfig<NewArrivalsProductFeedProps> = {
    label: "New Arrivals Feed",
    fields: {
        className: {
            type: "text",
            label: "Class Name",
        },
        // Dynamic Data Source
        filterType: {
            type: "select",
            label: "Filter By",
            options: [
                { label: "Tag", value: "tag" },
                { label: "Category", value: "category" },
            ],
        },
        tagSlug: {
            type: "select",
            label: "Select Tag",
            options: [],
        },
        categorySlug: {
            type: "select",
            label: "Select Category",
            options: [],
        },
        limit: {
            type: "number",
            label: "Total Products",
            min: 4,
            max: 20,
        },
        gridColumns: {
            type: "select",
            label: "Grid Columns (Desktop)",
            options: [
                { label: "2 Columns", value: 2 },
                { label: "3 Columns", value: 3 },
                { label: "4 Columns", value: 4 },
                { label: "5 Columns", value: 5 },
                { label: "6 Columns", value: 6 },
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
    },
    defaultProps: {
        filterType: "tag",
        tagSlug: "",
        categorySlug: "",
        limit: 10,
        gridColumns: 5,
        gridGap: "medium",
    },
    render: (props) => <NewArrivalsProductFeed {...props} />,
};
