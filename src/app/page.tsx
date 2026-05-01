"use client";

import { useEffect, useState } from "react";
import BookList from "@/components/ListBooks/ListBooks";
import { book } from "@/types/book";
import { advancedSearch } from "@/services/openLibraryService";
import Loading from "@/components/Loading/Loading";
import Skeleton from "@/components/Skeleton/Skeleton";
import ErrorMessage from "@/components/ErrorMessage/ErrorMessage";
import FilterPanel from "@/components/FilterPanel/FilterPanel";

type Filters = {
  language?: string;
  minYear?: string;
  maxYear?: string;
  sort?: string;
};

export default function Home() {
  const [books, setBooks] = useState<book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<Filters>({ language: "", minYear: "", maxYear: "", sort: "editions" });
  const [tempFilters, setTempFilters] = useState<Filters>({ language: "", minYear: "", maxYear: "", sort: "editions" });
  const [page, setPage] = useState(1);
  
  const applyFilters = () => {
    setFilters(tempFilters);
  };
  
  useEffect(() => {
    const loadBooks = async () => {
      setLoading(true);
      setError(null);

      try {
        const result = await advancedSearch({
          query: "programming",
          page,
          language: filters.language,
          minYear: filters.minYear ? Number(filters.minYear) : undefined,
          maxYear: filters.maxYear ? Number(filters.maxYear) : undefined,
          orderBy: filters.sort
        });

        if (result.isSuccess()) {
          setBooks(result.getValue() || []);
        } else {
          setError(result.getError()?.message || "Error desconocido");
        }
      } catch (error) {
        setError(error instanceof Error ? error.message : "Error desconocido");
      }

      setLoading(false);
    };

    loadBooks();
  }, [page, filters]);

  useEffect(() => {
    setPage(1);
  }, [filters]);


  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  return (
    <div className="container">
      <FilterPanel 
        onFilterChange={(newFilters: Partial<Filters>) => setTempFilters({ ...tempFilters, ...newFilters })} 
        showApplyButton={true}
        onApply={applyFilters}
      />

      {loading && (
        <>
          <Loading />
          <Skeleton />
        </>
      )}
      {!loading && error && <ErrorMessage message={error} />}
      {!loading && !error && (
        <>
          {books.length === 0 ? (
            <p style={{ textAlign: 'center', margin: '2rem 0', color: 'var(--text-muted)' }}>
              No se encontraron libros con los filtros aplicados.
            </p>
          ) : (
            <BookList books={books} />
          )}

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
