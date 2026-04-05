"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push("/home");
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
        <div className="w-12 h-12 rounded-2xl bg-green-500 flex items-center justify-center mb-4">
          <span className="text-black font-black text-xl">S</span>
        </div>
        <h1 className="text-3xl font-bold text-white">Create account</h1>
        <p className="text-[#666] mt-1 text-sm">
          Join Storio Bank today
        </p>
      </div>

      <div className="flex flex-col gap-4 flex-1">
        <div>
          <label className="text-xs font-medium text-[#888] uppercase tracking-wider mb-2 block">
            Full Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="John Doe"
            className="w-full bg-[#111] border border-[#222] rounded-xl px-4 py-3.5 text-white placeholder-[#444] text-sm focus:outline-none focus:border-green-500 transition-colors"
          />
        </div>

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

        <div>
          <label className="text-xs font-medium text-[#888] uppercase tracking-wider mb-2 block">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full bg-[#111] border border-[#222] rounded-xl px-4 py-3.5 text-white placeholder-[#444] text-sm focus:outline-none focus:border-green-500 transition-colors"
          />
        </div>

        <button
          onClick={handleRegister}
          disabled={loading}
          className="mt-2 w-full bg-green-500 hover:bg-green-400 active:bg-green-600 disabled:opacity-60 text-black font-bold rounded-xl py-4 text-sm transition-all flex items-center justify-center gap-2"
        >
          {loading ? (
            <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
          ) : null}
          {loading ? "Creating..." : "Create Account"}
        </button>

        <p className="text-center text-sm text-[#666]">
          Already have an account?{" "}
          <Link href="/login" className="text-green-500 font-medium hover:text-green-400">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
