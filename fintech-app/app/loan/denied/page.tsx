"use client";

import { useRouter } from "next/navigation";
import { XCircle, ArrowLeft } from "lucide-react";
import BottomNav from "@/components/BottomNav";

export default function LoanDeniedPage() {
  const router = useRouter();

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
        <h1 className="text-xl font-bold text-white">Application Result</h1>
      </div>

      <div className="flex flex-col items-center px-5 pt-8 gap-8">
        {/* Denial icon */}
        <div className="flex flex-col items-center gap-4">
          <div className="w-24 h-24 rounded-full bg-red-500/10 flex items-center justify-center">
            <XCircle size={48} className="text-red-500/70" />
          </div>
          <div className="text-center">
            <h2 className="text-2xl font-black text-white leading-tight">
              Sorry, we could not
            </h2>
            <h2 className="text-2xl font-black text-white leading-tight">
              give you an offer
            </h2>
            <h2 className="text-2xl font-black text-[#666] leading-tight">
              at this time.
            </h2>
          </div>
        </div>

        {/* Reason card */}
        <div className="w-full bg-[#111] border border-[#1e1e1e] rounded-2xl p-5">
          <p className="text-xs text-[#888] uppercase tracking-wider font-medium mb-3">
            Why was I declined?
          </p>
          <ul className="flex flex-col gap-2.5">
            {[
              'Housing status must be "Own"',
              "Annual income must exceed $60,000",
              "Credit history review required",
            ].map((reason, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#444] mt-1.5 flex-shrink-0" />
                <span className="text-sm text-[#666]">{reason}</span>
              </li>
            ))}
          </ul>
        </div>

        <p className="text-xs text-[#444] text-center leading-relaxed">
          You may reapply after 30 days. Consider improving your financial
          profile before your next application.
        </p>

        {/* Actions */}
        <div className="w-full flex flex-col gap-3">
          <button
            onClick={() => router.push("/home")}
            className="w-full bg-[#111] border border-[#333] hover:border-[#444] text-white font-bold rounded-xl py-4 text-sm transition-all"
          >
            Return to Home
          </button>
          <button
            onClick={() => router.push("/loan")}
            className="w-full border border-[#1e1e1e] text-[#555] hover:text-[#888] font-semibold rounded-xl py-4 text-sm transition-all"
          >
            Try Again
          </button>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
