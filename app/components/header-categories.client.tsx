import Link from "next/link";
import { Category } from "../types/types";

export default function HeaderCategoriesClient({categories, handleLinkClick}: {categories: Category[], handleLinkClick: () => void}) {
    return (
        <div className="pl-4">
            {categories.map((category: Category) => (
                <Link
                    key={category.id}
                    href={`/categories/${category.slug}`}
                    className="block py-2 hover:text-gray-500"
                    onClick={handleLinkClick}
                >
                    {category.name}
                </Link>
            ))}
        </div>
    );
}