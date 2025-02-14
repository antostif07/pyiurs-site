interface ImageFormats {
    large?: {
        ext: string;
        url: string;
        hash: string;
        mime: string;
        name: string;
        path: null;
        size: number;
        width: number;
        height: number;
        sizeInBytes: number;
    };
    small?: {
        ext: string;
        url: string;
        hash: string;
        mime: string;
        name: string;
        path: null;
        size: number;
        width: number;
        height: number;
        sizeInBytes: number;
    };
    medium?: {
        ext: string;
        url: string;
        hash: string;
        mime: string;
        name: string;
        path: null;
        size: number;
        width: number;
        height: number;
        sizeInBytes: number;
    };
    thumbnail?: {
        ext: string;
        url: string;
        hash: string;
        mime: string;
        name: string;
        path: null;
        size: number;
        width: number;
        height: number;
        sizeInBytes: number;
    };
}

interface Image {
    id: number;
    documentId: string;
    name: string;
    alternativeText: null;
    caption: null;
    width: number;
    height: number;
    formats: ImageFormats;
    hash: string;
    ext: string;
    mime: string;
    size: number;
    url: string;
    previewUrl: null;
    provider: string;
    provider_metadata: null;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
}

interface ProductVariant {
    id: number;
    size: string;
    color: string;
    image: Image;
}

interface Product {
    id: number;
    documentId: string;
    name: string;
    description: string;
    price: number;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    image: Image;
    variants: ProductVariant[];
}

interface Pagination {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
}

interface ApiResponse {
    data: Product[];
    meta: {
        pagination: Pagination;
    };
    error: {
        message: string;
    }
}

interface Segment {
    id: number;
    name: string;
    description?: string;
    documentId: string;
    createdAt: string;
    image?: Image;
}
export type { ImageFormats, Image, Product, Pagination, ApiResponse, ProductVariant, Segment };