import { Link, createFileRoute } from '@tanstack/react-router';
import { allPosts } from 'content-collections';

export const Route = createFileRoute('/')({
	component: HomeComponent,
	loader: async () => {
		const posts = allPosts
			.filter(post => !post.draft)
			.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
			.slice(0, 5);

		return { posts };
	},
	head: () => ({
		title: 'Kevin Mok',
		meta: [
			{
				name: 'description',
				content:
					'Developer relations engineer at Moveworks. Building with AI, writing code, shipping side projects.',
			},
		],
	}),
});

function HomeComponent() {
	const { posts } = Route.useLoaderData();

	return (
		<div className="space-y-12">
			<section className="space-y-4">
				<h1 className="text-3xl font-bold">Kevin Mok</h1>
				<p className="text-zinc-300 leading-relaxed">
					I'm a developer relations engineer at Moveworks helping developers
					build with AI. My path here went through software engineering and
					customer success, which taught me that the best tools come from deeply
					understanding the people who use them. I still love writing code and
					shipping side projects.
				</p>
			</section>

			<section className="space-y-4">
				<h2 className="text-xl font-medium">Recent Posts</h2>
				<div className="space-y-3">
					{posts.length > 0 ? (
						posts.map(post => (
							<div key={post._meta.path} className="group">
								<a href={`/n/${post._meta.path}`} className="block">
									<div className="flex items-baseline justify-between">
										<span className="text-blue-400 group-hover:text-blue-300 transition-colors">
											{post.title}
										</span>
										<span className="text-sm text-zinc-500">
											{new Date(post.date).toLocaleDateString('en-US', {
												year: 'numeric',
												month: 'short',
												day: 'numeric',
											})}
										</span>
									</div>
									{post.description && (
										<p className="text-sm text-zinc-400 mt-1">
											{post.description}
										</p>
									)}
								</a>
							</div>
						))
					) : (
						<p className="text-zinc-500">No posts yet. Check back soon!</p>
					)}
				</div>
			</section>
		</div>
	);
}
