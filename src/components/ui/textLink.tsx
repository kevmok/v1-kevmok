interface TextLinkProps {
	children: React.ReactNode;
	link: string;
}

const TextLink: React.FC<TextLinkProps> = ({ children, link }) => {
	return (
		<a
			href={link}
			target="_blank"
			rel="noopener noreferrer"
			className="font-medium text-slate-200 hover:text-primary focus-visible:text-primary"
		>
			{children}
		</a>
	);
};

export default TextLink;
