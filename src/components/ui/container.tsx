interface ContainerProps {
	children: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({ children }) => {
	return (
		<div className="px-6 py-12 mx-auto w-full max-w-6xl md:px-12 md:py-20 lg:px-24 overflow-x-hidden">
			{children}
		</div>
	);
};

export default Container;
