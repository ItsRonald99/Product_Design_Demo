"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { Settings, TrendingUp, ArrowRight } from "lucide-react";
import { useAppStore } from "@/store/useAppStore";
import { formatCurrency } from "@/lib/utils";
import TransactionItem from "@/components/TransactionItem";
import BottomNav from "@/components/BottomNav";

export default function HomePage() {
  const router = useRouter();
  const balance = useAppStore((s) => s.balance);
  const transactions = useAppStore((s) => s.transactions);

  return (
    <div className="flex flex-col flex-1 pb-24">
      {/* Header */}
      <div className="flex items-center justify-between px-5 pt-14 pb-4">
        <div>
          <p className="text-[#666] text-sm">Welcome back,</p>
          <h1 className="text-xl font-bold text-white">User</h1>
        </div>
        <button className="w-10 h-10 rounded-full bg-[#111] border border-[#222] flex items-center justify-center">
          <Settings size={18} className="text-[#666]" />
        </button>
      </div>

      {/* Balance Card */}
      <div className="mx-5 mb-5">
        <div className="bg-gradient-to-br from-green-500 to-green-700 rounded-3xl p-6 relative overflow-hidden">
          {/* Decorative circles */}
          <div className="absolute -right-8 -top-8 w-32 h-32 rounded-full bg-white/10" />
          <div className="absolute -right-2 top-10 w-20 h-20 rounded-full bg-white/5" />

          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-1">
              <TrendingUp size={14} className="text-green-900/60" />
              <p className="text-green-900/70 text-xs font-medium uppercase tracking-wider">
                Total Available Funds
              </p>
            </div>
            <p className="text-black font-black text-4xl mt-1">
              {formatCurrency(balance)}
            </p>
            <div className="flex items-center gap-1 mt-3">
              <div className="w-2 h-2 rounded-full bg-black/20" />
              <div className="w-2 h-2 rounded-full bg-black/20" />
              <div className="w-2 h-2 rounded-full bg-black/20" />
              <div className="w-2 h-2 rounded-full bg-black/20" />
              <span className="text-black/40 text-xs ml-1">•••• 4821</span>
            </div>
          </div>
        </div>
      </div>

      {/* Apply for Loan */}
      <div className="mx-5 mb-5">
        <button
          onClick={() => router.push("/loan")}
          className="w-full flex items-center justify-between bg-[#111] border border-[#222] hover:border-green-500/30 rounded-2xl px-5 py-4 transition-all group"
        >
          <div>
            <p className="text-sm font-bold text-white">Apply for a Loan</p>
            <p className="text-xs text-[#666] mt-0.5">Up to $75,000 available</p>
          </div>
          <ArrowRight
            size={18}
            className="text-[#444] group-hover:text-green-500 transition-colors"
          />
        </button>
      </div>

      {/* Transactions */}
      <div className="mx-5 flex-1">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-bold text-white">Recent Transactions</h2>
          <span className="text-xs text-[#555]">
            {transactions.length} total
          </span>
        </div>

        <div className="bg-[#111] border border-[#1e1e1e] rounded-2xl px-4 overflow-hidden">
          {transactions.length === 0 ? (
            <div className="py-8 text-center">
              <p className="text-[#444] text-sm">No transactions yet</p>
            </div>
          ) : (
            transactions
              .slice(0, 10)
              .map((tx) => <TransactionItem key={tx.id} tx={tx} />)
          )}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
