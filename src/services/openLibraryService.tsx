import { Result } from "@/types/Result";
import { book } from "@/types/book";
import { mapToBooks } from "@/utils/bookMapper";
import { filterByPublicationYear } from "@/utils/filters";

type SearchParams = {
  query?: string;
  title?: string;
  author?: string;
  page?: number;
};

type AdvancedSearchParams = SearchParams & {
  language?: string;
  orderBy?: string;
  minYear?: number;
  maxYear?: number;
};

// ── Helpers ────────────────────────────────────────────────────────────────

function hasAnyValue(params: object): boolean {
  return Object.values(params).some(v =>
    typeof v === "string" ? v.trim() : Boolean(v)
  );
}

function buildSearchURL(params: SearchParams): string {
  const sp = new URLSearchParams();

  if (params.query)  sp.append("q",      params.query);
  if (params.title)  sp.append("title",  params.title);
  if (params.author) sp.append("author", params.author);
  if (params.page)   sp.append("page",   params.page.toString());

  return `/api/openlibrary/books?${sp.toString()}`;
}

function buildAdvancedSearchURL(params: AdvancedSearchParams): string {
  const sp = new URLSearchParams();

  if (params.query)    sp.append("q",      params.query);
  if (params.title)    sp.append("title",  params.title);
  if (params.author)   sp.append("author", params.author);
  if (params.language) sp.append("lang",   params.language);
  if (params.page)     sp.append("page",   params.page.toString());
  if (params.orderBy) {
    sp.append("sort", params.orderBy === "year" ? "new" : "editions");
  }

  return `/api/openlibrary/books?${sp.toString()}`;
}

async function fetchBooks(url: string): Promise<Result<book[]>> {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return Result.error(
        new Error(errorData.error ?? `Error HTTP: ${response.status} ${response.statusText}`)
      );
    }

    const data = await response.json();

    if (data.error) {
      return Result.error(new Error(data.error));
    }

    if (!data || !Array.isArray(data.docs)) {
      return Result.error(
        new Error("JSON inválido: no existe la propiedad 'docs' o esta no es un array")
      );
    }

    return Result.success(mapToBooks(data.docs));
  } catch (error) {
    return Result.error(
      new Error(`Error de red: ${error instanceof Error ? error.message : String(error)}`)
    );
  }
}

// ── Exports ────────────────────────────────────────────────────────────────

export async function searchBooks(params: SearchParams): Promise<Result<book[]>> {
  if (!hasAnyValue(params)) return Result.success([]);
  return fetchBooks(buildSearchURL(params));
}

export async function advancedSearch(params: AdvancedSearchParams): Promise<Result<book[]>> {
  if (!hasAnyValue(params)) return Result.success([]);

  const result = await fetchBooks(buildAdvancedSearchURL(params));
  if (!result.isSuccess()) return result;

  let books = result.getValue() || [];
  if (params.minYear !== undefined || params.maxYear !== undefined) {
    const minYear = params.minYear ?? 0;
    const maxYear = params.maxYear ?? new Date().getFullYear();
    books = filterByPublicationYear(books, minYear, maxYear);
  }

  return Result.success(books);
}