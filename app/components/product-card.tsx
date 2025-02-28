'use client'
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Product } from "@/app/types/types";
import { Button } from "@/components/ui/button";

export default function ProductCard({ product }: { product: Product }) {
    // Placeholder pour la fonction addToCart.  Tu devras l'implémenter.
    const addToCart = () => {
        console.log(`Ajouter au panier: ${product.name}`);
        // Ici, tu devrais ajouter la logique pour ajouter le produit au panier.
        // Par exemple, en utilisant un contexte React ou une librairie de gestion d'état (Redux, Zustand).
    };

    return (
        <div
            className="group relative bg-white rounded-xl shadow-md overflow-hidden transform hover:scale-105 transition-transform duration-300 animate-slide-up"
        >
            <div className="relative h-[400px] overflow-hidden">
                <Image
                    src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${product.image.formats.medium?.url}`}
                    alt={product.name}
                    width={product.image.width}
                    height={product.image.height}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500 ease-in-out"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
                <Link
                    href={`/products/${product.slug}`}
                    className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white/80 text-gray-800 font-semibold px-4 py-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm hover:bg-white"
                >
                    Voir Plus
                </Link>
            </div>
            <div className="p-4 text-center"> {/* Padding réduit ici (p-4 au lieu de p-6) */}
                <h3 className="text-xl font-semibold text-gray-800 mb-1">{product.name}</h3> {/* Marge réduite ici (mb-1 au lieu de mb-2) */}
                <p className="text-gray-500 text-base">${product.price}</p> {/* Taille de police réduite ici (text-base au lieu de text-lg) */}
                <Button
                    onClick={addToCart}
                    className="mt-2" // Espacement réduit ici (mt-2 au lieu de mt-4)
                >
                    Ajouter au panier
                </Button>
                 {/*Exemple d'ajout d'une étoile de notation*/}
                {/*<div className="flex items-center justify-center mt-2">*/}
                {/*    <svg className="h-5 w-5 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">*/}
                {/*        <path d="M9.049 2.929c.3-.921 1.603-.921 1.903 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l.87 2.684c.312.955-.97 1.648-1.843 1.261l-2.225-1.637a1 1 0 00-1.121 0l-2.225 1.637c-.872.387-2.154-.307-1.843-1.261l.87-2.684a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-1.185-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z"/>*/}
                {/*    </svg>*/}
                {/*    <span className="ml-1 text-gray-600">4.5</span>*/}
                {/*</div>*/}
            </div>
        </div>
    );
}