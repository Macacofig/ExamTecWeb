"use client";

import { useEffect, useState } from "react";
import BookList from "@/components/ListBooks";
import { book } from "@/types/book";
import { searchBooks } from "@/services/openLibraryService";

export default function Home() {
  const [books, setBooks] = useState<book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    searchBooks("harry potter").then((docs) => {
      const mappedBooks = docs.map((item: any, index: number) => ({
        id: index,
        titulo: item.title || "Sin título",
        autor: item.author_name?.[0] || "Desconocido",
        añoPrimeraPublicacion: item.first_publish_year || 0,
        numeroEdiciones: item.edition_count || 0,
        workId: item.key ? item.key.replace("/works/", "") : "",
        portada: item.cover_i
          ? `https://covers.openlibrary.org/b/id/${item.cover_i}-M.jpg`
          : "/no-image.png"
      }));

      setBooks(mappedBooks);
      setLoading(false);
    });
  }, []);

  if (loading) return <p>Cargando...</p>;

  return (
    <div className="container">
      <h1 className="header">Biblioteca</h1>

      <BookList books={books} />
    </div>
  );
}