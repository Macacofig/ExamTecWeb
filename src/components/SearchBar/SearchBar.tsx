import { useState } from 'react';
import styles from './SearchBar.module.scss';

interface SearchBarProps {
    onSearch: (query: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
    const [query, setQuery] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSearch(query);
    };

    return (
        <form className={styles.searchForm} onSubmit={handleSubmit}>
            <input
                type="text"
                className={styles.input}
                placeholder="Buscar por título, autor o palabra clave..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <button type="submit" className={styles.button}>
                Buscar
            </button>
        </form>
    );
}
