import { Result } from "@/types/Result";
import { book } from "@/types/book";
import { mapToBooks } from "@/utils/bookMapper";

export async function searchBooks(query: string): Promise<Result<book[]>> {
  try {
    console.log("DEBUG API: Recibido query", query);
    
    if (!query || !query.trim()) {
      console.log("DEBUG API: Retornando array vacío por query vacío");
      return Result.success([]);
    }

    const formattedQuery = query.trim().replace(/\s+/g, '+');
    const url = `https://openlibrary.org/search.json?q=${formattedQuery}`;
    console.log("DEBUG API: Fetch URL", url);

    const request = await fetch(url);
    console.log("DEBUG API: HTTP Status", request.status);

    if (!request.ok) {
      return Result.error(new Error(`Error de API: ${request.status}`));
    }

    const data = await request.json();
    console.log("DEBUG API: Data docs recibidos", data.docs?.length);

    if (!data.docs) {
      return Result.error(new Error("Estructura de respuesta inválida"));
    }

    const mappedData = mapToBooks(data.docs);
    return Result.success(mappedData);
  } catch (error: any) {
    console.log("DEBUG API: Catch ejecutado", error.message);
    return Result.error(new Error(error.message || "Error de red"));
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
      return Result.error(new Error(`Error de API: ${request.status}`));
    }

    const data = await request.json();
    const mappedData = mapToBooks(data.docs);
    return Result.success(mappedData);
  } catch (error: any) {
    return Result.error(new Error(error.message || "Error de red"));
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
      return Result.error(new Error(`Error de API: ${request.status}`));
    }

    const data = await request.json();
    const mappedData = mapToBooks(data.docs);
    return Result.success(mappedData);
  } catch (error: any) {
    return Result.error(new Error(error.message || "Error de red"));
  }
}
