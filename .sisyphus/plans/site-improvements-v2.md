# Site Improvements V2: SEO, Navigation, and Polish

## TL;DR

> **Quick Summary**: Nine targeted improvements to kevmok.com covering SPA navigation fixes, SEO/social meta, RSS feed, proper XML sitemap, robots.txt, favicon, blog post headers, 404 page, and content tags.
> 
> **Deliverables**:
> - Fixed internal links using `<Link>` for SPA navigation
> - OG/Twitter meta tags on all pages
> - RSS feed at `/rss.xml` with proper `application/xml` content-type
> - Sitemap rewritten to serve proper XML (not HTML-wrapped)
> - `robots.txt` static file
> - Favicon with `<link>` tag
> - Blog post header with title, date, back link
> - 404 page via `notFoundComponent`
> - Tags field in content schema + visual labels on posts
> 
> **Estimated Effort**: Medium (7 tasks)
> **Parallel Execution**: YES - 3 waves
> **Critical Path**: Task 1 → Task 3 → Task 5 → Task 7

---

## Context

### Original Request
User identified high and medium impact improvements after completing the initial site revamp. The site is live on TanStack Start + React 19 + Tailwind 4 + MDX. These are polish improvements, not architectural changes.

### Interview Summary
**Key Discussions**:
- **XML/RSS approach**: Use TanStack Start `server.handlers.GET` pattern for proper content-type headers
- **Post header**: Show frontmatter title as h1, formatted date, back link to home
- **404 page**: Simple "Page not found" + home link — matches minimalist vibe
- **OG tags**: Text meta only (og:title, og:description, twitter:card) — no OG images
- **Tags**: Visual labels only, not clickable/filterable

**Research Findings**:
- TanStack Start `server.handlers` is the official pattern for non-HTML responses (confirmed via docs)
- `createServerFn` is NOT the right approach — `server.handlers.GET` returns `new Response()` directly
- Existing `<a>` tags in `__root.tsx` (line 37-41 for `/projects`) and `index.tsx` (line 48 for post links) cause full page reloads
- Content schema in `content-collections.ts` has no `tags` field
- Blog post route renders raw MDX with no title/date header
- `public/` still contains stale Next.js artifacts (`next.svg`, `vercel.svg`)
- Existing date format on home page: `toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })` → "Feb 9, 2026"

### Metis Review
**Identified Gaps** (addressed):
- **Duplicate h1 risk**: Adding programmatic `<h1>` from frontmatter would duplicate the `# Hello World` in `1.mdx`. Convention: MDX posts should NOT start with h1 — title comes from frontmatter. Existing `1.mdx` must be updated to remove `# Hello World`.
- **server.handlers vs createServerFn**: Metis corrected the approach — `server.handlers.GET` is the proper TanStack Start pattern for XML responses, not `createServerFn`.
- **OG meta key**: Must use `property` (not `name`) for `og:*` tags in `head()`.
- **Stale public assets**: `next.svg` and `vercel.svg` should be cleaned up alongside favicon addition.
- **robots.txt**: Static file in `public/` — don't over-engineer with a server route.

---

## Work Objectives

### Core Objective
Polish the site with proper SPA navigation, SEO fundamentals, and content presentation improvements that make kevmok.com feel professional and complete.

### Concrete Deliverables
- All internal `<a>` tags converted to `<Link>` components
- OG/Twitter meta tags on home, projects, and blog post pages
- `/rss.xml` endpoint returning valid RSS 2.0 XML
- `/sitemap.xml` endpoint returning proper XML (not HTML-wrapped)
- `public/robots.txt` with sitemap reference
- `public/favicon.ico` (or `.svg`) + `<link>` tag in root head
- Blog post header component with title, date, back link
- `notFoundComponent` on root route
- `tags` field in content schema + visual tag labels on blog posts
- Stale Next.js assets cleaned from `public/`

### Definition of Done
- [x] `bun run build` exits with code 0
- [x] `bun run check-types` exits with code 0
- [x] All internal navigation uses `<Link>` (zero internal `<a href="/...">` remaining)
- [x] `/rss.xml` returns `Content-Type: application/xml` with valid RSS
- [x] `/sitemap.xml` returns `Content-Type: application/xml` (not text/html)
- [x] Blog posts display title + date from frontmatter above MDX content
- [x] Non-existent routes show a 404 page with home link

### Must Have
- `<Link>` for ALL internal routes (SPA transitions)
- OG meta tags using `property` key in `head()`
- `server.handlers.GET` pattern for XML endpoints
- Consistent date formatting (match home page format)
- Simple 404 with home link
- Tags as optional field in content schema

### Must NOT Have (Guardrails)
- **NO `createServerFn`** for sitemap/RSS — use `server.handlers.GET` pattern
- **NO OG images** — text meta only
- **NO clickable/filterable tags** — visual labels only
- **NO new dependencies** — everything needed is already installed
- **NO changes to MDX component system** (`mdx-components.tsx`) unless strictly needed
- **NO complex favicon setup** (no apple-touch-icon manifest, just basic favicon)
- **NO RSS reader/viewer page** — just the XML endpoint
- **NO duplicate h1 tags** — programmatic h1 from frontmatter replaces MDX body h1

---

## Verification Strategy (MANDATORY)

> **UNIVERSAL RULE: ZERO HUMAN INTERVENTION**
>
> ALL tasks MUST be verifiable WITHOUT any human action.
> Every criterion is executed by the agent using tools.

### Test Decision
- **Infrastructure exists**: NO
- **Automated tests**: None (build + type-check verification)
- **Framework**: N/A

### Agent-Executed QA Scenarios (MANDATORY — ALL tasks)

**Verification Tool by Deliverable Type:**

