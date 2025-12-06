# Puck Editor Setup for Next.js Pages Router

This project now has Puck editor integrated! You can create and edit pages visually using the Puck editor.

## How It Works

### File Structure

```
src/
├── pages/
│   ├── [...puckPath].tsx          # Renders Puck content on public pages
│   ├── puck/
│   │   └── [...puckPath].tsx      # Puck editor interface
│   └── api/
│       └── puck.ts                # API to save page data
├── lib/
│   └── get-page.ts                # Helper to fetch page data
├── puck/
│   ├── client.tsx                 # Client-side Puck component
│   └── puck.config.tsx            # Puck components configuration
└── middleware.ts                  # Routes /edit URLs to editor

database.json                       # Stores all page content
```

## Usage

### 1. Start the Development Server

```bash
npm run dev
```

The app will run on `http://localhost:3003`

### 2. Create a New Page

To create or edit any page, simply add `/edit` to the URL:

- **About page editor**: `http://localhost:3003/about/edit`
- **Products page editor**: `http://localhost:3003/products/edit`
- **Home page editor**: `http://localhost:3003/edit`

### 3. Use the Editor

1. Visit any URL with `/edit` suffix (e.g., `http://localhost:3003/about/edit`)
2. The Puck editor will open
3. Drag and drop components from the left sidebar:
   - **HeadingBlock**: Add headings to your page
   - **test**: A test component with red background
4. Configure each component using the right sidebar
5. Click **Publish** to save your changes

### 4. View Your Page

After publishing, visit the page without `/edit`:
- Editor: `http://localhost:3003/about/edit`
- Public view: `http://localhost:3003/about`

## Adding Custom Components

Edit `src/puck/puck.config.tsx` to add new components:

```tsx
export const config: Config<Props> = {
  components: {
    YourComponent: {
      fields: {
        title: { type: "text" },
        description: { type: "textarea" },
      },
      defaultProps: {
        title: "Default Title",
        description: "Default description",
      },
      render: ({ title, description }) => (
        <div>
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
      ),
    },
  },
};
```

## How the Routing Works

1. **Middleware** (`src/middleware.ts`):
   - Intercepts requests ending with `/edit`
   - Rewrites them to `/puck/[...path]`
   - Blocks direct access to `/puck/*` URLs

2. **Editor Route** (`src/pages/puck/[...puckPath].tsx`):
   - Renders the Puck editor interface
   - Loads existing page data from `database.json`
   - Sends updates to `/api/puck` when you publish

3. **Public Route** (`src/pages/[...puckPath].tsx`):
   - Renders the published content
   - Uses Incremental Static Regeneration (ISR)
   - Revalidates every 10 seconds

4. **API Route** (`src/pages/api/puck.ts`):
   - Saves page data to `database.json`
   - Triggers page revalidation

## Data Storage

All page content is stored in `database.json`:

```json
{
  "pages": [
    {
      "path": "/about",
      "data": {
        "content": [...],
        "root": {...}
      }
    }
  ]
}
```

## Security Note

⚠️ **Important**: The editor is currently public! Anyone can access `/edit` routes.

For production, add authentication to `src/pages/puck/[...puckPath].tsx`:

```tsx
export const getServerSideProps: GetServerSideProps = async (context) => {
  // Add your authentication check here
  const session = await getSession(context);
  
  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }
  
  // ... rest of the code
};
```

## Troubleshooting

### Page not updating after publish
- The page uses ISR with 10-second revalidation
- Wait 10 seconds or restart the dev server
- Check `database.json` to verify data was saved

### Components not showing in editor
- Verify your components are exported in `src/puck/puck.config.tsx`
- Check the browser console for errors
- Ensure all component props match the TypeScript types

### Middleware not working
- Check that `src/middleware.ts` exists
- Verify the `matcher` config includes your routes
- Restart the dev server

## Next Steps

1. Add more components to `puck.config.tsx`
2. Style your components with Tailwind CSS
3. Add authentication to protect the editor
4. Consider using a database instead of `database.json` for production
