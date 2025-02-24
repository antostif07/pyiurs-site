'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Heart, Share2, ShoppingCart, Star, Truck } from 'lucide-react';

// Simuler les données d'un produit
const product = {
  id: 1,
  name: "Robe d'été fleurie",
  price: 89.99,
  description: "Cette robe d'été légère et élégante est parfaite pour les journées ensoleillées. Confectionnée en coton de haute qualité, elle offre un confort optimal tout en vous assurant un style raffiné.",
  images: [
    'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?q=80&w=1746',
    'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?q=80&w=1934',
    'https://images.unsplash.com/photo-1550639525-c97d455acf70?q=80&w=1926',
  ],
  sizes: ['XS', 'S', 'M', 'L', 'XL'],
  colors: ['Rose', 'Bleu', 'Blanc'],
  rating: 4.5,
  reviews: 128,
  category: 'Robes',
  features: [
    'Coton 100% biologique',
    'Coupe ajustée',
    'Lavable en machine',
    'Fabriqué en France',
  ],
};

// Produits similaires
const similarProducts = [
  {
    id: 2,
    name: 'Robe midi plissée',
    price: 99.99,
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=1983',
  },
  {
    id: 3,
    name: 'Robe longue bohème',
    price: 119.99,
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1976',
  },
  {
    id: 4,
    name: 'Robe courte à volants',
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=1938',
  },
];

export default function ProductDetail() {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Produit principal */}
      <div className="grid md:grid-cols-2 gap-12 mb-16">
        {/* Galerie d'images */}
        <div className="space-y-4">
          <div className="aspect-w-3 aspect-h-4 overflow-hidden rounded-lg">
            <img
              src={product.images[selectedImage]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="grid grid-cols-3 gap-4">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`aspect-w-3 aspect-h-4 overflow-hidden rounded-lg ${
                  selectedImage === index ? 'ring-2 ring-primary' : ''
                }`}
              >
                <img src={image} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Informations produit */}
        <div>
          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(product.rating)
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
                <span className="ml-2 text-gray-600">({product.reviews} avis)</span>
              </div>
              <span className="text-gray-600">Catégorie: {product.category}</span>
            </div>
            <p className="text-2xl font-bold text-primary">{product.price}€</p>
          </div>

          <div className="space-y-6 mb-8">
            <div>
              <h3 className="font-medium mb-2">Description</h3>
              <p className="text-gray-600">{product.description}</p>
            </div>

            <div>
              <h3 className="font-medium mb-2">Taille</h3>
              <Select value={selectedSize} onValueChange={setSelectedSize}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Sélectionnez une taille" />
                </SelectTrigger>
                <SelectContent>
                  {product.sizes.map((size) => (
                    <SelectItem key={size} value={size}>
                      {size}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <h3 className="font-medium mb-2">Couleur</h3>
              <Select value={selectedColor} onValueChange={setSelectedColor}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Sélectionnez une couleur" />
                </SelectTrigger>
                <SelectContent>
                  {product.colors.map((color) => (
                    <SelectItem key={color} value={color}>
                      {color}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-4">
              <Button className="flex-1">
                <ShoppingCart className="mr-2 h-4 w-4" /> Ajouter au panier
              </Button>
              <Button variant="outline" size="icon">
                <Heart className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Share2 className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex items-center gap-2 text-gray-600">
              <Truck className="h-5 w-5" />
              <span>Livraison gratuite à partir de 50€</span>
            </div>
          </div>

          <div className="border-t pt-6">
            <h3 className="font-medium mb-4">Caractéristiques</h3>
            <ul className="space-y-2">
              {product.features.map((feature, index) => (
                <li key={index} className="flex items-center gap-2 text-gray-600">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Produits similaires */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Produits similaires</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {similarProducts.map((product) => (
            <Card key={product.id} className="overflow-hidden group">
              <div className="aspect-w-3 aspect-h-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold mb-2">{product.name}</h3>
                <p className="text-primary font-medium">{product.price}€</p>
                <Button className="w-full mt-4">Voir le produit</Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}