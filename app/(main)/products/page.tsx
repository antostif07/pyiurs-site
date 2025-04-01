"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  ChevronRight, 
  SlidersHorizontal, 
  Star, 
  Heart,
  ShoppingCart,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet";

// Sample products data
const products = [
  {
    id: 1,
    name: "Robe Fleurie Été",
    price: 89.99,
    originalPrice: 129.99,
    rating: 4.8,
    reviews: 124,
    image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?q=80&w=1976&auto=format&fit=crop",
    category: "Robes",
    isNew: true,
    isSale: true,
    colors: ["Rouge", "Bleu", "Noir"],
    sizes: ["XS", "S", "M", "L", "XL"]
  },
  {
    id: 2,
    name: "Blouse en Soie",
    price: 69.99,
    originalPrice: null,
    rating: 4.5,
    reviews: 86,
    image: "https://images.unsplash.com/photo-1564257631407-4deb1f99d992?q=80&w=1974&auto=format&fit=crop",
    category: "Hauts",
    isNew: true,
    isSale: false,
    colors: ["Blanc", "Noir", "Beige"],
    sizes: ["S", "M", "L"]
  },
  {
    id: 3,
    name: "Jean Taille Haute",
    price: 79.99,
    originalPrice: 99.99,
    rating: 4.7,
    reviews: 215,
    image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=1974&auto=format&fit=crop",
    category: "Pantalons",
    isNew: false,
    isSale: true,
    colors: ["Bleu", "Noir"],
    sizes: ["XS", "S", "M", "L", "XL"]
  },
  {
    id: 4,
    name: "Veste en Cuir",
    price: 199.99,
    originalPrice: null,
    rating: 4.9,
    reviews: 67,
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=1935&auto=format&fit=crop",
    category: "Vestes",
    isNew: false,
    isSale: false,
    colors: ["Noir", "Marron"],
    sizes: ["S", "M", "L"]
  },
  // Add more products...
];

// Filter options
const categories = ["Robes", "Hauts", "Pantalons", "Vestes", "Accessoires"];
const colors = ["Rouge", "Bleu", "Noir", "Blanc", "Beige", "Marron"];
const sizes = ["XS", "S", "M", "L", "XL"];

