# Site Improvements V2 - Learnings

## Completed: 2026-02-10

## Key Patterns Learned

### TanStack Start server.handlers for XML
The proper way to serve non-HTML content (XML, RSS) in TanStack Start:
- Use `server.handlers.GET` in the route file
- Return `new Response(xmlString, { headers: { 'Content-Type': 'application/xml' } })`
- Don't use React components for XML endpoints

### Link Component for SPA Navigation
- Internal links MUST use `<Link to="/path">` from `@tanstack/react-router`
- For dynamic routes with params: `<Link to="/n/$postId" params={{ postId: value }}>`
- External links (GitHub, etc.) correctly use `<a>` with `target="_blank"`

### Content Collections Schema Updates
- Adding fields to schema requires build to regenerate types
- Use `z.array(z.string()).optional().default([])` for optional array fields
- MDX content convention: Don't include h1 in body, use frontmatter title

### OG Meta Tags
- Use `property` key (not `name`) for Open Graph tags: `property: 'og:title'`
- Use `name` key for Twitter Card tags: `name: 'twitter:card'`
- Add to `head()` function in route files

### Favicon + RSS Autodiscovery
- Add to `head()` → `links` array in root route
- Favicon: `{ rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' }`
- RSS: `{ rel: 'alternate', type: 'application/rss+xml', title: '...', href: '/rss.xml' }`

## Files Modified
- `src/routes/__root.tsx` - Navigation links, 404 page, favicon, RSS link
- `src/routes/index.tsx` - Post links, OG meta tags
- `src/routes/projects.tsx` - OG meta tags
- `src/routes/n/$postId.tsx` - Post header, OG meta tags
- `src/routes/sitemap[.]xml.tsx` - Rewritten to use server.handlers
- `src/routes/rss[.]xml.tsx` - Created RSS feed
- `content-collections.ts` - Added tags field
- `content/posts/1.mdx` - Updated frontmatter, removed h1
- `public/robots.txt` - Created
- `public/favicon.svg` - Created
- `public/next.svg` - Deleted (stale)
- `public/vercel.svg` - Deleted (stale)

## Verification Commands Used
```bash
# Build and type check
bun run build
bun run check-types

# Check for internal <a> tags
ast_grep_search pattern='<a href="/projects"' lang=tsx

# Test XML endpoints
curl -s -D - http://localhost:3000/sitemap.xml | grep Content-Type
curl -s -D - http://localhost:3000/rss.xml | grep Content-Type

# Check OG tags
curl -s http://localhost:3000/ | grep "og:title"
```

## Content Convention Established
MDX posts should NOT start with `# Title`. The title comes from frontmatter and is rendered programmatically in the post header component. This prevents duplicate h1 tags.
