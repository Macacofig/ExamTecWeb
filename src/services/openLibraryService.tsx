import { Result } from "@/types/Result";
import { book } from "@/types/book";
import { mapToBooks } from "@/utils/bookMapper";

export async function searchBooks(query: string): Promise<Result<book[]>> {
  try {
    if (!query || !query.trim()) {
      return Result.success([]);
    }

    const formattedQuery = query.trim().replace(/\s+/g, '+');
    const request = await fetch(`https://openlibrary.org/search.json?q=${formattedQuery}`);

    if (!request.ok) {
      return Result.error(new Error(`Error HTTP ${request.status}: No se pudo completar la búsqueda en Open Library`));
    }

    const data = await request.json();
    
    if (!data.docs) {
      return Result.error(new Error("Error de datos: Estructura de respuesta inválida"));
    }

    return Result.success(mapToBooks(data.docs));
  } catch (error: any) {
    return Result.error(new Error(`Fallo de conexión: ${error.message}`));
  }
}

export async function searchBooksTitle(title: string): Promise<Result<book[]>> {
  try {
    if (!title || !title.trim()) {
      return Result.success([]);
    }

    const formattedTitle = title.trim().replace(/\s+/g, '+');
    const request = await fetch(`https://openlibrary.org/search.json?title=${formattedTitle}`);

    if (!request.ok) {
      return Result.error(new Error(`Error HTTP ${request.status}: No se pudo completar la búsqueda por título`));
    }

    const data = await request.json();
    return Result.success(mapToBooks(data.docs));
  } catch (error: any) {
    return Result.error(new Error(`Fallo de conexión: ${error.message}`));
  }
}

export async function searchBooksAuthor(author: string): Promise<Result<book[]>> {
  try {
    if (!author || !author.trim()) {
      return Result.success([]);
    }

    const formattedAuthor = author.trim().replace(/\s+/g, '+');
    const request = await fetch(`https://openlibrary.org/search.json?author=${formattedAuthor}`);

    if (!request.ok) {
      return Result.error(new Error(`Error HTTP ${request.status}: No se pudo completar la búsqueda por autor`));
    }

    const data = await request.json();
    return Result.success(mapToBooks(data.docs));
  } catch (error: any) {
    return Result.error(new Error(`Fallo de conexión: ${error.message}`));
  }
}
