import Heading from './ui/heading';
import TextLink from './ui/textLink';

const About = () => {
	return (
		<main className="mt-24">
			<Heading title="about">
				<div>
					<p className="mb-4 text-slate-400 font-light">
						The adventure began in 2019 when I delved into crafting custom
						private Discord bots for my server. This initial venture sparked my
						journey into the realms of coding and, subsequently, web
						development. . Fast forward to the present, and I've had the honor
						of developing software solutions for a{' '}
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
						<TextLink link="#">video tutorials</TextLink>, providing a ladder
						for aspiring coders to climb and elevate their prowess.
					</p>
					<p className="mb-4 text-slate-400 font-light">
						Beyond the code, my world orbits around leisure strolls in the park
						with my corgis, engaging in friendly{' '}
						<span className="text-destructive font-medium">Tekken</span> bouts
						with my significant other, and embracing the serenity of the great
						outdoors of{' '}
						<TextLink link="https://www.austintexas.org/">Austin, TX</TextLink>.
					</p>
				</div>{' '}
			</Heading>
		</main>
	);
};

export default About;
