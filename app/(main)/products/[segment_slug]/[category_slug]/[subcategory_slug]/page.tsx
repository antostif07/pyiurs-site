import SubcategoryClient from "@/components/subcartegory.client";
import { getProducts, getSubCategories } from "@/lib/api";

export default async function SubCategory({params}: {params: Promise<{subcategory_slug: string}>}) {
    const {subcategory_slug} = await params;

    const category = await getSubCategories({slug: subcategory_slug});
    const products = await getProducts({subCategory: subcategory_slug})
    const cat = category[0] || null;

  return <SubcategoryClient subCategory={cat} products={products} />
}