import { CollectionsPage } from "@/components/collection.client";
import { getCollections } from "@/lib/api";

export default async function Collection() {
    const collections = await getCollections();
    
    return (
        <CollectionsPage collections={collections} />
    )
}