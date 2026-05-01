"use client";

import { Result } from "@/types/Result";
import { useEffect, useState } from "react";
import BookList from "@/components/ListBooks/ListBooks";
import { book } from "@/types/book";
import { advancedSearch } from "@/services/openLibraryService";
import ErrorMessage from "@/components/ErrorMessage/ErrorMessage";
import FilterPanel from "@/components/FilterPanel/FilterPanel";
import Skeleton from "@/components/Skeleton/Skeleton";

type Filters = {
  language?: string;
  minYear?: string;
  sort?: string;
};

export default function Home() {
  const [books, setBooks] = useState<book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<Filters>({ language: "", minYear: "", sort: "editions" });
  const [page, setPage] = useState(1);
  
  useEffect(() => {
    setLoading(true);
    setError(null);

    advancedSearch({
      query: "programming",
      page,
      language: filters.language,
      minYear: filters.minYear ? Number(filters.minYear) : undefined,
      orderBy: filters.sort
    }).then((result: Result<book[]>) => {
      if (result.isSuccess()) {
        const initialBooks = result.getValue() || [];
        setBooks(initialBooks);
      } else {
        setError(result.getError()?.message || "Error desconocido");
      }
      setLoading(false);
    });
  }, [page, filters]);

  useEffect(() => {
    setPage(1);
  }, [filters]);


  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  return (
    <div className="container">
      <FilterPanel onFilterChange={(newFilters) => setFilters({ ...filters, ...newFilters })} />

      {loading && <Skeleton />}
      {!loading && error && <ErrorMessage message={error} />}
      {!loading && !error && (
        <>
          <BookList books={books} />

          <div className="pagination">
            <button disabled={page === 1} onClick={() => setPage(page - 1)}>
              Anterior
            </button>

            <span>Página {page}</span>

            <button disabled={books.length < 20} onClick={() => setPage(page + 1)}>
              Siguiente
            </button>
          </div>
        </>
      )}
    </div>
  );
}
