"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ShoppingCart, Search } from "lucide-react";
import { PRODUCTS, CATEGORIES } from "@/lib/mockData";
import ProductCard from "@/components/ProductCard";
import ProductCarousel from "@/components/ProductCarousel";
import BottomNav from "@/components/BottomNav";
import { useAppStore } from "@/store/useAppStore";

export default function StorePage() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const cart = useAppStore((s) => s.cart);
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const filtered = query
    ? PRODUCTS.filter((p) =>
        p.name.toLowerCase().includes(query.toLowerCase())
      )
    : PRODUCTS;

  return (
    <div className="flex flex-col flex-1 pb-24">
      {/* Header */}
      <div className="flex items-center justify-between px-5 pt-14 pb-4">
        <div>
          <h1 className="text-2xl font-black text-white">Storio</h1>
          <p className="text-xs text-[#555] mt-0.5">Fresh picks delivered</p>
        </div>
        <button
          onClick={() => router.push("/cart")}
          className="relative w-10 h-10 rounded-full bg-[#111] border border-[#222] flex items-center justify-center"
        >
          <ShoppingCart size={18} className="text-white" />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-green-500 text-black text-[9px] font-black rounded-full w-4.5 h-4.5 min-w-[18px] min-h-[18px] flex items-center justify-center px-1">
              {cartCount}
            </span>
          )}
        </button>
      </div>

      {/* Search */}
      <div className="px-5 mb-4">
        <div className="relative">
          <Search
            size={15}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-[#444]"
          />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search Storio..."
            className="w-full bg-[#111] border border-[#1e1e1e] rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-[#444] focus:outline-none focus:border-green-500/50 transition-colors"
          />
        </div>
      </div>

      {/* Products */}
      <div className="flex-1 overflow-y-auto">
        {query ? (
          <div className="px-5">
            <p className="text-xs text-[#555] mb-3">
              {filtered.length} result{filtered.length !== 1 ? "s" : ""} for &quot;{query}&quot;
            </p>
            <div className="grid grid-cols-3 gap-2.5">
              {filtered.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            {CATEGORIES.map((cat) => {
              const items = PRODUCTS.filter((p) => p.category === cat);
              return (
                <div key={cat}>
                  <div className="flex items-center justify-between px-5 mb-3">
                    <h3 className="text-sm font-bold text-white">{cat}</h3>
                    <span className="text-xs text-[#444]">
                      {items.length} items
                    </span>
                  </div>
                  <ProductCarousel products={items} />
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Floating cart button if items in cart */}
      {cartCount > 0 && (
        <div className="fixed bottom-[76px] left-1/2 -translate-x-1/2 w-full max-w-[400px] px-5 z-40">
          <button
            onClick={() => router.push("/cart")}
            className="w-full bg-green-500 hover:bg-green-400 active:bg-green-600 text-black font-bold rounded-2xl py-4 text-sm transition-all flex items-center justify-between px-5 shadow-lg shadow-green-500/20"
          >
            <span className="bg-black/20 rounded-lg px-2 py-0.5 text-xs font-black">
              {cartCount}
            </span>
            <span>View Cart</span>
            <ShoppingCart size={16} />
          </button>
        </div>
      )}

      <BottomNav />
    </div>
  );
}
