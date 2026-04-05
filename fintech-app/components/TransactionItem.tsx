import { Transaction } from "@/store/useAppStore";
import { formatCurrency, formatDate } from "@/lib/utils";
import { ArrowUpRight, ArrowDownLeft } from "lucide-react";

export default function TransactionItem({ tx }: { tx: Transaction }) {
  const isCredit = tx.type === "credit";

  return (
    <div className="flex items-center justify-between py-3 border-b border-[#1a1a1a] last:border-0">
      <div className="flex items-center gap-3">
        <div
          className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 ${
            isCredit ? "bg-green-500/15" : "bg-red-500/10"
          }`}
        >
          {isCredit ? (
            <ArrowDownLeft size={16} className="text-green-400" />
          ) : (
            <ArrowUpRight size={16} className="text-red-400" />
          )}
        </div>
        <div>
          <p className="text-sm font-medium text-white leading-tight">
            {tx.title}
          </p>
          <p className="text-xs text-[#666] mt-0.5">{formatDate(tx.date)}</p>
        </div>
      </div>
      <span
        className={`text-sm font-semibold ${
          isCredit ? "text-green-400" : "text-red-400"
        }`}
      >
        {isCredit ? "+" : "-"}
        {formatCurrency(tx.amount)}
      </span>
    </div>
  );
}
