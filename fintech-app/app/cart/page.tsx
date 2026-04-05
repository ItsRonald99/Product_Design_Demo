"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ShoppingBag, AlertCircle } from "lucide-react";
import { useAppStore } from "@/store/useAppStore";
import { TAX_RATE } from "@/lib/mockData";
import { formatCurrency } from "@/lib/utils";
import CartItemRow from "@/components/CartItemRow";
import BottomNav from "@/components/BottomNav";

export default function CartPage() {
  const router = useRouter();
  const cart = useAppStore((s) => s.cart);
  const balance = useAppStore((s) => s.balance);
  const updateBalance = useAppStore((s) => s.updateBalance);
  const addTransaction = useAppStore((s) => s.addTransaction);
  const clearCart = useAppStore((s) => s.clearCart);

  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const tax = subtotal * TAX_RATE;
  const total = subtotal + tax;

  const handlePurchase = () => {
    if (balance < total) {
      setShowModal(true);
      return;
    }
    setLoading(true);
    setTimeout(() => {
      updateBalance(-total);
      addTransaction({
        title: `Store Purchase (${cart.reduce((a, i) => a + i.quantity, 0)} items)`,
        amount: total,
        type: "debit",
      });
      clearCart();
      setLoading(false);
      router.push("/home");
    }, 800);
  };

  return (
    <div className="flex flex-col flex-1 pb-24">
      {/* Header */}
      <div className="flex items-center gap-4 px-5 pt-14 pb-6">
        <button
          onClick={() => router.push("/store")}
          className="w-9 h-9 rounded-full bg-[#111] border border-[#222] flex items-center justify-center"
        >
          <ArrowLeft size={16} className="text-white" />
        </button>
        <div>
          <h1 className="text-xl font-bold text-white">Storio Cart</h1>
          <p className="text-xs text-[#555]">
            {cart.reduce((a, i) => a + i.quantity, 0)} items
          </p>
        </div>
      </div>

      {cart.length === 0 ? (
        <div className="flex flex-col items-center justify-center flex-1 gap-4 px-5">
          <div className="w-20 h-20 rounded-full bg-[#111] border border-[#1e1e1e] flex items-center justify-center">
            <ShoppingBag size={32} className="text-[#333]" />
          </div>
          <div className="text-center">
            <p className="text-white font-semibold">Your cart is empty</p>
            <p className="text-[#555] text-sm mt-1">
              Head to the store to add items
            </p>
          </div>
          <button
            onClick={() => router.push("/store")}
            className="bg-green-500 text-black font-bold rounded-xl px-6 py-3 text-sm mt-2"
          >
            Browse Store
          </button>
        </div>
      ) : (
        <>
          {/* Cart Items */}
          <div className="flex-1 px-5 overflow-y-auto">
            <div className="bg-[#111] border border-[#1e1e1e] rounded-2xl px-4 mb-4">
              {cart.map((item) => (
                <CartItemRow key={item.id} item={item} />
              ))}
            </div>

            {/* Summary */}
            <div className="bg-[#111] border border-[#1e1e1e] rounded-2xl p-5 flex flex-col gap-3">
              <div className="flex justify-between">
                <span className="text-sm text-[#888]">Item Subtotal</span>
                <span className="text-sm text-white font-medium">
                  {formatCurrency(subtotal)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-[#888]">
                  Taxes ({(TAX_RATE * 100).toFixed(0)}%)
                </span>
                <span className="text-sm text-white font-medium">
                  {formatCurrency(tax)}
                </span>
              </div>
              <div className="h-px bg-[#1e1e1e]" />
              <div className="flex justify-between">
                <span className="text-base font-bold text-white">Total</span>
                <span className="text-base font-black text-green-400">
                  {formatCurrency(total)}
                </span>
              </div>

              {/* Balance warning */}
              {balance < total && (
                <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-xl p-3 mt-1">
                  <AlertCircle size={14} className="text-red-400 flex-shrink-0" />
                  <p className="text-xs text-red-400">
                    Insufficient balance. Available: {formatCurrency(balance)}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Purchase button */}
          <div className="px-5 pt-3">
            <button
              onClick={handlePurchase}
              disabled={loading}
              className="w-full bg-green-500 hover:bg-green-400 active:bg-green-600 disabled:opacity-60 text-black font-bold rounded-xl py-4 text-sm transition-all flex items-center justify-center gap-2"
            >
              {loading ? (
                <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
              ) : null}
              {loading ? "Processing..." : `Purchase · ${formatCurrency(total)}`}
            </button>
          </div>
        </>
      )}

      {/* Insufficient Funds Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-end justify-center">
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setShowModal(false)}
          />
          <div className="relative w-full max-w-[400px] bg-[#111] border border-[#222] rounded-t-3xl p-6 pb-10 z-10">
            <div className="flex flex-col items-center gap-4 text-center">
              <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center">
                <AlertCircle size={32} className="text-red-400" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">
                  Insufficient Funds
                </h3>
                <p className="text-sm text-[#666] mt-1">
                  Your balance of {formatCurrency(balance)} is not enough to
                  cover {formatCurrency(total)}.
                </p>
              </div>
              <div className="w-full flex flex-col gap-2 mt-2">
                <button
                  onClick={() => {
                    setShowModal(false);
                    router.push("/loan");
                  }}
                  className="w-full bg-green-500 text-black font-bold rounded-xl py-3.5 text-sm"
                >
                  Apply for a Loan
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className="w-full border border-[#333] text-[#888] font-semibold rounded-xl py-3.5 text-sm"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <BottomNav />
    </div>
  );
}
