"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Mail } from "lucide-react";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSend = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSent(true);
      setTimeout(() => router.push("/login"), 1500);
    }, 800);
  };

  return (
    <div className="flex flex-col flex-1 px-6 pt-12 pb-8">
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-[#666] hover:text-white transition-colors mb-8 w-fit"
      >
        <ArrowLeft size={18} />
        <span className="text-sm">Back</span>
      </button>

      <div className="mb-8">
        <div className="w-12 h-12 rounded-2xl bg-[#111] border border-[#222] flex items-center justify-center mb-4">
          <Mail size={24} className="text-green-500" />
        </div>
        <h1 className="text-3xl font-bold text-white">Reset password</h1>
        <p className="text-[#666] mt-1 text-sm">
          Enter your email and we&apos;ll send a confirmation link
        </p>
      </div>

      {sent ? (
        <div className="flex flex-col items-center gap-3 py-8">
          <div className="w-16 h-16 rounded-full bg-green-500/15 flex items-center justify-center">
            <span className="text-2xl">✓</span>
          </div>
          <p className="text-green-400 font-semibold">Email sent!</p>
          <p className="text-[#666] text-sm text-center">
            Redirecting back to login...
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <div>
            <label className="text-xs font-medium text-[#888] uppercase tracking-wider mb-2 block">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full bg-[#111] border border-[#222] rounded-xl px-4 py-3.5 text-white placeholder-[#444] text-sm focus:outline-none focus:border-green-500 transition-colors"
            />
          </div>

          <button
            onClick={handleSend}
            disabled={loading}
            className="mt-2 w-full bg-green-500 hover:bg-green-400 active:bg-green-600 disabled:opacity-60 text-black font-bold rounded-xl py-4 text-sm transition-all flex items-center justify-center gap-2"
          >
            {loading ? (
              <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
            ) : null}
            {loading ? "Sending..." : "Send Confirmation"}
          </button>
        </div>
      )}
    </div>
  );
}
