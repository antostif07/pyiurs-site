import {Category, HomeSection, IArticle, ICollection, Product, Segment, SubCategory} from "@/types/types"

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL;


export async function getHeroSection(): Promise<HomeSection[]> {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/home-section?populate[HomeSections][populate]=cover&populate[HomeSections][populate]=Button`,
        {
            next: { revalidate: 60 },
        }
    );

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
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/segments?populate=categories&populate=categories.sub_categories&populate=image`,
        {
            next: {
                revalidate: 60,
            }
        }
    );

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

export async function getCollections(): Promise<ICollection[]> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/collections?populate=image`);

    if (!res.ok) {
        throw new Error(`Failed to fetch collections: ${res.status}`);
    }

    const data = await res.json();

    if (data && data.data) {
        return data.data;
    } else {
        console.error("Invalid segments data structure:", data);
        return [];
    }
}

export async function getProducts({segment, slug, limit, subCategory, reference} : {segment?: string, slug?: string, limit?: number, subCategory?: string, reference?: string}): Promise<Product[]> {
    const apiUrl = `${STRAPI_URL}/api/products?populate=sub_category&populate=image&populate=segment&populate=category&populate=variants.image&populate=variants.sizes&populate=variants.color&sort=id:desc`;
    const segmentFilter = segment ? `&filters[segment][slug][$eq]=${segment}` : '';
    const slugFilter = slug ? `&filters[slug][$eq]=${slug}` : '';
    const subCategorySlug = subCategory ? `&filters[sub_category][slug][$eq]=${subCategory}` : '';
    const limitFilter = limit ? `&pagination[limit]=${limit}` : '';
    const referenceFilter = reference ? `&filters[reference][$eq]=${reference}` : '';

    const filter = `${segmentFilter}${slugFilter}${limitFilter}${subCategorySlug}${referenceFilter}`;

    const url = `${apiUrl}${filter}`;

    const res = await fetch(url, { next: { revalidate: 60 } });

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

export async function getCategories({segment, slug}: {segment?: string, slug?: string}): Promise<Category[]> {
    const apiUrl = `${STRAPI_URL}/api/categories?populate=*`;
    const segmentFilter = segment ? `&filters[segments][slug][$eq]=${segment}` : '';
    const slugFilter = slug ? `&filters[slug][$eq]=${slug}` : '';
    const filter = `${segmentFilter}${slugFilter}`;

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

export async function getArticles({slug}: {slug?: string}): Promise<IArticle[]> {
    const apiUrl = `${STRAPI_URL}/api/articles?populate=*`;
    const slugFilter = slug ? `&filters[slug][$eq]=${slug}` : '';
    const filter = `${slugFilter}`;

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

export async function getSubCategories({segment, category, slug}: {segment?: string, category?: string, slug?: string}): Promise<SubCategory[]> {
    const apiUrl = `${STRAPI_URL}/api/sub-categories?populate=category`;

    const filterSegment = segment ? `&filters[segments][slug][$eq]=${segment}` : '';

    const filterCategory = category ? `&filters[category][slug][$eq]=${category}` : '';

    const slugFilter = slug ? `&filters[slug][$eq]=${slug}` : '';

    const res = await fetch(`${apiUrl}${filterSegment}${filterCategory}${slugFilter}`, { next: { revalidate: 60 } });

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