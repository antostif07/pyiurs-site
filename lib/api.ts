import {Category, HomeSection, Product, Segment, SubCategory} from "@/app/types/types";

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL;


export async function getHeroSection(): Promise<HomeSection[]> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/home-section?populate[HomeSections][populate]=cover&populate[HomeSections][populate]=Button`, );

    if (!res.ok) {
        throw new Error(`Failed to fetch segments: ${res.status}`);
    }

    const data = await res.json();

    if (data && data.data) {
        return data.data["HomeSections"]
    } else {
        console.error("Invalid segments data structure:", data);
        return [];
    }
}

export async function getSegments(): Promise<Segment[]> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/segments?populate=*`);

    if (!res.ok) {
        throw new Error(`Failed to fetch segments: ${res.status}`);
    }

    const data = await res.json();

    if (data && data.data) {
        return data.data.map((item: Segment) => {
            return {
                id: item.id,
                name: item.name,
                documentId: item.documentId,
                slug: item.slug,
                image: item.image,
                categories: item.categories,
            };
        });
    } else {
        console.error("Invalid segments data structure:", data);
        return [];
    }
}

export async function getProducts({segment, slug, limit,} : {segment?: string, slug?: string, limit?: number,}): Promise<Product[]> {
    const apiUrl = `${STRAPI_URL}/api/products?populate=segment&populate=category&populate=variants.image&populate=variants.sizes&populate=variants.color`;
    const segmentFilter = segment ? `&filters[segment][slug][$eq]=${segment}` : '';
    const slugFilter = slug ? `&filters[slug][$eq]=${slug}` : '';
    const limitFilter = limit ? `&limit=${limit}` : '';

    const filter = `${segmentFilter}${slugFilter}${limitFilter}`;

    const url = `${apiUrl}${filter}`;

    const res = await fetch(url);

    if (!res.ok) {
        throw new Error(`Failed to fetch products: ${res.status}`);
    }

    const data = await res.json();
    
    if (data) {
        return data.data
    } else {
        console.error("Invalid articles data structure:", data);
        return [];
    }
}

export async function getSegment(slug: string): Promise<Segment|null> {
    const url = `${STRAPI_URL}/api/segments?&filters[slug][$eq]=${slug}&populate=*`;

    const res = await fetch(url);

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

    const filter = segment ? `&filters[segments][slug][$eq]=${segment}` : '';

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

export async function getSubCategories({segment, category}: {segment?: string, category?: string}): Promise<SubCategory[]> {
    const apiUrl = `${STRAPI_URL}/api/sub-categories?populate=category`;

    const filterSegment = segment ? `&filters[segments][slug][$eq]=${segment}` : '';

    const filterCategory = category ? `&filters[category][slug][$eq]=${category}` : '';


    const res = await fetch(`${apiUrl}${filterSegment}${filterCategory}`, { next: { revalidate: 60 } });

    if (!res.ok) {
        throw new Error(`Failed to fetch sub-categories: ${res.status}`);
    }

    const data = await res.json();

    if (data) {
        return data.data;
    } else {
        console.error("Invalid sub-categories data structure:", data);
        return [];
    }
}