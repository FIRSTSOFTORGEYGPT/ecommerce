import type { Data } from "@measured/puck";
import { HttpClient } from "@framework/utils/request";
import { API_ENDPOINTS } from "@framework/utils/endpoints";

type CmsPageResponse = {
    id: number;
    slug: string;
    title: string;
    data: Data;
    content: any[];
    meta: any;
};

/**
 * Get page data from the backend API
 * This function handles the fetching of Puck data from the CMS Pages endpoint.
 */
export async function getPage(pagePath: string): Promise<Data | null> {
    try {
        // Convert path to slug (e.g., "/homepage" -> "homepage", "/" -> "homepage")
        const slug = pagePath === "/" ? "homepage" : pagePath.replace(/^\//, "");

        const response = await HttpClient.get<CmsPageResponse>(
            `${API_ENDPOINTS.CMS_PAGES}/${slug}`
        );

        if (!response) {
            console.warn(`getPage: No response for slug ${slug}`);
            return null;
        }

        // Map API response to Puck Data structure
        // The backend returns 'content' array at the root, and 'data' might be empty or partial.
        // We construct the Puck 'Data' object manually.
        const puckData: Data = {
            root: {
                props: {
                    pageId: response.id,
                    title: response.title || "Page",
                    slug: response.slug
                } as any
            },
            content: response.content || [],
            zones: response.data?.zones || {},
        };

        return puckData;
    } catch (error) {
        console.error(`Error fetching page for path ${pagePath}:`, error);
        return null;
    }
}
