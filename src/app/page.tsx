import About from '@/components/About';
import Hero from '@/components/Hero';
import Socials from '@/components/Socials';

export default function Home() {
	return (
		<div>
			<Hero />
			<Socials />
			<About />
			{/* <ScrollablePage /> */}
		</div>
	);
}
