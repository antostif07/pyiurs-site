import React from 'react';
import {getProducts} from "@/lib/api";
import {FeaturedProducts as ProductGrid } from './featured-products.client';

export default async function FeaturedProducts({segment, title, subtitle}: {segment: string, title: string, subtitle: string}) {
    const response = await getProducts({limit: 4, segment: segment});
    
    return (
        <ProductGrid
            products={response}
            title={title}
            subtitle={subtitle}
        />
    );
}