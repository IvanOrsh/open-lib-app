export type ProcessedBook = {
	title: string;
	author: string;
	cover: {
		url: string | undefined;
		width: number;
		height: number;
	};
	id: string;
};

export type Book = {
	cover_i: number;
	has_fulltext: boolean;
	edition_count: number;
	title: string;
	author_name: string[];
	first_publish_year: number;
	key: string;
	ia: string[];
	author_key: string[];
	public_scan_b: boolean;
	ratings_average: number | null;
};

export type BookResponse = {
	start: number;
	numFoundExact: boolean;
	num_found: number;
	docs: Book[];
};

export type CoverResponse = {
	source_url: string | null;
	width: number;
	height: number;
};
