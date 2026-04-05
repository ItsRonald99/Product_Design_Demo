"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import BottomNav from "@/components/BottomNav";
import { formatCurrency } from "@/lib/utils";

const LOAN_MIN = 2000;
const LOAN_MAX = 75000;

export default function LoanPage() {
  const router = useRouter();
  const [amount, setAmount] = useState(10000);
  const [purpose, setPurpose] = useState("");
  const [housing, setHousing] = useState("");
  const [income, setIncome] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      const approved = housing === "Own" && Number(income) > 60000;
      router.push(approved ? "/loan/offer" : "/loan/denied");
    }, 1000);
  };

  const isValid = purpose && housing && income;

  return (
    <div className="flex flex-col flex-1 pb-24">
      {/* Header */}
      <div className="flex items-center gap-4 px-5 pt-14 pb-6">
        <button
          onClick={() => router.push("/home")}
          className="w-9 h-9 rounded-full bg-[#111] border border-[#222] flex items-center justify-center"
        >
          <ArrowLeft size={16} className="text-white" />
        </button>
        <div>
          <h1 className="text-xl font-bold text-white">Loan Application</h1>
          <p className="text-xs text-[#666]">Fill in your details below</p>
        </div>
      </div>

      <div className="px-5 flex flex-col gap-5">
        {/* Amount Slider */}
        <div className="bg-[#111] border border-[#1e1e1e] rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm font-semibold text-white">Requested Amount</p>
            <span className="text-green-400 font-bold text-sm">
              {formatCurrency(amount)}
            </span>
          </div>
          <input
            type="range"
            min={LOAN_MIN}
            max={LOAN_MAX}
            step={500}
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="w-full h-2 rounded-full appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(to right, #22c55e ${
                ((amount - LOAN_MIN) / (LOAN_MAX - LOAN_MIN)) * 100
              }%, #222 ${
                ((amount - LOAN_MIN) / (LOAN_MAX - LOAN_MIN)) * 100
              }%)`,
            }}
          />
          <div className="flex justify-between mt-2">
            <span className="text-xs text-[#555]">
              {formatCurrency(LOAN_MIN)}
            </span>
            <span className="text-xs text-[#555]">
              {formatCurrency(LOAN_MAX)}
            </span>
          </div>
        </div>

        {/* Loan Purpose */}
        <div>
          <label className="text-xs font-medium text-[#888] uppercase tracking-wider mb-2 block">
            Loan Purpose
          </label>
          <select
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
            className="w-full bg-[#111] border border-[#222] rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-green-500 transition-colors appearance-none cursor-pointer"
            style={{ color: purpose ? "white" : "#444" }}
          >
            <option value="" disabled>
              Select purpose
            </option>
            <option value="Education">Education</option>
            <option value="Debt Consolidation">Debt Consolidation</option>
            <option value="Expenses">Expenses</option>
          </select>
        </div>

        {/* Housing Status */}
        <div>
          <label className="text-xs font-medium text-[#888] uppercase tracking-wider mb-2 block">
            Housing Status
          </label>
          <div className="grid grid-cols-2 gap-3">
            {["Own", "Rent"].map((opt) => (
              <button
                key={opt}
                onClick={() => setHousing(opt)}
                className={`py-3 rounded-xl text-sm font-semibold border transition-all ${
                  housing === opt
                    ? "bg-green-500 border-green-500 text-black"
                    : "bg-[#111] border-[#222] text-[#666] hover:border-[#333]"
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        {/* Income */}
        <div>
          <label className="text-xs font-medium text-[#888] uppercase tracking-wider mb-2 block">
            Gross Annual Income
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#555] text-sm font-medium">
              $
            </span>
            <input
              type="number"
              value={income}
              onChange={(e) => setIncome(e.target.value)}
              placeholder="0"
              className="w-full bg-[#111] border border-[#222] rounded-xl pl-8 pr-4 py-3.5 text-white placeholder-[#444] text-sm focus:outline-none focus:border-green-500 transition-colors"
            />
          </div>
        </div>

        <button
          onClick={handleSubmit}
          disabled={!isValid || loading}
          className="w-full bg-green-500 hover:bg-green-400 active:bg-green-600 disabled:opacity-40 text-black font-bold rounded-xl py-4 text-sm transition-all flex items-center justify-center gap-2 mt-1"
        >
          {loading ? (
            <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
          ) : null}
          {loading ? "Processing..." : "Submit Application"}
        </button>
      </div>

      <BottomNav />
    </div>
  );
}
