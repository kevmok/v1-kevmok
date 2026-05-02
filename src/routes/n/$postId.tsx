import { mdxComponents } from '@/components/mdx-components';
import { MDXContent } from '@content-collections/mdx/react';
import { Link, createFileRoute, notFound } from '@tanstack/react-router';
import { allPosts } from 'content-collections';

export const Route = createFileRoute('/n/$postId')({
	component: PostComponent,
	loader: async ({ params }) => {
		const post = allPosts.find(p => p._meta.path === params.postId);

		if (!post || post.draft) {
			throw notFound();
		}

		return { post };
	},
	head: ({ loaderData }) => {
		const post = loaderData?.post;
		return {
			title: post?.title ? `${post.title} | Kevin Mok` : 'Post Not Found',
			meta: [
				{
					name: 'description',
					content: post?.description ?? '',
				},
				{ property: 'og:title', content: post?.title ?? 'Post Not Found' },
				{ property: 'og:description', content: post?.description ?? '' },
				{ property: 'og:type', content: 'article' },
				{
					property: 'og:url',
					content: `https://kevinmok.com/n/${post?._meta.path}`,
				},
				{ name: 'twitter:card', content: 'summary' },
				{ name: 'twitter:title', content: post?.title ?? '' },
				{ name: 'twitter:description', content: post?.description ?? '' },
			],
		};
	},
});

function PostComponent() {
	const { post } = Route.useLoaderData();

	return (
		<article className="article-shell">
			<header>
				<Link to="/writing" className="article-back">
					Back to writing
				</Link>
				<h1 className="article-title">{post.title}</h1>
				<div className="article-meta">
					<span>By Kevin Mok</span>
					<span aria-hidden="true">·</span>
					<time dateTime={post.date}>{formatDate(post.date)}</time>
				</div>
				{post.tags && post.tags.length > 0 && (
					<div className="article-tags">
						{post.tags.map((tag, index) => (
							<span key={tag}>
								{index > 0 ? ' / ' : ''}
								{tag}
							</span>
						))}
					</div>
				)}
			</header>

			<div className="article-prose">
				<MDXContent code={post.mdx} components={mdxComponents} />
			</div>
		</article>
	);
}

function formatDate(date: string) {
	return new Date(date).toLocaleDateString('en-US', {
		month: 'long',
		day: 'numeric',
		year: 'numeric',
	});
}
