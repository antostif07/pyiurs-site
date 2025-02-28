"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
    ChevronRight,
    Star,
    Truck,
    RefreshCw,
    ShieldCheck,
    Heart,
    Share2,
    Minus,
    Plus,
    ShoppingCart
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {toast} from "sonner";
import {Product} from "@/app/types/types";
// import FeaturedProducts from '@/components/featured-products';

// Exemple de produit
const product = {
    id: "robe-fleurie-ete",
    name: "Robe Fleurie Été",
    price: 89.99,
    originalPrice: 129.99,
    rating: 4.8,
    reviews: 124,
    description: "Cette robe légère et élégante est parfaite pour les journées ensoleillées. Confectionnée en coton biologique, elle offre un confort optimal tout en vous assurant un style impeccable. Son motif floral délicat et sa coupe flatteuse en font une pièce incontournable de votre garde-robe estivale.",
    features: [
        "100% coton biologique",
        "Doublure en viscose",
        "Fermeture à boutons",
        "Lavable en machine à 30°C",
        "Fabriquée en France"
    ],
    colors: [
        { name: "Rouge", value: "#D32F2F", selected: true },
        { name: "Bleu", value: "#1976D2", selected: false },
        { name: "Noir", value: "#212121", selected: false }
    ],
    sizes: [
        { name: "XS", available: true, selected: false },
        { name: "S", available: true, selected: true },
        { name: "M", available: true, selected: false },
        { name: "L", available: true, selected: false },
        { name: "XL", available: false, selected: false }
    ],
    images: [
        "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?q=80&w=1976&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=2073&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1566174053879-31528523f8c6?q=80&w=1974&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1618932260643-eee4a2f652a6?q=80&w=1980&auto=format&fit=crop"
    ],
    category: "Robes",
    isNew: true,
    isSale: true,
    stock: 15,
    sku: "RF-2025-001",
    details: {
        material: "La robe est confectionnée en coton biologique certifié GOTS, garantissant une production respectueuse de l'environnement et des conditions de travail équitables. La doublure en viscose assure un confort optimal et une belle tenue du vêtement.",
        fit: "Coupe régulière, légèrement cintrée à la taille pour mettre en valeur la silhouette. La longueur midi est élégante et polyvalente, adaptée à toutes les morphologies.",
        care: "Lavable en machine à 30°C, cycle délicat. Ne pas utiliser d'eau de Javel. Séchage à plat recommandé. Repassage à température moyenne. Nettoyage à sec possible."
    }
};

