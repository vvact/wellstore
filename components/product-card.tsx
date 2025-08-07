// components/product-card.tsx
import Image from 'next/image';
import { Button } from '@/components/ui/button';

export function ProductCard({ product }: { product: any }) {
  return (
    <div className="border rounded-lg p-4 hover:shadow-md transition">
      <Image
        src={product.image}
        alt={product.name}
        width={300}
        height={300}
        className="w-full h-[200px] object-cover rounded"
      />
      <h3 className="mt-2 font-medium">{product.name}</h3>
      <p className="text-sm text-muted-foreground">{product.category}</p>
      <p className="mt-1 font-semibold text-primary">KSh {product.price}</p>
      <Button className="mt-2 w-full">Add to Cart</Button>
    </div>
  );
}
