'use client'; 

import styles from './SearchBar.module.scss';

interface SearchBarProps {
    onSearch: (query: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const valor = e.target.value;
        onSearch(valor);
    };

    return (
        <div className={styles.searchForm}>
            <input
                type="text"
                className={styles.input}
                placeholder="Buscar por título, autor o palabra clave..."
                onChange={handleChange}
            />
            {}
        </div>
    );
}
