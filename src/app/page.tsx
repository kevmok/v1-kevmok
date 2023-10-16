import About from '@/components/About';
import Experience from '@/components/Experience';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Projects from '@/components/Projects';
import Socials from '@/components/Socials';

export default function Home() {
	return (
		<div>
			<Header />
			<Socials />
			<About />
			<Experience />
			<Projects />
			<Footer />
		</div>
	);
}
