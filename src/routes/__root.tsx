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
		<div>
			<p className="page-kicker">404</p>
			<h1 className="archive-page-title">Page not found</h1>
			<p className="archive-intro">
				The page you’re looking for doesn’t exist.
			</p>
			<Link to="/" className="article-back">
				Back to home
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
		<div className="site-shell">
			<HeadContent />
			<header className="site-header">
				<Link to="/" className="site-mark" aria-label="Kevin Mok home">
					km
				</Link>
				<nav className="site-nav" aria-label="Primary navigation">
					<Link to="/">home</Link>
					<Link to="/writing">writing</Link>
					<Link to="/projects">projects</Link>
					<a
						href="https://github.com/kevmok"
						target="_blank"
						rel="noopener noreferrer"
					>
						code
					</a>
				</nav>
			</header>

			<div className="site-frame">
				<aside className="site-rail" aria-hidden="true">
					<span className="site-rail-line">
						All things considered, ship useful things.
					</span>
					<span className="site-rail-meta">
						<span>01</span>
						<span>—</span>
						<span>Est. 2019</span>
					</span>
				</aside>

				<main className="site-main">
					<Outlet />
				</main>

				<aside className="site-notes" aria-hidden="true">
					<p className="site-note">
						<span className="site-note-index">
							<span>02</span>
							<span>—</span>
						</span>
						<em>Clarity is a kind of respect.</em>
					</p>
					<p className="site-note">
						<span className="site-note-index">
							<span>03</span>
							<span>—</span>
						</span>
						<em>Systems should serve people.</em>
					</p>
				</aside>
			</div>

			<footer className="site-footer">
				<span>© {new Date().getFullYear()} Kevin Mok</span>
				<div className="footer-links">
					<a
						href="https://github.com/kevmok"
						target="_blank"
						rel="noopener noreferrer"
					>
						github
					</a>
					<a
						href="https://twitter.com/LinkedKev"
						target="_blank"
						rel="noopener noreferrer"
					>
						x
					</a>
					<a
						href="https://www.linkedin.com/in/mok-kevin/"
						target="_blank"
						rel="noopener noreferrer"
					>
						linkedin
					</a>
				</div>
			</footer>
		</div>
	);
}
