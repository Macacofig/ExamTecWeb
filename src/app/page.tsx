"use client";

import { Result } from "@/types/Result";
import { useEffect, useState } from "react";
import BookList from "@/components/ListBooks";
import { book } from "@/types/book";
import { searchBooks } from "@/services/openLibraryService";
import SearchBar from "@/components/SearchBar/SearchBar";
import Loading from "@/components/Loading/Loading";
import ErrorMessage from "@/components/ErrorMessage/ErrorMessage";
import FilterPanel from "@/components/FilterPanel/FilterPanel";

export default function Home() {
  const [books, setBooks] = useState<book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("harry potter");
  const [filters, setFilters] = useState<any>({});

  useEffect(() => {
    setLoading(true);
    searchBooks(searchQuery).then((result: Result<any[]>) => {
      if (result.isSuccess()) {
        setBooks(result.getValue() || []);
      } else {
        setError(result.getError()?.message || "Error desconocido");
      }
      setLoading(false);
    });
  }, [searchQuery]); 

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="container">
      <h1 className="header">Biblioteca</h1>
      <SearchBar onSearch={setSearchQuery} />
      <FilterPanel onFilterChange={(newFilters) => setFilters({ ...filters, ...newFilters })} />
      <BookList books={books} />
    </div>
  );
}
