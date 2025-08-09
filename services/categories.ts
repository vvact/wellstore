export async function fetchCategories() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories/active/`, {
    next: { revalidate: 300 }, // cache for 5 mins
  });

  if (!res.ok) {
    throw new Error('Failed to fetch categories');
  }

  const data = await res.json();
  return data.results; // Just return the array of categories
}
