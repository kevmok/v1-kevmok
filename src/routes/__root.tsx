import { Outlet, createRootRoute } from '@tanstack/react-router';

export const Route = createRootRoute({
	component: RootComponent,
});

function RootComponent() {
	return (
		<div className="min-h-screen flex flex-col justify-between p-8">
			<main className="max-w-[60ch] mx-auto w-full">
				<Outlet />
			</main>
		</div>
	);
}
