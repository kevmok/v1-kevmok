'use client';
import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter } from 'lucide-react';
import React from 'react';
import { Button } from './ui/button';

const socialList = [
	{ component: <Github />, link: 'http://github.com/kevmok', social: 'github' },
	{
		component: <Twitter />,
		link: 'https://twitter.com/LinkedKev',
		social: 'X',
	},
	{
		component: <Linkedin />,
		link: 'https://www.linkedin.com/in/mok-kevin/',
		social: 'linkedin',
	},
];
const Socials = () => {
	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: 0.8 }}
			className="mt-6 items-center"
		>
			{socialList.map((social, index) => (
				<Button
					key={`${social.social}-${index}`}
					variant="ghost"
					size="icon"
					aria-label={`${social.social} link`}
					className="mr-3 text-slate-400 hover:text-primary duration-300"
				>
					<a href={social.link} target="_blank" rel="noopener noreferrer">
						{social.component}
					</a>
				</Button>
			))}
		</motion.div>
	);
};

export default Socials;
