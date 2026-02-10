import { createFileRoute } from '@tanstack/react-router';

const projects = [
	{
		title: 'Discord Stock Analyst Broadcaster',
		description:
			'Discord bot for stock analysts to broadcast plays across multiple servers, reaching 5000 users.',
		url: 'https://github.com/kevmok/discordjs-typescript-template',
		tags: ['TypeScript', 'Discord.js', 'MongoDB'],
	},
	{
		title: 'ElysiaJS API Starter',
		description:
			'Ready-to-go template for kickstarting Bun REST API projects with ElysiaJS & Drizzle ORM.',
		url: 'https://github.com/kevmok/elysiajs-api-starter',
		tags: ['TypeScript', 'Drizzle ORM', 'ElysiaJS', 'Zod', 'SQLite'],
	},
	{
		title: 'Discord TypeScript Bot Template',
		description:
			'TypeScript Discord bot with Drizzle ORM and Zod, managing slash commands, rate limits, and permissions.',
		url: 'https://github.com/kevmok/discordjs-typescript-template',
		tags: ['TypeScript', 'Drizzle ORM', 'Zod', 'Discord.js', 'PostgreSQL'],
	},
	{
		title: 'Langchain CLI Companion',
		description:
			'CLI template for effortless interaction with Langchain, a compact AI companion for command-driven exploration.',
		url: 'https://github.com/kevmok/node-langchain-prompt',
		tags: ['TypeScript', 'Langchain'],
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
			{ property: 'og:url', content: 'https://kevmok.com/projects' },
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
		<div className="space-y-8">
			<h1 className="text-2xl font-bold">Projects</h1>
			<div className="space-y-6">
				{projects.map(project => (
					<div key={project.title} className="group">
						<a
							href={project.url}
							target="_blank"
							rel="noopener noreferrer"
							className="block"
						>
							<h2 className="text-lg font-medium text-blue-400 group-hover:text-blue-300 transition-colors">
								{project.title}
							</h2>
							<p className="mt-1 text-zinc-400">{project.description}</p>
							<div className="mt-2 flex flex-wrap gap-2">
								{project.tags.map(tag => (
									<span key={tag} className="text-xs text-zinc-500">
										{tag}
									</span>
								))}
							</div>
						</a>
					</div>
				))}
			</div>
			<div className="pt-6">
				<a
					href="https://github.com/kevmok"
					target="_blank"
					rel="noopener noreferrer"
					className="text-blue-400 hover:text-blue-300 transition-colors"
				>
					Check my other projects →
				</a>
			</div>
		</div>
	);
}
