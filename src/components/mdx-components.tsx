import { Link } from '@tanstack/react-router';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import { highlight } from 'sugar-high';

function isExternalUrl(url: string): boolean {
	return (
		url.startsWith('http://') ||
		url.startsWith('https://') ||
		url.startsWith('//')
	);
}

export function H1({ children, ...props }: ComponentPropsWithoutRef<'h1'>) {
	return <h1 {...props}>{children}</h1>;
}

export function H2({ children, ...props }: ComponentPropsWithoutRef<'h2'>) {
	return <h2 {...props}>{children}</h2>;
}

export function H3({ children, ...props }: ComponentPropsWithoutRef<'h3'>) {
	return <h3 {...props}>{children}</h3>;
}

export function P({ children, ...props }: ComponentPropsWithoutRef<'p'>) {
	return <p {...props}>{children}</p>;
}

export function A({
	href = '',
	children,
	...props
}: ComponentPropsWithoutRef<'a'>) {
	const isExternal = isExternalUrl(href);

	if (isExternal) {
		return (
			<a href={href} target="_blank" rel="noopener noreferrer" {...props}>
				{children}
			</a>
		);
	}

	return (
		<Link to={href} {...props}>
			{children}
		</Link>
	);
}

export function Pre({ children, ...props }: ComponentPropsWithoutRef<'pre'>) {
	return <pre {...props}>{children}</pre>;
}

export function Code({
	children,
	className,
	...props
}: ComponentPropsWithoutRef<'code'>) {
	const isCodeBlock = className?.startsWith('language-');

	if (isCodeBlock && typeof children === 'string') {
		const highlighted = highlight(children);
		return (
			<code
				className="font-mono"
				// biome-ignore lint/security/noDangerouslySetInnerHtml: Required for sugar-high syntax highlighting
				dangerouslySetInnerHTML={{ __html: highlighted }}
				{...props}
			/>
		);
	}

	return <code {...props}>{children}</code>;
}

export function Blockquote({
	children,
	...props
}: ComponentPropsWithoutRef<'blockquote'>) {
	return <blockquote {...props}>{children}</blockquote>;
}

export function Ul({ children, ...props }: ComponentPropsWithoutRef<'ul'>) {
	return <ul {...props}>{children}</ul>;
}

export function Ol({ children, ...props }: ComponentPropsWithoutRef<'ol'>) {
	return <ol {...props}>{children}</ol>;
}

export function Li({ children, ...props }: ComponentPropsWithoutRef<'li'>) {
	return <li {...props}>{children}</li>;
}

export function Strong({
	children,
	...props
}: ComponentPropsWithoutRef<'strong'>) {
	return <strong {...props}>{children}</strong>;
}

export function FigureCard({
	title = 'Agent Loop',
	description = 'A minimal loop for iterative reasoning and action.',
	caption,
	children,
}: {
	title?: string;
	description?: string;
	caption?: string;
	children?: ReactNode;
}) {
	return (
		<figure className="figure-card">
			<div className="figure-card-inner">
				<div>{children ?? <AgentLoopFigure />}</div>
				<div>
					<p className="figure-title">{title}</p>
					<p className="figure-description">{description}</p>
				</div>
			</div>
			<div className="figure-controls" aria-label="Animation controls">
				<button className="control-chip" type="button">
					Pause
				</button>
				<button className="control-chip" type="button">
					0.5x
				</button>
				<button className="control-chip" type="button" data-active="true">
					1x
				</button>
				<button className="control-chip" type="button">
					1.5x
				</button>
				<button className="control-chip" type="button">
					2x
				</button>
				<span>{caption ?? 'Step 2 of 4'}</span>
			</div>
		</figure>
	);
}

export function AgentLoopFigure() {
	return (
		<div className="agent-loop" aria-label="Agent loop diagram">
			<div className="agent-node agent-node-blue">
				Observe
				<span>Receive input</span>
			</div>
			<div className="agent-node agent-node-yellow">
				Reason
				<span>Interpret and plan</span>
			</div>
			<div className="agent-node agent-node-green">
				Act
				<span>Take action</span>
			</div>
			<div className="agent-node agent-node-red">
				Reflect
				<span>See results</span>
			</div>
		</div>
	);
}

export function MarginNote({ children }: { children: ReactNode }) {
	return <aside className="margin-note">{children}</aside>;
}

export function Details({
	summary,
	children,
}: {
	summary: string;
	children: ReactNode;
}) {
	return (
		<details className="editorial-details">
			<summary>{summary}</summary>
			<div className="details-body">{children}</div>
		</details>
	);
}

export const mdxComponents = {
	h1: H1,
	h2: H2,
	h3: H3,
	p: P,
	a: A,
	pre: Pre,
	code: Code,
	blockquote: Blockquote,
	ul: Ul,
	ol: Ol,
	li: Li,
	strong: Strong,
	FigureCard,
	AgentLoopFigure,
	MarginNote,
	Details,
};
