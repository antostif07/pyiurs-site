import {Category, Product, Segment} from "@/app/types/types";

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL;

export async function getProducts({segment} : {segment?: string,}): Promise<Product[]> {
    const apiUrl = `${STRAPI_URL}/api/products?populate=*`;
    const filter = `&filters[segment][slug][$eq]=${segment}`;

    const url = segment ? `${apiUrl}${filter}` : apiUrl;

    const res = await fetch(url, { cache: "no-cache" });

    if (!res.ok) {
        throw new Error(`Failed to fetch products: ${res.status}`);
    }

    const data = await res.json();

    console.log(data)
    if (data) {
        return data.data
    } else {
        console.error("Invalid articles data structure:", data);
        return [];
    }
}

export async function getSegment(slug: string): Promise<Segment|null> {
    const url = `${STRAPI_URL}/api/segments?&filters[slug][$eq]=${slug}&populate=*`;

    const res = await fetch(url, { cache: "no-cache" });

    if (!res.ok) {
        throw new Error(`Failed to fetch articles: ${res.status}`);
    }

    const data = await res.json();

    if (data && data.data && data.data.length > 0) {
        return data.data[0]
    } else {
        console.error("Invalid articles data structure:", data);
        return null;
    }
}

export async function getCategories({segment}: {segment?: string}): Promise<Category[]> {
    const apiUrl = `${STRAPI_URL}/api/categories?populate=*`;

    const filter = segment ? `&filters[segment][slug][$eq]=${segment}` : '';

    const res = await fetch(`${apiUrl}${filter}`, { next: { revalidate: 60 } });

    if (!res.ok) {
        throw new Error(`Failed to fetch categories: ${res.status}`);
    }

    const data = await res.json();

    if (data) {
        return data.data;
    } else {
        console.error("Invalid categories data structure:", data);
        return [];
    }
}