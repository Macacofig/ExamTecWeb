'use client';

import { useState } from 'react';
import styles from './FilterPanel.module.scss';

interface FilterPanelProps {
    onFilterChange: (filters: any) => void;
}

export default function FilterPanel({ onFilterChange }: FilterPanelProps) {
    const [year, setYear] = useState('1900');

    const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setYear(value);
        onFilterChange({ minYear: value });
    };

    return (
        <div className={styles.filterPanel}>
            <div className={styles.filterGroup}>
                <label>Año mínimo</label>
                <input 
                    type="number" 
                    value={year} 
                    onChange={handleYearChange}
                />
            </div>

            <div className={styles.filterGroup}>
                <label>Idioma</label>
                <select onChange={(e) => onFilterChange({ language: e.target.value })}>
                    <option value="">Todos</option>
                    <option value="eng">Inglés</option>
                    <option value="spa">Español</option>
                    <option value="fre">Francés</option>
                </select>
            </div>

            <div className={styles.filterGroup}>
                <label>Ordenar por</label>
                <select onChange={(e) => onFilterChange({ sort: e.target.value })}>
                    <option value="editions">Ediciones</option>
                    <option value="year">Año de publicación</option>
                </select>
            </div>
        </div>
    );
}
