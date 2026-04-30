"use client";

import { Result } from "@/types/Result";
import { useEffect, useState } from "react";
import BookList from "@/components/ListBooks";
import { book } from "@/types/book";
import { searchBooks } from "@/services/openLibraryService";
import SearchBar from "@/components/SearchBar/SearchBar";
import Loading from "@/components/Loading/Loading";
import ErrorMessage from "@/components/ErrorMessage/ErrorMessage";

export default function Home() {
  const [books, setBooks] = useState<book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    searchBooks("harry potter").then((result: Result<any[]>) => {
      if (result.isSuccess()) {;
        setBooks(result.getValue() || []);
      } else {
        setError(result.getError()?.message || "Error desconocido");
      }
      setLoading(false);
    });
  }, []);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container">
      <h1 className="header">Biblioteca</h1>
      <SearchBar onSearch={(q) => console.log(q)} />
      <ErrorMessage message="Error de prueba" />
      <BookList books={books} />
    </div>
  );
}
