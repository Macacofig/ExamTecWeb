'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import styles from './Navbar.module.scss';

export default function Navbar() {
  const [theme, setTheme] = useState('dark');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Link href="/">Biblioteca Inteligente</Link>
      </div>
      
      <button className={styles.menuButton} onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </button>

      <ul className={`${styles.navLinks} ${isMenuOpen ? styles.isOpen : ''}`}>
        <li>
          <Link href="/" onClick={closeMenu}>Pagina Principal</Link>
        </li>
        <li>
          <Link href="/buscar" onClick={closeMenu}>Buscar</Link>
        </li>
        <li>
          <Link href="/favoritos" onClick={closeMenu}>Favoritos</Link>
        </li>
        <li>
          <Link href="/acerca" onClick={closeMenu}>Acerca de</Link>
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
