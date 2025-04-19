import {
    Category,
    HomeSection,
    IArticle,
    ICollection,
    IColor,
    IMark,
    ISize,
    Product,
    Segment,
    SubCategory
} from "@/types/types"

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

export async function getSegments({name, slug}: {name?: string, slug?: string} = {}): Promise<Segment[]> {
    const params = new URLSearchParams()
    // params
    params.append('populate', 'categories');
    params.append('populate', 'categories.sub_categories');
    params.append('populate', 'image');

    // filters
    // Ajout conditionnel des filtres (URLSearchParams gère l'encodage)
    if (name) {
        params.append('filters[name][$eqi]', name);
    }
    if (slug) {
        params.append('filters[slug][$eq]', slug);
    }

    // final url
    const queryString = params.toString();
    const apiUrl = `${STRAPI_URL}/api/segments${queryString ? `?${queryString}` : ''}`;

    let res: Response;
    try {
        res = await fetch(apiUrl, { next: {revalidate: 60} });
    } catch (error) {
        console.error("Network error fetching segments:", error);
        throw new Error(`Network error fetching segments: ${error instanceof Error ? error.message : error}`);
    }

    if (!res.ok) {
        let errorBody = '';
        try {
            errorBody = await res.text();
        } catch {  }
        throw new Error(`Failed to fetch segments: ${res.status} ${res.statusText}. ${errorBody}`);
    }

    let data;
    try {
        data = await res.json();
    } catch (error) {
        console.error("Error parsing JSON response for segments:", error);
        throw new Error(`Error parsing JSON response for segments.`);
    }

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

export async function getCategories({segment, slug, name}: {segment?: string, slug?: string, name?: string}): Promise<Category[]> {
    const apiUrl = `${STRAPI_URL}/api/categories?populate=*`;
    const segmentFilter = segment ? `&filters[segments][slug][$eq]=${segment}` : '';
    const slugFilter = slug ? `&filters[slug][$eq]=${slug}` : '';
    const nameFilter = name ? `&filters[name][$eqi]=${name}` : '';
    const filter = `${segmentFilter}${slugFilter}${nameFilter}`;

    const res = await getResult(apiUrl, filter)

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

export async function getProducts({segment, slug, limit, subCategory, reference, name} : {name?: string, segment?: string, slug?: string, limit?: number, subCategory?: string, reference?: string}): Promise<Product[]> {
    const apiUrl = `${STRAPI_URL}/api/products?populate=sub_category&populate=image&populate=segment&populate=category&populate=variants.image&populate=variants.sizes&populate=variants.color&sort=id:desc`;
    const segmentFilter = segment ? `&filters[segment][slug][$eq]=${segment}` : '';
    const slugFilter = slug ? `&filters[slug][$eq]=${slug}` : '';
    const subCategorySlug = subCategory ? `&filters[sub_category][slug][$eq]=${subCategory}` : '';
    const limitFilter = limit ? `&pagination[limit]=${limit}` : '';
    const referenceFilter = reference ? `&filters[reference][$eq]=${reference}` : '';
    const nameFilter = name ? `&filters[name][$eqi]=${name}` : '';

    const filter = `${nameFilter}${segmentFilter}${slugFilter}${limitFilter}${subCategorySlug}${referenceFilter}`;

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

const getResult = async (apiUrl: string, filter: string) => {
    return await fetch(`${apiUrl}&${filter}`, {next: {revalidate: 60}})
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

export async function getSubCategories({segment, category, slug, name}: {segment?: string, category?: string, slug?: string, name?: string}): Promise<SubCategory[]> {
    const apiUrl = `${STRAPI_URL}/api/sub-categories?populate=category`;

    const params = new URLSearchParams();

    if (segment) {
        params.append('filters[segments][slug][$eq]', segment);
    }
    if (category) {
        params.append('filters[category][slug][$eq]', category);
    }
    if (slug) {
        params.append('filters[slug][$eq]', slug);
    }
    if (name) {
        params.append('filters[name][$eqi]', name);
    }

    const res = await getResult(apiUrl, params.toString());

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

export async function getMarks({slug, name}: {slug?: string, name?: string}): Promise<IMark[]> {
    const apiUrl = `${STRAPI_URL}/api/marks?populate=*`;
    const slugFilter = slug ? `&filters[slug][$eq]=${slug}` : '';
    const nameFilter = name ? `&filters[name][$eqi]=${name}` : '';
    const filter = `${slugFilter}${nameFilter}`;

    const res = await getResult(apiUrl, filter);

    if (!res.ok) {
        throw new Error(`Failed to fetch marks: ${res.status}`);
    }

    const data = await res.json();

    if (data) {
        return data.data;
    } else {
        console.error("Invalid sub-categories data structure:", data);
        return [];
    }
}

export async function getColors({name}: {name?: string}): Promise<IColor[]> {
    const apiUrl = `${STRAPI_URL}/api/colors?populate=*`;
    const nameFilter = name ? `&filters[name][$eqi]=${name}` : '';
    const filter = `${nameFilter}`;

    const res = await getResult(apiUrl, filter);

    if (!res.ok) {
        throw new Error(`Failed to fetch marks: ${res.status}`);
    }

    const data = await res.json();

    if (data) {
        return data.data;
    } else {
        console.error("Invalid sub-categories data structure:", data);
        return [];
    }
}

export async function getSizes({name}: {name?: string}): Promise<ISize[]> {
    const apiUrl = `${STRAPI_URL}/api/sizes?populate=*`;
    const nameFilters = name ? `&filters[name][$eqi]=${name}` : '';
    const filter = `${nameFilters}`;

    const res = await getResult(apiUrl, filter);

    if (!res.ok) {
        throw new Error(`Failed to fetch sizes: ${res.status}`);
    }

    const data = await res.json();

    if (data) {
        return data.data;
    } else {
        console.error("Invalid sub-categories data structure:", data);
        return [];
    }
}