# Puck Editor Quick Reference

## 🚀 Quick Start

### Open Editor
```
http://localhost:3003/[any-path]/edit
```

### View Published Page
```
http://localhost:3003/[any-path]
```

## 📁 Key Files

| File | Purpose |
|------|---------|
| `src/pages/puck/[...puckPath].tsx` | Editor route |
| `src/pages/[...puckPath].tsx` | Public page renderer |
| `src/pages/api/puck.ts` | Save API |
| `src/lib/get-page.ts` | Data fetcher |
| `src/middleware.ts` | URL rewriting |
| `src/puck/client.tsx` | Editor client |
| `src/puck/puck.config.tsx` | Components |
| `database.json` | Data storage |

## 🎨 Add New Component

```tsx
// In src/puck/puck.config.tsx

// 1. Add to type
type Props = {
  // ... existing
  MyComponent: { title: string; text: string };
};

// 2. Add to config
export const config: Config<Props> = {
  components: {
    // ... existing
    MyComponent: {
      fields: {
        title: { type: "text" },
        text: { type: "textarea" },
      },
      defaultProps: {
        title: "Title",
        text: "Text",
      },
      render: ({ title, text }) => (
        <div className="p-4">
          <h2>{title}</h2>
          <p>{text}</p>
        </div>
      ),
    },
  },
};
```

## 🔄 How It Works

```
/about/edit → Middleware → /puck/about → Editor
                                           ↓
                                        Publish
                                           ↓
                                      /api/puck
                                           ↓
                                    database.json
                                           ↓
/about → Render published content
```

## 📝 Field Types

```tsx
fields: {
  text: { type: "text" },           // Single line
  textarea: { type: "textarea" },   // Multi line
  number: { type: "number" },       // Number input
  select: {                         // Dropdown
    type: "select",
    options: [
      { label: "Option 1", value: "opt1" },
      { label: "Option 2", value: "opt2" },
    ],
  },
  radio: {                          // Radio buttons
    type: "radio",
    options: [
      { label: "Yes", value: true },
      { label: "No", value: false },
    ],
  },
}
```

## 🛠️ Common Tasks

### Restart Server
```bash
# Stop: Ctrl+C
npm run dev
```

### Check Database
```bash
cat database.json
```

### Clear All Pages
```bash
echo '{"pages":[]}' > database.json
```

## ⚠️ Important

- **Public Editor**: Add auth before production!
- **ISR Delay**: Changes take up to 10s to appear
- **Database**: Use real DB for production

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| Editor not loading | Check URL ends with `/edit` |
| Components not saving | Check browser console |
| Page not updating | Wait 10s or restart server |
| Direct `/puck` access | Middleware blocks this (use `/edit`) |

## 📚 Resources

- [Full Setup Guide](file:///home/karim/Downloads/Projects/eccomerce2/first-soft-eccomerce/shop/PUCK_SETUP.md)
- [Puck Docs](https://puckeditor.com/docs)
- [Component Config](file:///home/karim/Downloads/Projects/eccomerce2/first-soft-eccomerce/shop/src/puck/puck.config.tsx)
