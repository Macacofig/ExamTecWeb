export async function searchBooks(query: string) {
  const res = await fetch(
    `https://openlibrary.org/search.json?q=${query}`
  );

  const data = await res.json();

  return data.docs;
}