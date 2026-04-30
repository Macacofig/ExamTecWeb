"use client";

import { useEffect, useState } from "react";
import { book } from "@/types/book";
import { getFavorites, toggleFavorite } from "@/utils/localStorageFavorites";
import BookList from "@/components/ListBooks/ListBooks";

export default function FavoritosPage() {
  const [favorites, setFavorites] = useState<book[]>([]);

  useEffect(() => {
    setFavorites(getFavorites());
  }, []);

  const handleRemove = (book: book) => {
    toggleFavorite(book);
    setFavorites(getFavorites()); // refrescar UI
  };

  return (
    <div className="container">
      <h1 className="header">Mis Favoritos</h1>

      {favorites.length === 0 ? (
        <p>No tienes libros en favoritos</p>
      ) : (
        <BookList books={favorites} onRemove={handleRemove} />
      )}
    </div>
  );
}