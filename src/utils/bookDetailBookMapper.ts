import { book } from "@/types/book";
import { bookDetail } from "@/types/bookDetail";

export function mapDetailToBook(detail: bookDetail): book {
  return {
    id: 0,
    titulo: detail.title,
    portada: detail.coverUrl,
    autor: detail.authors?.[0] || "Desconocido",
    lenguajes: [],
    añoPrimeraPublicacion: Number(detail.publishDate) || 0,
    numeroEdiciones: 0,
    workId: detail.workId
  };
}