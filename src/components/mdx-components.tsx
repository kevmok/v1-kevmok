import { Link } from '@tanstack/react-router';
import type { ComponentPropsWithoutRef } from 'react';
import { highlight } from 'sugar-high';

function isExternalUrl(url: string): boolean {
	return (
		url.startsWith('http://') ||
		url.startsWith('https://') ||
		url.startsWith('//')
	);
}

export function H1({ children, ...props }: ComponentPropsWithoutRef<'h1'>) {
	return (
		<h1 className="text-2xl font-medium pt-12 mb-0" {...props}>
			{children}
		</h1>
	);
}

export function H2({ children, ...props }: ComponentPropsWithoutRef<'h2'>) {
	return (
		<h2 className="text-xl font-medium mt-8 mb-3" {...props}>
			{children}
		</h2>
	);
}

export function H3({ children, ...props }: ComponentPropsWithoutRef<'h3'>) {
	return (
		<h3 className="text-lg font-medium mt-6 mb-2" {...props}>
			{children}
		</h3>
	);
}

export function P({ children, ...props }: ComponentPropsWithoutRef<'p'>) {
	return (
		<p className="text-zinc-300 leading-relaxed my-4" {...props}>
			{children}
		</p>
	);
}

export function A({
	href = '',
	children,
	...props
}: ComponentPropsWithoutRef<'a'>) {
	const isExternal = isExternalUrl(href);

	if (isExternal) {
		return (
			<a
				href={href}
				target="_blank"
				rel="noopener noreferrer"
				className="text-blue-400 hover:text-blue-300 transition-colors"
				{...props}
			>
				{children}
			</a>
		);
	}

	return (
		<Link
			to={href}
			className="text-blue-400 hover:text-blue-300 transition-colors"
			{...props}
		>
			{children}
		</Link>
	);
}

export function Pre({ children, ...props }: ComponentPropsWithoutRef<'pre'>) {
	return (
		<pre
			className="bg-zinc-900 rounded-lg p-4 overflow-x-auto my-6 text-sm"
			{...props}
		>
			{children}
		</pre>
	);
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

	return (
		<code
			className="bg-zinc-800 px-1.5 py-0.5 rounded text-sm font-mono"
			{...props}
		>
			{children}
		</code>
	);
}

export function Blockquote({
	children,
	...props
}: ComponentPropsWithoutRef<'blockquote'>) {
	return (
		<blockquote
			className="border-l-2 border-zinc-600 pl-4 text-zinc-400 italic my-6"
			{...props}
		>
			{children}
		</blockquote>
	);
}

export function Ul({ children, ...props }: ComponentPropsWithoutRef<'ul'>) {
	return (
		<ul className="list-disc pl-5 space-y-1 my-4 text-zinc-300" {...props}>
			{children}
		</ul>
	);
}

export function Ol({ children, ...props }: ComponentPropsWithoutRef<'ol'>) {
	return (
		<ol className="list-decimal pl-5 space-y-1 my-4 text-zinc-300" {...props}>
			{children}
		</ol>
	);
}

export function Li({ children, ...props }: ComponentPropsWithoutRef<'li'>) {
	return <li {...props}>{children}</li>;
}

export function Strong({
	children,
	...props
}: ComponentPropsWithoutRef<'strong'>) {
	return (
		<strong className="font-medium text-zinc-200" {...props}>
			{children}
		</strong>
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
};
