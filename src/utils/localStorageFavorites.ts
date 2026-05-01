import { book } from "@/types/book";

const KEY = "favorites";

/**
 * Obtener todos los favoritos
 */
export function getFavorites(): book[] {

  const data = localStorage.getItem(KEY);
  return data ? JSON.parse(data) : [];
}

/**
 * Guardar favoritos en localStorage
 */
export function saveFavorites(favorites: book[]): void {

  localStorage.setItem(KEY, JSON.stringify(favorites));
}

/**
 * Saber si un libro ya es favorito (para UI)
 */
export function isFavorite(workId: string): boolean {
  const favorites = getFavorites();
  return favorites.some(f => f.workId === workId);
}

/**
 * Alternar favorito (agregar o eliminar)
 */
export function toggleFavorite(book: book): void {
  const favorites = getFavorites();

  const exists = favorites.some(f => f.workId === book.workId);

  if (exists) {
    // eliminar
    const updated = favorites.filter(f => f.workId !== book.workId);
    saveFavorites(updated);
  } else {
    // agregar (evita duplicados automáticamente)
    saveFavorites([...favorites, book]);
  }
}

/**
 * Eliminar favorito directamente (opcional)
 */
export function removeFavorite(workId: string): void {
  const favorites = getFavorites();
  const updated = favorites.filter(f => f.workId !== workId);
  saveFavorites(updated);
}