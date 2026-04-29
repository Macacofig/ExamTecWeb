import BookCard from "@/components/BookCard/BookCard";
import { book } from "@/types/book";

export default function BookList({ books }: { books: book[] }) {
  if (books.length === 0) {
    return <p>No hay resultados</p>;
  }
  return (
    <div className="grid">
      {books.map((b) => (
        <BookCard key={b.id} book={b} />
      ))}
    </div>
  );
}