import { book } from "@/types/book";

export function mapToBooks(apiBooks: any[]): book[] {
  return apiBooks.map((item: any, index: number) => ({
    id: index,
    titulo: item.title || "Sin título",
    autor: item.author_name?.[0] || "Sin información",
    lenguajes: item.language || [],
    añoPrimeraPublicacion: item.first_publish_year || 0,
    numeroEdiciones: item.edition_count || 0,
    workId: item.key ? item.key.replace("/works/", "") : "",
    portada: item.cover_i
      ? `https://covers.openlibrary.org/b/id/${item.cover_i}-M.jpg`
      : "/no-image.png"
  }));
}