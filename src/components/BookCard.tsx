import { book } from "@/types/book";

type BookProps = {
  book: book;
  onClick: () => void;
}

export default function BookCard({ book, onClick }: BookProps) {
  return (
    <div className="book-card" onClick={onClick}>
      <img src={book.portada} alt={book.titulo}/>
      <div className="card-body">
        <h3>{book.titulo}</h3>
        <p>{book.autor}</p>
      </div>
    </div>
  );
}