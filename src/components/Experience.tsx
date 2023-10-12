import Heading from './ui/heading';

const experienceList = [
	{
		title: 'Customer Success Engineer',
		company: 'Moveworks',
		date: '2022 — Present',
		description: '',
		website: 'https://www.moveworks.com/',
		skills: ['Python', 'JavaScript'],
	},
	{
		title: 'Software Engineer',
		company: 'K3DES LLC',
		date: '2021-2022',
		description: '',
		website: 'https://k3des.com/',
		skills: ['JavaScript', 'Svelte', 'PostgreSQL', 'Node.js'],
	},
	{
		title: 'Software Engineer',
		company: 'RBM a Q2 Solutions Company',
		date: '2019-2021',
		description: '',
		website: 'https://rbm.q2labsolutions.com/',
		skills: ['C#', 'MSSQL', '.NET', 'SSRS', 'NUnit'],
	},
];

const Experience = () => {
	return (
		<main className="mt-24">
			<Heading title="Experience">
				<div className="flex flex-col mb-12 sm:flex-row">
					<h3 className="mb-2 text-xs text-slate-500 font font-semibold uppercase tracking-wide">
						2023 — present
					</h3>
					<div className="flex flex-col">
						<h2 className="font-medium text-slate-300 leading-snug items-baseline">
							<a
								href="https://test.com"
								target="_blank"
								rel="noopener noreferrer"
								aria-label="Customer Success Engineer - Moveworks"
								className="inline-flex font-medium leading-tight hover:text-primary focus:text-primary duration-300"
							>
								Customer Success Engineer - Moveworks
							</a>
						</h2>
						<p className="mt-2 text-sm leading-normal font-light text-slate-400">
							description
						</p>
						<ul className="flex flex-wrap">
							<li>skill1</li>
							<li>skill2</li>
						</ul>
					</div>
				</div>
			</Heading>
		</main>
	);
};

export default Experience;
