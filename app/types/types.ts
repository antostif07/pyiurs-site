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
    slug: string;
}

interface Pagination {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
}

interface ApiResponse<T> {
    data: T[];
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
    slug: string;
    categories: Category[];
}

interface Category {
    id: number;
    name: string;
    segment: Segment;
    documentId: string;
    slug: string;
    createdAt: string;
    cover?: Image;
}

interface CartItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
    image: { url: string };
}

interface CartState {
    cartItems: CartItem[];
    addToCart: (item: CartItem) => void;
    removeFromCart: (itemId: string) => void;
    updateQuantity: (itemId: string, quantity: number) => void;
    clearCart: () => void;
    totalItems: number;
    totalPrice: number;
}

interface SubCategory {
    id: number;
    documentId: string;
    name: string;
    slug: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    category: Category;
    segments: Segment[];
}

interface HomeSection {
    id: number;
    title: string;
    subtitle: string;
    cover: Image;
    "Button": IButton;
}

interface IButton {
    id: string;
    title: string;
    href: string;
}

export type { SubCategory, ImageFormats, Image, Product, Pagination, ApiResponse, ProductVariant, Segment, Category, CartState, CartItem, HomeSection, IButton };