'use client'
import { Product, ProductVariant } from "@/app/types/types";
import { motion } from "framer-motion";
import { useState } from "react";
import { useInView } from 'react-intersection-observer';
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardFooter } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Heart, ShoppingCart, Star } from "lucide-react";

export default function ProductGrid({ products }: { products: Product[] }) {
    const [, setHoveredProduct] = useState<number | null>(null);
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.1,
      });
    
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const [selectedVariantImages, setSelectedVariantImages] = useState<{ [productId: number]: string }>({}); // State pour l'image sélectionnée par produit

  const handleColorClick = (productId: number, variant: ProductVariant) => {
    if (variant.image && variant.image.length > 0) {
      setSelectedVariantImages((prev) => ({
        ...prev,
        [productId]: `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${variant.image[0]?.formats?.medium?.url ?? '/fallback-image-url.jpg'}`,
      }));
    } else {
      setSelectedVariantImages((prev) => ({
        ...prev,
        [productId]: '', // Pas d'image pour cette variante
      }));
    }
  };

  const getProductImage = (product: Product) => {
    return selectedVariantImages[product.id] || `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${product.variants[0]?.image?.[0]?.formats?.medium?.url ?? '/fallback-image-url.jpg'}`;
  };

    return (
        <motion.div
          ref={ref}
          variants={container}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {products.map((product) => (
            <motion.div key={product.id} variants={item}>
              <Card
                className="overflow-hidden h-full transition-all duration-300 hover:shadow-lg"
                onMouseEnter={() => setHoveredProduct(product.id)}
                onMouseLeave={() => setHoveredProduct(null)}
              >
                <Link href={`/products/${product.segment.slug}/${product.category.slug}/${product.slug}`} passHref>
                  <div className="relative aspect-[3/4] overflow-hidden cursor-pointer">
                    <Image
                      src={getProductImage(product)}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-500 hover:scale-105"
                    />
                    <div className="absolute top-2 left-2 flex flex-col gap-2">
                      <Badge className="bg-primary text-primary-foreground">Nouveau</Badge>
                    </div>
                    <div className="absolute top-2 right-2">
                      <Button variant="secondary" size="icon" className="rounded-full bg-white/80 hover:bg-white">
                        <Heart className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </Link>
                <CardContent className="p-4 flex justify-between">
                  <div>
                  <div className="flex items-center text-sm text-muted-foreground mb-2">
                    <span>{product.category.name}</span>
                    <span className="mx-2">•</span>
                    <div className="flex items-center">
                      <Star className="h-3 w-3 fill-current text-yellow-500 mr-1" />
                      <span>{`4.5`}</span>
                      <span className="ml-1">({34})</span>
                    </div>
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                  <div className="flex items-center">
                    <span className="font-bold text-lg">{product.price.toFixed(2)} €</span>
                  </div>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex flex-col items-center space-y-2">
                      {product.variants.map((variant) => (
                        <Button
                          key={variant.id}
                          variant="outline"
                          size="sm"
                          className="h-8 px-2 bg-white/20"
                          onClick={(e) => {
                            e.stopPropagation(); // Empêcher la propagation du clic au lien
                            handleColorClick(product.id, variant);
                          }}
                        >
                          {variant.color.name}
                        </Button>
                      ))}
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <Button className="w-full gap-2">
                    <ShoppingCart className="h-4 w-4" />
                    Ajouter au panier
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>
    )
}