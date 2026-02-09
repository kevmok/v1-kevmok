import { Link, Outlet, createRootRoute } from '@tanstack/react-router';
import '../styles/app.css';

export const Route = createRootRoute({
	component: RootComponent,
});

function RootComponent() {
	return (
		<div className="min-h-screen flex flex-col p-8">
			<header className="max-w-[60ch] mx-auto w-full mb-12">
				<nav className="flex justify-between items-center">
					<Link
						to="/"
						className="text-lg font-medium hover:text-blue-400 transition-colors"
					>
						Kevin Mok
					</Link>
					<div className="flex gap-6">
						<a
							href="/projects"
							className="text-zinc-400 hover:text-zinc-200 transition-colors"
						>
							projects
						</a>
						<a
							href="https://github.com/kevmok"
							target="_blank"
							rel="noopener noreferrer"
							className="text-zinc-400 hover:text-zinc-200 transition-colors"
						>
							github
						</a>
					</div>
				</nav>
			</header>

			<main className="flex-1 max-w-[60ch] mx-auto w-full">
				<Outlet />
			</main>

			<footer className="max-w-[60ch] mx-auto w-full mt-12 pt-8 border-t border-zinc-800">
				<div className="flex gap-6 text-sm text-zinc-500">
					<a
						href="https://github.com/kevmok"
						target="_blank"
						rel="noopener noreferrer"
						className="hover:text-zinc-300 transition-colors"
					>
						github
					</a>
					<a
						href="https://twitter.com/LinkedKev"
						target="_blank"
						rel="noopener noreferrer"
						className="hover:text-zinc-300 transition-colors"
					>
						x
					</a>
					<a
						href="https://www.linkedin.com/in/mok-kevin/"
						target="_blank"
						rel="noopener noreferrer"
						className="hover:text-zinc-300 transition-colors"
					>
						linkedin
					</a>
				</div>
			</footer>
		</div>
	);
}
