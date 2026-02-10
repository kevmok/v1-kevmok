import {
	HeadContent,
	Link,
	Outlet,
	createRootRoute,
} from '@tanstack/react-router';
import '../styles/app.css';

export const Route = createRootRoute({
	component: RootComponent,
	notFoundComponent: () => (
		<div className="space-y-4">
			<h1 className="text-2xl font-bold">Page not found</h1>
			<p className="text-zinc-400">
				The page you're looking for doesn't exist.
			</p>
			<Link
				to="/"
				className="text-blue-400 hover:text-blue-300 transition-colors"
			>
				← Back to home
			</Link>
		</div>
	),
	head: () => ({
		meta: [
			{
				name: 'viewport',
				content: 'width=device-width, initial-scale=1',
			},
			{
				charSet: 'utf-8',
			},
		],
		links: [
			{ rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' },
			{
				rel: 'alternate',
				type: 'application/rss+xml',
				title: 'Kevin Mok RSS Feed',
				href: '/rss.xml',
			},
		],
	}),
});

function RootComponent() {
	return (
		<div className="min-h-screen flex flex-col p-8">
			<HeadContent />
			<header className="max-w-[60ch] mx-auto w-full mb-12">
				<nav className="flex gap-6 items-center">
					<Link
						to="/"
						className="text-zinc-400 hover:text-zinc-200 transition-colors"
					>
						home
					</Link>
					<div className="flex gap-6">
						<Link
							to="/projects"
							className="text-zinc-400 hover:text-zinc-200 transition-colors"
						>
							projects
						</Link>
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
