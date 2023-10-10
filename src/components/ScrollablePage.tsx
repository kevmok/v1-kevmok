import Container from './ui/container';

const ScrollablePage: React.FC = () => {
	return (
		<Container>
			<div className="flex h-screen">
				<div className="w-1/ fixed h-screen">
					{/* Content for the fixed left side */}
					<div>
						<h1>Left Side</h1>
						{/* Other content */}
					</div>
				</div>
				<div className="w-1/2 ml-auto relative">
					{/* Content for the scrollable right side */}
					<div>
						<h1>Right Side</h1>
						{/* Other content */}
					</div>
				</div>
			</div>
		</Container>
	);
};

export default ScrollablePage;
