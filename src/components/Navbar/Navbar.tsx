'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import styles from './Navbar.module.scss';

export default function Navbar() {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Link href="/">Biblioteca Inteligente</Link>
      </div>
      <ul className={styles.navLinks}>
        <li>
          <Link href="/buscar">Buscar</Link>
        </li>
        <li>
          <Link href="/favoritos">Favoritos</Link>
        </li>
        <li>
          <Link href="/acerca">Acerca de</Link>
        </li>
        <li>
          <button onClick={toggleTheme} className={styles.themeToggle}>
            {theme === 'dark' ? '☀️ Claro' : '🌙 Oscuro'}
          </button>
        </li>
      </ul>
    </nav>
  );
}
