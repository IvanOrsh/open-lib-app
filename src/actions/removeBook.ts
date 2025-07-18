import { db, BooksTable, eq } from "astro:db";
import { defineAction } from "astro:actions";
import { z } from "astro:schema";

export const removeBook = defineAction({
	accept: "json",
	input: z.object({
		id: z.number(),
	}),
	handler: async ({ id }) => {
		try {
			const bookInsert = await db
				.delete(BooksTable)
				.where(eq(BooksTable.id, id));

			return {
				rowsAffected: bookInsert.rowsAffected,
				success: true,
			};
		} catch (error) {
			console.error(error);
			return {
				success: false,
			};
		}
	},
});