| Type | Tool | How Agent Verifies |
|------|------|-------------------|
| **Build** | Bash | `bun run build` → exit code 0 |
| **Type check** | Bash | `bun run check-types` → exit code 0 |
| **Link fixes** | Bash (ast_grep) | Search for internal `<a href="/">` patterns — must return 0 |
| **Meta tags** | Bash (curl + grep) | Check for `og:title`, `twitter:card` in HTML |
| **XML endpoints** | Bash (curl -D -) | Check Content-Type header + XML body |
| **Static files** | Bash (ls, cat) | Verify files exist with correct content |
| **Visual** | Playwright | Screenshot key pages for evidence |

---

## Execution Strategy

### Parallel Execution Waves

```
Wave 1 (Start Immediately — Quick Wins):
├── Task 1: Fix internal <a> to <Link> + 404 page
├── Task 2: Add robots.txt + favicon + clean stale assets
└── (Both are independent, pure frontend/static changes)

Wave 2 (After Wave 1 — Server Routes):
├── Task 3: Fix sitemap to serve proper XML via server.handlers
└── Task 4: Add RSS feed via server.handlers (same pattern as Task 3)

Wave 3 (After Wave 2 — Content & Meta):
├── Task 5: Add tags to content schema + update existing post
├── Task 6: Add OG/social meta tags to all pages
└── Task 7: Add blog post header (title, date, back link, tags) + final QA
```

### Dependency Matrix

| Task | Depends On | Blocks | Can Parallelize With |
|------|------------|--------|---------------------|
| 1 | None | 3, 4 | 2 |
| 2 | None | 7 | 1 |
| 3 | 1 | 7 | 4 |
| 4 | 1 | 7 | 3 |
| 5 | None | 7 | 1, 2, 3, 4, 6 |
| 6 | None | 7 | 1, 2, 3, 4, 5 |
| 7 | 2, 3, 4, 5, 6 | None | None (final) |

### Agent Dispatch Summary

| Wave | Tasks | Recommended Agents |
|------|-------|-------------------|
| 1 | 1, 2 | dispatch parallel — both are quick frontend changes |
| 2 | 3, 4 | dispatch parallel — both use server.handlers pattern |
| 3 | 5, 6 | dispatch parallel — schema + meta are independent |
| Final | 7 | sequential — integrates everything + QA |

---

## TODOs

- [x] 1. Fix Internal Navigation Links + Add 404 Page

  **What to do**:
  - In `src/routes/__root.tsx`:
    - Change `<a href="/projects">` (line 37-41) to `<Link to="/projects">` — `Link` is already imported
    - Add `notFoundComponent` to `createRootRoute()` options:
      ```tsx
      notFoundComponent: () => (
        <div className="space-y-4">
          <h1 className="text-2xl font-bold">Page not found</h1>
          <p className="text-zinc-400">The page you're looking for doesn't exist.</p>
          <Link to="/" className="text-blue-400 hover:text-blue-300 transition-colors">
            ← Back to home
          </Link>
        </div>
      )
      ```
  - In `src/routes/index.tsx`:
    - Change `<a href={`/n/${post._meta.path}`}>` (line 48) to `<Link to={`/n/${post._meta.path}`}>`
    - Ensure `Link` is imported (it already is on line 1)
    - Update the inner elements to work with `<Link>` (it's a wrapper, same children)

  **Must NOT do**:
  - Don't change external links (`<a>` to GitHub, Twitter, LinkedIn) — they're correctly external
  - Don't add active-state highlighting to nav links
  - Don't make the 404 page fancy — keep it simple text

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Small, targeted edits in 2 files — straightforward find-and-replace
  - **Skills**: [`frontend-ui-ux`]
    - `frontend-ui-ux`: Understanding proper link component patterns in React
  - **Skills Evaluated but Omitted**:
    - `react-best-practices`: Too simple for performance optimization concerns

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Task 2)
  - **Blocks**: Tasks 3, 4 (sitemap/RSS need working routes)
  - **Blocked By**: None (can start immediately)

  **References**:

  **Pattern References**:
  - `src/routes/__root.tsx:30-35` — Existing `<Link to="/">` usage pattern to follow for converting the other internal links
  - `src/routes/__root.tsx:37-41` — The `<a href="/projects">` that needs conversion to `<Link to="/projects">`
  - `src/routes/index.tsx:48` — The `<a href={`/n/${post._meta.path}`}>` that needs conversion to `<Link>`
  - `src/routes/index.tsx:1` — `Link` is already imported from `@tanstack/react-router`

  **External References**:
  - TanStack Router `notFoundComponent`: https://tanstack.com/router/latest/docs/framework/react/guide/not-found-errors — Shows how to configure `notFoundComponent` on root route

  **WHY Each Reference Matters**:
  - `__root.tsx:30-35` shows the exact `<Link>` pattern already used — replicate it for the other internal link
  - The TanStack docs confirm `notFoundComponent` goes on the root route options

  **Acceptance Criteria**:

  **Agent-Executed QA Scenarios:**

  ```
  Scenario: No internal <a> tags remain for SPA routes
    Tool: Bash (ast_grep_search)
    Preconditions: Edits complete
    Steps:
      1. ast_grep_search pattern='<a href="/projects"$$$>$$$</a>' lang=tsx
      2. Assert: 0 results (no internal <a> for /projects)
      3. ast_grep_search pattern='<a href={`/n/$$$`}$$$>$$$</a>' lang=tsx
      4. Assert: 0 results (no internal <a> for /n/ paths)
    Expected Result: All internal links use <Link>
    Evidence: ast_grep output captured

  Scenario: 404 page renders for non-existent routes
    Tool: Bash (curl)
    Preconditions: Dev server running on localhost:3000
    Steps:
      1. curl -s http://localhost:3000/this-page-does-not-exist
      2. Assert: response body contains "not found" (case-insensitive)
      3. Assert: response body contains href to "/" or link to home
    Expected Result: 404 page shows with home link
    Evidence: curl output captured in .sisyphus/evidence/task-1-404.txt

  Scenario: Build succeeds after changes
    Tool: Bash
    Steps:
      1. Run: bun run build
      2. Assert: exit code is 0
    Expected Result: No build errors
    Evidence: Build output in .sisyphus/evidence/task-1-build.txt
  ```

  **Evidence to Capture:**
  - [ ] ast_grep results in `.sisyphus/evidence/task-1-links.txt`
  - [ ] 404 page curl in `.sisyphus/evidence/task-1-404.txt`
  - [ ] Build output in `.sisyphus/evidence/task-1-build.txt`

  **Commit**: YES
  - Message: `fix: use Link for internal navigation, add 404 page`
  - Files: `src/routes/__root.tsx`, `src/routes/index.tsx`
  - Pre-commit: `bun run build`

