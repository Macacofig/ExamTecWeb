import { bookDetail } from "@/types/bookDetail";

export function mapToBookDetail(apiWork: any, workId: string): bookDetail {
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
    ? apiWork.authors.map((author: any) =>
        author?.author?.name || author?.name ||
        author?.author?.key?.replace("/authors/", "") ||
        "Desconocido"
      )
    : [];

  const publishDate =
    apiWork.first_publish_date ||
    apiWork.created?.value ||
    apiWork.created?.value?.slice?.(0, 10) ||
    "Fecha desconocida";

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
