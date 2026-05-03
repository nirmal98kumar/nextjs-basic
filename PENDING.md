# Pending Next.js Topics

This file tracks the most useful next steps to continue learning from the current `Link Inbox` app.

## Recommended next topics

### 1. Dynamic page metadata

Why it matters:

- Learn how to set the browser tab title and page metadata per route.
- Good follow-up to the dynamic detail page.

What to add:

- Use `generateMetadata()` in `app/links/[id]/page.jsx`.
- Set the title based on the saved link.

Example outcome:

- `/links/next-docs` shows a tab title like `Next.js Documentation | Link Inbox`.

### 2. Loading UI

Why it matters:

- Learn how Next.js handles loading states at the route level.

What to add:

- Add `loading.jsx` for the detail route or home route.
- Show a lightweight loading state while a route loads.

### 3. Error UI

Why it matters:

- Learn how route-level errors are handled in the App Router.

What to add:

- Add `error.jsx` to a route segment.
- Show a friendly message if something throws during rendering.

### 4. Server Actions

Why it matters:

- Learn the newer Next.js pattern for server-side mutations without relying only on `/api` routes.

What to add:

- Rebuild add-link flow or delete-link flow using a Server Action.

Learning goal:

- Compare Server Actions vs Route Handlers and understand when each feels natural.

### 5. Search and filtering

Why it matters:

- Good small feature for client-side UI thinking.
- Can later connect to URL search params.

What to add:

- Search input on the home page.
- Filter visible links by title or URL.

### 6. Search params in the URL

Why it matters:

- Learn how Next.js works with query strings like `?query=react`.

What to add:

- Keep the search state in the URL.
- Read search params on the server or client depending on the approach.

### 7. Better empty states and polish

Why it matters:

- Helpful for real app UX.

What to add:

- Empty list state
- Better delete/add feedback
- Cleaner form validation messages

### 8. Real database instead of JSON

Why it matters:

- Move from a learning-only storage approach to a real app data layer.

What to add:

- SQLite with Prisma
- Replace `data/links.json` with database reads and writes

### 9. Edit/update a saved link

Why it matters:

- Completes CRUD more fully.

What to add:

- Update title, notes, or tags on a saved link
- Add `PATCH` or use a Server Action

### 10. Authentication

Why it matters:

- Important for multi-user apps later.

What to add:

- Per-user saved links
- Protected routes

## Suggested learning order

1. Dynamic page metadata
2. Loading UI
3. Error UI
4. Server Actions
5. Search and filtering
6. Search params
7. Better polish
8. Real database
9. Edit/update flow
10. Authentication

## Notes for future continuation

The current project is already a working Next.js learning app with:

- App Router
- Server Components
- Client Components
- Route Handlers
- JSON-based persistence
- Server-side metadata fetching
- Delete flow
- Dynamic detail routes
- 404 handling

When continuing later, the cleanest next topic is:

`generateMetadata()` on the dynamic detail page.
