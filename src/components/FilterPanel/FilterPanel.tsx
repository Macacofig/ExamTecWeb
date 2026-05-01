'use client';

import { useState } from 'react';
import styles from './FilterPanel.module.scss';

interface FilterPanelProps {
    onFilterChange: (filters: any) => void;
    showApplyButton?: boolean;
    onApply?: () => void;
}

export default function FilterPanel({ onFilterChange, showApplyButton = false, onApply }: FilterPanelProps) {
    const [minYear, setMinYear] = useState('');
    const [maxYear, setMaxYear] = useState('');

    const handleMinYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setMinYear(value);
        onFilterChange({ minYear: value || undefined });
    };

    const handleMaxYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setMaxYear(value);
        onFilterChange({ maxYear: value || undefined });
    };

    return (
        <div className={styles.filterPanel}>
            <div className={styles.filterGroup}>
                <label>Año mínimo</label>
                <input 
                    type="number" 
                    value={minYear} 
                    onChange={handleMinYearChange}
                />
            </div>

            <div className={styles.filterGroup}>
                <label>Año máximo</label>
                <input 
                    type="number" 
                    value={maxYear} 
                    onChange={handleMaxYearChange}
                />
            </div>

            <div className={styles.filterGroup}>
                <label>Idioma</label>
                <select onChange={(e) => onFilterChange({ language: e.target.value || undefined })}>
                    <option value="">Todos</option>
                    <option value="eng">Inglés</option>
                    <option value="spa">Español</option>
                    <option value="fra">Francés</option>
                </select>
            </div>

            <div className={styles.filterGroup}>
                <label>Ordenar por</label>
                <select onChange={(e) => onFilterChange({ sort: e.target.value || 'editions' })}>
                    <option value="editions">Ediciones</option>
                    <option value="year">Año de publicación</option>
                </select>
            </div>

            {showApplyButton && onApply && (
                <div className={styles.filterGroup}>
                    <button className={styles.applyButton} onClick={onApply}>
                        Aplicar filtros
                    </button>
                </div>
            )}
        </div>
    );
}
