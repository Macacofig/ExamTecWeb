import { book } from "@/types/book";

export function filterByLanguage(books: book[], language: string): book[] {
  return books.filter(
    (book: book) => {
      if (!book.lenguajes) return false;
      return book.lenguajes.includes(language);
    });
}

export function filterByPublicationYear(books: book[], minYear: number, maxYear: number): book[] {
  return books.filter(
    (book: book) => {
      const year = book.añoPrimeraPublicacion;
      return year >= minYear && year <= maxYear;
    });
}