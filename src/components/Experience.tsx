import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { Badge } from './ui/badge';
import Heading from './ui/heading';

const experienceList = [
	{
		title: 'Software & Senior Customer Success Engineer',
		company: 'Moveworks',
		date: '2022 — Present',
		description:
			'Led AI platform optimizations, increasing customer resolution rates by 36% and efficiency by 18.2%. Developed tools reducing debugging time, and automated 10+ workflows. Guided cross-functional projects impacting 100+ organizations and led early testing of new AI features, earning a promotion to Subject Matter Expert. Provided technical training to team members, enhancing service delivery and reliability.',
		website: 'https://www.moveworks.com/',
		skills: ['Python', 'JavaScript', 'Kafka', 'Django', 'Starlark', 'Bazel'],
	},
	{
		title: 'Full Stack Engineer (Contract)',
		company: 'Rooniverse',
		date: '2022 — 2022',
		description:
			'Implemented blockchain functionalities on the web platform, enabling NFT staking, looting, and questing via Solana and modern frameworks. Developed a Discord bot for streamlined Blockchain data access outside the web portal. Spearheaded full-stack architecture endeavors and crafted responsive front-end user experiences.',
		website: 'https://www.playrooniverse.com/',
		skills: ['Typescript', 'React', 'Solana', 'Next.js'],
	},
	{
		title: 'Software Engineer',
		company: 'K3DES LLC',
		date: '2021 — 2022',
		description:
			'Crafted a secure JavaScript web app using the Svelte framework, boosting productivity via integrated task/project tracking and collaboration features. Led PCI-DSS compliance initiatives through meticulous coordination with security teams, conducting thorough risk assessments and remediation.',
		website: 'https://k3des.com/',
		skills: ['JavaScript', 'Svelte', 'PostgreSQL', 'Node.js'],
	},
	{
		title: 'Software Engineer',
		company: 'RBM a Q2 Solutions Company',
		date: '2019 — 2021',
		description:
			'Spearheaded the development and optimization of key lab workflow applications, robotics automation, and databases utilizing .NET, C#, and SQL. Orchestrated a scalable redesign of legacy systems, facilitating a smooth transition to 64-bit migration and eliminating deprecated Win7 support costs. Created asynchronous web services and custom CLI tools, significantly reducing manual processes and enriching clinical data analysis.',
		website: 'https://rbm.q2labsolutions.com/',
		skills: ['C#', 'MSSQL', '.NET', 'SSRS', 'NUnit'],
	},
];

const Experience = () => {
	return (
		<main className="mt-24">
			<Heading title="Experience">
				{experienceList.map((experience, index) => (
					<div
						key={`${experience.company}-${index}`}
						className="flex flex-col mb-12 sm:flex-row"
					>
						<h3 className="mb-2 text-xs text-slate-500 font font-semibold uppercase tracking-wide min-w-[150px]">
							{experience.date}
						</h3>
						<div className="flex flex-col">
							<h2 className="flex-row font-medium text-slate-300 leading-snug items-baseline">
								<a
									href={experience.website}
									target="_blank"
									rel="noopener noreferrer"
									aria-label={`${experience.title} - ${experience.company}`}
									className="group font-medium leading-tight hover:text-primary focus:text-primary duration-300"
								>
									{experience.title} · {experience.company}{' '}
									<ArrowUpRight className=" inline-block h-4 w-4 shrink-0 group-hover:-translate-y-0.5 group-hover:translate-x-1 motion-reduce:transition-none translate-y-px transition-transform" />
								</a>
							</h2>
							<p className="mt-2 text-sm leading-normal font-light text-slate-400 tracking-wide">
								{experience.description}
							</p>
							<ul className="mt-2 flex flex-wrap">
								{experience.skills.map((skill, index) => (
									<li
										key={`${experience.title}-${index}`}
										className="mr-1.5 mt-2"
									>
										<Badge variant="new">{skill}</Badge>
									</li>
								))}
							</ul>
						</div>
					</div>
				))}
				<div className="mt-12">
					<a
						href="/resume.pdf"
						target="_blank"
						rel="noopener noreferrer"
						aria-label="resume link"
						className="group font-medium leading-tight hover:text-primary focus:text-primary duration-300"
					>
						View Full Résumé
						<ArrowRight className="ml-1 inline-block h-4 w-4 shrink-0 group-hover:translate-x-2 motion-reduce:transition-none translate-y-px transition-transform" />
					</a>
				</div>
			</Heading>
		</main>
	);
};

export default Experience;