---

- [x] 2. Add robots.txt, Favicon, and Clean Stale Assets

  **What to do**:
  - Create `public/robots.txt`:
    ```
    User-agent: *
    Allow: /

    Sitemap: https://kevmok.com/sitemap.xml
    ```
  - Add a favicon:
    - Create a simple `public/favicon.svg` (a minimal SVG — e.g., the letter "K" or a simple geometric shape in the site's blue accent color)
    - OR download a basic favicon.ico
    - Add `<link>` tag in `src/routes/__root.tsx` `head()` → `links` array:
      ```tsx
      links: [
        { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' },
      ]
      ```
  - Clean stale Next.js artifacts from `public/`:
    - Delete `public/next.svg`
    - Delete `public/vercel.svg`
    - Keep `public/resume.pdf` (user's resume)

  **Must NOT do**:
  - Don't add apple-touch-icon, webmanifest, or complex favicon variants
  - Don't add a favicon generation pipeline
  - Don't delete `public/resume.pdf`
  - Don't make the favicon elaborate — simple geometric shape or letter

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Static file creation, one small edit to __root.tsx head
  - **Skills**: [`frontend-ui-ux`]
    - `frontend-ui-ux`: Designing a tasteful minimal favicon SVG
  - **Skills Evaluated but Omitted**:
    - `playwright`: Not needed for static file creation

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Task 1)
  - **Blocks**: Task 7 (final QA needs favicon visible)
  - **Blocked By**: None (can start immediately)

  **References**:

  **Pattern References**:
  - `src/routes/__root.tsx:11-21` — Existing `head()` function where `links` array should be added
  - `public/` directory — Currently contains `next.svg`, `vercel.svg`, `resume.pdf`

  **External References**:
  - TanStack Start `head()` links: The `head()` function supports a `links` array — `{ rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' }`
  - SVG favicon support: All modern browsers support SVG favicons via `<link rel="icon" type="image/svg+xml">`

  **WHY Each Reference Matters**:
  - The existing `head()` shows where to add the `links` array
  - SVG favicons are the simplest approach — no generation tools needed, scales perfectly

  **Acceptance Criteria**:

  **Agent-Executed QA Scenarios:**

  ```
  Scenario: robots.txt exists and is valid
    Tool: Bash
    Steps:
      1. cat public/robots.txt
      2. Assert: contains "User-agent: *"
      3. Assert: contains "Sitemap: https://kevmok.com/sitemap.xml"
    Expected Result: Valid robots.txt with sitemap reference
    Evidence: File content in .sisyphus/evidence/task-2-robots.txt

  Scenario: Favicon file exists
    Tool: Bash
    Steps:
      1. ls public/favicon.svg || ls public/favicon.ico
      2. Assert: at least one favicon file exists
    Expected Result: Favicon file present in public/
    Evidence: ls output captured

  Scenario: Favicon link tag in root head
    Tool: Bash (grep)
    Steps:
      1. grep -c "favicon" src/routes/__root.tsx
      2. Assert: count >= 1
    Expected Result: Root route references favicon in head
    Evidence: grep output captured

  Scenario: Stale Next.js assets removed
    Tool: Bash
    Steps:
      1. ls public/next.svg 2>&1
      2. Assert: "No such file" (file deleted)
      3. ls public/vercel.svg 2>&1
      4. Assert: "No such file" (file deleted)
      5. ls public/resume.pdf
      6. Assert: file exists (kept)
    Expected Result: Stale assets gone, resume kept
    Evidence: ls output in .sisyphus/evidence/task-2-cleanup.txt

  Scenario: Build succeeds
    Tool: Bash
    Steps:
      1. Run: bun run build
      2. Assert: exit code is 0
    Expected Result: No build errors
    Evidence: Build output in .sisyphus/evidence/task-2-build.txt
  ```

  **Evidence to Capture:**
  - [ ] robots.txt content in `.sisyphus/evidence/task-2-robots.txt`
  - [ ] Cleanup results in `.sisyphus/evidence/task-2-cleanup.txt`
  - [ ] Build output in `.sisyphus/evidence/task-2-build.txt`

  **Commit**: YES
  - Message: `chore: add robots.txt, favicon, clean stale Next.js assets`
  - Files: `public/robots.txt`, `public/favicon.svg`, `src/routes/__root.tsx`
  - Pre-commit: `bun run build`

---

- [x] 3. Fix Sitemap to Serve Proper XML

  **What to do**:
  - Rewrite `src/routes/sitemap[.]xml.tsx` to use `server.handlers.GET` instead of a React component:
    ```tsx
    import { createFileRoute } from '@tanstack/react-router'
    import { allPosts } from 'content-collections'

    const SITE_URL = 'https://kevmok.com'

    export const Route = createFileRoute('/sitemap.xml')({
      server: {
        handlers: {
          GET: async ({ request }) => {
            const routes = [
              { url: `${SITE_URL}/`, lastModified: new Date().toISOString() },
              { url: `${SITE_URL}/projects`, lastModified: new Date().toISOString() },
            ]

            const posts = allPosts
              .filter(post => !post.draft)
              .map(post => ({
                url: `${SITE_URL}/n/${post._meta.path}`,
                lastModified: new Date(post.date).toISOString(),
              }))

            const allRoutes = [...routes, ...posts]

            const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${allRoutes.map(route => `  <url>
        <loc>${route.url}</loc>
        <lastmod>${route.lastModified}</lastmod>
      </url>`).join('\n')}
    </urlset>`

            return new Response(sitemap, {
              headers: {
                'Content-Type': 'application/xml',
              },
            })
          },
        },
      },
    })
    ```
  - Remove the old `SitemapComponent` and `component` property entirely
  - Remove the old `loader` property — data fetching happens inside the handler

  **Must NOT do**:
  - Don't use `createServerFn` — use `server.handlers.GET` directly
  - Don't keep the React component rendering approach
  - Don't add sitemap indexing or priority/changefreq attributes
  - Don't rename the file — keep the `sitemap[.]xml.tsx` convention

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Single file rewrite with a clear pattern from TanStack docs
  - **Skills**: [`frontend-ui-ux`]
    - `frontend-ui-ux`: Understanding route architecture patterns
  - **Skills Evaluated but Omitted**:
    - `react-best-practices`: No React component involved anymore

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with Task 4)
  - **Blocks**: Task 7 (final QA)
  - **Blocked By**: Task 1 (routes need to be working)

  **References**:

  **Pattern References**:
  - `src/routes/sitemap[.]xml.tsx` — Current implementation to replace (lines 1-42). Keep the same SITE_URL constant and allPosts import.
  - `src/routes/index.tsx:7-10` — Post filtering/sorting pattern to follow (filter drafts, sort by date)

  **External References**:
  - TanStack Start server routes: https://tanstack.com/start/latest/docs/framework/react/guide/server-routes — Official `server.handlers.GET` pattern with custom Content-Type headers
  - Sitemap protocol: https://www.sitemaps.org/protocol.html — XML format reference

  **WHY Each Reference Matters**:
  - The current sitemap file shows the data fetching logic to preserve
  - The TanStack docs confirm the exact `server.handlers.GET` → `new Response()` pattern

  **Acceptance Criteria**:

  **Agent-Executed QA Scenarios:**

  ```
  Scenario: Sitemap returns proper XML content-type
    Tool: Bash (curl)
    Preconditions: Dev server running on localhost:3000
    Steps:
      1. curl -s -D - http://localhost:3000/sitemap.xml | head -10
      2. Assert: Content-Type header contains "application/xml"
      3. Assert: body starts with "<?xml"
      4. Assert: body does NOT contain "<pre>" or "<html>"
    Expected Result: Pure XML response with correct content-type
    Evidence: Response headers + body in .sisyphus/evidence/task-3-sitemap.txt

  Scenario: Sitemap contains all expected URLs
    Tool: Bash (curl + grep)
    Preconditions: Dev server running
    Steps:
      1. curl -s http://localhost:3000/sitemap.xml
      2. Assert: contains "https://kevmok.com/"
      3. Assert: contains "https://kevmok.com/projects"
      4. Assert: contains "https://kevmok.com/n/1"
      5. grep -c "<url>" output
      6. Assert: count >= 3
    Expected Result: All routes listed in sitemap
    Evidence: Sitemap XML in .sisyphus/evidence/task-3-sitemap.xml

  Scenario: Build succeeds
    Tool: Bash
    Steps:
      1. Run: bun run build
      2. Assert: exit code is 0
    Expected Result: No build errors with server.handlers pattern
    Evidence: Build output in .sisyphus/evidence/task-3-build.txt
  ```

  **Evidence to Capture:**
  - [ ] Response headers in `.sisyphus/evidence/task-3-sitemap.txt`
  - [ ] Sitemap XML in `.sisyphus/evidence/task-3-sitemap.xml`
  - [ ] Build output in `.sisyphus/evidence/task-3-build.txt`

  **Commit**: YES
  - Message: `fix: serve sitemap.xml as proper XML with correct content-type`
  - Files: `src/routes/sitemap[.]xml.tsx`
  - Pre-commit: `bun run build`

---

- [x] 4. Add RSS Feed

  **What to do**:
  - Create `src/routes/rss[.]xml.tsx` using the same `server.handlers.GET` pattern as the sitemap:
    ```tsx
    import { createFileRoute } from '@tanstack/react-router'
    import { allPosts } from 'content-collections'

    const SITE_URL = 'https://kevmok.com'

    export const Route = createFileRoute('/rss.xml')({
      server: {
        handlers: {
          GET: async ({ request }) => {
            const posts = allPosts
              .filter(post => !post.draft)
              .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

            const rss = `<?xml version="1.0" encoding="UTF-8"?>
    <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
      <channel>
        <title>Kevin Mok</title>
        <link>${SITE_URL}</link>
        <description>Developer relations engineer. Building with AI, writing code, shipping side projects.</description>
        <language>en-us</language>
        <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml" />
        ${posts.map(post => `<item>
          <title>${escapeXml(post.title)}</title>
          <link>${SITE_URL}/n/${post._meta.path}</link>
          <guid isPermaLink="true">${SITE_URL}/n/${post._meta.path}</guid>
          <pubDate>${new Date(post.date).toUTCString()}</pubDate>
          ${post.description ? `<description>${escapeXml(post.description)}</description>` : ''}
        </item>`).join('\n')}
      </channel>
    </rss>`

            return new Response(rss, {
              headers: {
                'Content-Type': 'application/xml',
              },
            })
          },
        },
      },
    })

    function escapeXml(str: string): string {
      return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;')
    }
    ```
  - Add RSS autodiscovery link in `src/routes/__root.tsx` `head()` → `links` array:
    ```tsx
    { rel: 'alternate', type: 'application/rss+xml', title: 'Kevin Mok RSS Feed', href: '/rss.xml' }
    ```

  **Must NOT do**:
  - Don't use a third-party RSS library — hand-rolled RSS 2.0 is simple enough
  - Don't include full post content in RSS items — title + description only
  - Don't create an RSS reader/viewer page
  - Don't use `createServerFn` — use `server.handlers.GET`

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Single file creation following the exact same pattern as Task 3
  - **Skills**: [`frontend-ui-ux`]
    - `frontend-ui-ux`: Understanding feed conventions and XML structure
  - **Skills Evaluated but Omitted**:
    - `react-best-practices`: No React component involved

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with Task 3)
  - **Blocks**: Task 7 (final QA)
  - **Blocked By**: Task 1 (routes need to be working)

  **References**:

  **Pattern References**:
  - Task 3's sitemap implementation — Same `server.handlers.GET` + `new Response()` pattern
  - `src/routes/index.tsx:7-10` — Post filtering and sorting logic to replicate
  - `src/routes/__root.tsx:11-21` — `head()` function where RSS autodiscovery link goes

  **External References**:
  - RSS 2.0 Specification: https://www.rssboard.org/rss-specification — Channel and item element requirements
  - Atom self-link: `<atom:link href="..." rel="self" type="application/rss+xml" />` for RSS best practice

  **WHY Each Reference Matters**:
  - Task 3's pattern is identical — same file structure, same Response approach
  - The RSS spec defines required elements (title, link, description per item)

  **Acceptance Criteria**:

  **Agent-Executed QA Scenarios:**

  ```
  Scenario: RSS feed returns proper XML content-type
    Tool: Bash (curl)
    Preconditions: Dev server running on localhost:3000
    Steps:
      1. curl -s -D - http://localhost:3000/rss.xml | head -15
      2. Assert: Content-Type header contains "application/xml"
      3. Assert: body starts with "<?xml"
      4. Assert: body contains "<rss version="
      5. Assert: body contains "<channel>"
    Expected Result: Valid RSS 2.0 XML with correct content-type
    Evidence: Response in .sisyphus/evidence/task-4-rss.txt

  Scenario: RSS feed contains blog posts
    Tool: Bash (curl + grep)
    Preconditions: Dev server running, at least 1 non-draft post exists
    Steps:
      1. curl -s http://localhost:3000/rss.xml
      2. Assert: contains "<item>"
      3. Assert: contains "kevmok.com/n/1"
      4. Assert: contains "<title>" within item
    Expected Result: RSS lists published blog posts
    Evidence: RSS XML in .sisyphus/evidence/task-4-rss.xml

  Scenario: RSS autodiscovery link in HTML head
    Tool: Bash (curl + grep)
    Preconditions: Dev server running
    Steps:
      1. curl -s http://localhost:3000/ | grep "application/rss+xml"
      2. Assert: output contains link tag with type="application/rss+xml"
    Expected Result: RSS feed is discoverable from HTML
    Evidence: grep output captured

  Scenario: Build succeeds
    Tool: Bash
    Steps:
      1. Run: bun run build
      2. Assert: exit code is 0
    Expected Result: No build errors
    Evidence: Build output in .sisyphus/evidence/task-4-build.txt
  ```

  **Evidence to Capture:**
  - [ ] RSS response in `.sisyphus/evidence/task-4-rss.txt`
  - [ ] RSS XML in `.sisyphus/evidence/task-4-rss.xml`
  - [ ] Build output in `.sisyphus/evidence/task-4-build.txt`

  **Commit**: YES
  - Message: `feat: add RSS feed at /rss.xml`
  - Files: `src/routes/rss[.]xml.tsx`, `src/routes/__root.tsx`
  - Pre-commit: `bun run build`

---

- [x] 5. Add Tags to Content Schema + Update Existing Post

  **What to do**:
  - Update `content-collections.ts` schema to add `tags` field:
    ```tsx
    schema: z.object({
      title: z.string(),
      date: z.string().datetime(),
      description: z.string().optional(),
      draft: z.boolean().optional().default(false),
      tags: z.array(z.string()).optional().default([]),
    }),
    ```
  - Update `content/posts/1.mdx` frontmatter:
    - Add `tags: ['TanStack Start', 'MDX']` (or similar relevant tags)
    - **Remove the `# Hello World` heading** from the MDX body (line 8-9) — title will now come from frontmatter in the post header (Task 7). This prevents duplicate h1 tags.
  - Verify the build succeeds and Content Collections regenerates with the new field
  - Verify `allPosts` type includes the new `tags` property

  **Must NOT do**:
  - Don't create tag listing pages or routes
  - Don't make tags clickable/linkable
  - Don't add tag validation beyond basic string array
  - Don't add tags to the RSS feed or sitemap

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Schema field addition + frontmatter update — very small change
  - **Skills**: [`frontend-ui-ux`]
    - `frontend-ui-ux`: Understanding content modeling patterns
  - **Skills Evaluated but Omitted**:
    - `react-best-practices`: No React work in this task

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 3 (with Task 6) — can actually start anytime
  - **Blocks**: Task 7 (post header needs tags to display)
  - **Blocked By**: None

  **References**:

  **Pattern References**:
  - `content-collections.ts:9-14` — Existing schema to extend with `tags` field
  - `content/posts/1.mdx` — Existing post to update with tags frontmatter and remove h1

  **External References**:
  - Zod arrays: `z.array(z.string()).optional().default([])` — optional array with empty default

  **WHY Each Reference Matters**:
  - The existing schema shows the exact Zod pattern to follow for adding the new field
  - The MDX file needs both frontmatter update and h1 removal

  **Acceptance Criteria**:

  **Agent-Executed QA Scenarios:**

  ```
  Scenario: Tags field exists in content schema
    Tool: Bash (grep)
    Steps:
      1. grep "tags" content-collections.ts
      2. Assert: output contains "tags" with z.array
    Expected Result: Schema includes tags field
    Evidence: grep output captured

  Scenario: Existing post has tags in frontmatter
    Tool: Bash (grep)
    Steps:
      1. grep "tags:" content/posts/1.mdx
      2. Assert: tags field exists in frontmatter
    Expected Result: Post has tags
    Evidence: grep output captured

  Scenario: MDX body does NOT start with h1
    Tool: Bash (grep)
    Steps:
      1. grep -n "^# " content/posts/1.mdx
      2. Assert: no line starting with "# " after frontmatter (or zero results)
    Expected Result: No duplicate h1 — title comes from frontmatter only
    Evidence: grep output captured

  Scenario: Build succeeds with schema change
    Tool: Bash
    Steps:
      1. Run: bun run build
      2. Assert: exit code is 0
      3. Run: bun run check-types
      4. Assert: exit code is 0
    Expected Result: Schema change compiles successfully
    Evidence: Build output in .sisyphus/evidence/task-5-build.txt
  ```

  **Evidence to Capture:**
  - [ ] Schema grep in `.sisyphus/evidence/task-5-schema.txt`
  - [ ] Build output in `.sisyphus/evidence/task-5-build.txt`

  **Commit**: YES
  - Message: `feat: add tags field to content schema`
  - Files: `content-collections.ts`, `content/posts/1.mdx`
  - Pre-commit: `bun run build`

