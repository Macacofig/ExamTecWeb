'use client'; 

import styles from './SearchBar.module.scss';

interface SearchBarProps {
    value: string;
    onSearch: (query: string) => void;
    placeholder?: string;
}

export default function SearchBar({ value, onSearch, placeholder = "Buscar por título, autor o palabra clave..." }: SearchBarProps) {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const valor = e.target.value;
        onSearch(valor);
    };

    return (
        <div className={styles.searchForm}>
            <input
                type="text"
                className={styles.input}
                placeholder={placeholder}
                value={value}
                onChange={handleChange}
            />
            {}
        </div>
    );
}
