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
    sizes: ISize[];
    color?: IColor;
    image: Image[];
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
    image?: Image;
    variants: ProductVariant[];
    slug: string;
    category?: Category;
    sub_category?: SubCategory;
    segment?: Segment;
    reference: string;
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
    sub_categories: SubCategory[];
}

interface CartItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
    image: { url: string };
    color: IColor | undefined;
    size: string;
}

interface CartState {
    cartItems: CartItem[];
    addToCart: (item: {
        image: { url: `${string}${string}` | `${string}undefined` };
        quantity: number;
        color: IColor | undefined;
        size: string;
        price: number;
        name: string;
        id: string
    }) => void;
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

interface IColor {
    documentId: string;
    id: number;
    name: string;
    hex: string;
}

// Type pour les infos retournées par le helper d'unicité
interface UniqueProductInfo {
    name: string;
    description: string;
    slug: string; // Le slug unique validé
}

interface ISize {
    documentId: string;
    id: number;
    name: string;
    shorten: string;
}

interface ICollection {
    id: number;
    documentId: string;
    name: string;
    description: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    image?: Image;
    slug: string;
    products: Product[];
}

interface IArticle {
    id: number;
    documentId: string;
    createdAt: string;
    category: Segment;
    title: string;
    content: string;
    excerpt: string;
}

interface IMark {
    id: number;
    documentId: string;
    createdAt: string;
    category: Segment;
    name: string;
    slug: string;
}

interface ExcelData {
    "Reference": string;
    "Description"?: string;
    "Name"?: string,
    "Price": number;
    "Image"?: string; // Rendre optionnel au cas où la colonne n'existe pas
    "Colors"?: string;
    "Sizes"?: string;
    "Mark"?: string;
    "SubCategory": string;
    "Segment": string;
    "Category"?: string;
    [key: string]: any; // Pour permettre l'accès via imageUrlColumn
}


interface NewProductData {
    name: string;
    description: string;
    slug: string;
    price: number;
    reference: string;
    status?: string;
    segment?: {
        connect: string[]
    };
    category?: {
        connect: string[]
    };
    sub_category?: {
        connect: string[]
    };
    mark?: {
        connect: string[]
    };
    variants: VariantData[];
    image?: number; // Ajouté pour l'ID de l'image uploadée
}

interface ActionResult {
    message: string;
    type: 'success' | 'error';
    details?: string[]; // Pour remonter les erreurs spécifiques
}

interface VariantData {
    color: {
        connect: string[]
    };
    sizes: {
        connect: string[]
    };
}

export type { UniqueProductInfo, VariantData, ActionResult, NewProductData, ExcelData, IMark, IArticle, ISize, IColor, ICollection, SubCategory, ImageFormats, Image, Product, Pagination, ApiResponse, ProductVariant, Segment, Category, CartState, CartItem, HomeSection, IButton };