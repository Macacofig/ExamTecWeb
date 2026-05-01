import { bookDetail } from "@/types/bookDetail";

async function resolveAuthorName(authorNode: any): Promise<string> {
  const providedName = authorNode?.author?.name || authorNode?.name;
  if (typeof providedName === "string" && providedName.trim()) {
    return providedName;
  }

  const authorKey = authorNode?.author?.key || authorNode?.key;
  if (typeof authorKey === "string") {
    try {
      const response = await fetch(`https://openlibrary.org${authorKey}.json`);
      if (response.ok) {
        const authorData = await response.json();
        if (typeof authorData.name === "string" && authorData.name.trim()) {
          return authorData.name;
        }
      }
    } catch {
      // ignore fetch failure and fallback to key-based label
    }

    return authorKey.replace("/authors/", "");
  }

  return "Desconocido";
}

function formatPublishDate(value: any): string {
  if (!value) {
    return "Año desconocido";
  }

  if (typeof value !== "string") {
    return String(value);
  }

  const yearMatch = value.match(/^\d{4}/);
  if (yearMatch) {
    return yearMatch[0];
  }

  const parsed = Date.parse(value);
  if (!Number.isNaN(parsed)) {
    return new Date(parsed).getFullYear().toString();
  }

  return "Año desconocido";
}

export async function mapToBookDetail(apiWork: any, workId: string): Promise<bookDetail> {
  const validCovers = Array.isArray(apiWork.covers)
    ? apiWork.covers.filter((id: number) => id > 0)
    : [];

  const coverId = validCovers.length > 0 ? validCovers[0] : undefined;

  const coverUrl = coverId
    ? `https://covers.openlibrary.org/b/id/${coverId}-L.jpg`
    : "/no-image.png";

  const rawDescription = apiWork.description;
  const description = typeof rawDescription === "string"
    ? rawDescription
    : rawDescription?.value || "Sin descripción";

  const authors = Array.isArray(apiWork.authors)
    ? await Promise.all(apiWork.authors.map((author: any) => resolveAuthorName(author)))
    : [];

  const publishDate = formatPublishDate(
    apiWork.first_publish_date ||
    apiWork.created?.value ||
    apiWork.created?.value?.slice?.(0, 10)
  );

  const subjects = Array.isArray(apiWork.subjects)
    ? apiWork.subjects.map((subject: any) => String(subject))
    : [];

  return {
    workId,
    title: apiWork.title || "Sin título",
    description,
    authors,
    publishDate,
    subjects,
    coverUrl,
    openLibraryUrl: `https://openlibrary.org/works/${workId}`
  };
}
