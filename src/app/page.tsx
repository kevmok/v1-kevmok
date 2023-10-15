import About from '@/components/About';
import Experience from '@/components/Experience';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import Projects from '@/components/Projects';
import Socials from '@/components/Socials';

export default function Home() {
	return (
		<div>
			<Hero />
			<Socials />
			<About />
			<Experience />
			<Projects />
			<Footer />
		</div>
	);
}
