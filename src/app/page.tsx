"use client";

import { Result } from "@/types/Result";
import { useEffect, useState } from "react";
import BookList from "@/components/ListBooks";
import { book } from "@/types/book";
import { searchBooks, advancedSearch } from "@/services/openLibraryService";
import SearchBar from "@/components/SearchBar/SearchBar";
import Loading from "@/components/Loading/Loading";
import ErrorMessage from "@/components/ErrorMessage/ErrorMessage";
import FilterPanel from "@/components/FilterPanel/FilterPanel";

export default function Home() {
  const [books, setBooks] = useState<book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [filters, setFilters] = useState<any>({});

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 800);
    
    return () => clearTimeout(timer);
  }, [searchQuery]);

  useEffect(() => {
    setLoading(true);
    setError(null);
    
    const queryToSearch = debouncedQuery.trim() === "" ? "programming" : debouncedQuery;

    const searchParams = {
      query: queryToSearch,
      language: filters.language,
      minYear: filters.minYear ? parseInt(filters.minYear) : undefined,
      orderBy: filters.sort,
    };

    advancedSearch(searchParams).then((result: Result<any[]>) => {
      if (result.isSuccess()) {
        setBooks(result.getValue() || []);
      } else {
        setError(result.getError()?.message || "Error desconocido");
      }
      
      setLoading(false);
    });
  }, [debouncedQuery, filters]);

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
