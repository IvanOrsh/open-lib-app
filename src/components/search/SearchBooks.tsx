import { useState } from "react";
import { actions } from "astro:actions";
import { Loader2, Save, SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import type { ProcessedBook } from "@/types/Books";

const SearchBooks = () => {
	const [query, setQuery] = useState("");

	const [books, setBooks] = useState<ProcessedBook[]>([]);

	const [isLoading, setIsLoading] = useState(false);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsLoading(true);

		const { error, data } = await actions.searchBooks({ q: query });
		if (error) {
			console.error(error);
			alert("Error searching for books");
		}

		if (data) {
			setBooks(data as ProcessedBook[]);
		}

		setIsLoading(false);
	};

	const handleSave = async (book: ProcessedBook) => {
		const { error, data } = await actions.saveBook({
			title: book.title,
			author: book.author,
			cover: book.cover,
		});

		if (error) {
			console.error(error);
			alert("Error saving book");
		}

		if (data) {
			console.log(data);
		}
	};

	return (
		<>
			<form className="grid gap-2 max-w-lg" onSubmit={handleSubmit}>
				<Input
					type="search"
					name="q"
					placeholder="Search for a book"
					value={query}
					onChange={(e) => setQuery(e.target.value)}
				/>
				<Button type="submit" disabled={isLoading}>
					{isLoading ? (
						<>
							<span>Fetching books...</span>
							<Loader2 className="w-4 h-4 animate-spin" />
						</>
					) : (
						<>
							<span>Search for books</span>
							<SearchIcon className="w-4 h-4" />
						</>
					)}
				</Button>
			</form>
			<div className="grid grid-cols-4 gap-4">
				{books.map((book) => (
					<div key={book.id} className="grid gap-2">
						<h2 className="text-lg font-bold">{book.title}</h2>
						<p className="text-sm text-gray-500">{book.author}</p>
						{book.cover.url ? (
							<img
								src={book.cover.url}
								alt={book.title}
								width={book.cover.width}
								height={book.cover.height}
								className="h-60"
							/>
						) : (
							<div className="h-60 bg-gray-200" />
						)}
						<Button variant="outline" onClick={() => handleSave(book)}>
							<Save className="w-4 h-4" />
							<span>Save Book</span>
						</Button>
					</div>
				))}
			</div>
		</>
	);
};

export default SearchBooks;
