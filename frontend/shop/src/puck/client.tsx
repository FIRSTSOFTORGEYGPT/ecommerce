"use client";

import type { Data } from "@measured/puck";
import { Puck } from "@measured/puck";
import config from "./puck.config";
import { HttpClient } from "@framework/utils/request";
import { API_ENDPOINTS } from "@framework/utils/endpoints";

import { useEffect, useState } from "react";

export function Client({ path, data }: { path: string; data: Partial<Data> }) {
    const [appConfig, setAppConfig] = useState(config);

    useEffect(() => {
        const loadDynamicOptions = async () => {
            try {
                const [tagsData, catsData] = await Promise.all([
                    HttpClient.get<any>(API_ENDPOINTS.TAGS),
                    HttpClient.get<any>(API_ENDPOINTS.CATEGORIES)
                ]);

                // Flatten categories if paginated/nested (adapting based on typical API response)
                const tags = Array.isArray(tagsData?.data) ? tagsData.data : (Array.isArray(tagsData) ? tagsData : []);
                const categories = Array.isArray(catsData?.data) ? catsData.data : (Array.isArray(catsData) ? catsData : []);

                const tagOptions = tags.map((t: any) => ({ label: t.name, value: t.slug }));
                const catOptions = categories.map((c: any) => ({ label: c.name, value: c.slug }));

                // Clone and update config
                const newConfig = { ...config, components: { ...config.components } };

                // Iterate over all components to inject dynamic options
                Object.keys(newConfig.components).forEach((componentName) => {
                    const component = newConfig.components[componentName as keyof typeof newConfig.components];
                    // Shallow clone fields to safely mutate - cast to any for dynamic field access
                    const fields = { ...component.fields } as Record<string, any>;
                    let hasUpdates = false;

                    if (fields.tagSlug && (fields.tagSlug as any).type === 'select') {
                        fields.tagSlug = {
                            ...fields.tagSlug,
                            options: tagOptions
                        } as any;
                        hasUpdates = true;
                    }

                    if (fields.categorySlug && (fields.categorySlug as any).type === 'select') {
                        fields.categorySlug = {
                            ...fields.categorySlug,
                            options: catOptions
                        } as any;
                        hasUpdates = true;
                    }

                    if (hasUpdates) {
                        (newConfig.components as any)[componentName] = {
                            ...component,
                            fields: fields as any
                        };
                    }
                });

                setAppConfig(newConfig);
            } catch (error) {
                console.error("Failed to load dynamic options for Puck:", error);
            }
        };

        loadDynamicOptions();
    }, []);

    return (
        <Puck
            config={appConfig}
            data={data}
            onPublish={async (data) => {
                console.log("Puck Publish Data:", data);
                console.log("Root Props:", data.root.props);
                const { pageId, title, slug } = data.root.props as any;

                if (!pageId) {
                    console.error("Missing Page ID (pageId), cannot save. Root props:", data.root.props);
                    alert("Error: Missing Page ID. Cannot save changes.");
                    return;
                }

                try {
                    await HttpClient.put(`${API_ENDPOINTS.CMS_PAGES}/${pageId}`, {
                        title,
                        slug,
                        path,
                        content: data.content,
                        meta: data.zones || {},
                    });

                    alert(`Page published successfully!`);
                } catch (error) {
                    console.error("Failed to publish page:", error);
                    alert("Failed to publish page. Check console for details.");
                }
            }}
        />
    );
}
