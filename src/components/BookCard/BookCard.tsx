"use client";
import styles from "./BookCard.module.scss";
import { book } from "@/types/book";
import { useRouter } from "next/navigation";

type BookProps = {
  book: book;
};

export default function BookCard({ book }: BookProps) {
  const router = useRouter();

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

          <button onClick={() => console.log("favorito")}>
            Favorito
          </button>
        </div>
      </div>
    </div>
  );
}