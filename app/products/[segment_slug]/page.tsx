import React from 'react';
import {getProducts, getSegment} from '@/lib/api';
// import CategoryFilter from "@/app/components/CategoryFilter";
import ProductGrid from "@/app/components/ProductGrid";
import PageHeroSection from "@/app/components/segments/PageHeroSection";

interface Props {
    params: Promise<{ segment_slug: string }>,
    // searchParams: Promise<{ category?: string }>;
}

export default async function SegmentPage({ params, }: Props) {
    // const { category } = await searchParams;
    const { segment_slug } = await params

    const segmentPromise = await getSegment(segment_slug)
    const productsPromise = getProducts({segment: segment_slug});
    // const categoriesPromise = getCategories();

    const segment = await segmentPromise
    const products = await productsPromise;

    // // Envoi des fonctions en useCallback
    // const onCategoryClick = useCallback((slug: string | undefined) => {
    //     const params = new URLSearchParams(searchParams);
    //     if (slug) {
    //         params.set('category', slug);
    //     } else {
    //         params.delete('category');
    //     }
    //     window.location.search = params.toString();
    // }, [searchParams]);

    return (
        <div className="mx-auto">
            <PageHeroSection title={segment?.name || ''} image={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${segment?.image?.formats.medium?.url}`} />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8 py-8">
                    {
                        products.length > 0 ? (
                            <ProductGrid products={products} />
                        ) : (
                            <div className={'flex col-span-1 md:col-span-4 justify-center font-bold text-3xl py-16'}>Aucun Produit trouvé</div>
                        )
                    }
                </div>
            </div>
        </div>
    );
}