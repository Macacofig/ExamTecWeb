import { Result } from "@/types/Result";
import { mapToBookDetail } from "@/utils/bookDetailMapper";

export async function getBookDetails(workId: string): Promise<Result<any>> {
  const request = await fetch(`https://openlibrary.org/works/${workId}.json`);

  if (!request.ok) {
    return Result.error(new Error("Error al obtener libro", { cause: request.status }));
  }

  let data = await request.json();
  data = mapToBookDetail(data, workId);
  return Result.success(data);
}