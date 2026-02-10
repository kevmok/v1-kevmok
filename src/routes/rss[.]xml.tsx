import { createFileRoute } from '@tanstack/react-router';
import { allPosts } from 'content-collections';

const SITE_URL = 'https://kevmok.com';

export const Route = createFileRoute('/rss.xml')({
	server: {
		handlers: {
			GET: async () => {
				const posts = allPosts
					.filter(post => !post.draft)
					.sort(
						(a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
					);

				const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
	<channel>
		<title>Kevin Mok</title>
		<link>${SITE_URL}</link>
		<description>Developer relations engineer. Building with AI, writing code, shipping side projects.</description>
		<language>en-us</language>
		<atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml" />
		${posts
			.map(
				post => `<item>
			<title>${escapeXml(post.title)}</title>
			<link>${SITE_URL}/n/${post._meta.path}</link>
			<guid isPermaLink="true">${SITE_URL}/n/${post._meta.path}</guid>
			<pubDate>${new Date(post.date).toUTCString()}</pubDate>
			${
				post.description
					? `<description>${escapeXml(post.description)}</description>`
					: ''
			}
		</item>`,
			)
			.join('\n')}
	</channel>
</rss>`;

				return new Response(rss, {
					headers: {
						'Content-Type': 'application/xml',
					},
				});
			},
		},
	},
});

function escapeXml(str: string): string {
	return str
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&apos;');
}
