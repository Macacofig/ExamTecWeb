"use client";
import styles from "./BookCard.module.scss";
import { book } from "@/types/book";
import { useRouter } from "next/navigation";
import { toggleFavorite, isFavorite } from "@/utils/localStorageFavorites";
import { useState, useEffect } from "react";

type BookProps = {
  book: book;
  onRemove?: (book: book) => void;
};

export default function BookCard({ book, onRemove }: BookProps) {
  const router = useRouter();
  const [favorite, setFavorite] = useState(false);
  const handleFavorite = () => {
    toggleFavorite(book);
    setFavorite(!favorite);
  };
  useEffect(() => {
    setFavorite(isFavorite(book.workId));
  }, [book.workId]);
  
  return (
    <div className={styles.card}>
      <img src={book.portada} alt={book.titulo} />

      <div className={styles.body}>
        <h3>{book.titulo}</h3>
        <p>{book.autor}</p>

        <p className={styles.meta}>
          Año: {book.añoPrimeraPublicacion || "—"}
        </p>

        <p className={styles.meta}>
          Ediciones: {book.numeroEdiciones}
        </p>

        <div className={styles.actions}>
          <button onClick={() => router.push(`/libro/${book.workId}`)}>
            Ver detalle
          </button>

          <button
            onClick={() => {
              if (onRemove) {
                onRemove(book);
              } else {
                handleFavorite();
              }
            }}
          >
            {onRemove ? "Eliminar" : favorite ? "Quitar Favorito" : "Añadir Favorito"}
          </button>
        </div>
      </div>
    </div>
  );
}