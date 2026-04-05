"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, ShoppingBag, CreditCard } from "lucide-react";
import { useAppStore } from "@/store/useAppStore";

export default function BottomNav() {
  const pathname = usePathname();
  const cart = useAppStore((s) => s.cart);
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const tabs = [
    { href: "/store", label: "Store", Icon: ShoppingBag },
    { href: "/home", label: "Bank", Icon: Home },
    { href: "/loan", label: "Loan", Icon: CreditCard },
  ];

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[400px] bg-[#0a0a0a] border-t border-[#222] z-50">
      <div className="flex items-center justify-around py-3 pb-5">
        {tabs.map(({ href, label, Icon }) => {
          const isActive =
            pathname === href || pathname.startsWith(href + "/");
          const isStore = href === "/store";

          return (
            <Link
              key={href}
              href={href}
              className="flex flex-col items-center gap-1 relative"
            >
              <div className="relative">
                <Icon
                  size={22}
                  className={isActive ? "text-green-500" : "text-[#666]"}
                />
                {isStore && cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-green-500 text-black text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                    {cartCount > 9 ? "9+" : cartCount}
                  </span>
                )}
              </div>
              <span
                className={`text-[11px] font-medium ${
                  isActive ? "text-green-500" : "text-[#666]"
                }`}
              >
                {label}
              </span>
              {isActive && (
                <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-1 h-1 bg-green-500 rounded-full" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
