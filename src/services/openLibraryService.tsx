import { Result } from "@/types/Result";
import { book } from "@/types/book";
import { mapToBooks }from "@/utils/bookMapper";

export async function searchBooks(query: string): Promise<Result<book[]>> {
  const request = await fetch(
    `https://openlibrary.org/search.json?q=${query}`
  );

  if (!request.ok) {
    return Result.error(new Error("Error al buscar libros", { cause: request.status }));
  }
  
  let data = await request.json();
  data = mapToBooks(data.docs);
  return Result.success(data);
}

export async function searchBooksTitle(title: string): Promise<Result<book[]>> {
  // TODO: ver si el mapper de api a book se puede reutilizar o es necesario crear uno específico para esta función
  const request = await fetch(
    `https://openlibrary.org/search.json?title=${title}`
  );

  if (!request.ok) {
    return Result.error(new Error("Error al buscar libros por título", { cause: request.status }));
  }

  let data = await request.json();
  data = mapToBooks(data.docs);
  return Result.success(data);
}

export async function searchBooksAuthor(author: string): Promise<Result<book[]>> {
  // TODO: ver si el mapper de api a book se puede reutilizar o es necesario crear uno específico para esta función
  const request = await fetch(
    `https://openlibrary.org/search.json?author=${author}`
  );

  if (!request.ok) {
    return Result.error(new Error("Error al buscar libros por autor", { cause: request.status }));
  }

  let data = await request.json();
  data = mapToBooks(data.docs);
  return Result.success(data);
}