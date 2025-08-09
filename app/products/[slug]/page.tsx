import { fetchProductBySlug } from '@/services/products';
import ProductDetail from '@/components/ProductDetail';

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; // ⬅️ Await here
  const product = await fetchProductBySlug(slug);

  return <ProductDetail product={product} />;
}
