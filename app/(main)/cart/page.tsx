"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
    ChevronRight,
    X,
    ShoppingBag,
    ArrowRight,
    CreditCard,
    ShieldCheck,
    Truck
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
// import {toast} from "sonner";
import useCartStore from "@/store/cart";
import LivraisonForm from "@/components/livraison-form";

export default function CartPage() {
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });
    const cart = useCartStore()

    // Panier vide
    if (cart.cartItems.length === 0) {
        return (
            <div className="pt-24 pb-16">
                <div className="container mx-auto md:px-24 px-4">
                    <div className="flex items-center text-sm text-muted-foreground mb-8">
                        <Link href="/" className="hover:text-foreground transition-colors">
                            Accueil
                        </Link>
                        <ChevronRight className="h-4 w-4 mx-2" />
                        <span className="text-foreground">Panier</span>
                    </div>

                    <div className="flex flex-col items-center justify-center py-16 text-center">
                        <div className="bg-muted/30 rounded-full p-6 mb-6">
                            <ShoppingBag className="h-12 w-12 text-muted-foreground" />
                        </div>
                        <h1 className="text-2xl font-bold mb-2">Votre panier est vide</h1>
                        <p className="text-muted-foreground mb-8 max-w-md">
                            {`Il semble que vous n'ayez pas encore ajouté d'articles à votre panier.`}
                            Parcourez notre collection et trouvez des pièces qui vous plaisent.
                        </p>
                        <Link href="/products">
                            <Button size="lg" className="gap-2">
                                Continuer mes achats
                                <ArrowRight className="h-4 w-4" />
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="pt-24 pb-16">
            <div className="container mx-auto md:px-24 px-4">
                <div className="flex items-center text-sm text-muted-foreground mb-8">
                    <Link href="/" className="hover:text-foreground transition-colors">
                        Accueil
                    </Link>
                    <ChevronRight className="h-4 w-4 mx-2" />
                    <span className="text-foreground">Panier</span>
                </div>

                <h1 className="text-3xl font-bold mb-8">Votre Panier</h1>

                <motion.div
                    ref={ref}
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="grid grid-cols-1 lg:grid-cols-3 gap-8"
                >
                    {/* Cart Items */}
                    <div className="lg:col-span-2">
                        <div className="bg-background rounded-lg border p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-xl font-semibold">Articles ({cart.cartItems.length})</h2>
                                <Button variant="ghost" size="sm" onClick={cart.clearCart}>
                                    Vider le panier
                                </Button>
                            </div>

                            <div className="space-y-6">
                                {cart.cartItems.map((item, index) => (
                                    <div key={item.id}>
                                        <div className="flex flex-col sm:flex-row gap-4">
                                            <div className="relative w-full sm:w-24 h-32 rounded-md overflow-hidden">
                                                {/*<Image*/}
                                                {/*    src={item.image.url}*/}
                                                {/*    alt={item.name}*/}
                                                {/*    fill*/}
                                                {/*    className="object-cover"*/}
                                                {/*/>*/}
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex justify-between">
                                                    <div>
                                                        <h3 className="font-medium">{item.name}</h3>
                                                        <p className="text-sm text-muted-foreground mb-1">
                                                            Couleur: {item.color?.name} | Taille: {item.size}
                                                        </p>
                                                        <div className="flex items-center mt-2">
                                                            {/*<Button*/}
                                                            {/*    variant="outline"*/}
                                                            {/*    size="icon"*/}
                                                            {/*    className="h-8 w-8"*/}
                                                            {/*    onClick={() => updateQuantity(item.id, item.quantity - 1)}*/}
                                                            {/*>*/}
                                                            {/*    <Minus className="h-3 w-3" />*/}
                                                            {/*</Button>*/}
                                                            <span className="w-8 text-center">{item.quantity}</span>
                                                            {/*<Button*/}
                                                            {/*    variant="outline"*/}
                                                            {/*    size="icon"*/}
                                                            {/*    className="h-8 w-8"*/}
                                                            {/*    onClick={() => updateQuantity(item.id, item.quantity + 1)}*/}
                                                            {/*>*/}
                                                            {/*    <Plus className="h-3 w-3" />*/}
                                                            {/*</Button>*/}
                                                        </div>
                                                    </div>
                                                    <div className="text-right">
                                                        <div className="flex items-center">
                                                            <span className="font-medium">{(item.price * item.quantity).toFixed(2)} $</span>
                                                            {/*{item.price && (*/}
                                                            {/*    <span className="ml-2 text-muted-foreground line-through text-sm">*/}
                                                            {/*  {(item.price * item.quantity).toFixed(2)} €*/}
                                                            {/*</span>*/}
                                                            {/*)}*/}
                                                        </div>
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            className="h-8 px-2 text-muted-foreground hover:text-destructive mt-2"
                                                            onClick={() => cart.removeFromCart(item.id)}
                                                        >
                                                            <X className="h-4 w-4 mr-1" />
                                                            Supprimer
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {index < cart.cartItems.length - 1 && <Separator className="my-6" />}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <LivraisonForm />
                    </div>

                    {/* Order Summary */}
                    <div>
                        <div className="bg-background rounded-lg border p-6 sticky top-24">
                            <h2 className="text-xl font-semibold mb-6">Récapitulatif</h2>

                            <div className="space-y-4 mb-6">
                                {/*<div className="flex justify-between">*/}
                                {/*    <span className="text-muted-foreground">Sous-total</span>*/}
                                {/*    <span>{subtotal.toFixed(2)} €</span>*/}
                                {/*</div>*/}
                                {/*{isPromoApplied && (*/}
                                {/*    <div className="flex justify-between text-green-600">*/}
                                {/*        <span>Réduction (20%)</span>*/}
                                {/*        <span>-{discount.toFixed(2)} €</span>*/}
                                {/*    </div>*/}
                                {/*)}*/}
                                {/*<div className="flex justify-between">*/}
                                    {/*<span className="text-muted-foreground">Frais de livraison</span>*/}
                                    {/*<span>{shipping === 0 ? "Gratuit" : `${shipping.toFixed(2)} €`}</span>*/}
                                {/*</div>*/}
                                <Separator />
                                <div className="flex justify-between font-bold text-lg">
                                    <span>Total</span>
                                    <span>{cart.cartItems.reduce((acc, val) => (acc + (val.price * val.quantity)), 0).toFixed(2)} $</span>
                                </div>
                            </div>

                            {/* Promo Code */}
                            {/*<div className="mb-6">*/}
                            {/*    <Label htmlFor="promo-code">Code promo</Label>*/}
                            {/*    <div className="flex mt-1.5">*/}
                            {/*        <Input*/}
                            {/*            id="promo-code"*/}
                            {/*            value={promoCode}*/}
                            {/*            onChange={(e) => setPromoCode(e.target.value)}*/}
                            {/*            placeholder="Entrez votre code"*/}
                            {/*            className="rounded-r-none"*/}
                            {/*            disabled={isPromoApplied}*/}
                            {/*        />*/}
                            {/*        <Button*/}
                            {/*            onClick={applyPromoCode}*/}
                            {/*            disabled={!promoCode || isPromoApplied}*/}
                            {/*            className="rounded-l-none"*/}
                            {/*        >*/}
                            {/*            Appliquer*/}
                            {/*        </Button>*/}
                            {/*    </div>*/}
                            {/*    {isPromoApplied && (*/}
                            {/*        <p className="text-sm text-green-600 mt-2">*/}
                            {/*            Code promo PROMO20 appliqué (-20%)*/}
                            {/*        </p>*/}
                            {/*    )}*/}
                            {/*</div>*/}

                            <Button size="lg" className="w-full gap-2 mb-4">
                                Passer à la caisse
                                <ArrowRight className="h-4 w-4" />
                            </Button>

                            {/* <div className="flex justify-center space-x-4 mb-4">
                                <img src="https://cdn-icons-png.flaticon.com/512/196/196578.png" alt="Visa" className="h-8" />
                                <img src="https://cdn-icons-png.flaticon.com/512/196/196561.png" alt="MasterCard" className="h-8" />
                                <img src="https://cdn-icons-png.flaticon.com/512/196/196565.png" alt="PayPal" className="h-8" />
                                <img src="https://cdn-icons-png.flaticon.com/512/196/196539.png" alt="American Express" className="h-8" />
                            </div> */}

                            <div className="space-y-3 text-sm text-muted-foreground">
                                {/*<div className="flex items-center">*/}
                                {/*    <ShieldCheck className="h-4 w-4 mr-2 text-primary" />*/}
                                {/*    <span>Paiement 100% sécurisé</span>*/}
                                {/*</div>*/}
                                <div className="flex items-center">
                                    <Truck className="h-4 w-4 mr-2 text-primary" />
                                    <span>Livraison rapide et suivie</span>
                                </div>
                                <div className="flex items-center">
                                    <CreditCard className="h-4 w-4 mr-2 text-primary" />
                                    <span>Plusieurs méthodes de paiement</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}