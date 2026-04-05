"use client";

import { Product } from "@/lib/mockData";
import ProductCard from "./ProductCard";

interface ProductCarouselProps {
  products: Product[];
}

export default function ProductCarousel({ products }: ProductCarouselProps) {
  return (
    <div className="flex overflow-x-auto gap-3 pb-2 pl-5 [&::-webkit-scrollbar]:hidden [scrollbar-width:none]">
      {products.map((product) => (
        <div key={product.id} className="flex-shrink-0 w-[140px]">
          <ProductCard product={product} />
        </div>
      ))}
      {/* Trailing spacer so last card clears the right edge */}
      <div className="flex-shrink-0 w-5" aria-hidden="true" />
    </div>
  );
}
