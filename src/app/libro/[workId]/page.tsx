type Props = {
  params: Promise<{ workId: string }>;
};

export default async function LibroDetalle({ params }: Props) {
  const { workId } = await params;

  const res = await fetch(
    `https://openlibrary.org/works/${workId}.json`
  );

  const data = await res.json();

  return (
    <div>
      <h1>{data.title}</h1>
      <p>{data.description?.value || "Sin descripción"}</p>
    </div>
  );
}