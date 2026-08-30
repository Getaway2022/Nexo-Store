'use client';

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import type { CartItem, Product } from '../types/product';

interface Value {
  items: CartItem[];
  count: number;
  subtotal: number;
  discount: number;
  total: number;
  isOpen: boolean;
  checkoutOpen: boolean;
  open: () => void;
  close: () => void;
  openCheckout: () => void;
  closeCheckout: () => void;
  clear: () => void;
  add: (product: Product) => void;
  change: (id: number, quantity: number) => void;
  remove: (id: number) => void;
}

const Context = createContext<Value | null>(null);

function isCartItem(value: unknown): value is CartItem {
  if (!value || typeof value !== 'object') return false;
  const item = value as Partial<CartItem>;
  return (
    typeof item.quantity === 'number' &&
    item.quantity > 0 &&
    Boolean(item.product) &&
    typeof item.product?.id === 'number' &&
    typeof item.product?.price === 'number'
  );
}

function readCart(): CartItem[] {
  if (typeof window === 'undefined') return [];

  try {
    const parsed: unknown = JSON.parse(localStorage.getItem('nexo-cart') ?? '[]');
    if (!Array.isArray(parsed)) {
      localStorage.removeItem('nexo-cart');
      return [];
    }
    return parsed.filter(isCartItem);
  } catch {
    localStorage.removeItem('nexo-cart');
    return [];
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(readCart);
  const [isOpen, setOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('nexo-cart', JSON.stringify(items));
  }, [items]);

  const count = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );
  const discount = items.reduce(
    (sum, item) =>
      sum +
      Math.max(
        0,
        (item.product.originalPrice ?? item.product.price) - item.product.price,
      ) *
        item.quantity,
    0,
  );
  const total = subtotal;

  const add = (product: Product) => {
    if (!product.inStock) return;
    setItems((current) => {
      const found = current.find((item) => item.product.id === product.id);
      return found
        ? current.map((item) =>
            item.product.id === product.id
              ? {
                  ...item,
                  quantity: Math.min(item.quantity + 1, product.stock ?? 99),
                }
              : item,
          )
        : [...current, { product, quantity: 1 }];
    });
    setOpen(true);
  };

  const change = (id: number, quantity: number) =>
    setItems((current) =>
      current.map((item) =>
        item.product.id === id
          ? {
              ...item,
              quantity: Math.min(
                Math.max(1, quantity),
                item.product.stock ?? 99,
              ),
            }
          : item,
      ),
    );

  const remove = (id: number) =>
    setItems((current) => current.filter((item) => item.product.id !== id));

  const openCheckout = () => {
    setOpen(false);
    setCheckoutOpen(true);
  };

  const value = useMemo(
    () => ({
      items,
      count,
      subtotal,
      discount,
      total,
      isOpen,
      checkoutOpen,
      open: () => setOpen(true),
      close: () => setOpen(false),
      openCheckout,
      closeCheckout: () => setCheckoutOpen(false),
      clear: () => setItems([]),
      add,
      change,
      remove,
    }),
    [items, count, subtotal, discount, total, isOpen, checkoutOpen],
  );

  return <Context.Provider value={value}>{children}</Context.Provider>;
}

export function useCart() {
  const value = useContext(Context);
  if (!value) throw new Error('useCart debe usarse dentro de CartProvider');
  return value;
}
