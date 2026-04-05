"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push("/home");
    }, 800);
  };

  return (
    <div className="flex flex-col flex-1 px-6 pt-16 pb-8">
      {/* Logo */}
      <div className="mb-10">
        <div className="w-12 h-12 rounded-2xl bg-green-500 flex items-center justify-center mb-4">
          <span className="text-black font-black text-xl">S</span>
        </div>
        <h1 className="text-3xl font-bold text-white">Welcome back</h1>
        <p className="text-[#666] mt-1 text-sm">Sign in to your account</p>
      </div>

      {/* Form */}
      <div className="flex flex-col gap-4 flex-1">
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
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-medium text-[#888] uppercase tracking-wider">
              Password
            </label>
            <Link
              href="/forgot-password"
              className="text-xs text-green-500 hover:text-green-400 transition-colors"
            >
              Forgot password?
            </Link>
          </div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full bg-[#111] border border-[#222] rounded-xl px-4 py-3.5 text-white placeholder-[#444] text-sm focus:outline-none focus:border-green-500 transition-colors"
          />
        </div>

        <button
          onClick={handleLogin}
          disabled={loading}
          className="mt-2 w-full bg-green-500 hover:bg-green-400 active:bg-green-600 disabled:opacity-60 text-black font-bold rounded-xl py-4 text-sm transition-all flex items-center justify-center gap-2"
        >
          {loading ? (
            <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
          ) : null}
          {loading ? "Signing in..." : "Login"}
        </button>

        <div className="flex items-center gap-3 my-2">
          <div className="flex-1 h-px bg-[#1e1e1e]" />
          <span className="text-[#444] text-xs">or</span>
          <div className="flex-1 h-px bg-[#1e1e1e]" />
        </div>

        <Link
          href="/register"
          className="w-full border border-[#333] hover:border-[#444] text-white font-semibold rounded-xl py-4 text-sm transition-all text-center block"
        >
          Create Account
        </Link>
      </div>
    </div>
  );
}
