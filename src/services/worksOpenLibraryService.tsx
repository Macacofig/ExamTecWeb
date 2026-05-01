import { bookDetail } from "@/types/bookDetail";
import { Result } from "@/types/Result";
import { mapToBookDetail } from "@/utils/bookDetailMapper";

export async function getBookDetails(workId: string): Promise<Result<bookDetail>> {
  const request = await fetch(`https://openlibrary.org/works/${workId}.json`);

  if (!request.ok) {
    return Result.error(new Error("HTTP Error:", { cause: request.status }));
  }

  const data = await request.json();
  const detail = await mapToBookDetail(data, workId);
  return Result.success(detail);
}