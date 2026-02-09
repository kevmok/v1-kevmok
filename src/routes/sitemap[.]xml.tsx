import { createFileRoute } from '@tanstack/react-router';
import { allPosts } from 'content-collections';

const SITE_URL = 'https://kevmok.com';

export const Route = createFileRoute('/sitemap.xml')({
	loader: async () => {
		const routes = [
			{ url: `${SITE_URL}/`, lastModified: new Date().toISOString() },
			{ url: `${SITE_URL}/projects`, lastModified: new Date().toISOString() },
		];

		const posts = allPosts
			.filter(post => !post.draft)
			.map(post => ({
				url: `${SITE_URL}/n/${post._meta.path}`,
				lastModified: new Date(post.date).toISOString(),
			}));

		return { routes: [...routes, ...posts] };
	},
	component: SitemapComponent,
});

function SitemapComponent() {
	const { routes } = Route.useLoaderData();

	const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
	.map(
		route => `	<url>
		<loc>${route.url}</loc>
		<lastmod>${route.lastModified}</lastmod>
	</url>`,
	)
	.join('\n')}
</urlset>`;

	return <pre className="whitespace-pre-wrap font-mono text-sm">{sitemap}</pre>;
}
