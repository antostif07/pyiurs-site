"use client";

import { useState, 
  // useMemo, 
  useCallback } from 'react';
// import Image from 'next/image';
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
  // Plus,
  // ShoppingCart,
  // Check
} from 'lucide-react';
import { Button } from '@/components/ui/button';
// import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { toast } from 'sonner';
// import FeaturedProducts from '@/components/featured-products';
import {Product} from "@/types/types";

// Composant ColorButton pour la sélection de couleur
// interface ColorButtonProps {
//   color: { name: string; value: string; selected: boolean };
//   index: number;
//   selectedColor: number;
//   setSelectedColor: (index: number) => void;
// }

// function ColorButton({ color, index, selectedColor, setSelectedColor }: ColorButtonProps) {
//   const handleClick = useCallback(() => {
//     setSelectedColor(index);
//   }, [index, setSelectedColor]);

//   const isSelected = selectedColor === index;

//   return (
//       <button
//           key={index}
//           onClick={handleClick}
//           className={`w-12 h-12 rounded-full flex items-center justify-center ${isSelected ? 'ring-2 ring-primary ring-offset-2' : ''
//           }`}
//           style={{ backgroundColor: color.value }}
//           aria-label={`Couleur ${color.name}`}
//       >
//         {isSelected && (
//             <div className="w-6 h-6 rounded-full bg-white/30 flex items-center justify-center">
//               <Check className="text-white" />
//             </div>
//         )}
//       </button>
//   );
// }

// Composant SizeButton pour la sélection de taille
// interface SizeButtonProps {
//   size: { name: string; available: boolean; selected: boolean };
//   index: number;
//   selectedSize: number;
//   setSelectedSize: (index: number) => void;
// }

// function SizeButton({ size, index, selectedSize, setSelectedSize }: SizeButtonProps) {
//   const handleClick = useCallback(() => {
//     if (size.available) {
//       setSelectedSize(index);
//     }
//   }, [index, size.available, setSelectedSize]);

//   const isSelected = selectedSize === index;

//   return (
//       <button
//           key={index}
//           onClick={handleClick}
//           disabled={!size.available}
//           className={`h-12 min-w-[3rem] px-4 rounded-lg border font-medium transition-colors ${!size.available
//               ? 'bg-muted/50 text-muted-foreground cursor-not-allowed border-muted'
//               : isSelected
//                   ? 'bg-primary text-primary-foreground border-primary'
//                   : 'bg-background hover:border-primary border-input'
//           }`}
//       >
//         {size.name}
//       </button>
//   );
// }

