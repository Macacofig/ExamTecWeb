import SearchBar from "@/components/SearchBar/SearchBar";
import styles from "./SearchForm.module.scss";

export type SearchFormType = "simple" | "advanced";

interface SearchFormProps {
  type: SearchFormType;
  query: string;
  onQueryChange: (value: string) => void;
  title?: string;
  author?: string;
  onTitleChange?: (value: string) => void;
  onAuthorChange?: (value: string) => void;
}

export default function SearchForm({
  type,
  query,
  onQueryChange,
  title = "",
  author = "",
  onTitleChange,
  onAuthorChange,
}: SearchFormProps) {
  return (
    <div className={styles.searchForm}>
      <SearchBar
        value={query}
        onSearch={onQueryChange}
        placeholder="Busca por palabra clave..."
      />

      {type === "advanced" && (
        <div className={styles.advancedFields}>
          <div className={styles.fieldGroup}>
            <label>Título</label>
            <input
              type="text"
              value={title}
              onChange={(e) => onTitleChange?.(e.target.value)}
              placeholder="Título exacto o parcial"
            />
          </div>

          <div className={styles.fieldGroup}>
            <label>Autor</label>
            <input
              type="text"
              value={author}
              onChange={(e) => onAuthorChange?.(e.target.value)}
              placeholder="Nombre del autor"
            />
          </div>
        </div>
      )}
    </div>
  );
}
