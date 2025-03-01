"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Product } from '@/app/types/types'; // Ajout de l'import pour Variant
import ProductGrid from './product-grid';

export const FeaturedProducts = ({ products }: { products: Product[] }) => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Produits Populaires</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Découvrez notre sélection de produits les plus appréciés par nos clientes.
            Des pièces élégantes et confortables pour toutes les occasions.
          </p>
        </div>

        <ProductGrid products={products} />

        <div className="text-center mt-12">
          <Link href="/products">
            <Button variant="outline" size="lg">
              Voir tous les produits
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};