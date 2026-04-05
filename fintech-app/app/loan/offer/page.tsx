"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle, ArrowLeft } from "lucide-react";
import { useAppStore } from "@/store/useAppStore";
import BottomNav from "@/components/BottomNav";
import { formatCurrency } from "@/lib/utils";

const LOAN_AMOUNT = 5000;

export default function LoanOfferPage() {
  const router = useRouter();
  const updateBalance = useAppStore((s) => s.updateBalance);
  const addTransaction = useAppStore((s) => s.addTransaction);
  const applyLoan = useAppStore((s) => s.applyLoan);
  const [loading, setLoading] = useState(false);

  const handleAccept = () => {
    setLoading(true);
    setTimeout(() => {
      updateBalance(LOAN_AMOUNT);
      addTransaction({
        title: "Loan Credit",
        amount: LOAN_AMOUNT,
        type: "credit",
      });
      applyLoan(true);
      setLoading(false);
      router.push("/home");
    }, 800);
  };

  const handleDecline = () => {
    router.push("/home");
  };

  return (
    <div className="flex flex-col flex-1 pb-24">
      {/* Header */}
      <div className="flex items-center gap-4 px-5 pt-14 pb-6">
        <button
          onClick={() => router.push("/loan")}
          className="w-9 h-9 rounded-full bg-[#111] border border-[#222] flex items-center justify-center"
        >
          <ArrowLeft size={16} className="text-white" />
        </button>
        <h1 className="text-xl font-bold text-white">Loan Offer</h1>
      </div>

      <div className="flex flex-col items-center px-5 pt-8 gap-8">
        {/* Success icon */}
        <div className="flex flex-col items-center gap-4">
          <div className="w-24 h-24 rounded-full bg-green-500/15 flex items-center justify-center">
            <CheckCircle size={48} className="text-green-500" />
          </div>
          <div className="text-center">
            <h2 className="text-2xl font-black text-white">Congratulations!</h2>
            <p className="text-[#666] text-sm mt-1">
              You&apos;ve been pre-approved
            </p>
          </div>
        </div>

        {/* Offer card */}
        <div className="w-full bg-gradient-to-br from-green-500/20 to-green-900/20 border border-green-500/30 rounded-3xl p-6 flex flex-col items-center gap-2">
          <p className="text-[#888] text-xs uppercase tracking-wider font-medium">
            Your Offer
          </p>
          <p className="text-5xl font-black text-green-400">
            {formatCurrency(LOAN_AMOUNT)}
          </p>
          <div className="flex gap-4 mt-2 text-center">
            <div>
              <p className="text-[#555] text-xs">Rate</p>
              <p className="text-white text-sm font-semibold">7.9% APR</p>
            </div>
            <div className="w-px bg-[#222]" />
            <div>
              <p className="text-[#555] text-xs">Term</p>
              <p className="text-white text-sm font-semibold">36 months</p>
            </div>
            <div className="w-px bg-[#222]" />
            <div>
              <p className="text-[#555] text-xs">Monthly</p>
              <p className="text-white text-sm font-semibold">$156/mo</p>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <p className="text-xs text-[#444] text-center leading-relaxed">
          By accepting, the funds will be deposited into your Storio Bank
          account immediately. Terms and conditions apply.
        </p>

        {/* Actions */}
        <div className="w-full flex flex-col gap-3">
          <button
            onClick={handleAccept}
            disabled={loading}
            className="w-full bg-green-500 hover:bg-green-400 active:bg-green-600 disabled:opacity-60 text-black font-bold rounded-xl py-4 text-sm transition-all flex items-center justify-center gap-2"
          >
            {loading ? (
              <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
            ) : null}
            {loading ? "Processing..." : "Accept Offer"}
          </button>

          <button
            onClick={handleDecline}
            className="w-full border border-[#333] hover:border-[#444] text-[#888] hover:text-white font-semibold rounded-xl py-4 text-sm transition-all"
          >
            Decline
          </button>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
