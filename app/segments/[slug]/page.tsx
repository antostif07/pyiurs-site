import {Category, Product} from "@/app/types/types";
import {useCallback} from "react";
import {getCategories, getProducts} from "@/lib/api";

interface Props {
    searchParams: { category?: string };
}

export default async function SegmentDetails({ searchParams }: Props) {
    const { category } = searchParams

    const articlesPromise = getProducts(category);
    const categoriesPromise = getCategories();

    const articles = await articlesPromise;
    const categories = await categoriesPromise;

    // Envoi des fonctions en useCallback
    const onCategoryClick = useCallback((slug: string | undefined) => {
        const params = new URLSearchParams(searchParams);
        if (slug) {
            params.set('category', slug);
        } else {
            params.delete('category');
        }
        window.location.search = params.toString();
    }, [searchParams]);

    return (
        <div className="container mx-auto py-8">
            <h1 className="text-2xl font-bold mb-4">Collection Femme</h1>

            {/*<CategoryFilter categories={categories} selectedCategory={category} onCategoryClick={onCategoryClick} />*/}

            {/*<ArticleGrid articles={articles} />*/}
        </div>
    );
}