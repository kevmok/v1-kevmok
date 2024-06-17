import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

function SwitchText({ words }: { words: Array<string> }) {
	const [currentWordIndex, setCurrentWordIndex] = useState(0);

	useEffect(() => {
		const intervalId = setInterval(() => {
			setCurrentWordIndex(prevIndex => (prevIndex + 1) % words.length);
		}, 3000);

		return () => {
			clearInterval(intervalId);
		};
	}, []);

	const wordVariants = {
		initial: { opacity: 0, y: 10 },
		animate: { opacity: 1, y: 0 },
		exit: {
			opacity: 0,
			y: -10,
			transition: { duration: 0.1, ease: 'easeOut' },
		},
	};

	return (
		<span style={{ display: 'inline-block' }}>
			<AnimatePresence mode="wait">
				<motion.span
					key={currentWordIndex}
					variants={wordVariants}
					initial="initial"
					animate="animate"
					exit="exit"
					transition={{ duration: 0.1, ease: 'easeOut' }}
					style={{ display: 'inline-block' }}
				>
					{words[currentWordIndex]}
				</motion.span>
			</AnimatePresence>
		</span>
	);
}

export default SwitchText;
