'use client';
import { ListItem, ParagraphTitle } from '@/components/Miscs';
import SwitchText from '@/components/SwitchText';
import WavyText from '@/components/WavyText';
import { Button } from '@/components/ui/button';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const subtitleVariants = {
	hidden: { opacity: 0, x: 500, y: 200 },
	visible: { opacity: 1, x: 0, y: 0, transition: { duration: 2 } },
};
const textVariants = {
	hidden: { opacity: 0, y: 20 },
	visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};
const page = () => {
	const router = useRouter();
	const pathname = usePathname();

	const [showText, setShowText] = useState(false);
	const [buttonText, setButtonText] = useState('Click for a surprise 🎉');

	useEffect(() => {
		if (pathname === '/yourpage') {
			setButtonText("JK, here's about me");
		}
	}, [pathname]);

	const handleClick = () => {
		if (buttonText === 'Click for a surprise 🎉') {
			window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ', '_blank');
			setButtonText("JK, here's about me 👋");
		} else {
			setShowText(!showText);
		}
	};

	return (
		<div>
			<WavyText
				text="Hey Typefully!"
				replay={true}
				className="text-base font-bold leading-tight tracking-tight duration-500 sm:text-2xl md:text-7xl lg:text-8xl"
				exit={{
					opacity: 0,
					transition: { duration: 2, ease: 'easeInOut' },
				}}
			/>

			<motion.p
				initial="hidden"
				animate="visible"
				variants={subtitleVariants}
				className="text-center mt-8"
			>
				Here's my wonky application to your{' '}
				<SwitchText words={['swifty', 'colorful', 'incredible', 'cheery']} />{' '}
				web app
			</motion.p>

			<div className="mt-16">
				<AnimatePresence>
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -20 }}
						transition={{ duration: 0.5 }}
						className={`text-center mt-50 ${showText ? 'invisible' : ''}`}
					>
						<Button onClick={handleClick} variant={'outline'}>
							{buttonText}
						</Button>
					</motion.div>
				</AnimatePresence>

				<AnimatePresence>
					{showText && (
						<motion.div
							initial={{ opacity: 0, scale: 0.2, y: 100 }}
							animate={{
								opacity: 1,
								scale: 1,
								y: 0,
							}}
							exit="hidden"
							variants={textVariants}
							transition={{
								duration: 0.3,
								y: {
									type: 'spring',
									damping: 5,
									stiffness: 100,
									restDelta: 0.001,
								},
							}}
							className="mt-4"
						>
							<motion.h2
								whileHover={{ scale: 1.1, x: 150 }}
								transition={{ duration: 1 }}
								className="text-2xl font-bold mb-2"
							>
								Who{' '}
								<SwitchText
									words={[
										'is this Kevin guy',
										'is this generalist',
										'is this handsome dude',
										'does this guy think he is',
									]}
								/>
								?
							</motion.h2>

							<p className="leading-9 overflow-y-auto">
								I'm kevin, a self-proclaimed generalist who loves to build,
								connect with customers, and iterate fast. I will be your product
								engineer and take your product from 0 to 1. I will be there
								every step of the way. I have a passion for learning and
								building, coming from a startup I have a self-starter attitude,
								willingness to learn, and can work in a fast-paced environment
								(I enjoy it!).
							</p>
							<img
								src="https://media.tenor.com/MG3mVjBBcNcAAAAC/south-park-4point-plan.gif"
								alt=""
								className="mx-auto mt-3"
							/>
						</motion.div>
					)}
				</AnimatePresence>

				<AnimatePresence>
					{showText && (
						<motion.div
							className="mt-10 leading-9"
							initial={{ opacity: 0, scale: 0.2, y: 100 }}
							animate={{
								opacity: 1,
								scale: 1,
								y: 0,
							}}
							exit="hidden"
							variants={textVariants}
							transition={{
								duration: 0.8,
								y: {
									type: 'spring',
									damping: 7,
									stiffness: 100,
									restDelta: 0.001,
								},
								delay: 3,
							}}
						>
							<motion.h2
								whileHover={{ scale: 1.1, x: 150 }}
								transition={{ duration: 1 }}
								className="text-2xl font-bold mb-2"
							>
								<SwitchText words={['skills', 'languages', 'activities']} />
							</motion.h2>
							<p>
								With my wide range of experience both in engineering and
								customer relations, I have the{' '}
								<motion.p
									whileHover={{ scale: 1.5, y: -20 }}
									transition={{ duration: 0.5 }}
									className="inline-block font-bold"
								>
									qualifications
								</motion.p>{' '}
								to be your next product engineer. As a Product Engineer I will
								go from idea -&gt; roadmap -&gt; build -&gt; Release -&gt;
								Customer Support.
							</p>
							<img
								src="https://i.imgur.com/XYnbtZL.jpeg"
								alt=""
								className="w-[60%] mx-auto mt-3"
							/>
							<ParagraphTitle title="Languages & Tools" />

							<ul className="list-disc pl-6 my-1">
								{[
									'TypeScript',
									'Python',
									'C#',
									'React',
									'Django',
									'Notion',
									'SQL',
									'Caching',
									'& Moar',
								].map(language => (
									<ListItem item={language} />
								))}
							</ul>
							<ParagraphTitle title="I also have a life" />
							<p>
								Besides spending too much time on Twitter or Coding(allegedly) I
								also <b>try</b> to enjoy time life by doing the follwing:
							</p>
							<ul className="list-disc pl-6 my-1">
								{[
									'Volleyball',
									'Pickleball',
									'Beating my girlfriend at intense Tekken bouts',
									'Reading for self-growth',
									'Learning to write better',
									'Walk my two corgis',
								].map(activity => (
									<ListItem item={activity} />
								))}
							</ul>
							<motion.h2
								whileHover={{ scale: 1.1, x: 150 }}
								transition={{ duration: 1 }}
								className="text-2xl font-bold mt-4 mb-2"
							>
								<SwitchText
									words={['In Conclusion', 'Q.E.D.', 'The end of an Era']}
								/>
							</motion.h2>
							<p>
								And that is a high-level description of me, you may have noticed
								that I didn't include some of your tech stack in this
								application, i.e., Celery Task queue, it's not something I've
								used in the past, but I can assure I will ramp quick to your
								stack. If you are still interested and haven't felt the cringe
								yet, feel free to check more about me on my{' '}
								<Link href="/" target="_blank" className="font-bold">
									Homepage!
								</Link>
							</p>
							<p className="text-xs mt-32">pls notice me...</p>
						</motion.div>
					)}
				</AnimatePresence>
			</div>
		</div>
	);
};

export default page;
