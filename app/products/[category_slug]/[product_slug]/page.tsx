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
import SegmentHeroSection from "@/app/components/segments/PageHeroSection";
import {getProduct} from "@/lib/api";

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

export default async function ProductDetail({params}: { params: Promise<{ product_slug: string }> }) {
    const {product_slug} = await params
    const product = await getProduct(product_slug)

    return (
        <div className="container mx-auto">
            {/* Hero Title */}
            <div className="text-center mb-10">
                <div>
                    <SegmentHeroSection
                        title={`${product?.name}`} image={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${product?.image?.formats.large?.url}`}
                        subtitle={``}
                    />
                </div>
            </div>

        </div>
    );
}