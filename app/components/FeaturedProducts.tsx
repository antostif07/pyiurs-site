// components/FeaturedProducts.js
import React from 'react';
import { ApiResponse, Product } from "@/app/types/types";
import Image from "next/image";
import Link from 'next/link';
import ProductCard from "@/app/components/product-card";

const FeaturedProducts = async () => {
    const apiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL;

    const response = await fetch(`${apiUrl}/api/products?populate=image&populate=variants&limit=4`  );

    const json: ApiResponse<Product> = await response.json();

    if (json.error) {
        return <div>{`Erreur Interne. Contactez l'Administrateur.`}</div>;
    }

    const products: Product[] = json.data

    return (
        <div className="bg-gray-100 py-16"> {/* Ajout d'un fond gris clair */}
            <div className="max-w-7xl mx-auto px-4  py-16">
                <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-12 animate-fade-in">
                    Explorez Nos Tendances Actuelles
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {products.map((product, index) => (
                        <ProductCard product={product} key={index} />
                    ))}
                </div>
                {/* Bouton "Voir Plus" en dessous des produits */}
                {/*<div className="text-center mt-8">*/}
                {/*    <Link href="/products" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">*/}
                {/*        Voir tous les produits*/}
                {/*    </Link>*/}
                {/*</div>*/}
            </div>
        </div>
    );
};

export default FeaturedProducts;