---

- [x] 6. Add OG / Social Meta Tags to All Pages

  **What to do**:
  - Update `head()` in `src/routes/index.tsx` to add OG + Twitter meta:
    ```tsx
    head: () => ({
      title: 'Kevin Mok',
      meta: [
        { name: 'description', content: 'Developer relations engineer...' },
        { property: 'og:title', content: 'Kevin Mok' },
        { property: 'og:description', content: 'Developer relations engineer...' },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: 'https://kevmok.com' },
        { name: 'twitter:card', content: 'summary' },
        { name: 'twitter:title', content: 'Kevin Mok' },
        { name: 'twitter:description', content: 'Developer relations engineer...' },
      ],
    }),
    ```
  - Update `head()` in `src/routes/projects.tsx` with similar OG tags
  - Update `head()` in `src/routes/n/$postId.tsx` with dynamic OG tags from frontmatter:
    ```tsx
    head: ({ loaderData }) => {
      const post = loaderData?.post;
      return {
        title: post?.title ?? 'Post Not Found',
        meta: [
          { name: 'description', content: post?.description ?? '' },
          { property: 'og:title', content: post?.title ?? 'Post Not Found' },
          { property: 'og:description', content: post?.description ?? '' },
          { property: 'og:type', content: 'article' },
          { property: 'og:url', content: `https://kevmok.com/n/${post?._meta.path}` },
          { name: 'twitter:card', content: 'summary' },
          { name: 'twitter:title', content: post?.title ?? '' },
          { name: 'twitter:description', content: post?.description ?? '' },
        ],
      };
    },
    ```
  - **Important**: Use `property` (not `name`) for `og:*` tags — this is the Open Graph standard

  **Must NOT do**:
  - Don't add `og:image` tags — no images for now
  - Don't add JSON-LD structured data
  - Don't add `og:site_name` or complex OG properties
  - Don't change existing `title` or `name: 'description'` meta — only ADD new tags

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Adding meta tags to existing head() functions — pattern repetition
  - **Skills**: [`frontend-ui-ux`]
    - `frontend-ui-ux`: Understanding SEO meta tag conventions
  - **Skills Evaluated but Omitted**:
    - `react-best-practices`: Meta tags are static, no performance impact

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 3 (with Task 5)
  - **Blocks**: Task 7 (final QA)
  - **Blocked By**: None

  **References**:

  **Pattern References**:
  - `src/routes/index.tsx:14-23` — Existing `head()` function to extend with OG tags
  - `src/routes/projects.tsx:36-44` — Existing `head()` function to extend
  - `src/routes/n/$postId.tsx:17-28` — Existing dynamic `head()` to extend with OG tags

  **External References**:
  - Open Graph protocol: https://ogp.me/ — Required properties: og:title, og:type, og:url, og:description
  - Twitter Cards: https://developer.x.com/en/docs/twitter-for-websites/cards — twitter:card, twitter:title, twitter:description

  **WHY Each Reference Matters**:
  - The existing `head()` functions show exactly where to add the new meta tags
  - The OG and Twitter docs specify which property keys and values are expected

  **Acceptance Criteria**:

  **Agent-Executed QA Scenarios:**

  ```
  Scenario: Home page has OG meta tags
    Tool: Bash (curl + grep)
    Preconditions: Dev server running on localhost:3000
    Steps:
      1. curl -s http://localhost:3000/
      2. Assert: contains 'property="og:title"' or "og:title"
      3. Assert: contains 'property="og:description"' or "og:description"
      4. Assert: contains 'twitter:card'
    Expected Result: Home page has OG and Twitter meta tags
    Evidence: Meta tags in .sisyphus/evidence/task-6-home-meta.txt

  Scenario: Blog post has dynamic OG tags from frontmatter
    Tool: Bash (curl + grep)
    Preconditions: Dev server running, post 1.mdx exists
    Steps:
      1. curl -s http://localhost:3000/n/1
      2. Assert: contains "og:title" with value matching post title
      3. Assert: contains "og:type" with value "article"
      4. Assert: contains "og:url" with value containing "/n/1"
    Expected Result: Blog post OG tags match frontmatter data
    Evidence: Meta tags in .sisyphus/evidence/task-6-post-meta.txt

  Scenario: Projects page has OG tags
    Tool: Bash (curl + grep)
    Preconditions: Dev server running
    Steps:
      1. curl -s http://localhost:3000/projects
      2. Assert: contains "og:title"
    Expected Result: Projects page has OG meta
    Evidence: grep output captured

  Scenario: Build succeeds
    Tool: Bash
    Steps:
      1. Run: bun run build
      2. Assert: exit code is 0
    Expected Result: No build errors
    Evidence: Build output in .sisyphus/evidence/task-6-build.txt
  ```

  **Evidence to Capture:**
  - [ ] Home meta in `.sisyphus/evidence/task-6-home-meta.txt`
  - [ ] Post meta in `.sisyphus/evidence/task-6-post-meta.txt`
  - [ ] Build output in `.sisyphus/evidence/task-6-build.txt`

  **Commit**: YES
  - Message: `feat: add Open Graph and Twitter meta tags to all pages`
  - Files: `src/routes/index.tsx`, `src/routes/projects.tsx`, `src/routes/n/$postId.tsx`
  - Pre-commit: `bun run build`

---

- [x] 7. Add Blog Post Header (Title, Date, Back Link, Tags) + Final QA

  **What to do**:
  - Update `src/routes/n/$postId.tsx` to render a header above MDX content:
    ```tsx
    function PostComponent() {
      const { post } = Route.useLoaderData();

      return (
        <article className="max-w-none">
          <header className="mb-8">
            <Link
              to="/"
              className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors"
            >
              ← Back
            </Link>
            <h1 className="text-2xl font-medium mt-4">{post.title}</h1>
            <p className="text-sm text-zinc-500 mt-2">
              {new Date(post.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}
            </p>
            {post.tags && post.tags.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {post.tags.map(tag => (
                  <span key={tag} className="text-xs text-zinc-500">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </header>
          <MDXContent code={post.mdx} components={mdxComponents} />
        </article>
      );
    }
    ```
  - Import `Link` from `@tanstack/react-router` in the file
  - Ensure the date format matches the home page format exactly: `toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })` → "Feb 9, 2026"
  - Tag display follows the same visual pattern as project tags in `projects.tsx:64-69`
  - **Run full final QA** across all pages to verify everything works together

  **Must NOT do**:
  - Don't add reading time estimation
  - Don't add previous/next post navigation
  - Don't add social sharing buttons
  - Don't make tags clickable — visual labels only
  - Don't add an author avatar or byline

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: Blog post header design + comprehensive visual QA of the entire site
  - **Skills**: [`frontend-ui-ux`, `playwright`]
    - `frontend-ui-ux`: Post header layout, typography hierarchy, spacing rhythm
    - `playwright`: Full visual QA across all pages — screenshots, DOM assertions
  - **Skills Evaluated but Omitted**:
    - `react-best-practices`: Simple static rendering

  **Parallelization**:
  - **Can Run In Parallel**: NO
  - **Parallel Group**: Sequential (must be last)
  - **Blocks**: None (final task)
  - **Blocked By**: Tasks 2, 3, 4, 5, 6

  **References**:

  **Pattern References**:
  - `src/routes/n/$postId.tsx:31-38` — Current PostComponent to update with header
  - `src/routes/index.tsx:54-58` — Date formatting pattern to match exactly
  - `src/routes/projects.tsx:64-69` — Tag display pattern (text-xs text-zinc-500) to follow
  - `src/routes/__root.tsx:30-35` — `<Link>` usage pattern for the back link

  **External References**:
  - Leerob's blog post layout: Posts show title at top, date below, content after — same pattern

  **WHY Each Reference Matters**:
  - The current PostComponent shows the exact file to modify
  - The date format from index.tsx ensures consistency across the site
  - The tag style from projects.tsx ensures visual consistency

  **Acceptance Criteria**:

  **Agent-Executed QA Scenarios:**

  ```
  Scenario: Blog post shows frontmatter title, date, and back link
    Tool: Bash (curl)
    Preconditions: Dev server running, post 1.mdx exists with title and date
    Steps:
      1. curl -s http://localhost:3000/n/1
      2. Assert: contains "Hello World" in an <h1> tag (from frontmatter, not MDX body)
      3. Assert: contains date string (e.g., "Feb" or "2026")
      4. Assert: contains link to "/" (back link)
      5. Assert: does NOT contain two <h1> tags (no duplicate)
    Expected Result: Post header renders from frontmatter data
    Evidence: curl output in .sisyphus/evidence/task-7-post-header.txt

  Scenario: Blog post shows tags
    Tool: Bash (curl + grep)
    Preconditions: Dev server running, post has tags in frontmatter
    Steps:
      1. curl -s http://localhost:3000/n/1
      2. Assert: contains tag text (e.g., "TanStack Start" or "MDX")
    Expected Result: Tags render as visual labels
    Evidence: grep output captured

  Scenario: Full site visual QA — Home page
    Tool: Playwright (playwright skill)
    Preconditions: Dev server running
    Steps:
      1. Navigate to: http://localhost:3000/
      2. Wait for page load (timeout: 10s)
      3. Assert: "Kevin Mok" visible in header
      4. Assert: navigation links visible (projects, github)
      5. Assert: recent posts section visible
      6. Assert: footer with social links visible
      7. Screenshot: .sisyphus/evidence/task-7-home.png
    Expected Result: Home page complete with all improvements
    Evidence: .sisyphus/evidence/task-7-home.png

  Scenario: Full site visual QA — Blog post
    Tool: Playwright (playwright skill)
    Preconditions: Dev server running
    Steps:
      1. Navigate to: http://localhost:3000/n/1
      2. Wait for page load
      3. Assert: post title visible as h1
      4. Assert: date visible below title
      5. Assert: back link visible
      6. Assert: MDX content renders below header
      7. Screenshot: .sisyphus/evidence/task-7-post.png
    Expected Result: Blog post with proper header and content
    Evidence: .sisyphus/evidence/task-7-post.png

  Scenario: Full site visual QA — Projects page
    Tool: Playwright (playwright skill)
    Preconditions: Dev server running
    Steps:
      1. Navigate to: http://localhost:3000/projects
      2. Assert: project list visible
      3. Screenshot: .sisyphus/evidence/task-7-projects.png
    Expected Result: Projects page renders correctly
    Evidence: .sisyphus/evidence/task-7-projects.png

  Scenario: Full site visual QA — 404 page
    Tool: Playwright (playwright skill)
    Preconditions: Dev server running
    Steps:
      1. Navigate to: http://localhost:3000/nonexistent-page
      2. Assert: "not found" text visible
      3. Assert: home link visible
      4. Screenshot: .sisyphus/evidence/task-7-404.png
    Expected Result: 404 page renders cleanly
    Evidence: .sisyphus/evidence/task-7-404.png

  Scenario: Sitemap and RSS verified
    Tool: Bash (curl)
    Preconditions: Dev server running
    Steps:
      1. curl -s -D - http://localhost:3000/sitemap.xml | head -5
      2. Assert: Content-Type contains "application/xml"
      3. curl -s -D - http://localhost:3000/rss.xml | head -5
      4. Assert: Content-Type contains "application/xml"
    Expected Result: Both XML endpoints serve correct content-type
    Evidence: Headers in .sisyphus/evidence/task-7-xml-endpoints.txt

  Scenario: Final build + type check
    Tool: Bash
    Steps:
      1. Run: bun run build
      2. Assert: exit code is 0
      3. Run: bun run check-types
      4. Assert: exit code is 0
    Expected Result: Full build passes with all changes
    Evidence: Build output in .sisyphus/evidence/task-7-build.txt
  ```

  **Evidence to Capture:**
  - [ ] Post header HTML in `.sisyphus/evidence/task-7-post-header.txt`
  - [ ] Home screenshot in `.sisyphus/evidence/task-7-home.png`
  - [ ] Post screenshot in `.sisyphus/evidence/task-7-post.png`
  - [ ] Projects screenshot in `.sisyphus/evidence/task-7-projects.png`
  - [ ] 404 screenshot in `.sisyphus/evidence/task-7-404.png`
  - [ ] XML endpoints in `.sisyphus/evidence/task-7-xml-endpoints.txt`
  - [ ] Build output in `.sisyphus/evidence/task-7-build.txt`

  **Commit**: YES
  - Message: `feat: add blog post header with title, date, back link, and tags`
  - Files: `src/routes/n/$postId.tsx`
  - Pre-commit: `bun run build`

---

## Commit Strategy

| After Task | Message | Files | Verification |
|------------|---------|-------|--------------|
| 1 | `fix: use Link for internal navigation, add 404 page` | `__root.tsx`, `index.tsx` | `bun run build` |
| 2 | `chore: add robots.txt, favicon, clean stale Next.js assets` | `public/*`, `__root.tsx` | `bun run build` |
| 3 | `fix: serve sitemap.xml as proper XML with correct content-type` | `sitemap[.]xml.tsx` | `bun run build` |
| 4 | `feat: add RSS feed at /rss.xml` | `rss[.]xml.tsx`, `__root.tsx` | `bun run build` |
| 5 | `feat: add tags field to content schema` | `content-collections.ts`, `1.mdx` | `bun run build` |
| 6 | `feat: add Open Graph and Twitter meta tags to all pages` | `index.tsx`, `projects.tsx`, `$postId.tsx` | `bun run build` |
| 7 | `feat: add blog post header with title, date, back link, and tags` | `$postId.tsx` | `bun run build && bun run check-types` |

---

## Success Criteria

### Verification Commands
```bash
# Full build passes
bun run build        # Expected: exit code 0
bun run check-types  # Expected: exit code 0

# No internal <a> tags for SPA routes
# ast_grep_search should return 0 results for internal <a href="/...">

# XML endpoints serve correct content-type
curl -s -D - http://localhost:3000/sitemap.xml | grep Content-Type  # Expected: application/xml
curl -s -D - http://localhost:3000/rss.xml | grep Content-Type      # Expected: application/xml

# OG tags present
curl -s http://localhost:3000/ | grep "og:title"  # Expected: match found

# Static files exist
cat public/robots.txt       # Expected: contains "User-agent" and "Sitemap"
ls public/favicon.svg       # Expected: file exists

# 404 works
curl -s http://localhost:3000/nonexistent | grep -i "not found"  # Expected: match found
```

### Final Checklist
- [x] All internal links use `<Link>` (SPA navigation)
- [x] OG + Twitter meta on home, projects, blog posts
- [x] RSS feed serves valid XML at `/rss.xml`
- [x] Sitemap serves valid XML at `/sitemap.xml` (not HTML-wrapped)
- [x] `robots.txt` exists with sitemap reference
- [x] Favicon visible in browser tab
- [x] Blog posts show title + date + back link from frontmatter
- [x] 404 page renders for unknown routes
- [x] Tags display on blog posts as visual labels
- [x] No stale Next.js assets in `public/`
- [x] `bun run build` exits 0
- [x] `bun run check-types` exits 0
