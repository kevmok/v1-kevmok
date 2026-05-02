import { Link, createFileRoute } from '@tanstack/react-router';
import { allPosts } from 'content-collections';

export const Route = createFileRoute('/writing')({
	component: WritingComponent,
	loader: async () => {
		const posts = allPosts
			.filter(post => !post.draft)
			.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

		const postsByYear = posts.reduce<Record<string, typeof posts>>(
			(groups, post) => {
				const year = new Date(post.date).getFullYear().toString();
				groups[year] ??= [];
				groups[year].push(post);
				return groups;
			},
			{},
		);

		return { postsByYear };
	},
	head: () => ({
		title: 'Writing | Kevin Mok',
		meta: [
			{
				name: 'description',
				content:
					'Essays and notes by Kevin Mok on AI, developer relations, demos, and building useful software.',
			},
			{ property: 'og:title', content: 'Writing | Kevin Mok' },
			{
				property: 'og:description',
				content:
					'Essays and notes by Kevin Mok on AI, developer relations, demos, and building useful software.',
			},
			{ property: 'og:type', content: 'website' },
			{ property: 'og:url', content: 'https://kevinmok.com/writing' },
			{ name: 'twitter:card', content: 'summary' },
			{ name: 'twitter:title', content: 'Writing | Kevin Mok' },
			{
				name: 'twitter:description',
				content:
					'Essays and notes by Kevin Mok on AI, developer relations, demos, and building useful software.',
			},
		],
	}),
});

function WritingComponent() {
	const { postsByYear } = Route.useLoaderData();
	const years = Object.keys(postsByYear).sort((a, b) => Number(b) - Number(a));

	return (
		<div>
			<h1 className="archive-page-title">Writing</h1>
			<p className="archive-intro">
				Essays and notes on building, learning, AI tools, developer experience,
				and the quiet details that make ideas useful.
			</p>

			{years.length > 0 ? (
				years.map(year => (
					<section
						key={year}
						className="archive-year"
						aria-labelledby={`year-${year}`}
					>
						<h2 id={`year-${year}`}>{year}</h2>
						<div>
							{postsByYear[year]?.map(post => (
								<article key={post._meta.path} className="archive-row">
									<time className="archive-date" dateTime={post.date}>
										{formatDate(post.date)}
									</time>
									<div>
										<Link
											to="/n/$postId"
											params={{ postId: post._meta.path }}
											className="archive-title"
										>
											{post.title}
										</Link>
										{post.description && (
											<p className="archive-summary">{post.description}</p>
										)}
									</div>
									<span className="archive-tag">
										{post.tags?.[0] ?? 'notes'}
									</span>
								</article>
							))}
						</div>
					</section>
				))
			) : (
				<section className="archive-year">
					<h2>Drafts</h2>
					<article className="archive-row">
						<span className="archive-date">Soon</span>
						<div>
							<span className="archive-title">Building demos that teach</span>
							<p className="archive-summary">
								Notes on making technical examples useful instead of flashy.
							</p>
						</div>
						<span className="archive-tag">demos</span>
					</article>
				</section>
			)}
		</div>
	);
}

function formatDate(date: string) {
	return new Date(date).toLocaleDateString('en-US', {
		month: 'short',
		day: 'numeric',
		year: 'numeric',
	});
}
