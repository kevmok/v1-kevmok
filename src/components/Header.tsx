'use client';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from './ui/button';

const Header = () => {
	const { theme, setTheme } = useTheme();
	return (
		<header className="fixed top-5 right-10 z-50">
			<div className="">
				<Button
					variant="ghost"
					size="icon"
					className="mr-6"
					aria-label="Toggle Theme"
					onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
				>
					<Sun className="w-6 h-6 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 duration-500" />
					<Moon className="absolute w-6 h-6 rotate-90 scale-0 transition-all dark:-rotate-0 dark:scale-100 duration-500" />
					<span className="sr-only">Toggle Theme</span>
				</Button>
			</div>
		</header>
	);
};

export default Header;
