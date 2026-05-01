"use client";

import { useState } from "react";
import { book } from "@/types/book";
import { searchBooks, advancedSearch } from "@/services/openLibraryService";
import BookList from "@/components/ListBooks/ListBooks";
import FilterPanel from "@/components/FilterPanel/FilterPanel";
import Loading from "@/components/Loading/Loading";
import ErrorMessage from "@/components/ErrorMessage/ErrorMessage";
import SearchForm, { SearchFormType } from "@/components/SearchForm/SearchForm";
import styles from "./page.module.scss";

type AdvancedFilters = {
  language?: string;
  minYear?: string;
  maxYear?: string;
  sort?: string;
};

const languageMap: Record<string, string> = {
  eng: "eng",
  spa: "spa",
  fra: "fra",
};

export default function BuscarPage() {
  const [query, setQuery] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [filters, setFilters] = useState<AdvancedFilters>({ language: "", minYear: "", maxYear: "", sort: "editions" });
  const [tempFilters, setTempFilters] = useState<AdvancedFilters>({ language: "", minYear: "", maxYear: "", sort: "editions" });
  const [books, setBooks] = useState<book[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [advancedMode, setAdvancedMode] = useState(false);
  const formType: SearchFormType = advancedMode ? "advanced" : "simple";

  const applyFilters = () => {
    setFilters(tempFilters);
  };

  const handleSearch = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setHasSearched(true);

    if (!advancedMode) {
      const result = await searchBooks({ query: query.trim() || undefined });

      if (result.isSuccess()) {
        setBooks(result.getValue() || []);
      } else {
        setError(result.getError()?.message || "Error desconocido");
        setBooks([]);
      }
    } else {
      const searchParams = {
        query: query.trim() || undefined,
        title: title.trim() || undefined,
        author: author.trim() || undefined,
        language: filters.language ? languageMap[filters.language] : undefined,
        minYear: filters.minYear ? Number(filters.minYear) : undefined,
        maxYear: filters.maxYear ? Number(filters.maxYear) : undefined,
        orderBy: filters.sort,
      };

      const result = await advancedSearch(searchParams);

      if (result.isSuccess()) {
        setBooks(result.getValue() || []);
      } else {
        setError(result.getError()?.message || "Error desconocido");
        setBooks([]);
      }
    }

    setLoading(false);
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.contentWrapper}>
        <h1 className="header">Buscar libros</h1>

        <div className={styles.formContainer}>
          <form onSubmit={handleSearch}>
            <SearchForm
              type={formType}
              query={query}
              onQueryChange={setQuery}
              title={title}
              author={author}
              onTitleChange={setTitle}
              onAuthorChange={setAuthor}
            />

            <div className={styles.buttonGroup}>
              <button type="submit" className={styles.searchButton}>
                Buscar
              </button>
              <button
                type="button"
                className={styles.toggleButton}
                onClick={() => setAdvancedMode((prev) => !prev)}
              >
                {advancedMode ? "Ocultar búsqueda avanzada" : "Búsqueda Avanzada"}
              </button>
            </div>

            {advancedMode && (
              <div style={{ marginTop: 16 }}>
                <FilterPanel 
                  onFilterChange={(newFilters) => setTempFilters({ ...tempFilters, ...newFilters })} 
                  showApplyButton={true}
                  onApply={applyFilters}
                />
              </div>
            )}
          </form>
        </div>

        <div className={styles.resultsSection}>
          {loading && <Loading />}
          {!loading && error && <ErrorMessage message={error} />}
          {!loading && !error && hasSearched && (
            books.length === 0 ? (
              <p style={{ textAlign: 'center', margin: '2rem 0', color: 'var(--text-muted)' }}>
                No se encontraron libros que coincidan con tu búsqueda.
              </p>
            ) : (
              <BookList books={books} />
            )
          )}
        </div>
      </div>
    </div>
  );
}
