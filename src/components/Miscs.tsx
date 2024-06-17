import { motion } from 'framer-motion';
import React from 'react';

interface ListItemProps extends React.HTMLProps<HTMLUListElement> {
	item: string;
}

interface HeadingProps extends React.HTMLProps<HTMLHeadingElement> {
	title: string;
}

const wordVariants = {
	initial: { opacity: 0, x: 10 },
	animate: { opacity: 1, x: 0 },
	exit: {
		opacity: 0,
		x: -10,
		transition: { duration: 0.1, ease: 'easeOut' },
	},
};
export const ListItem: React.FC<ListItemProps> = ({ item, children }) => {
	return (
		<motion.li
			initial={{ x: 400 }}
			whileInView={{ x: 0 }}
			transition={{
				duration: 0.1,
				x: {
					type: 'spring',
					damping: 15,
					stiffness: 100,
					restDelta: 0.001,
				},
			}}
		>
			{item}
		</motion.li>
	);
};

export const ParagraphTitle: React.FC<HeadingProps> = ({ title }) => {
	return (
		<motion.h3
			initial={{ x: 400 }}
			whileInView={{ x: 0 }}
			transition={{
				duration: 0.1,
				x: {
					type: 'spring',
					damping: 10,
					stiffness: 100,
					restDelta: 0.001,
				},
			}}
			className="text-lg font-bold my-4"
		>
			{title}
		</motion.h3>
	);
};
