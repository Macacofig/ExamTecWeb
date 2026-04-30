import { getBookDetails } from "@/services/worksOpenLibraryService";
import BookDetail from "@/components/BookDetail/BookDetail";

type Props = {
  params: Promise<{ workId: string }>;
};

export default async function LibroDetallePage({ params }: Props) {
  const { workId } = await params;

  const result = await getBookDetails(workId);

  if (result.isFailure()) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <p>Error: {result.getError()?.message}</p>
      </div>
    );
  }

  const data = result.getValue();

  if (!data) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <p>Error: No se encontraron los datos del libro.</p>
      </div>
    );
  }

  return <BookDetail detail={data} />;
}