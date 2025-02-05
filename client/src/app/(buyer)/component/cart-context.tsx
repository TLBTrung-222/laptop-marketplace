'use client'
import { CartItem } from "@/types"
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

type CartContextType = {
    cart: CartItem[],
    addToCart: (product: CartItem) => void;
    removeFromCart: (id: number) => void;
    clearCart:()=>void;
    increaseQuantity: (id: number) => void;
    decreaseQuantity: (id: number) => void;
    totalPrice:number;
    totalPriceProducts: number;
}

const CartContext = createContext<CartContextType|undefined>(undefined);
export const CartProvider = ({children}:{children: React.ReactNode})=>{
    const loadCartFromStorage = () => {
        const storedCart = localStorage.getItem("cart");
        return storedCart ? JSON.parse(storedCart) : [];
    };

    const [cart, setCart] = useState<CartItem[]>(loadCartFromStorage);

    useEffect(() => {
        // Lưu giỏ hàng vào localStorage mỗi khi cart thay đổi
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    const addToCart = (product: CartItem) => {
        setCart((prevCart) => {
        const existingItem = prevCart.find((item) => item.id === product.id);
        if (existingItem) {
            toast.info("Updated product's count of cart items!")
            return prevCart.map((item) =>
            item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
            );  
        }
        else toast.success("Have added product to cart!")
        return [...prevCart, { ...product, quantity: 1 }];
        });
    };

    const removeFromCart = (id: number) => {
        setCart((prevCart) => prevCart.filter((item) => item.id !== id));
    };

    const clearCart = () => {
        setCart([]);
        localStorage.removeItem("cart");
    }

    const totalPrice = useMemo(() => {
        return cart.reduce((sum, item) => sum + item.quantity, 0);
    }, [cart]);

    const increaseQuantity = (id: number) => {
        setCart((prevCart) => 
            prevCart.map((item) =>
                item.id === id ? { ...item, quantity: item.quantity + 1 } : item
            )
        );
    };

    const decreaseQuantity = (id: number) => {
        setCart((prevCart) => 
            prevCart.map((item) =>
                item.id === id && item.quantity > 1 
                ? { ...item, quantity: item.quantity - 1 } 
                : item
            )
        );
    };

    const totalPriceProducts = useMemo(() => {
        return cart.reduce((sum, item) => sum + item.quantity*item.price, 0);
    }, [cart]);

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, totalPrice, increaseQuantity, decreaseQuantity, totalPriceProducts }}>
        {children}
        </CartContext.Provider>
    );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};