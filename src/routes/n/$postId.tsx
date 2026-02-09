import { mdxComponents } from '@/components/mdx-components';
import { MDXContent } from '@content-collections/mdx/react';
import { createFileRoute, notFound } from '@tanstack/react-router';
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
			],
		};
	},
});

function PostComponent() {
	const { post } = Route.useLoaderData();

	return (
		<article className="max-w-none">
			<MDXContent code={post.mdx} components={mdxComponents} />
		</article>
	);
}
