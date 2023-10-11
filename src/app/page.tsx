import About from '@/components/About';
import Experience from '@/components/Experience';
import Hero from '@/components/Hero';
import Socials from '@/components/Socials';

export default function Home() {
	return (
		<div>
			<Hero />
			<Socials />
			<About />
			<Experience />
		</div>
	);
}
