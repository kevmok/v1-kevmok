import TextLink from './ui/textLink';

const Footer = () => {
	return (
		<div className="scroll-mt-16 flex flex-col sm:flex-row font-light text-xs text-slate-400 sm:gap-20">
			<div className="sm:w-1/2">
				<p className="italic mb-6">
					"Twenty years from now you will be more disappointed by the things
					that you didn’t do than by the ones you did do. So throw off the
					bowlines. Sail away from the safe harbor. Catch the trade winds in
					your sails. Explore. Dream. Discover." - Mark Twain
				</p>
			</div>
			<div className="sm:text-right">
				<p>
					This portfolio was crafted using{' '}
					<TextLink link="https://code.visualstudio.com/">VS Code</TextLink>,
					styled with{' '}
					<TextLink link="https://tailwindcss.com/">Tailwind CSS</TextLink>,
					built on <TextLink link="https://nextjs.org/">Next.js</TextLink>, and
					deployed via <TextLink link="https://railway.app/">Railway</TextLink>.
				</p>
			</div>
		</div>
	);
};

export default Footer;
