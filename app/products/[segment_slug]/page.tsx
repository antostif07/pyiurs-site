import React from 'react';
import {getProducts, getSegment} from '@/lib/api';
// import CategoryFilter from "@/app/components/CategoryFilter";
import PageHeroSection from "@/app/components/segments/PageHeroSection";
import ProductGrid from '@/components/product-grid';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Props {
    params: Promise<{ segment_slug: string }>,
    // searchParams: Promise<{ category?: string }>;
}

export default async function SegmentPage({ params, }: Props) {
    // const { category } = await searchParams;
    const { segment_slug } = await params

    const segmentPromise = await getSegment(segment_slug)
    const productsPromise = getProducts({segment: segment_slug});

    const segment = await segmentPromise
    const products = await productsPromise;


    return (
        <div className="pt-24 pb-16">
            <div className="container mx-auto px-24">
                {/* Breadcrumb */}
                <div className="flex items-center text-sm text-muted-foreground mb-8">
                    <Link href="/" className="hover:text-foreground transition-colors">
                        Accueil
                    </Link>
                    <ChevronRight className="h-4 w-4 mx-2" />
                    <span className="text-foreground">{segment?.name}</span>
                </div>
                
                {/* Hero Section */}
                <div className="relative rounded-lg overflow-hidden mb-12">
                    <div className="relative h-[300px] md:h-[400px]">
                    <Image
                        src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${segment?.image?.formats?.large?.url ?? ''}`}
                        alt={segment?.name || 'segment'}
                        fill
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40" />
                    <div className="absolute inset-0 flex flex-col justify-center p-8 md:p-16">
                        <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">{segment?.name}</h1>
                        {/* <p className="text-white/90 text-lg md:text-xl max-w-2xl mb-6">
                            Découvrez nos collections soigneusement élaborées pour chaque saison et occasion.
                            Des pièces élégantes et intemporelles qui reflètent votre style unique.
                        </p> */}
                        {/* <div className="flex flex-wrap gap-3">
                            <Button 
                            variant={filter === 'all' ? 'default' : 'outline'} 
                            onClick={() => setFilter('all')}
                            className={filter === 'all' ? 'bg-white text-black hover:bg-white/90' : 'bg-transparent text-white border-white hover:bg-white/20'}
                            >
                            Toutes
                            </Button>
                            <Button 
                            variant={filter === 'new' ? 'default' : 'outline'} 
                            onClick={() => setFilter('new')}
                            className={filter === 'new' ? 'bg-white text-black hover:bg-white/90' : 'bg-transparent text-white border-white hover:bg-white/20'}
                            >
                            Nouveautés
                            </Button>
                        </div> */}
                    </div>
                    {/* <div className="flex flex-wrap gap-3">
                        <Button 
                        variant={filter === 'all' ? 'default' : 'outline'} 
                        onClick={() => setFilter('all')}
                        className={filter === 'all' ? 'bg-white text-black hover:bg-white/90' : 'bg-transparent text-white border-white hover:bg-white/20'}
                        >
                        Toutes
                        </Button>
                        <Button 
                        variant={filter === 'new' ? 'default' : 'outline'} 
                        onClick={() => setFilter('new')}
                        className={filter === 'new' ? 'bg-white text-black hover:bg-white/90' : 'bg-transparent text-white border-white hover:bg-white/20'}
                        >
                        Nouveautés
                        </Button>
                    </div> */}
                </div>
        </div>

        {/* Products Grid */}
        <ProductGrid products={products} />

        {/* Empty State */}
        {products.length === 0 && (
          <div className="text-center py-16">
            <h2 className="text-2xl font-semibold mb-2">Aucune produit trouvé</h2>
            <p className="text-muted-foreground mb-6">
              Aucun produit ne correspond à votre filtre actuel.
            </p>
            {/* <Button onClick={() => setFilter('all')}>
              Voir toutes les produits
            </Button> */}
          </div>
        )}
      </div>
    </div>
    );
}