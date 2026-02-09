import { defineCollection, defineConfig } from '@content-collections/core';
import { compileMDX } from '@content-collections/mdx';
import { z } from 'zod';

const posts = defineCollection({
	name: 'posts',
	directory: 'content/posts',
	include: '**/*.mdx',
	schema: z.object({
		title: z.string(),
		date: z.string().datetime(),
		description: z.string().optional(),
		draft: z.boolean().optional().default(false),
	}),
	transform: async (document, context) => {
		const mdx = await compileMDX(context, document);
		return {
			...document,
			mdx,
		};
	},
});

export default defineConfig({
	collections: [posts],
});
