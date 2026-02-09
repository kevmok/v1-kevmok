# Personal Site Revamp: Minimalist MDX-First with TanStack Start

## TL;DR

> **Quick Summary**: Complete rebuild of personal site from resume-style Next.js to a minimalist, MDX-first personal site using TanStack Start, Content Collections, and Tailwind CSS 4. Inspired by leerob.com's clean aesthetic.
> 
> **Deliverables**:
> - Scaffolded TanStack Start project with Bun
> - MDX blog system via Content Collections (posts at `/n/1`, `/n/2`, etc.)
> - Three pages: Home (bio), Blog post renderer, Projects
> - Dark-only theme with custom accent color
> - Minimal navigation (name + links) and footer (social text links)
> - Sitemap, SEO meta tags, syntax highlighting via sugar-high
> - Updated CI pipeline (GitHub Actions)
> - Vercel deployment ready
> 
> **Estimated Effort**: Medium (8-12 tasks)
> **Parallel Execution**: YES - 2 waves
> **Critical Path**: Task 1 (scaffold) → Task 2 (content collections) → Task 3 (blog route) → Task 6 (home page) → Task 8 (nav/footer) → Task 10 (SEO/sitemap)

---

## Context

### Original Request
User wants to completely revamp their personal site. Current site is a resume-style portfolio built with Next.js 13.5 that they hate — too busy, too much content. They want something minimalist and beautiful like leerob.com, with MDX support for writing blog posts that can include custom React components.

