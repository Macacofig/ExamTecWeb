"use client";

import { Result } from "@/types/Result";
import { useEffect, useState } from "react";
import BookList from "@/components/ListBooks";
import { book } from "@/types/book";
import { searchBooks } from "@/services/openLibraryService";
import Loading from "@/components/Loading/Loading";
import ErrorMessage from "@/components/ErrorMessage/ErrorMessage";
import FilterPanel from "@/components/FilterPanel/FilterPanel";
import { filterByLanguage, filterByPublicationYear } from "@/utils/filters";

type Filters = {
  language?: string;
  minYear?: string;
  sort?: string;
};

export default function Home() {
  const [books, setBooks] = useState<book[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<Filters>({ language: "", minYear: "", sort: "editions" });

  useEffect(() => {
    setLoading(true);
    setError(null);

    searchBooks({ query: "programming" }).then((result: Result<book[]>) => {
      if (result.isSuccess()) {
        const initialBooks = result.getValue() || [];
        setBooks(initialBooks);
        setFilteredBooks(applyFilters(initialBooks, filters));
      } else {
        setError(result.getError()?.message || "Error desconocido");
      }
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    setFilteredBooks(applyFilters(books, filters));
  }, [books, filters]);

  function applyFilters(bookList: book[], currentFilters: Filters) {
    let result = [...bookList];

    if (currentFilters.language) {
      result = filterByLanguage(result, currentFilters.language);
    }

    const minYear = Number(currentFilters.minYear);
    if (!Number.isNaN(minYear) && currentFilters.minYear !== "") {
      result = filterByPublicationYear(result, minYear, new Date().getFullYear());
    }

    if (currentFilters.sort === "year") {
      result = result.sort((a, b) => a.añoPrimeraPublicacion - b.añoPrimeraPublicacion);
    } else {
      result = result.sort((a, b) => b.numeroEdiciones - a.numeroEdiciones);
    }

    return result;
  }

  return (
    <div className="container">
      <h1 className="header">Biblioteca</h1>
      <FilterPanel onFilterChange={(newFilters) => setFilters({ ...filters, ...newFilters })} />

      {loading && <Loading />}
      {!loading && error && <ErrorMessage message={error} />}
      {!loading && !error && <BookList books={filteredBooks} />}
    </div>
  );
}
