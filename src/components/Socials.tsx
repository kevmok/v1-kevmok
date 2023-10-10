import { Github, Twitter, Linkedin } from 'lucide-react';
import React from 'react';
import { Button } from './ui/button';

const Socials = () => {
	return (
		<div className="mt-6 items-center">
			<Button variant="ghost" size="icon" aria-label="Github Link">
				<a
					href="http://github.com/kevmok"
					target="_blank"
					rel="noopener noreferrer"
				>
					<Github />
				</a>
			</Button>
			<Button
				variant="ghost"
				size="icon"
				aria-label="Twitter Link"
				className="ml-3"
			>
				<a
					href="https://twitter.com/LinkedKev"
					target="_blank"
					rel="noopener noreferrer"
				>
					<Twitter />
				</a>
			</Button>
			<Button
				variant="ghost"
				size="icon"
				aria-label="Twitter Link"
				className="ml-3"
			>
				<a
					href="https://www.linkedin.com/in/mok-kevin/"
					target="_blank"
					rel="noopener noreferrer"
				>
					<Linkedin />
				</a>
			</Button>
		</div>
	);
};

export default Socials;
