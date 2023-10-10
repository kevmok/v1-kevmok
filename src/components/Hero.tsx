import TextLink from './ui/textLink';

const Hero = () => {
	return (
		<div>
			<h1 className="scroll-m-20 text-4xl font-bold tracking-wide sm:text-5xl">
				<TextLink link="/">Kevin Mok</TextLink>
			</h1>
			<h2 className="scroll-m-20 text-xl font-medium tracking-widest mt-3 leading-normal text-slate-200">
				Software Developer
			</h2>
			<p className="mt-4 max-w-xs leading-normal font-light text-slate-400">
				I like to automate processes, mentor, and build cool software stuff.
			</p>
		</div>
	);
};

export default Hero;