export default function ProductPage({product}: {product: Product}) {
  const [quantity, setQuantity] = useState(1);
  // const [selectedImage, setSelectedImage] = useState(0);
  const [isShareSheetOpen, setIsShareSheetOpen] = useState(false);

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Use useCallback pour éviter de recréer les fonctions à chaque rendu
  const decreaseQuantity = useCallback(() => {
    if (quantity > 1) {
      setQuantity(prevQuantity => prevQuantity - 1);
    }
  }, [quantity]);

  // const increaseQuantity = useCallback(() => {
  //   if (quantity < product.stock) {
  //     setQuantity(prevQuantity => prevQuantity + 1);
  //   }
  // }, [quantity, product.stock]);

  // const addToCart = useCallback(() => {
  //   toast("Produit ajouté au panier", {
  //     description: `${quantity} × ${product.name} (${product.colors[selectedColor].name}, ${product.sizes[selectedSize].name})`,
  //   });
  // }, [quantity, product.name, selectedColor, selectedSize]);

  const addToWishlist = useCallback(() => {
    toast("Produit ajouté aux favoris", {
      description: `${product.name} a été ajouté à votre liste de souhaits.`,
    });
  }, [product.name]);

  const shareProduct = useCallback(async (platform: string) => {
    const url = window.location.href;
    const text = `Découvrez ${product.name} sur Élégance`;

    switch (platform) {
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`, '_blank');
        break;
      case 'whatsapp':
        window.open(`https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`, '_blank');
        break;
      case 'copy':
        try {
          await navigator.clipboard.writeText(url);
          toast("Lien copié", {
            description: "L'URL du produit a été copiée dans le presse-papier.",
          });
        } catch (err) {
          console.error(err); // Utiliser console.error pour les erreurs
          toast("Erreur", {
            description: "Impossible de copier le lien.",
          });
        }
        break;
      default:
        console.warn(`Platforme de partage inconnue: ${platform}`);
    }
    setIsShareSheetOpen(false);
  }, [product.name]); // Ajout de product.name comme dépendance

  //Memoized values
  // const discountPercentage = useMemo(() => {
  //   if (product.originalPrice) {
  //     return Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
  //   }
  //   return 0;
  // }, [product.originalPrice, product.price]);

  // const isSizeAvailable = useMemo(() => {
  //   return product.sizes[selectedSize].available;
  // }, [selectedSize, product.sizes]);

  return (
      <div className="pt-24 pb-16">
        <div className="ontainer mx-auto md:px-24 px-8">
          {/* Breadcrumb */}
          <div className="flex items-center text-sm text-muted-foreground mb-6 overflow-x-auto whitespace-nowrap pb-2">
            <Link href="/" className="hover:text-foreground transition-colors">
              Accueil
            </Link>
            <ChevronRight className="h-4 w-4 mx-2 flex-shrink-0" />
            <Link href="/products" className="hover:text-foreground transition-colors">
              Boutique
            </Link>
            <ChevronRight className="h-4 w-4 mx-2 flex-shrink-0" />
            {/*<Link href={`/categories/${product.category.toLowerCase()}`} className="hover:text-foreground transition-colors">*/}
            {/*  {product.category}*/}
            {/*</Link>*/}
            <ChevronRight className="h-4 w-4 mx-2 flex-shrink-0" />
            <span className="text-foreground truncate">{product.name}</span>
          </div>

          <motion.div
              ref={ref}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          >
            {/* Product Images */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="space-y-4"
            >
              <div className="relative aspect-[4/5] sm:aspect-[4/5] rounded-lg overflow-hidden">
                {/*<Image*/}
                {/*    src={product.images[selectedImage]}*/}
                {/*    alt={product.name}*/}
                {/*    fill*/}
                {/*    className="object-cover"*/}
                {/*    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // Optimisation de l'image*/}
                {/*/>*/}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  {/*{product.isNew && (*/}
                  {/*    <Badge className="bg-primary text-primary-foreground">Nouveau</Badge>*/}
                  {/*)}*/}
                  {/*{product.isSale && (*/}
                  {/*    <Badge variant="destructive">Soldes</Badge>*/}
                  {/*)}*/}
                </div>
              </div>
              {/*<div className="grid grid-cols-4 gap-2 sm:gap-4">*/}
              {/*  {product.images.map((image, index) => (*/}
              {/*      <button*/}
              {/*          key={index}*/}
              {/*          onClick={() => setSelectedImage(index)}*/}
              {/*          className={`relative aspect-square rounded-md overflow-hidden border-2 transition-all ${selectedImage === index ? 'border-primary' : 'border-transparent'*/}
              {/*          }`}*/}
              {/*      >*/}
              {/*        <Image*/}
              {/*            src={image}*/}
              {/*            alt={`${product.name} - Vue ${index + 1}`}*/}
              {/*            fill*/}
              {/*            className="object-cover"*/}
              {/*            sizes="100px" // Taille fixe pour les miniatures*/}
              {/*        />*/}
              {/*      </button>*/}
              {/*  ))}*/}
              {/*</div>*/}
            </motion.div>

            {/* Product Info */}
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex flex-col h-full"
            >
              {/*<div className="flex items-center text-sm text-muted-foreground mb-2 flex-wrap gap-2">*/}
              {/*  <span>{product.category}</span>*/}
              {/*  <span className="mx-2">•</span>*/}
              {/*  <span>SKU: {product.sku}</span>*/}
              {/*  <span className="mx-2">•</span>*/}
              {/*  <div className="flex items-center">*/}
              {/*    <Star className="h-4 w-4 fill-current text-yellow-500 mr-1" />*/}
              {/*    <span>{product.rating}</span>*/}
              {/*    <Link href="#reviews" className="ml-1 underline">*/}
              {/*      ({product.reviews} avis)*/}
              {/*    </Link>*/}
              {/*  </div>*/}
              {/*</div>*/}

              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">{product.name}</h1>

              {/*<div className="flex items-center mb-6 flex-wrap gap-2">*/}
              {/*  <span className="text-2xl font-bold">{product.price.toFixed(2)} €</span>*/}
              {/*  {product.originalPrice && (*/}
              {/*      <span className="ml-3 text-muted-foreground line-through text-lg">*/}
              {/*                      {product.originalPrice.toFixed(2)} €*/}
              {/*                  </span>*/}
              {/*  )}*/}
              {/*  {product.originalPrice && (*/}
              {/*      <Badge variant="destructive" className="ml-3">*/}
              {/*        -{discountPercentage}%*/}
              {/*      </Badge>*/}
              {/*  )}*/}
              {/*</div>*/}

              <p className="text-muted-foreground mb-6">
                {product.description}
              </p>

              <div className="space-y-6 mb-8">
                {/* Color Selection */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">Couleur</span>
                    {/*<span className="text-sm text-muted-foreground">*/}
                    {/*                    {product.colors[selectedColor].name}*/}
                    {/*                </span>*/}
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {/*{product.colors.map((color, index) => (*/}
                    {/*    <ColorButton*/}
                    {/*        key={index}*/}
                    {/*        color={color}*/}
                    {/*        index={index}*/}
                    {/*        selectedColor={selectedColor}*/}
                    {/*        setSelectedColor={setSelectedColor}*/}
                    {/*    />*/}
                    {/*))}*/}
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
                  {/*<div className="flex flex-wrap gap-2">*/}
                  {/*  {product.sizes.map((size, index) => (*/}
                  {/*      <SizeButton*/}
                  {/*          key={index}*/}
                  {/*          size={size}*/}
                  {/*          index={index}*/}
                  {/*          selectedSize={selectedSize}*/}
                  {/*          setSelectedSize={setSelectedSize}*/}
                  {/*      />*/}
                  {/*  ))}*/}
                  {/*</div>*/}
                  {/*{!isSizeAvailable && (*/}
                  {/*    <p className="text-sm text-muted-foreground mt-2">*/}
                  {/*      {`Cette taille n'est pas disponible actuellement.`}*/}
                  {/*    </p>*/}
                  {/*)}*/}
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
                        className="h-12 w-12"
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-16 text-center text-lg">{quantity}</span>
                    {/*<Button*/}
                    {/*    variant="outline"*/}
                    {/*    size="icon"*/}
                    {/*    onClick={increaseQuantity}*/}
                    {/*    disabled={quantity >= product.stock}*/}
                    {/*    className="h-12 w-12"*/}
                    {/*>*/}
                    {/*  <Plus className="h-4 w-4" />*/}
                    {/*</Button>*/}
                    {/*<span className="ml-4 text-sm text-muted-foreground">*/}
                    {/*                    {product.stock} disponibles*/}
                    {/*                </span>*/}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                {/*<Button*/}
                {/*    size="lg"*/}
                {/*    className="flex-1 gap-2 h-14 text-lg"*/}
                {/*    onClick={addToCart}*/}
                {/*>*/}
                {/*  <ShoppingCart className="h-5 w-5" />*/}
                {/*  Ajouter au panier*/}
                {/*</Button>*/}
                <div className="flex gap-2">
                  <Button
                      variant="outline"
                      size="icon"
                      className="h-14 w-14 flex-shrink-0"
                      onClick={addToWishlist}
                  >
                    <Heart className="h-6 w-6" />
                  </Button>
                  <Sheet open={isShareSheetOpen} onOpenChange={setIsShareSheetOpen}>
                    <SheetTrigger asChild>
                      <Button variant="outline" size="icon" className="h-14 w-14 flex-shrink-0">
                        <Share2 className="h-6 w-6" />
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="bottom" className="h-[300px]">
                      <SheetHeader>
                        <SheetTitle>Partager ce produit</SheetTitle>
                      </SheetHeader>
                      <div className="grid grid-cols-2 gap-4 py-4">
                        <Button
                            variant="outline"
                            className="h-14 text-lg"
                            onClick={() => shareProduct('facebook')}
                        >
                          Facebook
                        </Button>
                        <Button
                            variant="outline"
                            className="h-14 text-lg"
                            onClick={() => shareProduct('twitter')}
                        >
                          Twitter
                        </Button>
                        <Button
                            variant="outline"
                            className="h-14 text-lg"
                            onClick={() => shareProduct('whatsapp')}
                        >
                          WhatsApp
                        </Button>
                        <Button
                            variant="outline"
                            className="h-14 text-lg"
                            onClick={() => shareProduct('copy')}
                        >
                          Copier le lien
                        </Button>
                      </div>
                    </SheetContent>
                  </Sheet>
                </div>
              </div>

              {/* Features */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                <div className="flex items-center bg-muted/30 rounded-lg p-4">
                  <Truck className="h-5 w-5 mr-3 text-primary flex-shrink-0" />
                  <span className="text-sm">Livraison gratuite dès 100€</span>
                </div>
                <div className="flex items-center bg-muted/30 rounded-lg p-4">
                  <RefreshCw className="h-5 w-5 mr-3 text-primary flex-shrink-0" />
                  <span className="text-sm">Retours sous 30 jours</span>
                </div>
                <div className="flex items-center bg-muted/30 rounded-lg p-4">
                  <ShieldCheck className="h-5 w-5 mr-3 text-primary flex-shrink-0" />
                  <span className="text-sm">Garantie qualité</span>
                </div>
              </div>

              {/* Features List */}
              <div className="mb-8">
                <h3 className="font-medium mb-2">Caractéristiques</h3>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  {/*{product.features.map((feature, index) => (*/}
                  {/*    <li key={index}>{feature}</li>*/}
                  {/*))}*/}
                </ul>
              </div>
            </motion.div>
          </motion.div>

          {/* Product Details Tabs */}
          <div className="mt-12">
            <Tabs defaultValue="details" className="w-full">
              <TabsList className="w-full grid grid-cols-3 mb-8">
                <TabsTrigger value="details" className="text-sm sm:text-base">Détails</TabsTrigger>
                <TabsTrigger value="care" className="text-sm sm:text-base">Entretien</TabsTrigger>
                <TabsTrigger value="reviews" className="text-sm sm:text-base">Avis</TabsTrigger>
              </TabsList>
              <TabsContent value="details">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-lg font-medium mb-4">Description</h3>
                    <p className="text-muted-foreground mb-4">
                      {product.description}
                    </p>
                    {/*<p className="text-muted-foreground">*/}
                    {/*  {product.details.material}*/}
                    {/*</p>*/}
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-4">Coupe et taille</h3>
                    {/*<p className="text-muted-foreground">*/}
                    {/*  {product.details.fit}*/}
                    {/*</p>*/}
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="care">
                <h3 className="text-lg font-medium mb-4">{`Instructions d'entretien`}</h3>
                {/*<p className="text-muted-foreground">*/}
                {/*  {product.details.care}*/}
                {/*</p>*/}
              </TabsContent>
              <TabsContent value="reviews" id="reviews">
                <div className="flex items-center mb-6">
                  {/*<div className="flex items-center mr-4">*/}
                  {/*  {[...Array(5)].map((_, i) => (*/}
                  {/*      <Star*/}
                  {/*          key={i}*/}
                  {/*          className={`h-5 w-5 ${i < Math.floor(product.rating) ? "text-yellow-500 fill-yellow-500" : "text-gray-300"*/}
                  {/*          }`}*/}
                  {/*      />*/}
                  {/*  ))}*/}
                  {/*</div>*/}
                  {/*<span className="text-xl font-medium">{product.rating}</span>*/}
                  <span className="mx-2 text-muted-foreground">•</span>
                  {/*<span className="text-muted-foreground">{product.reviews} avis</span>*/}
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
                                  className={`h-4 w-4 ${i < 5 ? "text-yellow-500 fill-yellow-500" : "text-gray-300"
                                  }`}
                              />
                          ))}
                        </div>
                        <span className="font-medium">Marie L.</span>
                        <span className="mx-2 text-muted-foreground">•</span>
                        <span className="text-sm text-muted-foreground">Il y a 2 semaines</span>
                      </div>
                      <h4 className="font-medium mb-1">{`Magnifique robe, parfaite pour l'été !`}</h4>
                      <p className="text-muted-foreground">
                        {`J'ai acheté cette robe pour un mariage et elle est absolument parfaite ! La matière est de qualité, 
                      la coupe est flatteuse et les couleurs sont magnifiques. Je recommande vivement.`}
                      </p>
                    </div>

                    <Separator />

                    <div>
                      <div className="flex items-center mb-2">
                        <div className="flex items-center mr-2">
                          {[...Array(5)].map((_, i) => (
                              <Star
                                  key={i}
                                  className={`h-4 w-4 ${i < 4 ? "text-yellow-500 fill-yellow-500" : "text-gray-300"
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
                        {`La robe est superbe, la matière est agréable et les finitions sont soignées. 
                      Seul bémol, elle taille un peu grand, j'aurais dû prendre une taille en dessous. 
                      Sinon, je suis très satisfaite de mon achat.`}
                      </p>
                    </div>

                    <Separator />

                    <div>
                      <div className="flex items-center mb-2">
                        <div className="flex items-center mr-2">
                          {[...Array(5)].map((_, i) => (
                              <Star
                                  key={i}
                                  className={`h-4 w-4 ${i < 5 ? "text-yellow-500 fill-yellow-500" : "text-gray-300"
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
                        {`Cette robe est un véritable coup de cœur ! Elle est encore plus belle en vrai que sur les photos. 
                      La matière est de qualité, la coupe est parfaite et les détails sont soignés. 
                      Je l'ai portée pour une soirée et j'ai reçu de nombreux compliments.`}
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

          {/* Related Products */}
          {/*<div className="mt-20">*/}
          {/*  <h2 className="text-2xl font-bold mb-8">Vous aimerez aussi</h2>*/}
          {/*  <FeaturedProducts />*/}
          {/*</div>*/}
        </div>
      </div>
  );
}