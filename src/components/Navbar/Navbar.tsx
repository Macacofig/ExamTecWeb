import Link from 'next/link';
import styles from './Navbar.scss';

export default function Navbar() {
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
      </ul>
    </nav>
  );
}
