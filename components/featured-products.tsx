import React from 'react';
import {getProducts} from "@/lib/api";
import {FeaturedProducts as ProductGrid } from './featured-products.client';

export default async function FeaturedProducts() {
    const response = await getProducts({limit: 4,});
    
    return (
        <ProductGrid products={response} />
    );
}