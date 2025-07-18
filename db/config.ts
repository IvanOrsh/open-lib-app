import { column, defineDb, defineTable } from "astro:db";

const BooksTable = defineTable({
	columns: {
		id: column.number({ primaryKey: true }),
		author: column.text(),
		title: column.text(),
		cover: column.json(),
	},
});

// https://astro.build/db/config
export default defineDb({
	tables: { BooksTable },
});
