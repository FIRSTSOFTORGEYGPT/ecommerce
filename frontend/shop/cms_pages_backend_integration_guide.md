# Backend Integration Guide for Puck Editor

This guide documents the process of integrating the Puck page builder with the Laravel backend API for dynamic content fetching and saving.

## 1. Data Fetching (`src/lib/get-page.ts`)
We refactored `getPage` to fetch data from the Laravel API instead of a local JSON file.

### Key Changes:
*   **API Endpoint**: Uses `API_ENDPOINTS.CMS_PAGES` (mapped to `/cms_pages`).
*   **Slug Handling**: Converts root path `/` to `homepage`.
*   **Data Mapping**:
    *   Maps API response `content` to Puck `content`.
    *   **Crucial**: Maps `response.id` to `root.props.pageId`. We renamed it to `pageId` to avoid conflicts with Puck's internal `id` property.
    *   Casts `root.props` to `any` to bypass strict typing for these custom fields.

```typescript
// src/lib/get-page.ts
const puckData: Data = {
    root: {
        props: {
            pageId: response.id, // Mapped from backend ID
            title: response.title || "Page",
            slug: response.slug
        } as any
    },
    content: response.content || [],
    zones: response.data?.zones || {},
};
```

## 2. Editor Configuration (`src/puck/puck.config.tsx`)
We updated the Puck configuration to explicitly recognize the root-level properties. This prevents Puck from stripping them out during the save process.

### Key Changes:
*   Added `root` object to `config`.
*   Defined `pageId` (number), `slug` (text), and `title` (text) fields.
*   **Note**: Do NOT set `readOnly: true` in the config, as it can cause validation issues.

```typescript
// src/puck/puck.config.tsx
export const config: Config<Props> = {
  root: {
    fields: {
      title: { type: "text", label: "Page Title" },
      slug: { type: "text", label: "Page Slug" },
      pageId: { type: "number", label: "Page ID" }, // Must match key in get-page.ts
    },
  },
  // ... categories ...
};
```

## 3. Saving Data (`src/puck/client.tsx`)
We implemented the `onPublish` callback to send data back to the API.

### Key Changes:
*   **Validation**: Checks for `pageId` in `data.root.props`. Fails if missing.
*   **Payload Construction**:
    *   Destructures `path` from component props.
    *   Sends `PUT` request to `/cms_pages/{pageId}`.
    *   Payload includes: `title`, `slug`, `path`, `content`, and `meta`.

```typescript
// src/puck/client.tsx
onPublish={async (data) => {
    const { pageId, title, slug } = data.root.props as any;
    // ... validation ...
    await HttpClient.put(`${API_ENDPOINTS.CMS_PAGES}/${pageId}`, {
        title,
        slug,
        path,
        content: data.content,
        meta: data.zones || {},
    });
}}
```

## 4. Routing
### Test Route (`src/pages/homepage.tsx`)
A dedicated test route that mirrors how the final `index.tsx` will work.
*   Uses `getServerSideProps` to fetch `/homepage`.
*   Wraps the editor in `Layout` and `Container` for visual fidelity.

### Dynamic Route (`src/pages/puck/[[...puckPath]].tsx`)
The catch-all route for the editor interface.
*   Uses `getServerSideProps`.
*   Fetches data based on the URL path.
*   Passes `path` prop to the `Client` component (essential for the save payload).

## Troubleshooting Common Errors

### "Missing Page ID"
*   **Cause**: `pageId` not passed in `get-page.ts` OR `root` config missing in `puck.config.tsx`.
*   **Fix**: Ensure `pageId` is mapped and defined in config.

### 422 Unprocessable Content (Path required)
*   **Cause**: The backend requires a `path` field in the PUT body.
*   **Fix**: Ensure `Client` component receives `path` prop and includes it in the `HttpClient.put` payload.

### API 404
*   **Cause**: `API_ENDPOINTS.CMS_PAGES` is incorrect or backend is not running.
*   **Fix**: Check `src/framework/rest/utils/endpoints.ts` and ensure it matches the Laravel route (snake_case `cms_pages`).
