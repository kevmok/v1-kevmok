import { createFileRoute } from '@tanstack/react-router';

const projects = [
	{
		title: 'Discord Stock Analyst Broadcaster',
		description:
			'Discord bot for analysts to broadcast plays across multiple servers and reach 5,000 users.',
		url: 'https://github.com/kevmok/discordjs-typescript-template',
		tags: ['TypeScript', 'Discord.js', 'MongoDB'],
	},
	{
		title: 'ElysiaJS API Starter',
		description:
			'A Bun, Elysia, Drizzle, and Zod starter for small REST APIs that need a clean first commit.',
		url: 'https://github.com/kevmok/elysiajs-api-starter',
		tags: ['TypeScript', 'ElysiaJS', 'Drizzle'],
	},
	{
		title: 'Discord TypeScript Bot Template',
		description:
			'TypeScript Discord bot template with slash commands, rate limits, permissions, and database patterns.',
		url: 'https://github.com/kevmok/discordjs-typescript-template',
		tags: ['TypeScript', 'Discord.js', 'PostgreSQL'],
	},
	{
		title: 'Langchain CLI Companion',
		description:
			'Command-line experiments for exploring prompts, retrieval, and AI workflows from a terminal.',
		url: 'https://github.com/kevmok/node-langchain-prompt',
		tags: ['TypeScript', 'LangChain', 'AI'],
	},
];

export const Route = createFileRoute('/projects')({
	component: ProjectsComponent,
	head: () => ({
		title: 'Projects | Kevin Mok',
		meta: [
			{
				name: 'description',
				content: 'Selected projects by Kevin Mok.',
			},
			{ property: 'og:title', content: 'Projects | Kevin Mok' },
			{
				property: 'og:description',
				content: 'Selected projects by Kevin Mok.',
			},
			{ property: 'og:type', content: 'website' },
			{ property: 'og:url', content: 'https://kevinmok.com/projects' },
			{ name: 'twitter:card', content: 'summary' },
			{ name: 'twitter:title', content: 'Projects | Kevin Mok' },
			{
				name: 'twitter:description',
				content: 'Selected projects by Kevin Mok.',
			},
		],
	}),
});

function ProjectsComponent() {
	return (
		<div>
			<h1 className="archive-page-title">Projects</h1>
			<p className="archive-intro">
				Small tools, templates, and experiments. Most of these exist because I
				wanted a useful starting point, a clearer demo, or a faster way to
				learn.
			</p>

			<section
				className="archive-year projects-list"
				aria-label="Selected projects"
			>
				<div>
					{projects.map(project => (
						<article key={project.title} className="archive-row">
							<div>
								<a
									href={project.url}
									target="_blank"
									rel="noopener noreferrer"
									className="archive-title"
								>
									{project.title}
								</a>
								<p className="archive-summary">{project.description}</p>
							</div>
							<span className="archive-tag">{project.tags.join(' / ')}</span>
						</article>
					))}
				</div>
			</section>

			<p className="inline-nav-sentence">
				More experiments live on{' '}
				<a href="https://github.com/kevmok" target="_blank" rel="noreferrer">
					GitHub
				</a>
				.
			</p>
		</div>
	);
}
