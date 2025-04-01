// store/cartStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {CartItem, CartState} from "@/types/types";


const useCartStore = create<CartState>()(
    persist(
        (set, get) => ({
            cartItems: [],
            addToCart: (item: CartItem) => {
                set((state) => {
                    const existingItemIndex = state.cartItems.findIndex((cartItem) => cartItem.id === item.id);

                    if (existingItemIndex !== -1) {
                        const updatedCartItems = state.cartItems.map((cartItem, index) =>
                            index === existingItemIndex
                                ? { ...cartItem, quantity: cartItem.quantity + 1 }
                                : cartItem
                        );
                        return { cartItems: updatedCartItems };
                    } else {
                        return { cartItems: [...state.cartItems, { ...item, quantity: 1 }] };
                    }
                });
            },
            removeFromCart: (itemId: string) => {
                set((state) => ({
                    cartItems: state.cartItems.filter((item) => item.id !== itemId),
                }));
            },
            updateQuantity: (itemId: string, quantity: number) => {
                set((state) => ({
                    cartItems: state.cartItems.map((item) =>
                        item.id === itemId ? { ...item, quantity: quantity } : item
                    ),
                }));
            },
            clearCart: () => {
                set({ cartItems: [] });
            },
            get totalItems() {
                return get().cartItems.reduce((total, item) => total + item.quantity, 0);
            },
            get totalPrice() {
                return get().cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
            },
        }),
        {
            name: 'cart-storage', // unique name
        }
    )
);

export default useCartStore;