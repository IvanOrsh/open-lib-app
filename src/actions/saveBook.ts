import { db, BooksTable } from "astro:db";
import { defineAction } from "astro:actions";
import { z } from "astro:schema";

export const saveBook = defineAction({
	accept: "json",
	input: z.object({
		title: z.string(),
		author: z.string(),
		// author: z.string(),
		cover: z.object({
			url: z.string().optional(), // string | undefined
			width: z.number(),
			height: z.number(),
		}),
	}),
	handler: async ({ title, author, cover }) => {
		try {
			const bookInsert = await db.insert(BooksTable).values({
				title,
				author,
				cover,
			});
			return {
				rowsAffected: bookInsert.rowsAffected,
				success: true,
			};
		} catch (error) {
			console.error(error);
		}
	},
});
