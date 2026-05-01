import { Result } from "@/types/Result";
import { book } from "@/types/book";
import { mapToBooks } from "@/utils/bookMapper";

type SearchParams = {
  query?: string;
  title?: string;
  author?: string;
};

type AdvancedSearchParams = SearchParams & {
  language?: string;
  orderBy?: string;
  minYear?: number;
};

function buildSearchURL(params: SearchParams): string {
  const searchParams = new URLSearchParams();

  if (params.query) searchParams.append("q", params.query);
  if (params.title) searchParams.append("title", params.title);
  if (params.author) searchParams.append("author", params.author);

  return `https://openlibrary.org/search.json?${searchParams.toString()}`;
}

function buildAdvancedSearchURL(params: AdvancedSearchParams): string {
  const searchParams = new URLSearchParams();

  if (params.query) searchParams.append("q", params.query);
  if (params.title) searchParams.append("title", params.title);
  if (params.author) searchParams.append("author", params.author);
  if (params.language) searchParams.append("lang", params.language);
  if (params.minYear) searchParams.append("first_publish_year", params.minYear.toString());
  if (params.orderBy) {
    // Open Library supports sorting by relevance, editions, etc.
    // For simplicity, we'll use 'relevance' as default, but can add more
    searchParams.append("sort", params.orderBy === 'year' ? 'first_publish_year' : 'editions');
  }

  return `https://openlibrary.org/search.json?${searchParams.toString()}`;
}

export async function searchBooks(params: SearchParams): Promise<Result<book[]>> {
  const hasParams = Object.values(params).some(v => v && v.trim());

  if (!hasParams) {
    return Result.success([]);
  }

  const url = buildSearchURL(params);

  const response = await fetch(url);

  if (!response.ok) {
    return Result.error(
      new Error(`Error HTTP: la API devolvio ${response.status} ${response.statusText}`)
    );
  }

  let data: any;
  try {
    data = await response.json();
  } catch {
    return Result.error(
      new Error("JSON inválido: no se pudo parsear JSON recibido de la API")
    );
  }

  if (!data || !Array.isArray(data.docs)) {
    return Result.error(
      new Error("JSON inválido: no existe la propiedad 'docs' o esta no es un array")
    );
  }

  return Result.success(mapToBooks(data.docs));
}

export async function advancedSearch(params: AdvancedSearchParams): Promise<Result<book[]>> {
  const hasParams = Object.values(params).some(v => v && (typeof v === 'string' ? v.trim() : v));

  if (!hasParams) {
    return Result.success([]);
  }

  const url = buildAdvancedSearchURL(params);

  const response = await fetch(url);

  if (!response.ok) {
    return Result.error(
      new Error(`Error HTTP: la API devolvio ${response.status} ${response.statusText}`)
    );
  }

  let data: any;
  try {
    data = await response.json();
  } catch {
    return Result.error(
      new Error("JSON inválido: no se pudo parsear JSON recibido de la API")
    );
  }

  if (!data || !Array.isArray(data.docs)) {
    return Result.error(
      new Error("JSON inválido: no existe la propiedad 'docs' o esta no es un array")
    );
  }

  return Result.success(mapToBooks(data.docs));
}