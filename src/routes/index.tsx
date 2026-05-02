import { Link, createFileRoute } from '@tanstack/react-router';
import { allPosts } from 'content-collections';

const editorialLink =
	'text-[var(--link)] underline decoration-[1px] underline-offset-[2px] transition-colors duration-150 hover:text-[var(--link-hover)]';

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
			<h1 className="m-0 font-[var(--font-serif)] text-[clamp(56px,8vw,84px)] leading-[0.95] font-normal tracking-[-0.055em] text-[var(--text)] text-balance">
				Kevin Mok
			</h1>

			<div className="mt-[30px] max-w-[650px] space-y-4 font-[var(--font-serif)] text-[18px] leading-[1.58] text-[var(--text)]">
				<p className="m-0 text-pretty">
					I help developers build with{' '}
					<a
						href="https://nousresearch.com/"
						className={editorialLink}
						target="_blank"
						rel="noopener noreferrer"
					>
						AI tools
					</a>
					. Most of my work sits between product, code, demos, and writing.
				</p>
				<p className="m-0 text-pretty">
					I care about clear explanations, useful systems, and the small details
					that make software feel trustworthy.
				</p>
			</div>

			<section aria-labelledby="favorite-writing">
				<h2
					id="favorite-writing"
					className="mt-[54px] mb-[18px] font-[var(--font-sans)] text-[11px] font-[650] tracking-[0.08em] text-[var(--muted)] uppercase"
				>
					Favorite writing
				</h2>
				<ul className="m-0 list-disc pl-[21px] font-[var(--font-serif)] text-[18px] leading-[1.72] marker:text-[#a9a19b]">
					{posts.length > 0 ? (
						posts.map(post => (
							<li key={post._meta.path}>
								<Link
									to="/n/$postId"
									params={{ postId: post._meta.path }}
									className={editorialLink}
								>
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

			<p className="mt-[34px] font-[var(--font-serif)] text-[18px] leading-[1.6] text-[var(--text)]">
				Read{' '}
				<Link to="/writing" className={editorialLink}>
					writing
				</Link>
				, browse{' '}
				<a
					href="https://github.com/kevmok"
					target="_blank"
					rel="noreferrer"
					className={editorialLink}
				>
					code
				</a>
				, see{' '}
				<Link to="/projects" className={editorialLink}>
					projects
				</Link>
				, or{' '}
				<a href="mailto:hi@kevinmok.com" className={editorialLink}>
					reach out
				</a>
				.
			</p>
		</div>
	);
}
