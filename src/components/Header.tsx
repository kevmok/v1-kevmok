'use client';
import { framerContainer, framerItem } from '@/lib/framer';
import { motion } from 'framer-motion';
import TextLink from './ui/textLink';

const Header = () => {
	return (
		<motion.div variants={framerContainer} initial="hidden" animate="visible">
			<motion.h1
				variants={framerItem}
				className="scroll-m-20 text-4xl font-bold tracking-wide sm:text-5xl"
			>
				<TextLink link="/">Kevin Mok</TextLink>
			</motion.h1>
			<motion.h2
				variants={framerItem}
				className="scroll-m-20 text-lg font-medium tracking-wider mt-3 leading-normal text-slate-300"
			>
				Software Developer
			</motion.h2>
			<motion.p
				variants={framerItem}
				className="mt-4 max-w-xs leading-normal font-light text-slate-400"
			>
				I like to automate processes, mentor, and build cool software stuff.
			</motion.p>
		</motion.div>
	);
};

export default Header;
