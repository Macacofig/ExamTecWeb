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
  sort?: string;
};

const languageMap: Record<string, string> = {
  eng: "en",
  spa: "es",
  fre: "fr",
};

export default function BuscarPage() {
  const [query, setQuery] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [filters, setFilters] = useState<AdvancedFilters>({ language: "", minYear: "", sort: "editions" });
  const [books, setBooks] = useState<book[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [advancedMode, setAdvancedMode] = useState(false);
  const formType: SearchFormType = advancedMode ? "advanced" : "simple";

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
                <FilterPanel onFilterChange={(newFilters) => setFilters({ ...filters, ...newFilters })} />
              </div>
            )}
          </form>
        </div>

        <div className={styles.resultsSection}>
          {loading && <Loading />}
          {!loading && error && <ErrorMessage message={error} />}
          {!loading && !error && hasSearched && <BookList books={books} />}
        </div>
      </div>
    </div>
  );
}
