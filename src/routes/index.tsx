import { Link, createFileRoute } from '@tanstack/react-router';
import { allPosts } from 'content-collections';

export const Route = createFileRoute('/')({
	component: HomeComponent,
	loader: async () => {
		const posts = allPosts
			.filter(post => !post.draft)
			.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
			.slice(0, 6);

		return { posts };
	},
	head: () => ({
		title: 'Kevin Mok',
		meta: [
			{
				name: 'description',
				content:
					'Developer relations engineer writing about AI tools, demos, developer experience, and useful software.',
			},
			{ property: 'og:title', content: 'Kevin Mok' },
			{
				property: 'og:description',
				content:
					'Developer relations engineer writing about AI tools, demos, developer experience, and useful software.',
			},
			{ property: 'og:type', content: 'website' },
			{ property: 'og:url', content: 'https://kevinmok.com' },
			{ name: 'twitter:card', content: 'summary' },
			{ name: 'twitter:title', content: 'Kevin Mok' },
			{
				name: 'twitter:description',
				content:
					'Developer relations engineer writing about AI tools, demos, developer experience, and useful software.',
			},
		],
	}),
});

function HomeComponent() {
	const { posts } = Route.useLoaderData();

	return (
		<div>
			<h1 className="page-title">Kevin Mok</h1>

			<div className="prose-block">
				<p>
					I work in developer relations, helping developers build with{' '}
					<a href="https://www.moveworks.com/" target="_blank" rel="noreferrer">
						AI tools
					</a>
					. I care about demos that teach, docs people actually read, and
					software that earns trust through use.
				</p>
				<p>
					My path here moved through software engineering and customer success,
					which taught me that useful products come from understanding the
					people who use them. I write about{' '}
					<Link to="/writing">developer experience</Link>, agents, side
					projects, and making complex ideas understandable.
				</p>
			</div>

			<section aria-labelledby="favorite-writing">
				<h2 id="favorite-writing" className="section-label">
					Favorite writing
				</h2>
				<ul className="writing-list">
					{posts.length > 0 ? (
						posts.map(post => (
							<li key={post._meta.path}>
								<Link to="/n/$postId" params={{ postId: post._meta.path }}>
									{post.title}
								</Link>
							</li>
						))
					) : (
						<>
							<li>Building demos that teach</li>
							<li>LLMs are interfaces, not magic</li>
							<li>Writing docs people actually read</li>
						</>
					)}
				</ul>
			</section>

			<p className="inline-nav-sentence">
				Read <Link to="/writing">writing</Link>, browse{' '}
				<a href="https://github.com/kevmok" target="_blank" rel="noreferrer">
					code
				</a>
				, see <Link to="/projects">projects</Link>, or{' '}
				<a href="mailto:hi@kevinmok.com">reach out</a>.
			</p>
		</div>
	);
}
