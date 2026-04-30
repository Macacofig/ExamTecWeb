import BookCard from "@/components/BookCard/BookCard";
import { book } from "@/types/book";

type Props = {
  books: book[];
  onRemove?: (book: book) => void;
};


export default function BookList({ books, onRemove }: Props) {
  return (
    <div className="grid">
      {books.map((b) => (
        <BookCard key={b.workId} book={b} onRemove={onRemove} />
      ))}
    </div>
  );
}