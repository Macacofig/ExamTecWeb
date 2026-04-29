type Props = {
  params: { workId: string };
};

export default async function LibroDetalle({ params }: Props) {
  const res = await fetch(
    `https://openlibrary.org/works/${params.workId}.json`
  );

  const data = await res.json();

  return (
    <div className="container">
      <h1>{data.title}</h1>

      <p>
        <strong>Descripción:</strong>{" "}
        {data.description?.value || "Sin descripción"}
      </p>
    </div>
  );
}