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
  const [debouncedQuery, setDebouncedQuery] = useState("harry potter");
  const [filters, setFilters] = useState<any>({});

  useEffect(() => {
    console.log("DEBUG: searchQuery cambió a", searchQuery);
    
    const timer = setTimeout(() => {
      console.log("DEBUG: Set debouncedQuery a", searchQuery);
      setDebouncedQuery(searchQuery);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [searchQuery]);

  useEffect(() => {
    console.log("DEBUG: Disparando búsqueda para", debouncedQuery);
    setLoading(true);
    setError(null);
    
    searchBooks(debouncedQuery).then((result: Result<any[]>) => {
      console.log("DEBUG: Resultado de búsqueda", result);
      
      if (result.isSuccess()) {
        setBooks(result.getValue() || []);
      } else {
        setError(result.getError()?.message || "Error desconocido");
      }
      
      setLoading(false);
    });
  }, [debouncedQuery]);

  return (
    <div className="container">
      <h1 className="header">Biblioteca</h1>
      <SearchBar onSearch={setSearchQuery} />
      <FilterPanel onFilterChange={(newFilters) => setFilters({ ...filters, ...newFilters })} />
      
      {loading && <Loading />}
      {!loading && error && <ErrorMessage message={error} />}
      {!loading && !error && <BookList books={books} />}
    </div>
  );
}
