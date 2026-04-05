"use client";

import { Product } from "@/lib/mockData";
import { formatCurrency } from "@/lib/utils";
import { useAppStore } from "@/store/useAppStore";
import { Plus, Minus } from "lucide-react";

export default function ProductCard({ product }: { product: Product }) {
  const cart = useAppStore((s) => s.cart);
  const addToCart = useAppStore((s) => s.addToCart);
  const updateCartQty = useAppStore((s) => s.updateCartQty);

  const cartItem = cart.find((c) => c.id === product.id);
  const qty = cartItem?.quantity ?? 0;

  return (
    <div className="bg-[#111] rounded-2xl p-3 flex flex-col items-center gap-2 border border-[#1e1e1e] active:scale-95 transition-transform">
      <div className="w-14 h-14 rounded-xl bg-[#1a1a1a] flex items-center justify-center text-3xl">
        {product.emoji}
      </div>
      <div className="text-center w-full">
        <p className="text-xs font-medium text-white leading-tight line-clamp-1">
          {product.name}
        </p>
        <p className="text-xs text-green-400 font-semibold mt-0.5">
          {formatCurrency(product.price)}
        </p>
      </div>

      {qty === 0 ? (
        <button
          onClick={() =>
            addToCart({
              id: product.id,
              name: product.name,
              price: product.price,
              image: product.image,
              category: product.category,
              emoji: product.emoji,
            })
          }
          className="w-full flex items-center justify-center gap-1 bg-green-500 hover:bg-green-400 active:bg-green-600 text-black text-xs font-bold rounded-lg py-1.5 transition-colors"
        >
          <Plus size={12} />
          Add
        </button>
      ) : (
        <div className="flex items-center justify-between w-full bg-[#1a1a1a] rounded-lg overflow-hidden">
          <button
            onClick={() => updateCartQty(product.id, -1)}
            className="flex-1 flex items-center justify-center py-1.5 text-white hover:bg-[#222] active:bg-[#333] transition-colors"
          >
            <Minus size={12} />
          </button>
          <span className="text-xs font-bold text-white px-1">{qty}</span>
          <button
            onClick={() => updateCartQty(product.id, 1)}
            className="flex-1 flex items-center justify-center py-1.5 text-green-400 hover:bg-[#222] active:bg-[#333] transition-colors"
          >
            <Plus size={12} />
          </button>
        </div>
      )}
    </div>
  );
}
