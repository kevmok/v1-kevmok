import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { Badge } from './ui/badge';
import Heading from './ui/heading';

const projectList = [
	{
		title: 'Discord Stock Analyst Broadcaster',
		description:
			'An adept Discord bot empowering stock analysts to broadcast their plays across multiple servers, reaching a diverse community of 5000 users. Through a centralized broadcasting system, this bot ensures timely dissemination of market insights, establishing a real-time information exchange hub for individuals keen on the latest market trends.',
		tools: ['TypeScript', 'Discord.js', 'Mongo DB'],
		img: '/images/discordv2.png',
	},
	{
		title: 'ElysiaJS API Starter: A Drizzle ORM Boosted Template',
		description:
			'A ready-to-go template for kickstarting Bun REST API projects with ElysiaJS & Drizzle ORM, streamlining the setup for developers diving into this tech stack.',
		website: 'https://github.com/kevmok/elysiajs-api-starter',
		tools: ['TypeScript', 'Drizzle ORM', 'ElysiaJS', 'Zod', 'SQLlite'],
		img: '/images/elysia.png',
	},
	{
		title: 'Discord TypeScript Bot Template',
		description:
			'A TypeScript Discord bot equipped with Drizzle ORM and Zod, efficiently managing slash commands, rate limits, permissions, and offering seamless event and command handling for a well-organized bot development experience.',
		website: 'https://github.com/kevmok/discordjs-typescript-template',
		tools: ['Typescript', 'Drizzle ORM', 'Zod', 'Discord.js', 'PostgreSQL'],
		img: '/images/discord.png',
	},
	{
		title: 'Langchain CLI Companion',
		description:
			'A CLI template for effortless interaction with Langchain, serving as a compact AI companion for straightforward, command-driven AI exploration and utilization.',
		website: 'https://github.com/kevmok/node-langchain-prompt',
		tools: ['TypeScript', 'Langchain 🦜'],
		img: '/images/langchain.png',
	},
];

const Projects = () => {
	return (
		<main className="mt-24">
			<Heading title="Projects">
				{projectList.map((project, index) => (
					<div
						key={`${project.title}-${index}`}
						className="group/img flex flex-col mb-12 sm:flex-row"
					>
						<div className="mt-4 sm:mt-0 max-w-[150px] order-last sm:order-first">
							<img
								src={project.img}
								alt=""
								loading="lazy"
								decoding="async"
								className="rounded border-2 border-cyan-500/10 max-w-full sm:max-w-[90%] group-hover/img:border-cyan-500/30 duration-300"
							/>
						</div>
						<div className="flex flex-col">
							<h2 className="flex-row font-medium text-slate-300 leading-snug items-baseline">
								<a
									href={project.website}
									target="_blank"
									rel="noopener noreferrer"
									aria-label={`${project.title}`}
									className="group font-medium leading-tight hover:text-primary focus:text-primary duration-300"
								>
									{project.title}
									<ArrowUpRight className="ml-1 inline-block h-4 w-4 shrink-0 group-hover:-translate-y-0.5 group-hover:translate-x-1 motion-reduce:transition-none translate-y-px transition-transform" />
								</a>
							</h2>
							<p className="mt-2 text-sm leading-normal font-light text-slate-400 tracking-wide">
								{project.description}
							</p>
							<ul className="mt-2 flex flex-wrap">
								{project.tools.map((skill, index) => (
									<li key={`${project.title}-${index}`} className="mr-1.5 mt-2">
										<Badge variant="new">{skill}</Badge>
									</li>
								))}
							</ul>
						</div>
					</div>
				))}
				<div className="mt-12">
					<a
						href="https://github.com/kevmok"
						target="_blank"
						rel="noopener noreferrer"
						aria-label="resume link"
						className="group font-medium leading-tight hover:text-primary focus:text-primary duration-300"
					>
						Check my other projects
						<ArrowRight className="ml-1 inline-block h-4 w-4 shrink-0 group-hover:translate-x-2 motion-reduce:transition-none translate-y-px transition-transform" />
					</a>
				</div>
			</Heading>
		</main>
	);
};

export default Projects;