export default function ProductsPage() {
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("featured");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const toggleColor = (color: string) => {
    setSelectedColors(prev =>
      prev.includes(color)
        ? prev.filter(c => c !== color)
        : [...prev, color]
    );
  };

  const toggleSize = (size: string) => {
    setSelectedSizes(prev =>
      prev.includes(size)
        ? prev.filter(s => s !== size)
        : [...prev, size]
    );
  };

  const resetFilters = () => {
    setPriceRange([0, 500]);
    setSelectedCategories([]);
    setSelectedColors([]);
    setSelectedSizes([]);
    setSortBy("featured");
  };

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Price Range */}
      <div>
        <h3 className="font-medium mb-4">Prix</h3>
        <Slider
          value={priceRange}
          min={0}
          max={500}
          step={10}
          onValueChange={setPriceRange}
          className="mb-2"
        />
        <div className="flex items-center justify-between text-sm">
          <span>{priceRange[0]}€</span>
          <span>{priceRange[1]}€</span>
        </div>
      </div>

      {/* Categories */}
      <div>
        <h3 className="font-medium mb-4">Catégories</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <div key={category} className="flex items-center">
              <Checkbox
                id={`category-${category}`}
                checked={selectedCategories.includes(category)}
                onCheckedChange={() => toggleCategory(category)}
              />
              <label
                htmlFor={`category-${category}`}
                className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {category}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Colors */}
      <div>
        <h3 className="font-medium mb-4">Couleurs</h3>
        <div className="flex flex-wrap gap-2">
          {colors.map((color) => (
            <button
              key={color}
              onClick={() => toggleColor(color)}
              className={`px-3 py-1 rounded-full text-sm border transition-colors ${
                selectedColors.includes(color)
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'border-input hover:border-primary'
              }`}
            >
              {color}
            </button>
          ))}
        </div>
      </div>

      {/* Sizes */}
      <div>
        <h3 className="font-medium mb-4">Tailles</h3>
        <div className="flex flex-wrap gap-2">
          {sizes.map((size) => (
            <button
              key={size}
              onClick={() => toggleSize(size)}
              className={`w-10 h-10 rounded-md text-sm border font-medium transition-colors ${
                selectedSizes.includes(size)
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'border-input hover:border-primary'
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <div className="flex items-center text-sm text-muted-foreground mb-8">
          <Link href="/" className="hover:text-foreground transition-colors">
            Accueil
          </Link>
          <ChevronRight className="h-4 w-4 mx-2" />
          <span className="text-foreground">Boutique</span>
        </div>

        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Nos Produits</h1>
          <div className="flex items-center gap-4">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <option value="featured">En vedette</option>
              <option value="newest">Plus récents</option>
              <option value="price-asc">Prix croissant</option>
              <option value="price-desc">Prix décroissant</option>
            </select>

            {/* Mobile Filter Button */}
            <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" className="lg:hidden gap-2">
                  <SlidersHorizontal className="h-4 w-4" />
                  Filtres
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-full sm:w-[400px]">
                <SheetHeader>
                  <SheetTitle>Filtres</SheetTitle>
                </SheetHeader>
                <div className="mt-8">
                  <FilterContent />
                </div>
                <SheetFooter className="absolute bottom-0 left-0 right-0 p-4 bg-background border-t">
                  <div className="flex gap-2 w-full">
                    <Button variant="outline" onClick={resetFilters} className="flex-1">
                      Réinitialiser
                    </Button>
                    <Button onClick={() => setIsFilterOpen(false)} className="flex-1">
                      Appliquer
                    </Button>
                  </div>
                </SheetFooter>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Desktop Filters */}
          <div className="hidden lg:block">
            <div className="sticky top-24 space-y-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold">Filtres</h2>
                <Button variant="ghost" size="sm" onClick={resetFilters}>
                  Réinitialiser
                </Button>
              </div>
              <FilterContent />
            </div>
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            <motion.div
              ref={ref}
              variants={{
                hidden: { opacity: 0 },
                show: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.1,
                  },
                },
              }}
              initial="hidden"
              animate={inView ? "show" : "hidden"}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {products.map((product) => (
                <motion.div
                  key={product.id}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    show: { opacity: 1, y: 0 },
                  }}
                >
                  <Link href={`/products/${product.id}`} className="group block">
                    <div className="relative aspect-[3/4] rounded-lg overflow-hidden mb-4">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute top-2 left-2 flex flex-col gap-2">
                        {product.isNew && (
                          <Badge className="bg-primary text-primary-foreground">Nouveau</Badge>
                        )}
                        {product.isSale && (
                          <Badge variant="destructive">Soldes</Badge>
                        )}
                      </div>
                      <div className="absolute top-2 right-2">
                        <Button variant="secondary" size="icon" className="rounded-full bg-white/80 hover:bg-white">
                          <Heart className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <span>{product.category}</span>
                        <span className="mx-2">•</span>
                        <div className="flex items-center">
                          <Star className="h-3 w-3 fill-current text-yellow-500 mr-1" />
                          <span>{product.rating}</span>
                          <span className="ml-1">({product.reviews})</span>
                        </div>
                      </div>

                      <h3 className="font-semibold group-hover:text-primary transition-colors">
                        {product.name}
                      </h3>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <span className="font-bold">{product.price.toFixed(2)} €</span>
                          {product.originalPrice && (
                            <span className="ml-2 text-muted-foreground line-through text-sm">
                              {product.originalPrice.toFixed(2)} €
                            </span>
                          )}
                        </div>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <ShoppingCart className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}