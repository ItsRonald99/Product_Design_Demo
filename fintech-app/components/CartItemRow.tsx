"use client";

import { CartItem } from "@/store/useAppStore";
import { formatCurrency } from "@/lib/utils";
import { useAppStore } from "@/store/useAppStore";
import { Minus, Plus, Trash2 } from "lucide-react";

export default function CartItemRow({ item }: { item: CartItem }) {
  const updateCartQty = useAppStore((s) => s.updateCartQty);
  const removeFromCart = useAppStore((s) => s.removeFromCart);

  return (
    <div className="flex items-center gap-3 py-3 border-b border-[#1a1a1a] last:border-0">
      <div className="w-12 h-12 rounded-xl bg-[#1a1a1a] flex items-center justify-center text-2xl flex-shrink-0">
        {item.emoji || "🛒"}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-white leading-tight truncate">
          {item.name}
        </p>
        <p className="text-xs text-green-400 font-semibold mt-0.5">
          {formatCurrency(item.price)}
        </p>
      </div>
      <div className="flex items-center gap-2">
        <div className="flex items-center bg-[#1a1a1a] rounded-lg overflow-hidden">
          <button
            onClick={() => updateCartQty(item.id, -1)}
            className="p-1.5 text-[#888] hover:text-white hover:bg-[#222] transition-colors"
          >
            <Minus size={12} />
          </button>
          <span className="text-xs font-bold text-white px-2">
            {item.quantity}
          </span>
          <button
            onClick={() => updateCartQty(item.id, 1)}
            className="p-1.5 text-green-400 hover:bg-[#222] transition-colors"
          >
            <Plus size={12} />
          </button>
        </div>
        <button
          onClick={() => removeFromCart(item.id)}
          className="p-1.5 text-[#555] hover:text-red-400 transition-colors"
        >
          <Trash2 size={14} />
        </button>
      </div>
    </div>
  );
}
