import { getBookDetails } from "@/services/worksOpenLibraryService";
import { mapToBookDetail } from "@/utils/bookDetailMapper";

type Props = {
  params: Promise<{ workId: string }>;
};

// TODO: separar esto en su propio componente y agregar más detalles del libro.
export default async function LibroDetalle({ params }: Props) {
  const { workId } = await params;

  const result = await getBookDetails(workId);

  if (result.isFailure()) {
    return <p>Error: {result.getError()?.message}</p>;
  }

  const data = result.getValue();
  const detail = mapToBookDetail(data, workId);

  return (
    <div className="book-detail">
      <div className="book-detail__cover">
        <img src={detail.coverUrl} alt={detail.title} />
      </div>

      <div className="book-detail__info">
        <h1>{detail.title}</h1>

        <p>{detail.description}</p>

        {detail.authors.length > 0 && (
          <p>
            <strong>Autores:</strong> {detail.authors.join(", ")}
          </p>
        )}

        <p>
          <strong>Publicado:</strong> {detail.publishDate}
        </p>

        {detail.subjects.length > 0 && (
          <div>
            <strong>Temas relacionados:</strong>
            <ul>
              {detail.subjects.map((subject) => (
                <li key={subject}>{subject}</li>
              ))}
            </ul>
          </div>
        )}

        <p>
          <a href={detail.openLibraryUrl} target="_blank" rel="noreferrer">
            Ver en Open Library
          </a>
        </p>
      </div>
    </div>
  );
}