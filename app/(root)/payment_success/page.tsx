"use client"

import useCart from "@/lib/hooks/useCart";
import Link from "next/link";
import { useEffect } from "react";

const SuccessfulPayment = () => {
  const cart = useCart();

  useEffect(() => {
    cart.clearCart();
  }, []);

  return (
    <div className="h-screen flex flex-col justify-center items-center gap-5">
      <p className="text-heading4-bold text-red-1">Платіж успішний</p>
      <p>Дякуємо за замовлення!</p>
      <Link
        href="/"
        className="p-4 border text-base-bold hover:bg-black hover:text-white"
      >
        ПРОДОВЖИТИ ПОКУПКИ
      </Link>
    </div>
  );
};

export default SuccessfulPayment;
