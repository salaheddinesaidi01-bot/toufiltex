"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Product, QuoteCartItem } from "./types";

interface CartContextType {
  items: QuoteCartItem[];
  addItem: (product: Product, quantityMeters?: number, sampleOnly?: boolean, selectedColor?: string) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  toggleSample: (productId: string) => void;
  clearCart: () => void;
  totalItems: number;
  isDrawerOpen: boolean;
  setIsDrawerOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<QuoteCartItem[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("toufiltex_quote_cart");
      if (saved) {
        setItems(JSON.parse(saved));
      }
    } catch (e) {
      console.error("Erreur lors de la lecture du panier de devis:", e);
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem("toufiltex_quote_cart", JSON.stringify(items));
      } catch (e) {
        console.error("Erreur lors de la sauvegarde du panier:", e);
      }
    }
  }, [items, isLoaded]);

  const addItem = (
    product: Product,
    quantityMeters = product.minOrderMeters || 10,
    sampleOnly = false,
    selectedColor?: string
  ) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? {
                ...item,
                quantityMeters: sampleOnly ? item.quantityMeters : item.quantityMeters + quantityMeters,
                sampleOnly: sampleOnly || item.sampleOnly,
                selectedColor: selectedColor || item.selectedColor,
              }
            : item
        );
      }
      return [
        ...prev,
        {
          product,
          quantityMeters,
          sampleOnly,
          selectedColor: selectedColor || (product.colors && product.colors[0]),
        },
      ];
    });
    setIsDrawerOpen(true);
  };

  const removeItem = (productId: string) => {
    setItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId);
      return;
    }
    setItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantityMeters: quantity } : item
      )
    );
  };

  const toggleSample = (productId: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, sampleOnly: !item.sampleOnly } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalItems = items.length;

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        toggleSample,
        clearCart,
        totalItems,
        isDrawerOpen,
        setIsDrawerOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
