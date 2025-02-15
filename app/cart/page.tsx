'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Minus, Plus, Trash2 } from 'lucide-react';
import Link from 'next/link';
import PageHeroSection from "@/app/components/segments/PageHeroSection";
import {CartItem} from "@/app/types/types";
import useCartStore from "@/store/cart";

export default function Cart() {
    const [cart, setCart] = useState<CartItem[]>([]);
    const {cartItems} = useCartStore()

    const updateQuantity = (id: string, change: number) => {
        setCart(cart.map(item => {
            if (item.id === id) {
                const newQuantity = Math.max(1, item.quantity + change);
                return { ...item, quantity: newQuantity };
            }
            return item;
        }));
    };

    const removeItem = (id: string) => {
        setCart(cart.filter(item => item.id !== id));
    };

    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    // const shipping = 5.99;
    const total = subtotal;

    console.log(process.env.NEXT_PUBLIC_STRAPI_API_URL)
    return (
        <div className="mx-auto">
            <PageHeroSection title={'Panier'} image={`https://plus.unsplash.com/premium_photo-1661405432649-3ae63605a463?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`} />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Articles du panier */}
                    <div className="lg:col-span-2 space-y-4">
                        {cartItems.length === 0 ? (
                            <div className="text-center py-8">
                                <p className="text-gray-600 mb-4">Votre panier est vide</p>
                                <Button asChild>
                                    <Link href="/">Continuer mes achats</Link>
                                </Button>
                            </div>
                        ) : (
                            cartItems.map((item) => (
                                <Card key={item.id} className="p-4">
                                    <div className="flex gap-4">
                                        <div className="w-24 h-24 overflow-hidden rounded-md">
                                            <img
                                                src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${item.image.url}`}
                                                alt={item.name}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex justify-between">
                                                <h3 className="font-semibold">{item.name}</h3>
                                                <button
                                                    onClick={() => removeItem(item.id)}
                                                    className="text-gray-400 hover:text-destructive"
                                                >
                                                    <Trash2 className="h-5 w-5" />
                                                </button>
                                            </div>
                                            {/*<p className="text-gray-600">Taille: {item.size}</p>*/}
                                            <p className="font-medium">{item.price}$</p>
                                            <div className="flex items-center gap-2 mt-2">
                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                    onClick={() => updateQuantity(item.id, -1)}
                                                >
                                                    <Minus className="h-4 w-4" />
                                                </Button>
                                                <span className="w-8 text-center">{item.quantity}</span>
                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                    onClick={() => updateQuantity(item.id, 1)}
                                                >
                                                    <Plus className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            ))
                        )}
                    </div>

                    {/* Résumé de la commande */}
                    {cartItems.length > 0 && (
                        <div className="lg:col-span-1">
                            <Card className="p-6">
                                <h2 className="text-xl font-semibold mb-4">Résumé de la commande</h2>
                                <div className="space-y-2">
                                    <div className="flex justify-between">
                                        <span>Sous-total</span>
                                        <span>{subtotal.toFixed(2)}$</span>
                                    </div>
                                    {/*<div className="flex justify-between">*/}
                                    {/*    <span>Frais de livraison</span>*/}
                                    {/*    <span>{shipping.toFixed(2)}€</span>*/}
                                    {/*</div>*/}
                                    <div className="border-t pt-2 mt-2">
                                        <div className="flex justify-between font-semibold">
                                            <span>Total</span>
                                            <span>{total.toFixed(2)}$</span>
                                        </div>
                                    </div>
                                </div>
                                <Button className="w-full mt-6">
                                    Passer la commande
                                </Button>
                            </Card>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}