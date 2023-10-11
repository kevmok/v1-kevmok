interface HeadingProps {
	children: React.ReactNode;
	title: string;
}

const Heading: React.FC<HeadingProps> = ({ children, title }) => {
	return (
		<section
			id={title}
			className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24"
		>
			<div className="sticky top-0 z-20 -mx-6 mb-4 w-screen px-6 py-5 md:-mx-12 md:px-12">
				<h2 className="text-sm font-semibold uppercase tracking-widest text-slate-200">
					{title.toUpperCase()}
				</h2>
			</div>
			{children}
		</section>
	);
};

export default Heading;