export default function ProductPage({ product: prod }: { product: Product }) {
    console.log(prod)
    const [quantity, setQuantity] = useState(1);
    const [selectedImage, setSelectedImage] = useState(0);
    const [selectedColor, setSelectedColor] = useState(product.colors.findIndex(c => c.selected));
    const [selectedSize, setSelectedSize] = useState(product.sizes.findIndex(s => s.selected));

    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const increaseQuantity = () => {
        if (quantity < product.stock) {
            setQuantity(quantity + 1);
        }
    };

    const addToCart = () => {
        toast("Produit ajouté au panier");
    };

    const addToWishlist = () => {
        toast("Produit ajouté aux favoris");
    };

    return (
        <div className="pt-24 pb-16">
            <div className="container mx-auto px-4">
                {/* Breadcrumb */}
                <div className="flex items-center text-sm text-muted-foreground mb-8">
                    <Link href="/" className="hover:text-foreground transition-colors">
                        Accueil
                    </Link>
                    <ChevronRight className="h-4 w-4 mx-2" />
                    <Link href="/products" className="hover:text-foreground transition-colors">
                        Boutique
                    </Link>
                    <ChevronRight className="h-4 w-4 mx-2" />
                    <Link href={`/categories/${product.category.toLowerCase()}`} className="hover:text-foreground transition-colors">
                        {product.category}
                    </Link>
                    <ChevronRight className="h-4 w-4 mx-2" />
                    <span className="text-foreground">{product.name}</span>
                </div>

                <motion.div
                    ref={ref}
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="grid grid-cols-1 lg:grid-cols-2 gap-12"
                >
                    {/* Product Images */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="space-y-4"
                    >
                        <div className="relative aspect-[4/5] rounded-lg overflow-hidden">
                            <Image
                                src={product.images[selectedImage]}
                                alt={product.name}
                                fill
                                className="object-cover"
                            />
                            <div className="absolute top-4 left-4 flex flex-col gap-2">
                                {product.isNew && (
                                    <Badge className="bg-primary text-primary-foreground">Nouveau</Badge>
                                )}
                                {product.isSale && (
                                    <Badge variant="destructive">Soldes</Badge>
                                )}
                            </div>
                        </div>
                        <div className="grid grid-cols-4 gap-4">
                            {product.images.map((image, index) => (
                                <button
                                    key={index}
                                    onClick={() => setSelectedImage(index)}
                                    className={`relative aspect-square rounded-md overflow-hidden border-2 transition-all ${
                                        selectedImage === index ? 'border-primary' : 'border-transparent'
                                    }`}
                                >
                                    <Image
                                        src={image}
                                        alt={`${product.name} - Vue ${index + 1}`}
                                        fill
                                        className="object-cover"
                                    />
                                </button>
                            ))}
                        </div>
                    </motion.div>

                    {/* Product Info */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <div className="flex items-center text-sm text-muted-foreground mb-2">
                            <span>{product.category}</span>
                            <span className="mx-2">•</span>
                            <span>SKU: {product.sku}</span>
                            <span className="mx-2">•</span>
                            <div className="flex items-center">
                                <Star className="h-4 w-4 fill-current text-yellow-500 mr-1" />
                                <span>{product.rating}</span>
                                <Link href="#reviews" className="ml-1 underline">
                                    ({product.reviews} avis)
                                </Link>
                            </div>
                        </div>

                        <h1 className="text-3xl md:text-4xl font-bold mb-4">{product.name}</h1>

                        <div className="flex items-center mb-6">
                            <span className="text-2xl font-bold">{product.price.toFixed(2)} €</span>
                            {product.originalPrice && (
                                <span className="ml-3 text-muted-foreground line-through text-lg">
                  {product.originalPrice.toFixed(2)} €
                </span>
                            )}
                            {product.originalPrice && (
                                <Badge variant="destructive" className="ml-3">
                                    -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                                </Badge>
                            )}
                        </div>

                        <p className="text-muted-foreground mb-6">
                            {product.description}
                        </p>

                        <div className="space-y-6 mb-8">
                            {/* Color Selection */}
                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <span className="font-medium">Couleur</span>
                                    <span className="text-sm text-muted-foreground">
                    {product.colors[selectedColor].name}
                  </span>
                                </div>
                                <div className="flex space-x-3">
                                    {product.colors.map((color, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setSelectedColor(index)}
                                            className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                                selectedColor === index ? 'ring-2 ring-primary ring-offset-2' : ''
                                            }`}
                                            style={{ backgroundColor: color.value }}
                                            aria-label={`Couleur ${color.name}`}
                                        >
                                            {selectedColor === index && (
                                                <div className="w-6 h-6 rounded-full bg-white/30 flex items-center justify-center">
                                                    <Check />
                                                </div>
                                            )}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Size Selection */}
                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <span className="font-medium">Taille</span>
                                    <Link href="#" className="text-sm text-primary underline">
                                        Guide des tailles
                                    </Link>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {product.sizes.map((size, index) => (
                                        <button
                                            key={index}
                                            onClick={() => size.available && setSelectedSize(index)}
                                            disabled={!size.available}
                                            className={`h-10 min-w-[2.5rem] px-3 rounded border font-medium transition-colors ${
                                                !size.available
                                                    ? 'bg-muted/50 text-muted-foreground cursor-not-allowed border-muted'
                                                    : selectedSize === index
                                                        ? 'bg-primary text-primary-foreground border-primary'
                                                        : 'bg-background hover:border-primary border-input'
                                            }`}
                                        >
                                            {size.name}
                                        </button>
                                    ))}
                                </div>
                                {!product.sizes[selectedSize].available && (
                                    <p className="text-sm text-muted-foreground mt-2">
                                        Cette taille n'est pas disponible actuellement.
                                    </p>
                                )}
                            </div>

                            {/* Quantity */}
                            <div>
                                <span className="font-medium block mb-2">Quantité</span>
                                <div className="flex items-center">
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        onClick={decreaseQuantity}
                                        disabled={quantity <= 1}
                                    >
                                        <Minus className="h-4 w-4" />
                                    </Button>
                                    <span className="w-12 text-center">{quantity}</span>
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        onClick={increaseQuantity}
                                        disabled={quantity >= product.stock}
                                    >
                                        <Plus className="h-4 w-4" />
                                    </Button>
                                    <span className="ml-4 text-sm text-muted-foreground">
                    {product.stock} disponibles
                  </span>
                                </div>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col sm:flex-row gap-4 mb-8">
                            <Button
                                size="lg"
                                className="flex-1 gap-2"
                                onClick={addToCart}
                            >
                                <ShoppingCart className="h-5 w-5" />
                                Ajouter au panier
                            </Button>
                            <Button
                                variant="outline"
                                size="lg"
                                className="flex-1 gap-2"
                                onClick={addToWishlist}
                            >
                                <Heart className="h-5 w-5" />
                                Ajouter aux favoris
                            </Button>
                            <Button variant="outline" size="icon" className="h-12 w-12">
                                <Share2 className="h-5 w-5" />
                            </Button>
                        </div>

                        {/* Features */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                            <div className="flex items-center">
                                <Truck className="h-5 w-5 mr-2 text-primary" />
                                <span className="text-sm">Livraison gratuite dès 100€</span>
                            </div>
                            <div className="flex items-center">
                                <RefreshCw className="h-5 w-5 mr-2 text-primary" />
                                <span className="text-sm">Retours sous 30 jours</span>
                            </div>
                            <div className="flex items-center">
                                <ShieldCheck className="h-5 w-5 mr-2 text-primary" />
                                <span className="text-sm">Garantie qualité</span>
                            </div>
                        </div>

                        {/* Features List */}
                        <div className="mb-8">
                            <h3 className="font-medium mb-2">Caractéristiques</h3>
                            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                                {product.features.map((feature, index) => (
                                    <li key={index}>{feature}</li>
                                ))}
                            </ul>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Product Details Tabs */}
                <div className="mt-16">
                    <Tabs defaultValue="details">
                        <TabsList className="grid w-full grid-cols-3">
                            <TabsTrigger value="details">Détails du produit</TabsTrigger>
                            <TabsTrigger value="care">Entretien</TabsTrigger>
                            <TabsTrigger value="reviews">Avis clients</TabsTrigger>
                        </TabsList>
                        <TabsContent value="details" className="mt-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div>
                                    <h3 className="text-lg font-medium mb-4">Description</h3>
                                    <p className="text-muted-foreground mb-4">
                                        {product.description}
                                    </p>
                                    <p className="text-muted-foreground">
                                        {product.details.material}
                                    </p>
                                </div>
                                <div>
                                    <h3 className="text-lg font-medium mb-4">Coupe et taille</h3>
                                    <p className="text-muted-foreground">
                                        {product.details.fit}
                                    </p>
                                </div>
                            </div>
                        </TabsContent>
                        <TabsContent value="care" className="mt-6">
                            <h3 className="text-lg font-medium mb-4">Instructions d'entretien</h3>
                            <p className="text-muted-foreground">
                                {product.details.care}
                            </p>
                        </TabsContent>
                        <TabsContent value="reviews" className="mt-6" id="reviews">
                            <div className="flex items-center mb-6">
                                <div className="flex items-center mr-4">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            className={`h-5 w-5 ${
                                                i < Math.floor(product.rating) ? "text-yellow-500 fill-yellow-500" : "text-gray-300"
                                            }`}
                                        />
                                    ))}
                                </div>
                                <span className="text-xl font-medium">{product.rating}</span>
                                <span className="mx-2 text-muted-foreground">•</span>
                                <span className="text-muted-foreground">{product.reviews} avis</span>
                            </div>

                            <Separator className="my-6" />

                            <div className="space-y-6">
                                {/* Sample reviews */}
                                <div className="space-y-4">
                                    <div>
                                        <div className="flex items-center mb-2">
                                            <div className="flex items-center mr-2">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star
                                                        key={i}
                                                        className={`h-4 w-4 ${
                                                            i < 5 ? "text-yellow-500 fill-yellow-500" : "text-gray-300"
                                                        }`}
                                                    />
                                                ))}
                                            </div>
                                            <span className="font-medium">Marie L.</span>
                                            <span className="mx-2 text-muted-foreground">•</span>
                                            <span className="text-sm text-muted-foreground">Il y a 2 semaines</span>
                                        </div>
                                        <h4 className="font-medium mb-1">Magnifique robe, parfaite pour l'été !</h4>
                                        <p className="text-muted-foreground">
                                            J'ai acheté cette robe pour un mariage et elle est absolument parfaite ! La matière est de qualité,
                                            la coupe est flatteuse et les couleurs sont magnifiques. Je recommande vivement.
                                        </p>
                                    </div>

                                    <Separator />

                                    <div>
                                        <div className="flex items-center mb-2">
                                            <div className="flex items-center mr-2">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star
                                                        key={i}
                                                        className={`h-4 w-4 ${
                                                            i < 4 ? "text-yellow-500 fill-yellow-500" : "text-gray-300"
                                                        }`}
                                                    />
                                                ))}
                                            </div>
                                            <span className="font-medium">Sophie T.</span>
                                            <span className="mx-2 text-muted-foreground">•</span>
                                            <span className="text-sm text-muted-foreground">Il y a 1 mois</span>
                                        </div>
                                        <h4 className="font-medium mb-1">Très belle robe mais taille un peu grand</h4>
                                        <p className="text-muted-foreground">
                                            La robe est superbe, la matière est agréable et les finitions sont soignées.
                                            Seul bémol, elle taille un peu grand, j'aurais dû prendre une taille en dessous.
                                            Sinon, je suis très satisfaite de mon achat.
                                        </p>
                                    </div>

                                    <Separator />

                                    <div>
                                        <div className="flex items-center mb-2">
                                            <div className="flex items-center mr-2">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star
                                                        key={i}
                                                        className={`h-4 w-4 ${
                                                            i < 5 ? "text-yellow-500 fill-yellow-500" : "text-gray-300"
                                                        }`}
                                                    />
                                                ))}
                                            </div>
                                            <span className="font-medium">Camille D.</span>
                                            <span className="mx-2 text-muted-foreground">•</span>
                                            <span className="text-sm text-muted-foreground">Il y a 2 mois</span>
                                        </div>
                                        <h4 className="font-medium mb-1">Un coup de cœur !</h4>
                                        <p className="text-muted-foreground">
                                            Cette robe est un véritable coup de cœur ! Elle est encore plus belle en vrai que sur les photos.
                                            La matière est de qualité, la coupe est parfaite et les détails sont soignés.
                                            Je l'ai portée pour une soirée et j'ai reçu de nombreux compliments.
                                        </p>
                                    </div>
                                </div>

                                <Button variant="outline" className="w-full">
                                    Voir tous les avis
                                </Button>
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>

                {/*/!* Related Products *!/*/}
                {/*<div className="mt-20">*/}
                {/*    <h2 className="text-2xl font-bold mb-8">Vous aimerez aussi</h2>*/}
                {/*    <FeaturedProducts />*/}
                {/*</div>*/}
            </div>
        </div>
    );
}

function Check() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-white"
        >
            <polyline points="20 6 9 17 4 12" />
        </svg>
    );
}