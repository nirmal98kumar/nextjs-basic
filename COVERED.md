# Covered So Far

This project is a small Next.js learning app called `Link Inbox`, built in plain JavaScript with the App Router.

## What the app currently does

- Renders a home page that lists saved links.
- Lets the user add a new link from the browser.
- Saves links on the server into `data/links.json`.
- Fetches page metadata on the server when saving a URL.
- Lets the user delete a saved link.
- Supports a dynamic detail page for each saved link at `/links/[id]`.
- Shows a 404 page when a link id does not exist.

## Next.js concepts already covered

### 1. App Router structure

Files used:

- `app/page.jsx`
- `app/layout.jsx`
- `app/api/links/route.js`
- `app/links/[id]/page.jsx`

What was learned:

- Routes are created from folders and files inside `app/`.
- API endpoints can live inside `app/api/.../route.js`.
- Dynamic routes use folder names like `[id]`.

### 2. Server Components

Files used:

- `app/page.jsx`
- `app/links/[id]/page.jsx`

What was learned:

- Pages are Server Components by default.
- Server Components can read files and run server-side code directly.
- `app/page.jsx` loads all links on the server before rendering.
- `app/links/[id]/page.jsx` loads a single link using the route param.

### 3. Client Components

Files used:

- `components/LinkInbox.jsx`

What was learned:

- `"use client"` is required for components using `useState`, `useEffect`, browser events, or `useRouter`.
- The form and interactive list behavior live in the client component.

### 4. Client and server split

Files used:

- `components/LinkInbox.jsx`
- `app/page.jsx`
- `lib/links.js`

What was learned:

- The server loads and prepares data.
- The client handles typing, button clicks, and local UI state.
- This is a common Next.js pattern: server for data, client for interaction.

### 5. Route Handlers

Files used:

- `app/api/links/route.js`

What was learned:

- `GET` returns saved links as JSON.
- `POST` creates a new link.
- `DELETE` removes a link.
- Route handlers are useful when the browser needs to talk to server logic.

### 6. Server-side file access

Files used:

- `lib/links.js`
- `data/links.json`

What was learned:

- Next.js server code can use Node APIs like `fs`.
- `getLinks()` reads the JSON file.
- `addLink()` writes a new item to the file.
- `deleteLink()` removes an item from the file.
- `getLinkById()` finds a single link for the detail page.

### 7. External server-side fetching

Files used:

- `lib/metadata.js`

What was learned:

- The server can fetch a pasted URL directly.
- The app checks that the response is HTML.
- The app extracts the page `<title>` and meta description.
- If metadata fetch fails, the app falls back to hostname-based values.

### 8. Dynamic routes

Files used:

- `app/links/[id]/page.jsx`

What was learned:

- A folder like `[id]` captures route params.
- Visiting `/links/next-docs` loads the detail page for that id.
- Dynamic routes are great for item detail pages.

### 9. 404 handling

Files used:

- `app/links/[id]/page.jsx`

What was learned:

- `notFound()` from `next/navigation` triggers Next.js 404 handling.
- This is used when a link id is missing from the data source.

### 10. Refreshing server-rendered data

Files used:

- `components/LinkInbox.jsx`

What was learned:

- `router.refresh()` tells Next.js to re-run the current route on the server.
- This keeps the client UI in sync with server-rendered data after add/delete operations.

## Main files and responsibilities

- `app/page.jsx`: server-rendered home page
- `components/LinkInbox.jsx`: client-side form and list interactions
- `app/api/links/route.js`: route handlers for link CRUD actions
- `lib/links.js`: server-side data access helpers
- `lib/metadata.js`: metadata fetching and extraction
- `app/links/[id]/page.jsx`: dynamic detail page
- `data/links.json`: local JSON storage
- `app/globals.css`: shared styling

## Current app status

The app already demonstrates a solid beginner-level Next.js flow:

- server-rendered pages
- client interactivity
- route handlers
- server-side file access
- server-side external fetching
- dynamic routes
- 404 behavior

