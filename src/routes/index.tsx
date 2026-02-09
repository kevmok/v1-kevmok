import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
	component: HomeComponent,
});

function HomeComponent() {
	return (
		<div>
			<h1 className="text-2xl font-bold">Hello World</h1>
			<p>TanStack Start is working!</p>
		</div>
	);
}
