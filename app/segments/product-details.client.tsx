'use client';

// import React, { useState } from 'react';
import {Product} from "@/app/types/types";

export default function ProductDetailsClient({product}: {product: Product}) {
    // const [selectedImage, setSelectedImage] = useState(0);
    // const [selectedSize, setSelectedSize] = useState('');
    // const [selectedColor, setSelectedColor] = useState('');

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Produit principal */}
        {/*<div className="grid md:grid-cols-2 gap-12 mb-16">*/}
        {/*    /!* Galerie d'images *!/*/}
        {/*    <div className="space-y-4">*/}
        {/*        <div className="aspect-w-3 aspect-h-4 overflow-hidden rounded-lg">*/}
        {/*            <img*/}
        {/*                src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${product.variants[selectedImage].image.formats.medium.url}`}*/}
        {/*                alt={product.name}*/}
        {/*                className="w-full h-full object-cover"*/}
        {/*            />*/}
        {/*        </div>*/}
        {/*        <div className="grid grid-cols-3 gap-4">*/}
        {/*            {product.variants.map((variant, index) => (*/}
        {/*                <button*/}
        {/*                    key={index}*/}
        {/*                    onClick={() => setSelectedImage(variant.id)}*/}
        {/*                    className={`aspect-w-3 aspect-h-4 overflow-hidden rounded-lg ${*/}
        {/*                        selectedImage === variant.id ? 'ring-2 ring-primary' : ''*/}
        {/*                    }`}*/}
        {/*                >*/}
        {/*                    <img src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${product.variants?[selectedImage].image.formats.medium.url}`} alt="" className="w-full h-full object-cover"/>*/}
        {/*                </button>*/}
        {/*            ))}*/}
        {/*        </div>*/}
        {/*    </div>*/}

        {/*    /!* Informations produit *!/*/}
        {/*    <div>*/}
        {/*        <div className="mb-6">*/}
        {/*            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>*/}
        {/*            <div className="flex items-center gap-4 mb-4">*/}
        {/*                <div className="flex items-center">*/}
        {/*                    {[...Array(5)].map((_, i) => (*/}
        {/*                        <Star*/}
        {/*                            key={i}*/}
        {/*                            className={`h-5 w-5 ${*/}
        {/*                                i < Math.floor(product.rating)*/}
        {/*                                    ? 'text-yellow-400 fill-current'*/}
        {/*                                    : 'text-gray-300'*/}
        {/*                            }`}*/}
        {/*                        />*/}
        {/*                    ))}*/}
        {/*                    <span className="ml-2 text-gray-600">({product.reviews} avis)</span>*/}
        {/*                </div>*/}
        {/*                <span className="text-gray-600">Catégorie: {product.category}</span>*/}
        {/*            </div>*/}
        {/*            <p className="text-2xl font-bold text-primary">{product.price}€</p>*/}
        {/*        </div>*/}

        {/*        <div className="space-y-6 mb-8">*/}
        {/*            <div>*/}
        {/*                <h3 className="font-medium mb-2">Description</h3>*/}
        {/*                <p className="text-gray-600">{product.description}</p>*/}
        {/*            </div>*/}

        {/*            <div>*/}
        {/*                <h3 className="font-medium mb-2">Taille</h3>*/}
        {/*                <Select value={selectedSize} onValueChange={setSelectedSize}>*/}
        {/*                    <SelectTrigger className="w-full">*/}
        {/*                        <SelectValue placeholder="Sélectionnez une taille"/>*/}
        {/*                    </SelectTrigger>*/}
        {/*                    <SelectContent>*/}
        {/*                        {product.sizes.map((size) => (*/}
        {/*                            <SelectItem key={size} value={size}>*/}
        {/*                                {size}*/}
        {/*                            </SelectItem>*/}
        {/*                        ))}*/}
        {/*                    </SelectContent>*/}
        {/*                </Select>*/}
        {/*            </div>*/}

        {/*            <div>*/}
        {/*                <h3 className="font-medium mb-2">Couleur</h3>*/}
        {/*                <Select value={selectedColor} onValueChange={setSelectedColor}>*/}
        {/*                    <SelectTrigger className="w-full">*/}
        {/*                        <SelectValue placeholder="Sélectionnez une couleur"/>*/}
        {/*                    </SelectTrigger>*/}
        {/*                    <SelectContent>*/}
        {/*                        {product.colors.map((color) => (*/}
        {/*                            <SelectItem key={color} value={color}>*/}
        {/*                                {color}*/}
        {/*                            </SelectItem>*/}
        {/*                        ))}*/}
        {/*                    </SelectContent>*/}
        {/*                </Select>*/}
        {/*            </div>*/}

        {/*            <div className="flex gap-4">*/}
        {/*                <Button className="flex-1">*/}
        {/*                    <ShoppingCart className="mr-2 h-4 w-4"/> Ajouter au panier*/}
        {/*                </Button>*/}
        {/*                <Button variant="outline" size="icon">*/}
        {/*                    <Heart className="h-4 w-4"/>*/}
        {/*                </Button>*/}
        {/*                <Button variant="outline" size="icon">*/}
        {/*                    <Share2 className="h-4 w-4"/>*/}
        {/*                </Button>*/}
        {/*            </div>*/}

        {/*            <div className="flex items-center gap-2 text-gray-600">*/}
        {/*                <Truck className="h-5 w-5"/>*/}
        {/*                <span>Livraison gratuite à partir de 50€</span>*/}
        {/*            </div>*/}
        {/*        </div>*/}

        {/*        <div className="border-t pt-6">*/}
        {/*            <h3 className="font-medium mb-4">Caractéristiques</h3>*/}
        {/*            <ul className="space-y-2">*/}
        {/*                {product.features.map((feature, index) => (*/}
        {/*                    <li key={index} className="flex items-center gap-2 text-gray-600">*/}
        {/*                        <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>*/}
        {/*                        {feature}*/}
        {/*                    </li>*/}
        {/*                ))}*/}
        {/*            </ul>*/}
        {/*        </div>*/}
        {/*    </div>*/}
        {/*</div>*/}

        {/* Produits similaires */}
        {/*<div>*/}
        {/*    <h2 className="text-2xl font-bold mb-6">Produits similaires</h2>*/}
        {/*    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">*/}
        {/*        {similarProducts.map((product) => (*/}
        {/*            <Card key={product.id} className="overflow-hidden group">*/}
        {/*                <div className="aspect-w-3 aspect-h-4">*/}
        {/*                    <img*/}
        {/*                        src={product.image}*/}
        {/*                        alt={product.name}*/}
        {/*                        className="w-full h-full object-cover transition-transform group-hover:scale-105"*/}
        {/*                    />*/}
        {/*                </div>*/}
        {/*                <div className="p-4">*/}
        {/*                    <h3 className="font-semibold mb-2">{product.name}</h3>*/}
        {/*                    <p className="text-primary font-medium">{product.price}€</p>*/}
        {/*                    <Button className="w-full mt-4">Voir le produit</Button>*/}
        {/*                </div>*/}
        {/*            </Card>*/}
        {/*        ))}*/}
        {/*    </div>*/}
        {/*</div>*/}
    </div>
    )
}