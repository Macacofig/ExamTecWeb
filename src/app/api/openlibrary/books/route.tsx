import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const query = searchParams.get("q") || "";
  const title = searchParams.get("title") || "";
  const author = searchParams.get("author") || "";
  const language = searchParams.get("lang") || "";
  const page = searchParams.get("page") || "1";
  const sort = searchParams.get("sort") || "";

  const openLibraryParams = new URLSearchParams();

  if (query) openLibraryParams.append("q", query);
  if (title) openLibraryParams.append("title", title);
  if (author) openLibraryParams.append("author", author);
  if (language) openLibraryParams.append("lang", language);
  if (page) openLibraryParams.append("page", page);
  if (sort) openLibraryParams.append("sort", sort);

  const openLibraryUrl = `https://openlibrary.org/search.json?${openLibraryParams.toString()}`;

  try {
    const res = await fetch(openLibraryUrl);

    if (!res.ok) {
      return NextResponse.json(
        { error: `Error HTTP: ${res.status} ${res.statusText}` },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: `Error de red: ${error instanceof Error ? error.message : String(error)}` },
      { status: 500 }
    );
  }
}