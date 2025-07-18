import { defineAction } from "astro:actions";

import { z } from "astro:schema";

import type { BookResponse, CoverResponse } from "@/types/Books";

export const searchBooks = defineAction({
	accept: "json",
	input: z.object({
		q: z.string().min(3).max(30),
	}),
	handler: async ({ q }) => {
		try {
			const res = await fetch(
				`https://openlibrary.org/search.json?q=${encodeURIComponent(q)}&limit=10`,
			);

			if (!res.ok) {
				throw new Error("Failed to fetch books");
			}

			const data: BookResponse = await res.json();

			const booksWithCover = [];
			for (const book of data.docs) {
				const coverRes = await fetch(
					`http://covers.openlibrary.org/b/id/${book.cover_i}.json`,
				);

				let imgData: CoverResponse = {
					source_url: null,
					width: 0,
					height: 0,
				};
				if (coverRes.ok) {
					const coverData = (await coverRes.json()) as CoverResponse;
					imgData = { ...coverData };
				}

				booksWithCover.push({
					title: book.title,
					author:
						typeof book.author_name === "string"
							? book.author_name
							: book.author_name.join(", "),
					cover: {
						url: imgData.source_url,
						width: imgData.width,
						height: imgData.height,
					},
					id: book.key,
					ratings_average: book.ratings_average,
				});
			}
			return booksWithCover;
		} catch (error) {
			console.error(error);
		}
	},
});
