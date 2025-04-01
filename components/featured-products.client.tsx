"use client";

import ProductGrid from './product-grid';
import {Product} from "@/types/types";

export const FeaturedProducts = ({ products, title, subtitle }: { products: Product[], title: string, subtitle: string }) => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto md:px-24 px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>

        <ProductGrid products={products} />

        {/*<div className="text-center mt-12">*/}
        {/*  <Link href="/products">*/}
        {/*    <Button variant="outline" size="lg">*/}
        {/*      Voir tous les produits*/}
        {/*    </Button>*/}
        {/*  </Link>*/}
        {/*</div>*/}
      </div>
    </section>
  );
};