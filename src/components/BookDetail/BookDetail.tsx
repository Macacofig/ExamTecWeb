"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { bookDetail } from "@/types/bookDetail";
import styles from "./BookDetail.module.scss";
import { isFavorite as checkFavorite, toggleFavorite } from "@/utils/localStorageFavorites";
import { useEffect } from "react";
import { mapDetailToBook } from "@/utils/bookDetailBookMapper";

type Props = {
  detail: bookDetail;
};

export default function BookDetail({ detail }: Props) {
  const router = useRouter();
  const [isFavorite, setIsFavorite] = useState(false);
  const mappedBook = mapDetailToBook(detail);
  useEffect(() => {
    setIsFavorite(checkFavorite(detail.workId));
  }, [detail.workId]);

  const handleGoBack = () => {
    router.back();
  };

  const handleToggleFavorite = () => {
    toggleFavorite(mappedBook);
    setIsFavorite(checkFavorite(detail.workId));
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button 
          className={styles.btnBack} 
          onClick={handleGoBack}
          aria-label="Volver"
        >
          ← Volver
        </button>
        <button 
          className={`${styles.btnFavorite} ${isFavorite ? styles.active : ""}`}
          onClick={handleToggleFavorite}
          aria-label={isFavorite ? "Quitar de favoritos" : "Agregar a favoritos"}
        >
          {isFavorite ? "★" : "☆"} Favorito
        </button>
      </div>

      <div className={styles.content}>
        <div className={styles.cover}>
          <img src={detail.coverUrl} alt={detail.title} />
        </div>

        <div className={styles.info}>
          <h2>{detail.title}</h2>

          <p className={styles.description}>{detail.description}</p>

          {detail.authors.length > 0 && (
            <p>
              <strong>Autores:</strong> {detail.authors.join(", ")}
            </p>
          )}

          <p>
            <strong>Publicado:</strong> {detail.publishDate}
          </p>

          <p>
            <a 
              href={detail.openLibraryUrl} 
              target="_blank" 
              rel="noreferrer"
              className={styles.link}
            >
              Ver en Open Library →
            </a>
          </p>

          {detail.subjects.length > 0 && (
            <div className={styles.subjects}>
              <strong>Temas relacionados:</strong>
              <ul>
                {detail.subjects.map((subject) => (
                  <li key={subject}>{subject}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
