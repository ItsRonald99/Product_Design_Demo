"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type TransactionType = "credit" | "debit";

export interface Transaction {
  id: string;
  title: string;
  amount: number;
  type: TransactionType;
  date: string;
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  emoji: string;
  quantity: number;
}

export interface AppState {
  balance: number;
  transactions: Transaction[];
  cart: CartItem[];
  loanApproved: boolean;

  updateBalance: (amount: number) => void;
  addTransaction: (tx: Omit<Transaction, "id" | "date">) => void;
  addToCart: (item: Omit<CartItem, "quantity">) => void;
  removeFromCart: (id: string) => void;
  updateCartQty: (id: string, delta: number) => void;
  clearCart: () => void;
  applyLoan: (approved: boolean) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      balance: 1000,
      transactions: [
        {
          id: "init-1",
          title: "Welcome Bonus",
          amount: 1000,
          type: "credit",
          date: new Date().toISOString(),
        },
      ],
      cart: [],
      loanApproved: false,

      updateBalance: (amount) =>
        set((state) => ({ balance: state.balance + amount })),

      addTransaction: (tx) =>
        set((state) => ({
          transactions: [
            {
              ...tx,
              id: `tx-${Date.now()}-${Math.random().toString(36).slice(2)}`,
              date: new Date().toISOString(),
            },
            ...state.transactions,
          ],
        })),

      addToCart: (item) =>
        set((state) => {
          const existing = state.cart.find((c) => c.id === item.id);
          if (existing) {
            return {
              cart: state.cart.map((c) =>
                c.id === item.id ? { ...c, quantity: c.quantity + 1 } : c
              ),
            };
          }
          return { cart: [...state.cart, { ...item, quantity: 1 }] };
        }),

      removeFromCart: (id) =>
        set((state) => ({ cart: state.cart.filter((c) => c.id !== id) })),

      updateCartQty: (id, delta) =>
        set((state) => ({
          cart: state.cart
            .map((c) =>
              c.id === id ? { ...c, quantity: c.quantity + delta } : c
            )
            .filter((c) => c.quantity > 0),
        })),

      clearCart: () => set({ cart: [] }),

      applyLoan: (approved) => set({ loanApproved: approved }),
    }),
    {
      name: "storio-bank-storage",
    }
  )
);
