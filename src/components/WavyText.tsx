import { type HTMLMotionProps, type Variants, motion } from 'framer-motion';
import { type FC } from 'react';

interface Props extends HTMLMotionProps<'div'> {
	text: string;
	delay?: number;
	replay: boolean;
	duration?: number;
}

const WavyText: FC<Props> = ({
	text,
	delay = 0,
	duration = 0.05,
	replay,
	...props
}: Props) => {
	const letters = Array.from(text);

	const container: Variants = {
		hidden: {
			opacity: 0,
		},
		visible: (i = 1) => ({
			opacity: 1,
			transition: { staggerChildren: duration, delayChildren: i * delay },
		}),
	};

	const child: Variants = {
		visible: {
			opacity: 1,
			y: 0,
			transition: {
				type: 'spring',
				damping: 0,
				mass: 2,
				// stiffness: 600,
			},
		},
		hidden: {
			opacity: 1,
			y: 20,
			transition: {
				type: 'spring',
				damping: 0,
				mass: 2,
				// stiffness: 600,
			},
		},
	};

	return (
		<motion.h1
			style={{ display: 'flex', overflow: 'visible', justifyContent: 'center' }}
			variants={container}
			initial="hidden"
			animate={['visible']}
			{...props}
		>
			{letters.map((letter, index) => (
				<motion.span key={index + index} variants={child}>
					{letter === ' ' ? '\u00A0' : letter}
				</motion.span>
			))}
		</motion.h1>
	);
};

export default WavyText;
