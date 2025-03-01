'use client'
import React from 'react';
import {Product} from "@/app/types/types";
import {Button} from "@/components/ui/button";
import {Card} from "@/components/ui/card";
import {motion} from "framer-motion";
import useCartStore from "@/store/cart";
import Image from 'next/image'

interface ProductGridProps {
    products: Product[];
}

export default function ProductGrid({ products }: ProductGridProps) {
    const {addToCart} = useCartStore()
    
    const cardVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: "easeOut",
            },
        },
    };

    return (
        <div className="md:col-span-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                    <motion.div
                        className="group"
                        variants={cardVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        key={product.id}
                    >
                        <Card className="h-ful overflow-hidden l flex flex-col justify-between"> {/* Make Card take full height and use flex */}
                            <div className="aspect-w-3 aspect-h-4">
                                <Image
                                    src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${product.image.formats.medium?.url}`}
                                    alt={product.name} width={product.image.width} height={product.image.height}
                                    className="object-cover w-full h-full transition-transform group-hover:scale-105"
                                />
                            </div>
                            <div className="p-4 flex flex-col flex-grow"> {/* Make content fill remaining space */}
                                <h3 className="font-semibold">{product.name}</h3>
                                <p className="text-gray-600 mb-4">{product.price}€</p>
                                <Button
                                    onClick={() => addToCart({
                                        image: {url: product.image.formats.small?.url || ''}, price: product.price, quantity: 1,
                                        name: product.name,
                                        id: product.documentId
                                    })}
                                    className="w-full mt-auto"  // Push button to the bottom
                                >
                                    Ajouter au panier
                                </Button>
                            </div>
                        </Card>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}