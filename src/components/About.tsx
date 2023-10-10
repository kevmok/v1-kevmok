import TextLink from './ui/textLink';

const About = () => {
	return (
		<main className="mt-24">
			<section
				id="about"
				className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24"
			>
				<div className="sticky top-0 z-20 -mx-6 mb-4 w-screen px-6 py-5 md:-mx-12 md:px-12">
					<h2 className="text-sm font-semibold uppercase tracking-widest text-slate-200">
						ABOUT
					</h2>
				</div>
				<div>
					<p className="mb-4 text-slate-400 font-light">
						The adventure began in 2019 when I delved into crafting custom
						private Discord bots for my server. This initial foray sparked my
						journey into the realms of coding and, subsequently, web
						development. Fast forward to the present, and I've had the honor of
						developing software solutions for a{' '}
						<TextLink link="https://rbm.q2labsolutions.com/">
							pioneering biotech enterprise
						</TextLink>
						, a{' '}
						<TextLink link="https://www.moveworks.com/">
							vibrant start-up
						</TextLink>
						, and a{' '}
						<TextLink link="https://k3des.com/">
							robust cybersecurity consulting agency
						</TextLink>
						.
					</p>
					<p className="mb-4 text-slate-400 font-light">
						Currently, my endeavors are channeled towards contributing value at
						Moveworks. When the workday winds down, my passion for sharing
						knowledge takes the forefront. I design and deliver{' '}
						<TextLink link="https://youtube.com/@LinkedKev?si=lDvae9Dd1OZ_gtH1">
							video tutorials
						</TextLink>
						, providing a ladder for aspiring coders to climb and elevate their
						prowess.
					</p>
					<p className="mb-4 text-slate-400 font-light">
						Beyond the code, my world orbits around leisure strolls in the park
						with my corgis, engaging in friendly Tekken bouts with my
						significant other, and embracing the serenity of the great outdoors
						of{' '}
						<TextLink link="https://www.austintexas.org/">Austin, TX</TextLink>.
					</p>
				</div>
			</section>
		</main>
	);
};

export default About;
