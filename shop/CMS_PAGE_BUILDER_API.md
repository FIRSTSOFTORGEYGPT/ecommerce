# CMS Page Builder & Component Data API Documentation

> **Version:** 1.0  
> **Last Updated:** January 3, 2026  
> **Base URL:** `/api`

---

## Table of Contents

1. [Overview](#overview)
2. [Quick Start](#quick-start)
3. [API Endpoints Summary](#api-endpoints-summary)
4. [CMS Pages API](#cms-pages-api)
5. [Puck Page Builder API](#puck-page-builder-api)
6. [Component Data API](#component-data-api)
7. [Authentication](#authentication)
8. [Data Structures](#data-structures)
9. [Frontend Integration Examples](#frontend-integration-examples)
10. [Error Handling](#error-handling)

---

## Overview

The ChawkBazar API provides a **CMS Page Builder** system with two approaches:

### 1. Legacy CMS Pages (`/api/cms-pages`)
- Traditional content block storage
- Identified by `slug`
- Suitable for static pages like "About Us", "Privacy Policy"

### 2. Puck Page Builder (`/api/puck/page`)
- Designed for [Puck](https://github.com/measuredco/puck) visual editor
- Identified by URL `path` (e.g., `/`, `/landing`, `/promo/summer`)
- Supports drag-and-drop page building
- Recommended for dynamic, marketing pages

### 3. Component Data API (`/api/component-data`)
- Optimized data endpoints for page components
- Returns only essential fields for fast rendering
- Used by components like ProductFlashSaleBlock, CategoryBlock, etc.

### Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                     ADMIN DASHBOARD                         │
│  ┌───────────────────────────────────────────────────────┐ │
│  │                   Puck Visual Editor                   │ │
│  │  [Hero] [Categories] [Products] [Flash Sale] [CTA]    │ │
│  └───────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼ POST /api/puck/page
┌─────────────────────────────────────────────────────────────┐
│                       LARAVEL API                           │
│                                                             │
│  ┌─────────────────┐    ┌──────────────────────┐          │
│  │ CmsPageController│    │ComponentDataController│          │
│  └─────────────────┘    └──────────────────────┘          │
│           │                        │                        │
│  ┌─────────────────┐    ┌──────────────────────┐          │
│  │  CmsPageService │    │ ComponentDataService │          │
│  └─────────────────┘    └──────────────────────┘          │
│           │                        │                        │
│  ┌──────────────────────────────────────────────┐         │
│  │              MySQL Database                   │         │
│  │   cms_pages | products | categories | ...     │         │
│  └──────────────────────────────────────────────┘         │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼ GET /api/puck/page?path=/
┌─────────────────────────────────────────────────────────────┐
│                     SHOP FRONTEND                           │
│  ┌───────────────────────────────────────────────────────┐ │
│  │  Puck Renderer → React Components → Rendered HTML     │ │
│  └───────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

---

## Quick Start

### Fetching a Page (Public)

```typescript
// Using Puck format (recommended for visual editor pages)
const response = await fetch('/api/puck/page?path=/');
const { path, data } = await response.json();

// Render with Puck
import { Render } from "@measured/puck";
<Render config={puckConfig} data={data} />
```

### Saving a Page (Admin)

```typescript
const response = await fetch('/api/puck/page', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_TOKEN',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    path: '/',
    title: 'Homepage',
    data: puckEditorData,
  }),
});
```

---

## API Endpoints Summary

### Public Endpoints (No Authentication Required)

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/cms-pages` | GET | List all CMS pages |
| `/api/cms-pages/{slug}` | GET | Get page by slug |
| `/api/puck/page?path=/` | GET | Get page by URL path (Puck format) |
| `/api/component-data/flash-sale-products` | GET | Flash sale products |
| `/api/component-data/categories` | GET | Category list |
| `/api/component-data/collections` | GET | Product collections/types |
| `/api/component-data/popular-products` | GET | Popular products |
| `/api/component-data/best-selling-products` | GET | Best selling products |

### Protected Endpoints (Authentication Required)

| Endpoint | Method | Permission | Description |
|----------|--------|------------|-------------|
| `/api/cms-pages` | POST | EDITOR | Create new page |
| `/api/cms-pages/{id}` | PUT | EDITOR | Update page |
| `/api/cms-pages/{id}` | DELETE | EDITOR | Delete page |
| `/api/puck/page` | POST | EDITOR | Save/upsert page |

---

## CMS Pages API

### Base URL
```
/api/cms-pages
```

---

### 1. List All Pages

Retrieves a paginated list of all CMS pages.

```http
GET /api/cms-pages
```

#### Query Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `limit` | integer | 10 | Items per page |
| `page` | integer | 1 | Page number |

#### Example Request

```bash
curl -X GET "https://api.example.com/api/cms-pages?limit=10&page=1"
```

#### Example Response

```json
{
  "data": [
    {
      "id": 1,
      "slug": "privacy-policy",
      "title": "Privacy Policy",
      "content": [
        {
          "type": "Heading",
          "props": { "title": "Privacy Policy" },
          "order": 1
        }
      ],
      "meta": {
        "description": "Our privacy policy"
      },
      "created_at": "2024-01-15T10:30:00Z",
      "updated_at": "2024-01-15T10:30:00Z"
    }
  ],
  "current_page": 1,
  "per_page": 10,
  "total": 5,
  "last_page": 1
}
```

#### Frontend Usage

```typescript
const useCmsPages = (limit = 10, page = 1) => {
  return useQuery(['cms-pages', limit, page], async () => {
    const res = await fetch(`/api/cms-pages?limit=${limit}&page=${page}`);
    return res.json();
  });
};
```

---

### 2. Get Page by Slug

Retrieves a single CMS page by its URL slug.

```http
GET /api/cms-pages/{slug}
```

#### Parameters

| Parameter | Type | Location | Required | Description |
|-----------|------|----------|----------|-------------|
| `slug` | string | URL | Yes | URL-friendly identifier |

#### Example Request

```bash
curl -X GET "https://api.example.com/api/cms-pages/about-us"
```

#### Example Response

```json
{
  "data": {
    "id": 2,
    "slug": "about-us",
    "title": "About Us",
    "content": [
      {
        "type": "Heading",
        "props": { "title": "Our Story" },
        "order": 1
      },
      {
        "type": "Paragraph",
        "props": { "text": "We started in 2020..." },
        "order": 2
      },
      {
        "type": "Image",
        "props": { "src": "/uploads/team.jpg", "alt": "Our Team" },
        "order": 3
      }
    ],
    "meta": {
      "title": "About Us | ChawkBazar",
      "description": "Learn about our company and mission"
    },
    "created_at": "2024-01-10T08:00:00Z",
    "updated_at": "2024-06-20T14:30:00Z"
  }
}
```

#### Error Response (404)

```json
{
  "message": "NOT_FOUND"
}
```

#### Frontend Usage

```typescript
const usePageBySlug = (slug: string) => {
  return useQuery(
    ['cms-page', slug],
    async () => {
      const res = await fetch(`/api/cms-pages/${slug}`);
      if (!res.ok) throw new Error('Page not found');
      return res.json();
    },
    { enabled: !!slug }
  );
};

// Usage in component
function AboutPage() {
  const { data, isLoading, error } = usePageBySlug('about-us');
  
  if (isLoading) return <PageSkeleton />;
  if (error) return <NotFound />;
  
  return <PageRenderer content={data.data.content} />;
}
```

---

### 3. Create Page 🔒

Creates a new CMS page.

```http
POST /api/cms-pages
```

**Required Permission:** `EDITOR` or `SUPER_ADMIN`

#### Request Body

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `title` | string | Yes | Page title |
| `slug` | string | Yes | URL slug (unique) |
| `content` | array | Yes | Array of content blocks |
| `meta` | object | No | SEO metadata |

#### Example Request

```bash
curl -X POST "https://api.example.com/api/cms-pages" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Terms of Service",
    "slug": "terms-of-service",
    "content": [
      {
        "type": "Heading",
        "props": { "title": "Terms of Service" },
        "order": 1
      },
      {
        "type": "Paragraph",
        "props": { "text": "Please read these terms carefully..." },
        "order": 2
      }
    ],
    "meta": {
      "title": "Terms of Service | ChawkBazar",
      "description": "Our terms and conditions"
    }
  }'
```

#### Example Response (201 Created)

```json
{
  "data": {
    "id": 10,
    "slug": "terms-of-service",
    "title": "Terms of Service",
    "content": [...],
    "meta": {...},
    "created_at": "2024-07-01T12:00:00Z",
    "updated_at": "2024-07-01T12:00:00Z"
  }
}
```

---

### 4. Update Page 🔒

Updates an existing CMS page.

```http
PUT /api/cms-pages/{id}
```

**Required Permission:** `EDITOR` or `SUPER_ADMIN`

#### Parameters

| Parameter | Type | Location | Required | Description |
|-----------|------|----------|----------|-------------|
| `id` | integer | URL | Yes | Page ID |

#### Request Body

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `title` | string | No | Updated title |
| `slug` | string | No | Updated slug |
| `content` | array | No | Updated content blocks |
| `meta` | object | No | Updated metadata |

#### Example Request

```bash
curl -X PUT "https://api.example.com/api/cms-pages/10" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Updated Terms of Service",
    "content": [
      {
        "type": "Heading",
        "props": { "title": "Updated Terms" },
        "order": 1
      }
    ]
  }'
```

#### Example Response (200 OK)

```json
{
  "data": {
    "id": 10,
    "slug": "terms-of-service",
    "title": "Updated Terms of Service",
    "content": [...],
    "updated_at": "2024-07-15T09:30:00Z"
  }
}
```

---

### 5. Delete Page 🔒

Deletes a CMS page.

```http
DELETE /api/cms-pages/{id}
```

**Required Permission:** `EDITOR` or `SUPER_ADMIN`

#### Example Request

```bash
curl -X DELETE "https://api.example.com/api/cms-pages/10" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

#### Example Response (200 OK)

```json
{
  "message": "Page deleted successfully"
}
```

---

## Puck Page Builder API

These endpoints are specifically designed for the **Puck visual editor** integration. They use URL `path` instead of `slug` and store data in Puck's JSON format.

### Why Use Puck Endpoints?

| Feature | CMS Pages (`/cms-pages`) | Puck (`/puck/page`) |
|---------|--------------------------|---------------------|
| Identifier | `slug` | `path` (URL) |
| Format | Legacy content blocks | Puck JSON format |
| Use Case | Static pages | Visual editor pages |
| Supports zones | No | Yes |
| Root props | No | Yes |

---

### 1. Get Page by Path

Retrieves a page using its URL path. This is the primary endpoint for rendering Puck pages on the frontend.

```http
GET /api/puck/page?path={path}
```

#### Query Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `path` | string | `/` | URL path (e.g., `/`, `/about`, `/promo/summer`) |

#### Example Requests

```bash
# Get homepage
curl -X GET "https://api.example.com/api/puck/page?path=/"

# Get landing page
curl -X GET "https://api.example.com/api/puck/page?path=/landing"

# Get nested path
curl -X GET "https://api.example.com/api/puck/page?path=/promo/summer-sale"
```

#### Example Response (200 OK)

```json
{
  "path": "/",
  "data": {
    "root": {
      "props": {
        "title": "Homepage",
        "description": "Welcome to our store"
      }
    },
    "content": [
      {
        "type": "HeroSlider",
        "props": {
          "slides": [
            {
              "title": "Summer Collection",
              "subtitle": "Up to 50% off",
              "image": "/uploads/banners/summer.jpg",
              "buttonText": "Shop Now",
              "buttonLink": "/products?category=summer"
            }
          ]
        }
      },
      {
        "type": "CategoryBlock",
        "props": {
          "title": "Shop by Category",
          "limit": 6,
          "showIcon": true
        }
      },
      {
        "type": "ProductFlashSaleBlock",
        "props": {
          "limit": 8
        }
      },
      {
        "type": "PopularProductsBlock",
        "props": {
          "title": "Trending Now",
          "limit": 10
        }
      }
    ],
    "zones": {}
  }
}
```

#### Response When Page Not Found

```json
{
  "data": null
}
```

> **Note:** Returns `null` data instead of 404 error, allowing frontend to handle gracefully.

#### Frontend Usage (Next.js)

```typescript
// pages/[[...path]].tsx
import { GetServerSideProps } from 'next';
import { Render } from "@measured/puck";
import { puckConfig } from "@/lib/puck-config";

interface PageProps {
  pageData: any;
  path: string;
}

export default function DynamicPage({ pageData }: PageProps) {
  return (
    <main>
      <Render config={puckConfig} data={pageData} />
    </main>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const pathSegments = params?.path as string[] | undefined;
  const path = pathSegments ? `/${pathSegments.join('/')}` : '/';
  
  const res = await fetch(
    `${process.env.API_URL}/api/puck/page?path=${encodeURIComponent(path)}`
  );
  const { data } = await res.json();
  
  if (!data) {
    return { notFound: true };
  }
  
  return {
    props: { pageData: data, path },
  };
};
```

---

### 2. Save Page (Upsert) 🔒

Creates a new page or updates an existing one based on the `path`. This is an **upsert** operation.

```http
POST /api/puck/page
```

**Required Permission:** `EDITOR` or `SUPER_ADMIN`

#### Request Body

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `path` | string | Yes | URL path (e.g., `/`, `/about`) |
| `title` | string | Yes | Page title |
| `data` | object | Yes | Puck editor data object |
| `meta` | object | No | SEO metadata |

#### Puck Data Structure

```typescript
interface PuckData {
  root: {
    props: Record<string, any>;  // Page-level props
  };
  content: PuckComponent[];       // Array of components
  zones: Record<string, PuckComponent[]>;  // Named zones (optional)
}

interface PuckComponent {
  type: string;                   // Component type name
  props: Record<string, any>;     // Component props
}
```

#### Example Request

```bash
curl -X POST "https://api.example.com/api/puck/page" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "path": "/",
    "title": "Homepage",
    "data": {
      "root": {
        "props": {
          "title": "Homepage"
        }
      },
      "content": [
        {
          "type": "HeroSlider",
          "props": {
            "slides": [
              {
                "title": "Welcome to ChawkBazar",
                "subtitle": "Best deals on fashion",
                "image": "/uploads/hero-banner.jpg",
                "buttonText": "Shop Now",
                "buttonLink": "/products"
              }
            ]
          }
        },
        {
          "type": "CategoryBlock",
          "props": {
            "title": "Shop by Category",
            "limit": 6
          }
        },
        {
          "type": "ProductFlashSaleBlock",
          "props": {
            "limit": 8
          }
        }
      ],
      "zones": {}
    },
    "meta": {
      "title": "ChawkBazar - Fashion Store",
      "description": "Shop the latest fashion trends"
    }
  }'
```

#### Example Response (200 OK)

```json
{
  "success": true,
  "path": "/",
  "data": {
    "root": {
      "props": {
        "title": "Homepage"
      }
    },
    "content": [...],
    "zones": {}
  }
}
```

#### Frontend Usage (Puck Editor)

```typescript
// components/PageEditor.tsx
import { Puck } from "@measured/puck";
import { puckConfig } from "@/lib/puck-config";

interface PageEditorProps {
  initialData: any;
  path: string;
}

export function PageEditor({ initialData, path }: PageEditorProps) {
  const handlePublish = async (data: any) => {
    try {
      const response = await fetch('/api/puck/page', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${getAuthToken()}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          path,
          title: data.root?.props?.title || 'Untitled',
          data,
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to save');
      }
      
      alert('Page saved successfully!');
    } catch (error) {
      alert('Error saving page');
      console.error(error);
    }
  };

  return (
    <Puck
      config={puckConfig}
      data={initialData || { root: { props: {} }, content: [], zones: {} }}
      onPublish={handlePublish}
    />
  );
}
```

---

## Component Data API

These endpoints provide **optimized data** specifically for Puck components. They return only essential fields for fast rendering and are cached for performance.

### Base URL
```
/api/component-data
```

---

### 1. Flash Sale Products

Returns active flash sale with discounted products.

```http
GET /api/component-data/flash-sale-products
```

#### Query Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `limit` | integer | 10 | Maximum products to return |
| `language` | string | null | Filter by language code |

#### Example Request

```bash
curl -X GET "https://api.example.com/api/component-data/flash-sale-products?limit=8"
```

#### Example Response

```json
{
  "success": true,
  "data": {
    "flash_sale": {
      "id": 1,
      "title": "Summer Flash Sale",
      "slug": "summer-flash-sale",
      "start_date": "2024-06-01T00:00:00Z",
      "end_date": "2024-06-15T23:59:59Z",
      "rate": 20
    },
    "products": [
      {
        "id": 101,
        "name": "Cotton T-Shirt",
        "slug": "cotton-t-shirt",
        "price": 29.99,
        "sale_price": 23.99,
        "image": {
          "id": 50,
          "thumbnail": "/uploads/products/tshirt-thumb.jpg",
          "original": "/uploads/products/tshirt.jpg"
        },
        "shop": {
          "id": 5,
          "name": "Fashion Hub",
          "slug": "fashion-hub"
        }
      },
      {
        "id": 102,
        "name": "Denim Jeans",
        "slug": "denim-jeans",
        "price": 59.99,
        "sale_price": 47.99,
        "image": {...},
        "shop": {...}
      }
    ]
  }
}
```

#### Response When No Active Flash Sale

```json
{
  "success": true,
  "data": {
    "flash_sale": null,
    "products": []
  }
}
```

#### Frontend Component Example

```tsx
// components/puck-blocks/ProductFlashSaleBlock.tsx
import { useQuery } from 'react-query';
import { CountdownTimer } from '@/components/CountdownTimer';
import { ProductCard } from '@/components/ProductCard';

interface Props {
  limit?: number;
}

export function ProductFlashSaleBlock({ limit = 8 }: Props) {
  const { data, isLoading } = useQuery(
    ['flash-sale-products', limit],
    () => fetch(`/api/component-data/flash-sale-products?limit=${limit}`)
      .then(res => res.json())
  );

  if (isLoading) {
    return <FlashSaleSkeleton count={limit} />;
  }

  const { flash_sale, products } = data?.data || {};

  if (!flash_sale || products.length === 0) {
    return null; // Don't render if no active flash sale
  }

  return (
    <section className="flash-sale-section">
      <div className="flash-sale-header">
        <h2 className="flash-sale-title">{flash_sale.title}</h2>
        <div className="flash-sale-timer">
          <span>Ends in:</span>
          <CountdownTimer endDate={new Date(flash_sale.end_date)} />
        </div>
      </div>
      
      <div className="flash-sale-badge">
        Up to {flash_sale.rate}% OFF
      </div>
      
      <div className="product-grid">
        {products.map(product => (
          <ProductCard 
            key={product.id} 
            product={product}
            showOriginalPrice
          />
        ))}
      </div>
    </section>
  );
}
```

---

### 2. Categories

Returns categories for navigation and category blocks.

```http
GET /api/component-data/categories
```

#### Query Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `limit` | integer | 10 | Maximum categories to return |
| `language` | string | null | Filter by language code |
| `top_level` | boolean | true | Only return root categories |

#### Example Request

```bash
curl -X GET "https://api.example.com/api/component-data/categories?limit=6&top_level=true"
```

#### Example Response

```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Men",
      "slug": "men",
      "icon": "Shirt",
      "image": {
        "id": 10,
        "thumbnail": "/uploads/categories/men-thumb.jpg",
        "original": "/uploads/categories/men.jpg"
      }
    },
    {
      "id": 2,
      "name": "Women",
      "slug": "women",
      "icon": "Dress",
      "image": {
        "id": 11,
        "thumbnail": "/uploads/categories/women-thumb.jpg",
        "original": "/uploads/categories/women.jpg"
      }
    },
    {
      "id": 3,
      "name": "Kids",
      "slug": "kids",
      "icon": "Baby",
      "image": {...}
    },
    {
      "id": 4,
      "name": "Accessories",
      "slug": "accessories",
      "icon": "Watch",
      "image": {...}
    }
  ]
}
```

#### Frontend Component Example

```tsx
// components/puck-blocks/CategoryBlock.tsx
import { useQuery } from 'react-query';
import Link from 'next/link';
import { Icon } from '@/components/Icon';

interface Props {
  title?: string;
  limit?: number;
  showIcon?: boolean;
}

export function CategoryBlock({ 
  title = "Shop by Category",
  limit = 6, 
  showIcon = true 
}: Props) {
  const { data, isLoading } = useQuery(
    ['categories', limit],
    () => fetch(`/api/component-data/categories?limit=${limit}&top_level=true`)
      .then(res => res.json())
  );

  if (isLoading) {
    return <CategorySkeleton count={limit} />;
  }

  const categories = data?.data || [];

  return (
    <section className="category-section">
      <h2 className="section-title">{title}</h2>
      
      <div className="category-grid">
        {categories.map(category => (
          <Link 
            key={category.id} 
            href={`/category/${category.slug}`}
            className="category-card"
          >
            {category.image && (
              <img 
                src={category.image.thumbnail} 
                alt={category.name}
                className="category-image"
              />
            )}
            
            <div className="category-info">
              {showIcon && category.icon && (
                <Icon name={category.icon} className="category-icon" />
              )}
              <span className="category-name">{category.name}</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
```

---

### 3. Collections (Product Types)

Returns product collections/types (e.g., Grocery, Fashion, Electronics).

```http
GET /api/component-data/collections
```

#### Query Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `limit` | integer | 10 | Maximum collections to return |
| `language` | string | null | Filter by language code |

#### Example Response

```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Fashion",
      "slug": "fashion",
      "icon": "Shirt",
      "image": {
        "id": 20,
        "thumbnail": "/uploads/types/fashion-thumb.jpg",
        "original": "/uploads/types/fashion.jpg"
      },
      "settings": {
        "layoutType": "modern",
        "productCard": "neon"
      }
    },
    {
      "id": 2,
      "name": "Grocery",
      "slug": "grocery",
      "icon": "ShoppingCart",
      "image": {...},
      "settings": {...}
    }
  ]
}
```

---

### 4. Popular Products

Returns products sorted by order count (most purchased first).

```http
GET /api/component-data/popular-products
```

#### Query Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `limit` | integer | 10 | Maximum products to return |
| `language` | string | null | Filter by language code |

#### Example Response

```json
{
  "success": true,
  "data": [
    {
      "id": 42,
      "name": "Classic Leather Jacket",
      "slug": "classic-leather-jacket",
      "price": 199.99,
      "sale_price": null,
      "min_price": 199.99,
      "max_price": 249.99,
      "product_type": "variable",
      "quantity": 50,
      "image": {
        "id": 100,
        "thumbnail": "/uploads/products/jacket-thumb.jpg",
        "original": "/uploads/products/jacket.jpg"
      },
      "shop": {
        "id": 3,
        "name": "Urban Style",
        "slug": "urban-style"
      },
      "type": {
        "id": 1,
        "name": "Fashion",
        "slug": "fashion"
      }
    },
    {
      "id": 58,
      "name": "Wireless Earbuds",
      "slug": "wireless-earbuds",
      "price": 79.99,
      "sale_price": 59.99,
      "min_price": 79.99,
      "max_price": 79.99,
      "product_type": "simple",
      "quantity": 120,
      "image": {...},
      "shop": {...},
      "type": {...}
    }
  ]
}
```

#### Frontend Component Example

```tsx
// components/puck-blocks/PopularProductsBlock.tsx
import { useQuery } from 'react-query';
import { ProductCard } from '@/components/ProductCard';

interface Props {
  title?: string;
  limit?: number;
}

export function PopularProductsBlock({ 
  title = "Popular Products",
  limit = 10 
}: Props) {
  const { data, isLoading } = useQuery(
    ['popular-products', limit],
    () => fetch(`/api/component-data/popular-products?limit=${limit}`)
      .then(res => res.json())
  );

  if (isLoading) {
    return <ProductGridSkeleton count={limit} />;
  }

  const products = data?.data || [];

  if (products.length === 0) {
    return null;
  }

  return (
    <section className="popular-products-section">
      <h2 className="section-title">{title}</h2>
      
      <div className="product-grid">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
```

---

### 5. Best Selling Products

Returns products sorted by total quantity sold.

```http
GET /api/component-data/best-selling-products
```

#### Query Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `limit` | integer | 10 | Maximum products to return |
| `language` | string | null | Filter by language code |

#### Example Response

Same structure as Popular Products.

#### Difference from Popular Products

| Metric | Popular Products | Best Selling Products |
|--------|------------------|----------------------|
| Sort By | Order count | Quantity sold |
| Meaning | Most orders placed | Most items shipped |

---

## Authentication

### Getting a Token

```http
POST /api/token
```

#### Request Body

```json
{
  "email": "admin@example.com",
  "password": "your_password"
}
```

#### Response

```json
{
  "token": "1|abc123xyz...",
  "permissions": ["SUPER_ADMIN"]
}
```

### Using the Token

Include the token in the `Authorization` header:

```http
Authorization: Bearer 1|abc123xyz...
```

### Required Permissions

| Action | Required Permission |
|--------|---------------------|
| Create Page | `EDITOR` or `SUPER_ADMIN` |
| Update Page | `EDITOR` or `SUPER_ADMIN` |
| Delete Page | `EDITOR` or `SUPER_ADMIN` |
| Save Puck Page | `EDITOR` or `SUPER_ADMIN` |

---

## Data Structures

### CmsPage Model

```typescript
interface CmsPage {
  id: number;
  slug: string;              // URL-friendly identifier
  path?: string;             // Full URL path (for Puck pages)
  title: string;
  content: ContentBlock[];   // Legacy format
  data?: PuckData;           // Puck format (JSON)
  meta?: PageMeta;
  created_at: string;
  updated_at: string;
}
```

### Content Block (Legacy)

```typescript
interface ContentBlock {
  type: string;              // Component type name
  props: Record<string, any>;
  order?: number;            // Display order
}
```

### Puck Data Format

```typescript
interface PuckData {
  root: {
    props: Record<string, any>;
  };
  content: PuckComponent[];
  zones: Record<string, PuckComponent[]>;
}

interface PuckComponent {
  type: string;
  props: Record<string, any>;
}
```

### Page Meta

```typescript
interface PageMeta {
  title?: string;            // SEO title
  description?: string;      // Meta description
  keywords?: string[];       // Meta keywords
  ogImage?: string;          // Open Graph image
}
```

### Product Summary

```typescript
interface ProductSummary {
  id: number;
  name: string;
  slug: string;
  price: number;
  sale_price: number | null;
  min_price: number | null;
  max_price: number | null;
  product_type: 'simple' | 'variable';
  quantity: number;
  image: MediaItem | null;
  shop: ShopSummary | null;
  type: TypeSummary | null;
}
```

### Media Item

```typescript
interface MediaItem {
  id: number;
  thumbnail: string;
  original: string;
}
```

---

## Frontend Integration Examples

### Complete Puck Configuration

```typescript
// lib/puck-config.tsx
import type { Config } from "@measured/puck";
import { 
  HeroSlider, 
  CategoryBlock, 
  ProductFlashSaleBlock,
  PopularProductsBlock,
  BestSellingBlock,
  Heading,
  Paragraph,
  Image,
  Spacer,
} from "@/components/puck-blocks";

type Props = {
  HeroSlider: {
    slides: Array<{
      title: string;
      subtitle: string;
      image: string;
      buttonText: string;
      buttonLink: string;
    }>;
  };
  CategoryBlock: {
    title: string;
    limit: number;
    showIcon: boolean;
  };
  ProductFlashSaleBlock: {
    limit: number;
  };
  PopularProductsBlock: {
    title: string;
    limit: number;
  };
  BestSellingBlock: {
    title: string;
    limit: number;
  };
  Heading: {
    text: string;
    level: 'h1' | 'h2' | 'h3' | 'h4';
    align: 'left' | 'center' | 'right';
  };
  Paragraph: {
    text: string;
  };
  Image: {
    src: string;
    alt: string;
  };
  Spacer: {
    height: number;
  };
};

export const puckConfig: Config<Props> = {
  components: {
    HeroSlider: {
      label: "Hero Slider",
      fields: {
        slides: {
          type: "array",
          label: "Slides",
          arrayFields: {
            title: { type: "text", label: "Title" },
            subtitle: { type: "text", label: "Subtitle" },
            image: { type: "text", label: "Image URL" },
            buttonText: { type: "text", label: "Button Text" },
            buttonLink: { type: "text", label: "Button Link" },
          },
        },
      },
      defaultProps: {
        slides: [{
          title: "Welcome",
          subtitle: "Discover amazing products",
          image: "/placeholder.jpg",
          buttonText: "Shop Now",
          buttonLink: "/products",
        }],
      },
      render: HeroSlider,
    },
    
    CategoryBlock: {
      label: "Category Block",
      fields: {
        title: { type: "text", label: "Section Title" },
        limit: { type: "number", label: "Number of Categories" },
        showIcon: { 
          type: "radio", 
          label: "Show Icons",
          options: [
            { label: "Yes", value: true },
            { label: "No", value: false },
          ],
        },
      },
      defaultProps: {
        title: "Shop by Category",
        limit: 6,
        showIcon: true,
      },
      render: CategoryBlock,
    },
    
    ProductFlashSaleBlock: {
      label: "Flash Sale Products",
      fields: {
        limit: { type: "number", label: "Number of Products" },
      },
      defaultProps: { limit: 8 },
      render: ProductFlashSaleBlock,
    },
    
    PopularProductsBlock: {
      label: "Popular Products",
      fields: {
        title: { type: "text", label: "Section Title" },
        limit: { type: "number", label: "Number of Products" },
      },
      defaultProps: {
        title: "Popular Products",
        limit: 10,
      },
      render: PopularProductsBlock,
    },
    
    BestSellingBlock: {
      label: "Best Selling Products",
      fields: {
        title: { type: "text", label: "Section Title" },
        limit: { type: "number", label: "Number of Products" },
      },
      defaultProps: {
        title: "Best Sellers",
        limit: 10,
      },
      render: BestSellingBlock,
    },
    
    Heading: {
      label: "Heading",
      fields: {
        text: { type: "text", label: "Text" },
        level: {
          type: "select",
          label: "Level",
          options: [
            { label: "H1", value: "h1" },
            { label: "H2", value: "h2" },
            { label: "H3", value: "h3" },
            { label: "H4", value: "h4" },
          ],
        },
        align: {
          type: "radio",
          label: "Alignment",
          options: [
            { label: "Left", value: "left" },
            { label: "Center", value: "center" },
            { label: "Right", value: "right" },
          ],
        },
      },
      defaultProps: {
        text: "Heading",
        level: "h2",
        align: "left",
      },
      render: Heading,
    },
    
    Paragraph: {
      label: "Paragraph",
      fields: {
        text: { type: "textarea", label: "Text" },
      },
      defaultProps: {
        text: "Enter your text here...",
      },
      render: ({ text }) => <p className="puck-paragraph">{text}</p>,
    },
    
    Image: {
      label: "Image",
      fields: {
        src: { type: "text", label: "Image URL" },
        alt: { type: "text", label: "Alt Text" },
      },
      defaultProps: {
        src: "/placeholder.jpg",
        alt: "Image",
      },
      render: ({ src, alt }) => (
        <img src={src} alt={alt} className="puck-image" />
      ),
    },
    
    Spacer: {
      label: "Spacer",
      fields: {
        height: { type: "number", label: "Height (px)" },
      },
      defaultProps: { height: 40 },
      render: ({ height }) => <div style={{ height }} />,
    },
  },
};
```

### API Client Utility

```typescript
// lib/api.ts
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

// ============================================
// CMS Pages API
// ============================================

export const cmsPages = {
  list: async (limit = 10, page = 1) => {
    const res = await fetch(
      `${API_URL}/api/cms-pages?limit=${limit}&page=${page}`
    );
    return res.json();
  },
  
  getBySlug: async (slug: string) => {
    const res = await fetch(`${API_URL}/api/cms-pages/${slug}`);
    if (!res.ok) throw new Error('Page not found');
    return res.json();
  },
  
  create: async (token: string, data: CreatePageInput) => {
    const res = await fetch(`${API_URL}/api/cms-pages`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to create page');
    return res.json();
  },
  
  update: async (token: string, id: number, data: UpdatePageInput) => {
    const res = await fetch(`${API_URL}/api/cms-pages/${id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to update page');
    return res.json();
  },
  
  delete: async (token: string, id: number) => {
    const res = await fetch(`${API_URL}/api/cms-pages/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    if (!res.ok) throw new Error('Failed to delete page');
    return res.json();
  },
};

// ============================================
// Puck Pages API
// ============================================

export const puckPages = {
  getByPath: async (path: string) => {
    const res = await fetch(
      `${API_URL}/api/puck/page?path=${encodeURIComponent(path)}`
    );
    return res.json();
  },
  
  save: async (token: string, data: SavePuckPageInput) => {
    const res = await fetch(`${API_URL}/api/puck/page`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to save page');
    return res.json();
  },
};

// ============================================
// Component Data API
// ============================================

export const componentData = {
  flashSaleProducts: (limit = 10, language?: string) => {
    const params = new URLSearchParams({ limit: String(limit) });
    if (language) params.set('language', language);
    
    return fetch(`${API_URL}/api/component-data/flash-sale-products?${params}`)
      .then(res => res.json());
  },
  
  categories: (limit = 10, topLevel = true) => {
    const params = new URLSearchParams({ 
      limit: String(limit),
      top_level: String(topLevel),
    });
    
    return fetch(`${API_URL}/api/component-data/categories?${params}`)
      .then(res => res.json());
  },
  
  collections: (limit = 10) => {
    return fetch(`${API_URL}/api/component-data/collections?limit=${limit}`)
      .then(res => res.json());
  },
  
  popularProducts: (limit = 10) => {
    return fetch(`${API_URL}/api/component-data/popular-products?limit=${limit}`)
      .then(res => res.json());
  },
  
  bestSellingProducts: (limit = 10) => {
    return fetch(`${API_URL}/api/component-data/best-selling-products?limit=${limit}`)
      .then(res => res.json());
  },
};

// ============================================
// Types
// ============================================

interface CreatePageInput {
  title: string;
  slug: string;
  content: any[];
  meta?: Record<string, any>;
}

interface UpdatePageInput {
  title?: string;
  slug?: string;
  content?: any[];
  meta?: Record<string, any>;
}

interface SavePuckPageInput {
  path: string;
  title: string;
  data: any;
  meta?: Record<string, any>;
}
```

### React Query Hooks

```typescript
// hooks/useCms.ts
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { cmsPages, puckPages, componentData } from '@/lib/api';
import { useAuth } from './useAuth';

// ============================================
// CMS Pages Hooks
// ============================================

export function useCmsPages(limit = 10, page = 1) {
  return useQuery(
    ['cms-pages', limit, page],
    () => cmsPages.list(limit, page)
  );
}

export function useCmsPage(slug: string) {
  return useQuery(
    ['cms-page', slug],
    () => cmsPages.getBySlug(slug),
    { enabled: !!slug }
  );
}

export function useCreateCmsPage() {
  const { token } = useAuth();
  const queryClient = useQueryClient();
  
  return useMutation(
    (data: CreatePageInput) => cmsPages.create(token!, data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['cms-pages']);
      },
    }
  );
}

// ============================================
// Puck Pages Hooks
// ============================================

export function usePuckPage(path: string) {
  return useQuery(
    ['puck-page', path],
    () => puckPages.getByPath(path),
    { enabled: !!path }
  );
}

export function useSavePuckPage() {
  const { token } = useAuth();
  const queryClient = useQueryClient();
  
  return useMutation(
    (data: SavePuckPageInput) => puckPages.save(token!, data),
    {
      onSuccess: (_, variables) => {
        queryClient.invalidateQueries(['puck-page', variables.path]);
      },
    }
  );
}

// ============================================
// Component Data Hooks
// ============================================

export function useFlashSaleProducts(limit = 10) {
  return useQuery(
    ['flash-sale-products', limit],
    () => componentData.flashSaleProducts(limit),
    { staleTime: 60000 } // Cache for 1 minute
  );
}

export function useCategories(limit = 10) {
  return useQuery(
    ['categories', limit],
    () => componentData.categories(limit),
    { staleTime: 300000 } // Cache for 5 minutes
  );
}

export function usePopularProducts(limit = 10) {
  return useQuery(
    ['popular-products', limit],
    () => componentData.popularProducts(limit),
    { staleTime: 60000 }
  );
}

export function useBestSellingProducts(limit = 10) {
  return useQuery(
    ['best-selling-products', limit],
    () => componentData.bestSellingProducts(limit),
    { staleTime: 60000 }
  );
}
```

---

## Error Handling

### Error Response Format

```typescript
interface ErrorResponse {
  message: string;
  errors?: Record<string, string[]>;
}
```

### Common Error Responses

#### 401 Unauthorized
```json
{
  "message": "Unauthenticated."
}
```

#### 403 Forbidden
```json
{
  "message": "This action is unauthorized."
}
```

#### 404 Not Found
```json
{
  "message": "NOT_FOUND"
}
```

#### 422 Validation Error
```json
{
  "message": "The given data was invalid.",
  "errors": {
    "title": ["The title field is required."],
    "slug": ["The slug has already been taken."],
    "path": ["The path must start with a forward slash."]
  }
}
```

### Frontend Error Handler

```typescript
// utils/errorHandler.ts
export function getErrorMessage(error: any): string {
  // Axios error
  if (error.response) {
    const { status, data } = error.response;
    
    switch (status) {
      case 401:
        return 'Please log in to continue';
      case 403:
        return 'You do not have permission to perform this action';
      case 404:
        return 'The requested resource was not found';
      case 422:
        // Return first validation error
        if (data.errors) {
          const firstField = Object.keys(data.errors)[0];
          return data.errors[firstField][0];
        }
        return data.message || 'Validation failed';
      case 500:
        return 'Server error. Please try again later.';
      default:
        return data.message || 'An error occurred';
    }
  }
  
  // Network error
  if (error.request) {
    return 'Network error. Please check your connection.';
  }
  
  // Other errors
  return error.message || 'An unexpected error occurred';
}

// Usage with React Query
const mutation = useSavePuckPage();

const handleSave = async (data) => {
  try {
    await mutation.mutateAsync(data);
    toast.success('Page saved!');
  } catch (error) {
    toast.error(getErrorMessage(error));
  }
};
```

---

## Related Files

| File | Description |
|------|-------------|
| `packages/marvel/src/Http/Controllers/CmsPageController.php` | CMS pages controller |
| `packages/marvel/src/Http/Controllers/ComponentDataController.php` | Component data controller |
| `packages/marvel/src/Services/CmsPageService.php` | CMS page business logic |
| `packages/marvel/src/Services/ComponentDataService.php` | Component data service |
| `packages/marvel/src/Database/Models/CmsPage.php` | CMS page model |
| `packages/marvel/src/Rest/Routes.php` | API route definitions |

---

## Need Help?

- Check the [API routes file](../packages/marvel/src/Rest/Routes.php) for all available endpoints
- Review [controller implementations](../packages/marvel/src/Http/Controllers/) for detailed logic
- See [service classes](../packages/marvel/src/Services/) for business logic details