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
			title: post?.title ?? 'Post Not Found',
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
					content: `https://kevmok.com/n/${post?._meta.path}`,
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
