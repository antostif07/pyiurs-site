import {Product, ProductVariant} from "@/types/types";
import {Card, CardContent, CardFooter} from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";
import {Heart, ShoppingCart, Star} from "lucide-react";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";
import {motion} from "framer-motion";
import {useCallback, useState} from "react";
import {toast} from "sonner";
import useCartStore from "@/store/cart";

export default function ProductCard({product}: {product: Product}) {
    const cart = useCartStore()
    const [selectedVariantImages, setSelectedVariantImages] = useState<{ [productId: number]: string }>({});

    const handleColorClick = (productId: number, variant: ProductVariant) => {
        const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL || '';
        const variantImageObject = variant.image?.[0]; // Accès sécurisé
        const variantImagePath = variantImageObject?.formats?.medium?.url || variantImageObject?.url || null;

        if (variantImagePath) {
            const fullUrl = `${strapiUrl}${variantImagePath}`;
            setSelectedVariantImages((prev) => ({
                ...prev,
                [productId]: fullUrl, // Stocke l'URL complète
            }));
        } else {
            // Si ce variant spécifique n'a pas d'image, on supprime la sélection
            // pour laisser getProductImage choisir le fallback (1er variant ou image principale)
            setSelectedVariantImages((prev) => {
                const newState = { ...prev };
                delete newState[productId]; // Supprime la clé pour ce produit
                return newState;
            });
        }
    };

    const getProductImage = (product: Product): string | null => {
        // Récupérer l'URL base de Strapi (avec un fallback vide si non défini)
        const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL || '';

        // Fonction helper pour obtenir l'URL d'une image Strapi (préfère 'medium')
        const getImageUrlPath = (imageObject: any): string | null => {
            // Vérifie si l'objet image et l'URL existent
            if (!imageObject) return null;
            // Préfère le format 'medium', sinon l'URL de base
            return imageObject.formats?.medium?.url || imageObject.url || null;
        };

        // 1. Vérifier l'image du variant sélectionné
        const selectedVariantUrl = selectedVariantImages[product.id];
        // S'assurer que l'URL sélectionnée n'est pas juste une chaîne vide ou null/undefined
        if (selectedVariantUrl) {
            // On suppose que handleColorClick stocke déjà l'URL complète
            return selectedVariantUrl;
        }

        // 2. Vérifier l'image du premier variant (s'il y a des variants)
        if (product.variants && product.variants.length > 0) {
            const firstVariantImage = product.variants[0]?.image?.[0]; // Accès sécurisé
            const firstVariantPath = getImageUrlPath(firstVariantImage);
            if (firstVariantPath) {
                return `${strapiUrl}${firstVariantPath}`;
            }
            // Si le premier variant n'a pas d'image, on passe à l'image principale (ci-dessous)
        }

        // 3. Vérifier l'image principale du produit
        // (S'applique si pas de variants, ou si le 1er variant n'a pas d'image)
        const mainProductImage = product.image; // L'image principale du produit
        const mainImagePath = getImageUrlPath(mainProductImage);
        if (mainImagePath) {
            return `${strapiUrl}${mainImagePath}`;
        }

        // 4. Si aucune image valide n'a été trouvée
        return null; // Retourne null pour indiquer "rien"
    };

    const imageUrl = getProductImage(product)

    const [, setHoveredProduct] = useState<number | null>(null);
    const addToCart = useCallback(() => {
        cart.addToCart({
            image: {
                url: `${process.env.NEXT_PUBLIC_STRAPI_URL}${product.image?.url}`
            },
            name: product.name,
            price: product.price,
            id: product.documentId,
            quantity: 1,
            color: product.variants[0].color,
            size: product.variants[0].sizes[0].name
        })

        toast("Produit ajouté aux favoris", {
            description: `${product.name} a été ajouté à votre liste de souhaits.`,
        });
    }, [product.name, cart, product.documentId, product.image?.url, product.price, product.variants]);

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    };

    return (
        <motion.div key={product.id} variants={item}>
            <Card
                className="overflow-hidden h-full transition-all duration-300 hover:shadow-lg"
                onMouseEnter={() => setHoveredProduct(product.id)}
                onMouseLeave={() => setHoveredProduct(null)}
            >
                <Link href={`/products/${product.segment?.slug}/${product.category?.slug}/${product.sub_category?.slug}/${product.slug}`} passHref>
                    <div className="relative aspect-[3/4] overflow-hidden cursor-pointer">
                        {imageUrl ? ( // Condition pour afficher l'image seulement si imageUrl n'est pas null
                            <Image
                                src={imageUrl}
                                alt={product.name}
                                fill
                                className="object-cover transition-transform duration-500 hover:scale-105"
                                // Optionnel mais recommandé : gestion d'erreur si l'URL est invalide
                                onError={(e) => {
                                    console.warn(`Failed to load image: ${imageUrl}`);
                                    // Option: remplacer par un placeholder directement
                                    (e.target as HTMLImageElement).src = '/images/placeholder.png'; // Assurez-vous que ce chemin existe
                                    (e.target as HTMLImageElement).srcset = '';
                                }}
                            />
                        ) : (
                            // Optionnel : Afficher un placeholder si AUCUNE image n'est disponible
                            <div className="absolute inset-0 flex items-center justify-center text-xs text-gray-400">
                                Image non disponible
                            </div>
                        )}
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
                            <span>{product.category?.name}</span>
                            <span className="mx-2">•</span>
                            <div className="flex items-center">
                                <Star className="h-3 w-3 fill-current text-yellow-500 mr-1" />
                                <span>{`4.5`}</span>
                                <span className="ml-1">({34})</span>
                            </div>
                        </div>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <h3 className="font-semibold text-lg mb-2 truncate overflow-hidden whitespace-nowrap cursor-pointer" style={{ maxWidth: '200px' }}>
                                        {product.name}
                                    </h3>
                                </TooltipTrigger>
                                <TooltipContent>
                                    {product.name}
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                        <div className="flex items-center">
                            <span className="font-bold text-lg">{product.price.toFixed(2)} $</span>
                        </div>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                        <div className="flex flex-col items-center space-y-2">
                            {product.variants.map((variant) => (
                                variant.color ? (
                                    <Button
                                        key={variant.id}
                                        variant="outline"
                                        size="sm"
                                        className="h-8 px-2 bg-white/20"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleColorClick(product.id, variant);
                                        }}
                                    >
                                        {variant.color?.name}
                                    </Button>
                                ) : ""
                            ))}
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                    <Button className="w-full gap-2" onClick={addToCart}>
                        <ShoppingCart className="h-4 w-4" />
                        Ajouter au panier
                    </Button>
                </CardFooter>
            </Card>
        </motion.div>
    )
}