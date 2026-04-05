"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Settings, LogOut } from "lucide-react";
import { useAppStore } from "@/store/useAppStore";
import { cn } from "@/lib/utils";

export default function SettingsDropdown() {
  const router = useRouter();
  const resetStore = useAppStore((s) => s.resetStore);
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  const handleLogout = () => {
    setOpen(false);
    resetStore();
    router.push("/login");
  };

  return (
    <div ref={containerRef} className="relative">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className={cn(
          "w-10 h-10 rounded-full bg-[#111] border flex items-center justify-center transition-colors",
          open ? "border-green-500/40" : "border-[#222]"
        )}
        aria-label="Settings"
        aria-expanded={open}
      >
        <Settings
          size={18}
          className={cn(
            "transition-colors",
            open ? "text-green-500" : "text-[#666]"
          )}
        />
      </button>

      {/* Dropdown */}
      <div
        className={cn(
          "absolute right-0 top-12 w-40 bg-[#111] border border-[#1e1e1e] rounded-xl shadow-lg shadow-black/50 overflow-hidden z-50",
          "transition-all duration-150 origin-top-right",
          open
            ? "opacity-100 scale-100 pointer-events-auto"
            : "opacity-0 scale-95 pointer-events-none"
        )}
      >
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 text-sm text-[#ccc] hover:text-white hover:bg-[#1a1a1a] active:bg-[#222] transition-colors cursor-pointer"
        >
          <LogOut size={14} className="text-[#666]" />
          Log Out
        </button>
      </div>
    </div>
  );
}
