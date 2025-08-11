// services/fetchCategories.ts

export async function fetchCategories() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/products/categories/`,
    {
      next: { revalidate: 300 }, // cache for 5 mins
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch categories");
  }

  const data = await res.json();
  return data; // No .results — your API returns an array
}