### Interview Summary
**Key Discussions**:
- **Framework**: User explicitly chose TanStack Start over Next.js — wants to leave the Next.js ecosystem
- **Content**: Fresh start — nothing carried over from existing site
- **Pages**: Home (bio/intro), Blog/Writing (/n/* pattern), Projects
- **Theme**: Dark only — no light mode, no toggle
- **Design**: Minimalist with personality — leerob's simplicity but with own color accents, maybe subtle CSS animations
- **Blog URLs**: `/n/1`, `/n/2`, `/n/3` — leerob's numbered pattern, not slugs
- **Package manager**: Bun (keep existing)
- **Testing**: Build verification only — no unit tests

**Research Findings**:
- TanStack Start v1.159.4 is production-ready (Feb 2026)
- MDX works via Content Collections (`@content-collections/core` + `@content-collections/mdx` + `@content-collections/vite`)
- Real reference: `ally-ahmed/tss-blog-starter` — deployed on Vercel, uses this exact stack
- TanStack's own site (tanstack.com) uses Content Collections + Vite
- sugar-high is React-component-based highlighting (render-time, not build-time) — same as leerob uses
- Tailwind CSS 4 integrates via `@tailwindcss/vite` plugin
- TanStack Start deploys to Vercel with zero additional config

### Metis Review
**Identified Gaps** (addressed):
- **Blog numbering**: Posts use numbered filenames (`1.mdx`, `2.mdx`) — filename IS the route param
- **Blog listing page**: Decided no dedicated `/blog` listing page — home page can show recent posts
- **Projects data source**: Keep as hardcoded TypeScript array (simple, matches minimalism)
- **Accent color**: Default to a sensible accent (e.g., blue-400/500) — user can swap later
- **Font loading**: Use `@fontsource/inter` for self-hosted, no FOUT
- **RSS feed**: Excluded from v1 — can add later
- **Old URLs**: `/typefully` will 404 — acceptable (fresh start)
- **Draft posts**: Add `draft: true` frontmatter field that excludes from listings
- **404 handling**: Blog route loader throws `notFound()` for non-existent posts
- **sugar-high is render-time**: Works as React component in MDX overrides, not rehype plugin — this is fine

---

## Work Objectives

### Core Objective
Replace the existing resume-style Next.js site with a clean, minimalist, MDX-first personal site built on TanStack Start that feels effortless to read and write for.

### Concrete Deliverables
- TanStack Start project scaffold (replacing all Next.js code)
- Content Collections configuration for MDX compilation
- `mdx-components.tsx` with styled overrides (h1-h3, p, a, code, blockquote)
- Home page with short bio and recent posts list
- Blog post route at `/n/$postId` with full MDX rendering
- Projects page with simple project list
- Minimal navigation header and footer with text-only social links
- `sitemap.xml` generation
- Per-page SEO meta tags via `head()`
- Updated `.github/workflows/build.yml`
- Updated `.gitignore`
- 1-2 sample blog posts to verify the system works
- Biome linting configuration

### Definition of Done
- [x] `bun run build` exits with code 0
- [x] Dev server responds with HTTP 200 on `/`, `/n/1`, `/projects`
- [x] Blog posts render MDX content with syntax-highlighted code blocks
- [x] All pages have proper `<title>` and meta description tags
- [ ] Site deploys to Vercel without errors

### Must Have
- TanStack Start with file-based routing
- Content Collections MDX compilation
- Dark-only theme (zinc/neutral palette)
- 60ch max-width for reading content
- Inter font (self-hosted via @fontsource)
- sugar-high syntax highlighting in code blocks
- Minimal navigation: name on left, page links on right
- Footer with text-only social links (github, x, linkedin)
- Sitemap generation
- SEO meta tags per page

### Must NOT Have (Guardrails)
- **NO component libraries** (shadcn, Radix, etc.) — hand-styled Tailwind only
- **NO animation libraries** (Framer Motion, etc.) — CSS transitions only if needed
- **NO dark/light toggle** — no ThemeProvider, no next-themes, no CSS theme variables
- **NO analytics or tracking** — no Vercel Analytics, no Google Analytics, no cookies
- **NO image optimization pipeline** — simple `<img>` tags or text-only
- **NO more than 6 MDX component overrides** — h1, h2, h3, p, a, code, blockquote (ceiling)
- **NO filtering/sorting on projects page** — plain static list
- **NO hamburger menu or complex navigation** — simple inline links
- **NO more than 2 sample blog posts** — just enough to verify the system
- **NO CMS** — content lives in the repo as MDX files

---

## Verification Strategy (MANDATORY)

> **UNIVERSAL RULE: ZERO HUMAN INTERVENTION**
>
> ALL tasks in this plan MUST be verifiable WITHOUT any human action.
> Every criterion is executed by the agent using tools (Bash, Playwright, curl).

### Test Decision
- **Infrastructure exists**: NO (fresh project)
- **Automated tests**: None (build verification only)
- **Framework**: N/A

### Agent-Executed QA Scenarios (MANDATORY — ALL tasks)

> Every task uses Bash (curl/grep) against the running dev server as primary verification.
> Playwright used for visual verification of key pages at the end.

**Verification Tool by Deliverable Type:**

| Type | Tool | How Agent Verifies |
|------|------|-------------------|
| **Build** | Bash | `bun run build` → exit code 0 |
| **Routes** | Bash (curl) | HTTP status codes + content grep |
| **MDX rendering** | Bash (curl + grep) | Check for rendered HTML elements |
| **SEO** | Bash (curl + grep) | Check for `<title>`, `<meta>` tags |
| **Visual** | Playwright | Screenshot key pages for evidence |

---

## Execution Strategy

### Parallel Execution Waves

```
Wave 1 (Start Immediately):
├── Task 1: Scaffold TanStack Start + clean old code [SEQUENTIAL FIRST]
└── (nothing else until scaffold verified)

Wave 2 (After Task 1):
├── Task 2: Content Collections + MDX setup
└── Task 5: Projects page (hardcoded data, no MDX dependency)

Wave 3 (After Task 2):
├── Task 3: Blog post route (/n/$postId)
├── Task 4: MDX component overrides + sugar-high
└── Task 6: Home page with bio + recent posts

Wave 4 (After Wave 3):
├── Task 7: Navigation header + footer
└── Task 8: Global styles + dark theme + typography

Wave 5 (After Wave 4):
├── Task 9: SEO meta tags + sitemap
├── Task 10: Update CI + gitignore + Biome config
└── Task 11: Final build verification + Playwright QA

Critical Path: 1 → 2 → 3 → 6 → 7 → 9 → 11
```

### Dependency Matrix

| Task | Depends On | Blocks | Can Parallelize With |
|------|------------|--------|---------------------|
| 1 | None | ALL | None (must be first) |
| 2 | 1 | 3, 4, 6 | 5 |
| 3 | 2 | 6, 9 | 4, 5 |
| 4 | 2 | 3 (soft) | 3, 5 |
| 5 | 1 | 7 | 2, 3, 4 |
| 6 | 2, 3 | 7 | None |
| 7 | 5, 6 | 9 | 8 |
| 8 | 1 | 9 | 2-7 (can run anytime after 1) |
| 9 | 7, 8 | 11 | 10 |
| 10 | 1 | 11 | 2-9 (can run anytime after 1) |
| 11 | ALL | None | None (must be last) |

### Agent Dispatch Summary

| Wave | Tasks | Recommended Agents |
|------|-------|-------------------|
| 1 | 1 | delegate_task(category="unspecified-high", load_skills=[], run_in_background=false) |
| 2 | 2, 5 | dispatch parallel after Task 1 |
| 3 | 3, 4, 6 | dispatch parallel after Task 2 |
| 4 | 7, 8 | dispatch parallel after Wave 3 |
| 5 | 9, 10, 11 | dispatch parallel (9, 10), then 11 last |

---

## TODOs

- [x] 1. Scaffold TanStack Start Project + Clean Old Code

  **What to do**:
  - Delete ALL existing source code and config: `src/`, `public/` (except keep `public/` directory itself), `tailwind.config.ts`, `next.config.js`, `postcss.config.js`, `next-env.d.ts`, `components.json`, `.next/`
  - Keep: `.git/`, `.github/`, `.gitignore`, `README.md`, `.sisyphus/`
  - Remove all existing dependencies from package.json
  - Scaffold a new TanStack Start project using Bun:
    - Install core deps: `@tanstack/react-start`, `@tanstack/react-router`, `react`, `react-dom`, `vinxi`
    - Install dev deps: `@types/react`, `@types/react-dom`, `typescript`, `vite`
    - Create `app.config.ts` (TanStack Start entry point)
    - Create `src/routes/__root.tsx` (root layout)
    - Create `src/routes/index.tsx` (home page — placeholder "Hello World")
    - Create `tsconfig.json` with path alias `@/*` → `./src/*`
    - Create `vite.config.ts` (empty for now, just TanStack Start plugin)
    - Add scripts to package.json: `dev`, `build`, `start`
  - Verify the scaffold builds and serves

  **Must NOT do**:
  - Don't install Content Collections yet (Task 2)
  - Don't install Tailwind yet (Task 8)
  - Don't add any styling — just a working scaffold
  - Don't preserve any old code or components

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
    - Reason: Framework scaffolding requires careful setup and verification of a non-trivial build system (TanStack Start + Vite)
  - **Skills**: []
    - No special skills needed — this is package management and file creation
  - **Skills Evaluated but Omitted**:
    - `frontend-ui-ux`: No UI work in this task, just scaffolding

  **Parallelization**:
  - **Can Run In Parallel**: NO
  - **Parallel Group**: Sequential (must be first)
  - **Blocks**: Tasks 2, 3, 4, 5, 6, 7, 8, 9, 10, 11
  - **Blocked By**: None

  **References**:

  **Pattern References**:
  - Current `package.json` at `/Users/kevin/code/src/github/kevmok/v1-kevmok/package.json` — see existing scripts and deps to know what to remove
  - Current `.gitignore` — update to remove Next.js entries (`.next/`) and add TanStack/Vite entries (`.vinxi/`, `dist/`)

  **External References**:
  - TanStack Start getting started: `https://tanstack.com/start/latest/docs/framework/react/quick-start` — follow the official scaffold pattern
  - `ally-ahmed/tss-blog-starter` package.json: `https://github.com/ally-ahmed/tss-blog-starter` — reference for correct dependency versions
  - TanStack Start Vite config: The vite.config.ts should use `import { tanstackStart } from "@tanstack/react-start/plugin/vite"`

  **WHY Each Reference Matters**:
  - The official quick start guide shows the correct file structure and minimal config for a working TanStack Start app
  - The tss-blog-starter shows proven dependency versions that work together
  - The current package.json shows what needs to be cleaned out

  **Acceptance Criteria**:

  **Agent-Executed QA Scenarios:**

  ```
  Scenario: Clean build succeeds
    Tool: Bash
    Preconditions: All old code deleted, new scaffold in place
    Steps:
      1. Run: bun run build
      2. Assert: exit code is 0
      3. Assert: no "error" in stderr (case-insensitive)
    Expected Result: Build completes without errors
    Evidence: Build output captured

  Scenario: Dev server starts and serves homepage
    Tool: Bash (curl)
    Preconditions: Build succeeded
    Steps:
      1. Run: bun run dev & (background)
      2. Wait 5 seconds for server startup
      3. curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/
      4. Assert: HTTP status is 200
      5. curl -s http://localhost:3000/ | grep -c "Hello"
      6. Assert: count >= 1
      7. Kill dev server
    Expected Result: Dev server responds with 200 and renders placeholder content
    Evidence: curl output captured

  Scenario: No old code remains
    Tool: Bash
    Preconditions: Scaffold complete
    Steps:
      1. Assert: src/app/ directory does NOT exist
      2. Assert: next.config.js does NOT exist
      3. Assert: tailwind.config.ts does NOT exist (will be recreated in Task 8)
      4. Assert: node_modules/.next does NOT exist
      5. Assert: package.json does NOT contain "next" dependency
    Expected Result: All Next.js artifacts removed
    Evidence: ls and grep output captured
  ```

  **Evidence to Capture:**
  - [ ] Build output in `.sisyphus/evidence/task-1-build.txt`
  - [ ] curl response in `.sisyphus/evidence/task-1-dev-server.txt`

  **Commit**: YES
  - Message: `feat: scaffold TanStack Start project (replace Next.js)`
  - Files: All changed files
  - Pre-commit: `bun run build`

---

- [x] 2. Setup Content Collections for MDX

  **What to do**:
  - Install Content Collections: `bun add -D @content-collections/core @content-collections/vite @content-collections/mdx`
  - Install MDX types: `bun add -D @types/mdx`
  - Create `content-collections.ts` at project root:
    - Define a `posts` collection pointing to `content/posts/`
    - Schema: `title` (string, required), `date` (string date, required), `description` (string, optional), `draft` (boolean, optional, default false)
    - Transform: compile MDX with `compileMDX()`
  - Create `content/posts/1.mdx` — a sample blog post with frontmatter, a heading, a paragraph, and a code block
  - Update `vite.config.ts` to add `contentCollections()` plugin (must be first)
  - Update `tsconfig.json` to add path: `"content-collections": ["./.content-collections/generated"]`
  - Verify Content Collections generates output on build

  **Must NOT do**:
  - Don't create the blog route yet (Task 3)
  - Don't add rehype/remark plugins — sugar-high handles highlighting at render time
  - Don't create more than 2 sample posts
  - Don't add MDX component overrides yet (Task 4)

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
    - Reason: Content Collections + Vite plugin integration requires careful configuration and debugging
  - **Skills**: []
    - No special skills needed
  - **Skills Evaluated but Omitted**:
    - `frontend-ui-ux`: No UI work in this task

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with Task 5)
  - **Blocks**: Tasks 3, 4, 6
  - **Blocked By**: Task 1

  **References**:

  **Pattern References**:
  - `ally-ahmed/tss-blog-starter/content-collections.ts` at `https://github.com/ally-ahmed/tss-blog-starter` — Content Collections config with MDX compilation, schema definition, and transform function
  - `ally-ahmed/tss-blog-starter/vite.config.ts` — Vite plugin ordering pattern (contentCollections must be first)

  **External References**:
  - Content Collections docs: `https://www.content-collections.dev/docs/getting-started` — official setup guide
  - Content Collections + TanStack Start: `https://www.content-collections.dev/docs/adapter/tanstack-start` — framework-specific integration guide
  - Content Collections MDX: `https://www.content-collections.dev/docs/transform/mdx` — MDX transform configuration

  **WHY Each Reference Matters**:
  - The tss-blog-starter shows a proven configuration that works with TanStack Start — use it as the baseline
  - The official docs explain the adapter integration and TypeScript path setup
  - The MDX transform docs show `compileMDX()` usage and available options

  **Acceptance Criteria**:

  **Agent-Executed QA Scenarios:**

  ```
  Scenario: Content Collections generates output on build
    Tool: Bash
    Preconditions: content-collections.ts configured, sample post exists
    Steps:
      1. Run: bun run build
      2. Assert: exit code is 0
      3. Assert: .content-collections/generated/ directory exists
      4. ls .content-collections/generated/
      5. Assert: directory contains generated files (index.ts or similar)
    Expected Result: Content Collections compiles MDX and generates TypeScript output
    Evidence: Directory listing captured

  Scenario: Sample post file exists with valid frontmatter
    Tool: Bash
    Preconditions: None
    Steps:
      1. Assert: content/posts/1.mdx exists
      2. grep "title:" content/posts/1.mdx
      3. Assert: output contains "title:"
      4. grep "date:" content/posts/1.mdx
      5. Assert: output contains "date:"
    Expected Result: Sample post has required frontmatter fields
    Evidence: grep output captured
  ```

  **Evidence to Capture:**
  - [ ] Build output in `.sisyphus/evidence/task-2-build.txt`
  - [ ] Generated directory listing in `.sisyphus/evidence/task-2-generated.txt`

  **Commit**: YES
  - Message: `feat: add Content Collections MDX pipeline`
  - Files: `content-collections.ts`, `content/posts/1.mdx`, `vite.config.ts`, `tsconfig.json`, `package.json`, `bun.lock`
  - Pre-commit: `bun run build`

---

- [x] 3. Build Blog Post Route (`/n/$postId`)

  **What to do**:
  - Create `src/routes/n/$postId.tsx`:
    - Use `createFileRoute('/n/$postId')` 
    - Loader: find post by `postId` param from `allPosts` (Content Collections), throw `notFound()` if not found
    - Filter out posts with `draft: true`
    - Component: render MDX using `useMDXComponent` from `@content-collections/mdx/react` (or `MDXContent` component)
    - Pass custom MDX components (from Task 4, but use defaults initially)
    - Wrap in `<article>` tag with max-width styling
  - Create `src/routes/n/index.tsx` — simple redirect to home or a minimal post listing
  - Verify the route renders the sample blog post from Task 2

  **Must NOT do**:
  - Don't add complex layouts or styling yet
  - Don't add pagination or post navigation (next/prev)
  - Don't add comments, reactions, or social sharing

  **Recommended Agent Profile**:
  - **Category**: `business-logic`
    - Reason: Core routing and data-loading logic — the central feature of the site
  - **Skills**: []
  - **Skills Evaluated but Omitted**:
    - `frontend-ui-ux`: Minimal UI in this task — just rendering MDX

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 3 (with Tasks 4, 6)
  - **Blocks**: Tasks 6, 9
  - **Blocked By**: Task 2

  **References**:

  **Pattern References**:
  - `ally-ahmed/tss-blog-starter` blog route — shows the `createFileRoute` + Content Collections loader pattern with `notFound()` handling
  - TanStack Router file-based routing: route files in `src/routes/` map directly to URL paths

  **External References**:
  - TanStack Start routing: `https://tanstack.com/router/latest/docs/framework/react/guide/file-based-routing` — file-based routing conventions
  - Content Collections MDX rendering: `https://www.content-collections.dev/docs/transform/mdx` — `useMDXComponent` or `MDXContent` usage
  - TanStack Router `notFound()`: `https://tanstack.com/router/latest/docs/framework/react/guide/not-found-errors` — how to handle 404s in loaders

  **WHY Each Reference Matters**:
  - The tss-blog-starter shows the exact pattern for loading Content Collections data in a TanStack route loader
  - The routing docs explain `$postId` dynamic segment syntax
  - The notFound docs show how to properly return 404 for missing posts

  **Acceptance Criteria**:

  **Agent-Executed QA Scenarios:**

  ```
  Scenario: Blog post route renders content
    Tool: Bash (curl)
    Preconditions: Dev server running, sample post 1.mdx exists
    Steps:
      1. curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/n/1
      2. Assert: HTTP status is 200
      3. curl -s http://localhost:3000/n/1 | grep -c "<article"
      4. Assert: count >= 1
      5. curl -s http://localhost:3000/n/1 | grep -ci "sample\|hello\|post"
      6. Assert: count >= 1 (content from 1.mdx is rendered)
    Expected Result: Blog post page renders with MDX content inside an article tag
    Evidence: curl output captured

  Scenario: Non-existent post returns 404
    Tool: Bash (curl)
    Preconditions: Dev server running, no post with id "999"
    Steps:
      1. curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/n/999
      2. Assert: HTTP status is 404 (or redirect to not-found page)
    Expected Result: Missing posts return proper 404
    Evidence: curl output captured
  ```

  **Evidence to Capture:**
  - [ ] Blog post curl output in `.sisyphus/evidence/task-3-blog-post.txt`
  - [ ] 404 response in `.sisyphus/evidence/task-3-not-found.txt`

  **Commit**: YES
  - Message: `feat: add blog post route /n/$postId with MDX rendering`
  - Files: `src/routes/n/$postId.tsx`, `src/routes/n/index.tsx`
  - Pre-commit: `bun run build`

---

- [x] 4. Create MDX Component Overrides + Syntax Highlighting

  **What to do**:
  - Install sugar-high: `bun add sugar-high`
  - Create `src/components/mdx-components.tsx`:
    - `h1`: `font-medium pt-12 mb-0 text-2xl` (large top padding, no bottom margin)
    - `h2`: `font-medium mt-8 mb-3 text-xl`
    - `h3`: `font-medium mt-6 mb-2 text-lg`
    - `p`: `text-zinc-300 leading-relaxed`
    - `a`: Internal links use TanStack `<Link>`, external links open in new tab with `rel="noopener noreferrer"`. Style: `text-blue-400 hover:text-blue-300 transition-colors`
    - `code`: Inline code gets `bg-zinc-800 px-1.5 py-0.5 rounded text-sm`. Pre code blocks use sugar-high `highlight()` with `dangerouslySetInnerHTML`
    - `blockquote`: `border-l-2 border-zinc-600 pl-4 text-zinc-400 italic`
    - `ul`/`ol`: Proper list styling with `list-disc`/`list-decimal pl-5 space-y-1`
    - `table`: Simple table with zinc borders, scrollable on mobile
  - Add syntax highlighting CSS variables to global styles (sugar-high token colors):
    - `--sh-class`, `--sh-sign`, `--sh-string`, `--sh-keyword`, `--sh-comment`, `--sh-property`, `--sh-entity`
  - Wire MDX components into the blog post route (update Task 3's route to pass these components)

  **Must NOT do**:
  - Don't create more than the listed component overrides
  - Don't add copy-to-clipboard on code blocks
  - Don't add line numbers to code blocks
  - Don't use rehype-pretty-code or shiki — sugar-high only

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: This is component styling work — creating the visual language for all MDX content
  - **Skills**: [`frontend-ui-ux`]
    - `frontend-ui-ux`: Component styling, typography, color choices for dark theme
  - **Skills Evaluated but Omitted**:
    - `react-best-practices`: These are simple stateless components, no performance concerns

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 3 (with Tasks 3, 6)
  - **Blocks**: None (soft dependency for Task 3 — Task 3 can use default components initially)
  - **Blocked By**: Task 2

  **References**:

  **Pattern References**:
  - Leerob's `mdx-components.tsx`: `https://github.com/leerob/leerob.io/blob/a62191e15db86d564d98ebe00c308f607df1e338/mdx-components.tsx` — The gold standard for minimal MDX component overrides. Shows h1-h4, p, a (internal vs external link detection), code (sugar-high integration), blockquote, table styling
  - Leerob's `globals.css`: `https://github.com/leerob/leerob.io/blob/a62191e15db86d564d98ebe00c308f607df1e338/app/globals.css` — sugar-high CSS variables and syntax highlighting color scheme
  - `ally-ahmed/tss-blog-starter` MDX components — shows the same pattern adapted for TanStack Start

  **External References**:
  - sugar-high API: `https://github.com/huozhi/sugar-high` — Usage: `import { highlight } from 'sugar-high'` → `highlight(codeString)` returns HTML string
  - sugar-high requires CSS variables for token colors (see leerob's globals.css)

  **WHY Each Reference Matters**:
  - Leerob's mdx-components.tsx is the literal reference for the aesthetic the user wants — follow its patterns closely
  - The sugar-high repo shows the API and required CSS variables
  - The syntax color scheme from leerob's CSS is a proven dark-theme palette

  **Acceptance Criteria**:

  **Agent-Executed QA Scenarios:**

  ```
  Scenario: MDX headings render with correct HTML tags
    Tool: Bash (curl)
    Preconditions: Dev server running, sample post with h1/h2 headings
    Steps:
      1. curl -s http://localhost:3000/n/1
      2. Assert: output contains <h1 (or <h1 class=)
      3. Assert: output contains <h2 (or <h2 class=)
    Expected Result: MDX headings render as styled HTML heading tags
    Evidence: curl output captured

  Scenario: Code blocks have syntax highlighting
    Tool: Bash (curl)
    Preconditions: Dev server running, sample post with a code block
    Steps:
      1. curl -s http://localhost:3000/n/1
      2. Assert: output contains "data-sh-" or class names from sugar-high spans
      3. Assert: output contains <pre and <code tags
    Expected Result: Code blocks are syntax highlighted by sugar-high
    Evidence: curl output captured

  Scenario: External links open in new tab
    Tool: Bash (curl)
    Preconditions: Sample post contains an external link (https://...)
    Steps:
      1. curl -s http://localhost:3000/n/1
      2. grep 'target="_blank"' in output
      3. Assert: external links have target="_blank" and rel="noopener noreferrer"
    Expected Result: External links properly configured
    Evidence: grep output captured
  ```

  **Evidence to Capture:**
  - [ ] Rendered HTML snippet in `.sisyphus/evidence/task-4-mdx-render.txt`

  **Commit**: YES
  - Message: `feat: add MDX component overrides with sugar-high syntax highlighting`
  - Files: `src/components/mdx-components.tsx`, CSS files
  - Pre-commit: `bun run build`

---

- [x] 5. Build Projects Page

  **What to do**:
  - Create `src/routes/projects.tsx`:
    - Use `createFileRoute('/projects')`
    - Define a projects array (hardcoded TypeScript) with: `title`, `description` (one line), `url` (external link), `tags` (string array, optional)
    - Render as a simple list — each project is a row/card with title as link, description below
    - Include 3-5 real projects from the user's GitHub (kevmok): look at current `src/components/Projects.tsx` for project data
    - Style: minimal, zinc palette, subtle hover states with CSS transitions
  - Add SEO head for the projects page

  **Must NOT do**:
  - Don't add filtering, sorting, or search
  - Don't add project images or screenshots
  - Don't add categories or featured flags
  - Don't make it an MDX page — keep as TSX for simplicity

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: Page layout and component styling
  - **Skills**: [`frontend-ui-ux`]
    - `frontend-ui-ux`: Clean project list design, hover states, spacing
  - **Skills Evaluated but Omitted**:
    - `react-best-practices`: Simple static page, no performance concerns

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with Task 2)
  - **Blocks**: Task 7
  - **Blocked By**: Task 1

  **References**:

  **Pattern References**:
  - Current `src/components/Projects.tsx` at `/Users/kevin/code/src/github/kevmok/v1-kevmok/src/components/Projects.tsx` — Contains existing project data (titles, descriptions, links, images) to migrate. Extract the text content, discard the component structure.

  **External References**:
  - Leerob's site has no dedicated projects page — but similar minimalist project listings can be found on `https://leerob.com/` where he links to work inline

  **WHY Each Reference Matters**:
  - The existing Projects.tsx contains the actual project data (names, descriptions, URLs) that should be carried into the new site

  **Acceptance Criteria**:

  **Agent-Executed QA Scenarios:**

  ```
  Scenario: Projects page renders with project list
    Tool: Bash (curl)
    Preconditions: Dev server running
    Steps:
      1. curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/projects
      2. Assert: HTTP status is 200
      3. curl -s http://localhost:3000/projects | grep -c "<a"
      4. Assert: count >= 3 (at least 3 project links)
    Expected Result: Projects page loads with clickable project links
    Evidence: curl output captured
  ```

  **Evidence to Capture:**
  - [ ] Projects page HTML in `.sisyphus/evidence/task-5-projects.txt`

  **Commit**: YES
  - Message: `feat: add projects page`
  - Files: `src/routes/projects.tsx`
  - Pre-commit: `bun run build`

---

- [x] 6. Build Home Page (Bio + Recent Posts)

  **What to do**:
  - Update `src/routes/index.tsx`:
    - Short bio section: Name (Kevin Mok), one-line description, 2-3 sentences about what you do
    - "Recent posts" section: List last 3-5 blog posts with title + date, linking to `/n/{id}`
    - Load posts from Content Collections (import `allPosts`), filter out drafts, sort by date descending
    - Style: 60ch max-width, zinc text colors, clean spacing
    - Keep it very simple — bio paragraph + post list. That's it.
  - The home page is TSX (not MDX) since TanStack Start doesn't support MDX-as-routes

  **Must NOT do**:
  - Don't add a hero section or large heading
  - Don't add project cards on the home page
  - Don't add a photo/avatar
  - Don't add social links on the home page (they go in footer — Task 7)

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: The most visible page — bio layout and post listing design
  - **Skills**: [`frontend-ui-ux`]
    - `frontend-ui-ux`: Clean homepage layout, typography hierarchy, spacing
  - **Skills Evaluated but Omitted**:
    - `react-best-practices`: Simple static render from Content Collections data

  **Parallelization**:
  - **Can Run In Parallel**: NO (needs Task 2 and Task 3)
  - **Parallel Group**: Wave 3
  - **Blocks**: Task 7
  - **Blocked By**: Tasks 2, 3

  **References**:

  **Pattern References**:
  - Leerob's home page: `https://github.com/leerob/leerob.io/blob/a62191e15db86d564d98ebe00c308f607df1e338/app/page.mdx` — Shows the minimal bio + links pattern (though his is MDX, ours will be TSX)
  - Leerob's layout.tsx: `https://github.com/leerob/leerob.io/blob/a62191e15db86d564d98ebe00c308f607df1e338/app/layout.tsx` — `max-w-[60ch] mx-auto` layout pattern

  **External References**:
  - Content Collections docs: allPosts is auto-generated and can be imported from `content-collections`

  **WHY Each Reference Matters**:
  - Leerob's homepage shows the exact level of minimalism the user wants — short bio, some links
  - The layout pattern (60ch width, centered) should be applied here

  **Acceptance Criteria**:

  **Agent-Executed QA Scenarios:**

  ```
  Scenario: Home page renders with bio and post listing
    Tool: Bash (curl)
    Preconditions: Dev server running, sample posts exist
    Steps:
      1. curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/
      2. Assert: HTTP status is 200
      3. curl -s http://localhost:3000/ | grep -ci "kevin"
      4. Assert: count >= 1 (bio section contains name)
      5. curl -s http://localhost:3000/ | grep -c "/n/"
      6. Assert: count >= 1 (post links present)
    Expected Result: Home page shows bio and links to blog posts
    Evidence: curl output captured
  ```

  **Evidence to Capture:**
  - [ ] Home page HTML in `.sisyphus/evidence/task-6-home.txt`

  **Commit**: YES
  - Message: `feat: add home page with bio and recent posts`
  - Files: `src/routes/index.tsx`
  - Pre-commit: `bun run build`

---

- [x] 7. Build Navigation Header + Footer

  **What to do**:
  - Update `src/routes/__root.tsx` to include a persistent header and footer:
  - **Header**: 
    - Left: Name ("Kevin Mok") as a link to `/`
    - Right: "projects" and "github" as plain text links
    - Style: `flex justify-between items-center` within the `max-w-[60ch]` container
    - No hamburger menu, no mobile-specific nav changes — just inline links that wrap naturally
  - **Footer**:
    - Text-only social links: `github`, `x`, `linkedin` (linking to kevmok's profiles)
    - Style: `text-zinc-500 hover:text-zinc-300 transition-colors`
    - Small text, centered or left-aligned, with `flex gap-4`
  - Layout structure: header → main content (children) → footer, with `min-h-screen flex flex-col justify-between`

  **Must NOT do**:
  - Don't use icons — text links only (following leerob's pattern)
  - Don't add a mobile hamburger menu
  - Don't add breadcrumbs or active-state highlighting
  - Don't add a logo or avatar in the header

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: Navigation and footer are key visual elements that set the site's tone
  - **Skills**: [`frontend-ui-ux`]
    - `frontend-ui-ux`: Minimal nav design, social link styling, spacing
  - **Skills Evaluated but Omitted**:
    - `react-best-practices`: Simple layout components

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 4 (with Task 8)
  - **Blocks**: Task 9
  - **Blocked By**: Tasks 5, 6

  **References**:

  **Pattern References**:
  - Leerob's layout.tsx footer: `https://github.com/leerob/leerob.io/blob/a62191e15db86d564d98ebe00c308f607df1e338/app/layout.tsx` — Shows `flex flex-col justify-between min-h-screen` layout with footer social links as plain text
  - Current `src/components/Socials.tsx` at `/Users/kevin/code/src/github/kevmok/v1-kevmok/src/components/Socials.tsx` — Contains actual social URLs (GitHub, Twitter, LinkedIn) to carry over

  **WHY Each Reference Matters**:
  - Leerob's layout shows the exact minimal footer pattern with text links
  - The current Socials component has the actual profile URLs to use

  **Acceptance Criteria**:

  **Agent-Executed QA Scenarios:**

  ```
  Scenario: Header renders on all pages with navigation links
    Tool: Bash (curl)
    Preconditions: Dev server running
    Steps:
      1. curl -s http://localhost:3000/ | grep -ci "projects"
      2. Assert: count >= 1 (projects link in header)
      3. curl -s http://localhost:3000/projects | grep -ci "kevin"
      4. Assert: count >= 1 (name link in header)
      5. curl -s http://localhost:3000/n/1 | grep -ci "projects"
      6. Assert: count >= 1 (header present on blog pages too)
    Expected Result: Header with name and nav links appears on all pages
    Evidence: curl output captured

  Scenario: Footer renders with social links
    Tool: Bash (curl)
    Preconditions: Dev server running
    Steps:
      1. curl -s http://localhost:3000/ | grep -ci "github.com/kevmok"
      2. Assert: count >= 1 (GitHub link present)
      3. curl -s http://localhost:3000/ | grep -ci "linkedin"
      4. Assert: count >= 1 (LinkedIn link present)
    Expected Result: Footer shows text social links
    Evidence: curl output captured
  ```

  **Evidence to Capture:**
  - [ ] Header/footer HTML in `.sisyphus/evidence/task-7-nav-footer.txt`

  **Commit**: YES
  - Message: `feat: add minimal navigation header and social footer`
  - Files: `src/routes/__root.tsx`
  - Pre-commit: `bun run build`

---

- [x] 8. Global Styles: Dark Theme + Typography + Tailwind CSS 4

  **What to do**:
  - Install Tailwind CSS 4: `bun add -D tailwindcss @tailwindcss/vite`
  - Update `vite.config.ts` to add `tailwindcss()` plugin
  - Create `src/styles/app.css`:
    - Import Tailwind: `@import 'tailwindcss'`
    - Set Inter font as default sans: `@theme { --font-family-sans: 'Inter', sans-serif; }`
    - Set dark background: `bg-zinc-950` or similar near-black
    - Set base text color: `text-zinc-200`
    - Add sugar-high syntax highlighting CSS variables (from leerob's globals.css)
    - Add `text-wrap: balance` on headings
    - Add `text-rendering: optimizeLegibility` on body
  - Install Inter font: `bun add @fontsource/inter`
  - Import `@fontsource/inter` in the root route or CSS
  - Link the CSS file in `__root.tsx` via `head()` → `links`
  - Set `<html>` class to `dark` (or just hardcode dark colors without class strategy)
  - Ensure `max-w-[60ch] mx-auto` is applied to the main content area in `__root.tsx`

  **Must NOT do**:
  - Don't add a tailwind.config.ts — Tailwind 4 uses CSS-based configuration
  - Don't add theme toggle infrastructure
  - Don't add CSS custom properties for light/dark switching
  - Don't add complex color scales — stick to zinc/neutral

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: Core visual foundation — typography, colors, spacing
  - **Skills**: [`frontend-ui-ux`]
    - `frontend-ui-ux`: Dark theme design, typography system, spacing rhythm
  - **Skills Evaluated but Omitted**:
    - `color-theory`: The palette is already decided (zinc-based dark theme)

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 4 (with Task 7) — can technically run anytime after Task 1
  - **Blocks**: Task 9
  - **Blocked By**: Task 1

  **References**:

  **Pattern References**:
  - Leerob's `globals.css`: `https://github.com/leerob/leerob.io/blob/a62191e15db86d564d98ebe00c308f607df1e338/app/globals.css` — Dark theme colors, sugar-high CSS variables, typography settings (`text-wrap: balance`, `text-rendering: optimizeLegibility`)
  - Leerob's layout.tsx: Shows `dark:bg-zinc-950 bg-white` — but we only need the dark side

  **External References**:
  - Tailwind CSS 4 + Vite: `https://tailwindcss.com/docs/installation/vite` — official Vite plugin setup for v4
  - @fontsource/inter: `https://fontsource.org/fonts/inter` — self-hosted Inter font setup

  **WHY Each Reference Matters**:
  - Leerob's CSS is the literal design reference — same font, similar colors, same syntax highlighting palette
  - Tailwind 4 has a different setup than v3 (CSS-first config, no tailwind.config.ts)

  **Acceptance Criteria**:

  **Agent-Executed QA Scenarios:**

  ```
  Scenario: Tailwind CSS is loaded and styles are applied
    Tool: Bash (curl)
    Preconditions: Dev server running
    Steps:
      1. curl -s http://localhost:3000/ | grep -ci "tailwind\|zinc\|font-sans"
      2. Note: Tailwind utility classes may be compiled away; check for dark background in rendered HTML or check that CSS file is linked
      3. curl -s http://localhost:3000/ | grep -c "stylesheet"
      4. Assert: count >= 1 (CSS file is linked)
    Expected Result: Tailwind CSS is loaded, dark theme is visible
    Evidence: curl output captured

  Scenario: Build succeeds with Tailwind
    Tool: Bash
    Preconditions: Tailwind configured in vite.config.ts
    Steps:
      1. Run: bun run build
      2. Assert: exit code is 0
      3. Assert: no Tailwind-related errors
    Expected Result: Build completes with Tailwind integration
    Evidence: Build output captured
  ```

  **Evidence to Capture:**
  - [ ] Build output in `.sisyphus/evidence/task-8-build.txt`

  **Commit**: YES
  - Message: `feat: add Tailwind CSS 4 dark theme and typography`
  - Files: `src/styles/app.css`, `vite.config.ts`, `src/routes/__root.tsx`, `package.json`, `bun.lock`
  - Pre-commit: `bun run build`

---

- [x] 9. SEO Meta Tags + Sitemap Generation

  **What to do**:
  - Add `head()` function to each route for SEO meta tags:
    - Home (`/`): title "Kevin Mok", description "Developer and writer.", OG tags
    - Blog posts (`/n/$postId`): title from post frontmatter, description from post frontmatter
    - Projects (`/projects`): title "Projects | Kevin Mok", description
  - Create `src/routes/sitemap.xml.tsx` or equivalent:
    - Generate sitemap XML listing all routes: `/`, `/projects`, and all `/n/{id}` posts
    - Load post slugs from Content Collections
    - Return XML response with proper content-type
  - Add `<meta name="viewport">` and charset meta in root head if not already present
  - Add canonical URLs

  **Must NOT do**:
  - Don't add dynamic OG image generation
  - Don't add JSON-LD structured data
  - Don't add robots.txt (Vercel handles this)
  - Don't add RSS feed (out of scope for v1)

  **Recommended Agent Profile**:
  - **Category**: `unspecified-low`
    - Reason: Straightforward meta tag and XML generation — no complex logic
  - **Skills**: []
  - **Skills Evaluated but Omitted**:
    - `frontend-ui-ux`: No visual work in this task

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 5 (with Task 10)
  - **Blocks**: Task 11
  - **Blocked By**: Tasks 7, 8

  **References**:

  **Pattern References**:
  - Leerob's `sitemap.ts`: `https://github.com/leerob/leerob.io/blob/a62191e15db86d564d98ebe00c308f607df1e338/app/sitemap.ts` — Dynamic sitemap generation that auto-discovers posts from the filesystem. Adapt this pattern for Content Collections (import allPosts instead of reading filesystem).
  - Leerob's layout.tsx metadata: Shows title template, description, OG tags

  **External References**:
  - TanStack Start `head()`: `https://tanstack.com/start/latest/docs/framework/react/guide/document-head` — how to set meta tags per route
  - Sitemap protocol: `https://www.sitemaps.org/protocol.html` — XML sitemap format

  **WHY Each Reference Matters**:
  - Leerob's sitemap pattern shows how to auto-discover blog posts — adapt from filesystem reads to Content Collections imports
  - The TanStack Start head() docs show how meta tags work differently from Next.js metadata

  **Acceptance Criteria**:

  **Agent-Executed QA Scenarios:**

  ```
  Scenario: Home page has proper title and meta tags
    Tool: Bash (curl)
    Preconditions: Dev server running
    Steps:
      1. curl -s http://localhost:3000/ | grep -o '<title>[^<]*</title>'
      2. Assert: output contains "Kevin Mok"
      3. curl -s http://localhost:3000/ | grep 'meta.*description'
      4. Assert: meta description tag exists
    Expected Result: Home page has SEO title and description
    Evidence: curl output captured

  Scenario: Blog post has dynamic title from frontmatter
    Tool: Bash (curl)
    Preconditions: Dev server running, post 1.mdx has title in frontmatter
    Steps:
      1. curl -s http://localhost:3000/n/1 | grep -o '<title>[^<]*</title>'
      2. Assert: title contains the post's title (not generic "Kevin Mok")
    Expected Result: Blog posts have unique titles from frontmatter
    Evidence: curl output captured

  Scenario: Sitemap XML is generated and accessible
    Tool: Bash (curl)
    Preconditions: Dev server running
    Steps:
      1. curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/sitemap.xml
      2. Assert: HTTP status is 200
      3. curl -s http://localhost:3000/sitemap.xml | grep -c "<url>"
      4. Assert: count >= 3 (home + projects + at least 1 post)
    Expected Result: Sitemap lists all pages
    Evidence: Sitemap XML content captured
  ```

  **Evidence to Capture:**
  - [ ] Meta tags in `.sisyphus/evidence/task-9-meta.txt`
  - [ ] Sitemap XML in `.sisyphus/evidence/task-9-sitemap.xml`

  **Commit**: YES
  - Message: `feat: add SEO meta tags and sitemap generation`
  - Files: Route files (updated head()), sitemap route
  - Pre-commit: `bun run build`

---

- [x] 10. Update CI Pipeline + Gitignore + Biome Config

  **What to do**:
  - Update `.github/workflows/build.yml`:
    - Keep bun setup
    - Change build command from `bun run build` (Next.js) to `bun run build` (TanStack Start — same command but different underlying framework)
    - Verify it references correct Node/Bun versions
  - Update `.gitignore`:
    - Remove Next.js entries: `.next/`, `next-env.d.ts`
    - Add TanStack/Vite entries: `.vinxi/`, `dist/`, `.output/`
    - Add Content Collections: `.content-collections/`
    - Keep: `node_modules/`, `.env*`, etc.
  - Setup Biome for linting/formatting:
    - Install if not present: `bun add -D @biomejs/biome`
    - Create `biome.json` with reasonable defaults (or reuse existing config if it was preserved)
    - Add `lint` and `format` scripts to package.json
  - Clean up any stale config files that may have been missed in Task 1

  **Must NOT do**:
  - Don't add deployment steps to CI (Vercel handles this via GitHub integration)
  - Don't add ESLint or Prettier — Biome only
  - Don't add test steps (no tests in this project)

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Small config file updates — straightforward
  - **Skills**: []
  - **Skills Evaluated but Omitted**:
    - `git-master`: No complex git operations needed

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 5 (with Task 9) — can actually run anytime after Task 1
  - **Blocks**: Task 11
  - **Blocked By**: Task 1

  **References**:

  **Pattern References**:
  - Current `.github/workflows/build.yml` at `/Users/kevin/code/src/github/kevmok/v1-kevmok/.github/workflows/build.yml` — Existing CI workflow to update
  - Current `.gitignore` at `/Users/kevin/code/src/github/kevmok/v1-kevmok/.gitignore` — Existing gitignore to update

  **External References**:
  - Biome docs: `https://biomejs.dev/guides/getting-started/` — setup guide
  - TanStack Start deployment: verify what directories need to be gitignored

  **WHY Each Reference Matters**:
  - The existing CI and gitignore files need targeted updates, not full rewrites

  **Acceptance Criteria**:

  **Agent-Executed QA Scenarios:**

  ```
  Scenario: CI config references correct build command
    Tool: Bash
    Preconditions: None
    Steps:
      1. grep "bun run build" .github/workflows/build.yml
      2. Assert: build command exists in workflow
      3. Assert: no "next" references in workflow
    Expected Result: CI workflow uses correct build commands
    Evidence: grep output captured

  Scenario: Gitignore covers new framework artifacts
    Tool: Bash
    Preconditions: None
    Steps:
      1. grep ".content-collections" .gitignore
      2. Assert: .content-collections/ is gitignored
      3. grep -c ".next" .gitignore
      4. Assert: count is 0 (Next.js entries removed)
    Expected Result: Gitignore properly configured for new stack
    Evidence: grep output captured

  Scenario: Biome lint runs without errors
    Tool: Bash
    Preconditions: Biome configured
    Steps:
      1. Run: bunx biome check .
      2. Assert: exits without critical errors
    Expected Result: Linting passes
    Evidence: Lint output captured
  ```

  **Evidence to Capture:**
  - [ ] CI config in `.sisyphus/evidence/task-10-ci.txt`
  - [ ] Lint output in `.sisyphus/evidence/task-10-lint.txt`

  **Commit**: YES
  - Message: `chore: update CI, gitignore, and Biome config for TanStack Start`
  - Files: `.github/workflows/build.yml`, `.gitignore`, `biome.json`, `package.json`
  - Pre-commit: `bun run build`

---

- [x] 11. Final Build Verification + Visual QA

  **What to do**:
  - Run full build: `bun run build` — must exit 0
  - Start dev server and verify ALL routes respond with HTTP 200
  - Run Playwright visual QA:
    - Screenshot home page
    - Screenshot a blog post with code blocks
    - Screenshot projects page
    - Verify dark theme is applied (dark background, light text)
    - Verify navigation appears on all pages
    - Verify footer with social links appears on all pages
  - Verify sitemap.xml contains all expected URLs
  - Verify no console errors in browser
  - Create a second sample blog post (`content/posts/2.mdx`) if not already done, to verify the listing works with multiple posts

  **Must NOT do**:
  - Don't fix styling issues — only report them as evidence
  - Don't add new features
  - Don't deploy (user will handle this)

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: Visual QA requires understanding design intent and capturing meaningful evidence
  - **Skills**: [`playwright`, `frontend-ui-ux`]
    - `playwright`: Browser automation for screenshots and DOM assertions
    - `frontend-ui-ux`: Understanding design expectations to validate visual output
  - **Skills Evaluated but Omitted**:
    - `dev-browser`: playwright skill is sufficient for this task

  **Parallelization**:
  - **Can Run In Parallel**: NO
  - **Parallel Group**: Sequential (must be last)
  - **Blocks**: None (final task)
  - **Blocked By**: ALL previous tasks

  **References**:

  **Pattern References**:
  - All routes created in Tasks 3, 5, 6, 7 — verify they all work together
  - Leerob.com live site: `https://leerob.com/` — visual comparison reference for the expected aesthetic

  **WHY Each Reference Matters**:
  - This task validates the entire site works end-to-end
  - Leerob's live site is the visual benchmark

  **Acceptance Criteria**:

  **Agent-Executed QA Scenarios:**

  ```
  Scenario: Full build succeeds
    Tool: Bash
    Preconditions: All previous tasks completed
    Steps:
      1. Run: bun run build
      2. Assert: exit code is 0
      3. Assert: no errors in output
    Expected Result: Production build succeeds
    Evidence: Build output in .sisyphus/evidence/task-11-build.txt

  Scenario: All routes return HTTP 200
    Tool: Bash (curl)
    Preconditions: Dev server running
    Steps:
      1. curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/
      2. Assert: 200
      3. curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/n/1
      4. Assert: 200
      5. curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/projects
      6. Assert: 200
      7. curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/sitemap.xml
      8. Assert: 200
    Expected Result: All routes accessible
    Evidence: Status codes captured

  Scenario: Visual QA - Home page
    Tool: Playwright (playwright skill)
    Preconditions: Dev server running
    Steps:
      1. Navigate to: http://localhost:3000/
      2. Wait for page load (timeout: 10s)
      3. Assert: page has dark background (background-color is near-black)
      4. Assert: text "Kevin Mok" is visible
      5. Assert: navigation links visible
      6. Assert: footer with social links visible
      7. Screenshot: .sisyphus/evidence/task-11-home.png
    Expected Result: Home page matches minimalist dark design intent
    Evidence: .sisyphus/evidence/task-11-home.png

  Scenario: Visual QA - Blog post with code
    Tool: Playwright (playwright skill)
    Preconditions: Dev server running, post 1.mdx has a code block
    Steps:
      1. Navigate to: http://localhost:3000/n/1
      2. Wait for page load (timeout: 10s)
      3. Assert: article content is visible
      4. Assert: code block has syntax highlighting (colored spans)
      5. Assert: max-width constraint is visible (content doesn't span full viewport)
      6. Screenshot: .sisyphus/evidence/task-11-blog-post.png
    Expected Result: Blog post renders with styled MDX and syntax highlighting
    Evidence: .sisyphus/evidence/task-11-blog-post.png

  Scenario: Visual QA - Projects page
    Tool: Playwright (playwright skill)
    Preconditions: Dev server running
    Steps:
      1. Navigate to: http://localhost:3000/projects
      2. Wait for page load (timeout: 10s)
      3. Assert: project list items visible
      4. Assert: links are clickable
      5. Screenshot: .sisyphus/evidence/task-11-projects.png
    Expected Result: Projects page shows clean project listing
    Evidence: .sisyphus/evidence/task-11-projects.png

  Scenario: No console errors
    Tool: Playwright (playwright skill)
    Preconditions: Dev server running
    Steps:
      1. Open browser console listener
      2. Navigate through: /, /n/1, /projects
      3. Collect all console.error messages
      4. Assert: zero console errors
    Expected Result: No JavaScript errors on any page
    Evidence: Console log captured in .sisyphus/evidence/task-11-console.txt
  ```

  **Evidence to Capture:**
  - [ ] Build output in `.sisyphus/evidence/task-11-build.txt`
  - [ ] Home screenshot in `.sisyphus/evidence/task-11-home.png`
  - [ ] Blog post screenshot in `.sisyphus/evidence/task-11-blog-post.png`
  - [ ] Projects screenshot in `.sisyphus/evidence/task-11-projects.png`
  - [ ] Console log in `.sisyphus/evidence/task-11-console.txt`

  **Commit**: YES
  - Message: `feat: add second sample post and finalize site`
  - Files: `content/posts/2.mdx` (if created)
  - Pre-commit: `bun run build`

---

## Commit Strategy

| After Task | Message | Key Files | Verification |
|------------|---------|-----------|--------------|
| 1 | `feat: scaffold TanStack Start project (replace Next.js)` | package.json, vite.config.ts, src/routes/* | `bun run build` |
| 2 | `feat: add Content Collections MDX pipeline` | content-collections.ts, content/posts/1.mdx | `bun run build` |
| 3 | `feat: add blog post route /n/$postId with MDX rendering` | src/routes/n/$postId.tsx | `bun run build` |
| 4 | `feat: add MDX component overrides with sugar-high syntax highlighting` | src/components/mdx-components.tsx | `bun run build` |
| 5 | `feat: add projects page` | src/routes/projects.tsx | `bun run build` |
| 6 | `feat: add home page with bio and recent posts` | src/routes/index.tsx | `bun run build` |
| 7 | `feat: add minimal navigation header and social footer` | src/routes/__root.tsx | `bun run build` |
| 8 | `feat: add Tailwind CSS 4 dark theme and typography` | src/styles/app.css, vite.config.ts | `bun run build` |
| 9 | `feat: add SEO meta tags and sitemap generation` | Route files, sitemap route | `bun run build` |
| 10 | `chore: update CI, gitignore, and Biome config for TanStack Start` | .github/workflows/build.yml, .gitignore, biome.json | `bun run build` |
| 11 | `feat: add second sample post and finalize site` | content/posts/2.mdx | `bun run build` |

---

## Success Criteria

### Verification Commands
```bash
# Full build
bun run build
# Expected: exit code 0, no errors

# Dev server
bun run dev &
sleep 5

# All routes respond
curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/        # Expected: 200
curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/n/1     # Expected: 200
curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/projects # Expected: 200
curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/n/999   # Expected: 404

# SEO
curl -s http://localhost:3000/ | grep '<title>'           # Expected: contains "Kevin Mok"
curl -s http://localhost:3000/n/1 | grep '<title>'        # Expected: contains post title
curl -s http://localhost:3000/sitemap.xml | grep '<url>'  # Expected: 3+ URLs

# Content renders
curl -s http://localhost:3000/n/1 | grep '<article'       # Expected: MDX in article tag
curl -s http://localhost:3000/ | grep '/n/'                # Expected: post links on home

# No old code
test ! -d src/app && echo "PASS: no src/app"
test ! -f next.config.js && echo "PASS: no next.config.js"
grep -c '"next"' package.json | grep "^0$"                # Expected: 0 (no next dependency)
```

### Final Checklist
- [x] All "Must Have" present (TanStack Start, Content Collections, dark theme, 60ch width, Inter, sugar-high, nav, footer, sitemap, SEO)
- [x] All "Must NOT Have" absent (no shadcn, no Framer Motion, no theme toggle, no analytics, no image pipeline)
- [x] Build passes (`bun run build` → exit 0)
- [x] All 3 pages render (home, blog post, projects)
- [x] Blog post 404 works for non-existent posts
- [x] Sitemap generated with all routes
- [x] CI pipeline updated
- [x] Gitignore updated
- [x] Biome configured
