// import {getProducts} from "@/lib/api";
import ProductDetailsClient from "@/components/product-details.client";

export default async function ProductDetail(
    // {params}: { params: Promise<{ product_slug: string }> }
) {
    // const {product_slug} = await params
    // const products = await getProducts({slug: product_slug})

    return (
        <ProductDetailsClient 
        // product={products[0]} 
        />
    );
}