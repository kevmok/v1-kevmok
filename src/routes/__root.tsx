import {
	HeadContent,
	Link,
	Outlet,
	createRootRoute,
	useRouterState,
} from '@tanstack/react-router';
import { ConstructionBanner } from '../components/ConstructionBanner';
import '../styles/app.css';

const quietLink =
	'font-[var(--font-sans)] text-[13px] text-[var(--muted)] no-underline transition-colors duration-150 hover:text-[var(--text)]';

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
	const pathname = useRouterState({
		select: state => state.location.pathname,
	});
	const showHomepageNotes = pathname === '/';

	return (
		<div className="flex min-h-dvh flex-col bg-[var(--canvas)] px-[clamp(20px,4vw,52px)] pt-7 pb-1 text-[var(--text)]">
			<HeadContent />
			<header className="flex w-full items-baseline justify-between gap-8 border-[var(--hairline)] border-b pb-4 font-[var(--font-sans)] text-[13px] text-[var(--muted)]">
				<Link
					to="/"
					className="font-[var(--font-serif)] text-[19px] leading-none tracking-[-0.02em] text-[var(--text)] no-underline"
					aria-label="Kevin Mok home"
				>
					km
				</Link>
				<nav
					className="flex flex-wrap justify-end gap-[18px]"
					aria-label="Primary navigation"
				>
					<Link to="/" className={quietLink}>
						home
					</Link>
					<Link to="/writing" className={quietLink}>
						writing
					</Link>
					<Link to="/projects" className={quietLink}>
						projects
					</Link>
					<a
						href="https://github.com/kevmok"
						target="_blank"
						rel="noopener noreferrer"
						className={quietLink}
					>
						code
					</a>
				</nav>
			</header>
			<ConstructionBanner />

			<div className="mx-auto grid w-full max-w-[1180px] flex-1 grid-cols-[112px_minmax(0,700px)_minmax(170px,1fr)] gap-x-[clamp(38px,5vw,76px)] max-[920px]:block max-[920px]:max-w-[700px]">
				<aside
					className="relative min-h-full border-[var(--hairline)] border-r font-[var(--font-sans)] text-[11px] leading-[1.45] text-[var(--muted)] max-[920px]:hidden"
					aria-hidden="true"
				>
					<span className="absolute top-[45%] left-0 block max-w-[78px] -translate-y-1/2">
						All things considered, ship useful things.
					</span>
					<span className="absolute bottom-7 left-0 flex max-w-[88px] flex-col gap-[3px] font-[var(--font-mono)] text-[10px] leading-[1.45] text-[#8b8580]">
						<span>01</span>
						<span>—</span>
						<span>Due 2019</span>
					</span>
				</aside>

				<main className="pt-[clamp(28px,5vh,76px)] pb-6 max-[920px]:pt-[clamp(48px,8vh,76px)] max-[920px]:pb-10 max-[680px]:pt-12 max-[680px]:pb-10">
					<Outlet />
				</main>

				<aside
					className="relative pt-[clamp(96px,15vh,160px)] font-[var(--font-sans)] text-[12px] leading-[1.55] text-[var(--muted)] max-[920px]:hidden"
					aria-hidden="true"
				>
					{showHomepageNotes && (
						<>
							<p className="ml-auto max-w-[132px]">
								<span className="mb-2 flex flex-col gap-[3px] font-[var(--font-mono)] text-[10px] leading-[1.35] text-[#96908a]">
									<span>02</span>
									<span>—</span>
								</span>
								<em className="font-[var(--font-serif)] text-[var(--muted)] italic">
									Clarity is a kind of respect.
								</em>
							</p>
							<p className="absolute right-0 bottom-12 max-w-[132px]">
								<span className="mb-2 flex flex-col gap-[3px] font-[var(--font-mono)] text-[10px] leading-[1.35] text-[#96908a]">
									<span>03</span>
									<span>—</span>
								</span>
								<em className="font-[var(--font-serif)] text-[var(--muted)] italic">
									Systems should serve people.
								</em>
							</p>
						</>
					)}
				</aside>
			</div>

			<footer className="mt-auto flex w-full max-w-[1180px] justify-between gap-6 self-center border-[var(--hairline)] border-t pt-4 font-[var(--font-sans)] text-[12px] text-[var(--muted)] max-[680px]:flex-col">
				<span>© {new Date().getFullYear()} Kevin Mok</span>
				<div className="flex flex-wrap gap-[18px]">
					<a
						href="https://github.com/kevmok"
						target="_blank"
						rel="noopener noreferrer"
						className="text-[var(--muted)] no-underline transition-colors duration-150 hover:text-[var(--text)]"
					>
						github
					</a>
					<a
						href="https://twitter.com/LinkedKev"
						target="_blank"
						rel="noopener noreferrer"
						className="text-[var(--muted)] no-underline transition-colors duration-150 hover:text-[var(--text)]"
					>
						x
					</a>
					<a
						href="https://www.linkedin.com/in/mok-kevin/"
						target="_blank"
						rel="noopener noreferrer"
						className="text-[var(--muted)] no-underline transition-colors duration-150 hover:text-[var(--text)]"
					>
						linkedin
					</a>
				</div>
			</footer>
		</div>
	);
}
