# Site Revamp - Learnings

## Date: 2026-02-09

### Technical Learnings

#### TanStack Start + Content Collections Integration
- Content Collections Vite plugin must be FIRST in the plugins array
- MDX compilation happens at build time via `compileMDX()`
- `allPosts` is auto-generated and can be imported from `content-collections`
- Route loaders can access Content Collections data synchronously

#### Tailwind CSS 4 Migration
- Tailwind 4 uses `@import 'tailwindcss'` in CSS instead of JS config
- Vite plugin: `@tailwindcss/vite` - import and add to plugins array
- CSS-first configuration: use `@theme` blocks in CSS
- No `tailwind.config.ts` needed

#### MDX Component Overrides
- Use `@content-collections/mdx/react` `MDXContent` component
- Pass custom components via `components` prop
- sugar-high for syntax highlighting: `highlight(code)` returns HTML string
- CSS variables required for sugar-high token colors

#### SEO Meta Tags in TanStack Start
- Use `head()` function in route definition
- Must include `HeadContent` component in root route to render meta tags
- Use `charSet` (camelCase) not `charset` to avoid React warnings
- Meta tags from child routes merge with parent route

#### File-Based Routing
- `src/routes/__root.tsx` = root layout
- `src/routes/index.tsx` = `/`
- `src/routes/n/$postId.tsx` = `/n/:postId`
- `src/routes/sitemap[.]xml.tsx` = `/sitemap.xml`

### Build & CI

#### Bun + TanStack Start
- Bun works well as package manager and runtime
- GitHub Actions with `oven-sh/setup-bun@v1`
- Build command: `bun run build` (runs `vite build && tsc --noEmit`)

#### Biome Configuration
- Biome handles both linting and formatting
- Pre-commit hooks via husky + lint-staged
- Ignore generated files: `src/routeTree.gen.ts`

### Design Decisions

#### Dark Theme (No Light Mode)
- Hardcoded zinc palette (zinc-900/950 backgrounds, zinc-200/300 text)
- No ThemeProvider or next-themes
- No CSS custom properties for theme switching

#### Typography
- 60ch max-width for reading content
- `text-wrap: balance` for headings
- `text-rendering: optimizeLegibility`
- System Inter font via @fontsource/inter

#### Navigation Pattern
- Minimal header: name (left) + links (right)
- Text-only social links in footer
- No hamburger menu, no icons
- CSS transitions for hover states

### Gotchas

1. **Content Collections deprecation warning**: Implicit content property deprecated, but still works
2. **Meta tag rendering**: HeadContent component REQUIRED in root route
3. **TanStack Start file routing**: Dynamic segments use `$param` syntax
4. **Build output**: SSR + client bundles, server.js entry point

### What Worked Well

- TanStack Start file-based routing is intuitive
- Content Collections + MDX is powerful for blog content
- Tailwind 4 CSS-first config is cleaner
- sugar-high syntax highlighting is lightweight
- Biome is fast and replaces ESLint + Prettier

### What's Left for Future

- [ ] Vercel deployment (requires user credentials)
- [ ] RSS feed generation
- [ ] OG image generation
- [ ] Second sample blog post
- [ ] Custom accent color refinement
- [ ] @fontsource/inter integration (currently using system fonts)
