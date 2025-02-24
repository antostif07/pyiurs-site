import {Category, Segment} from "@/app/types/types";

const data: Segment[] = [
    {

        documentId: "jfkndldl", id: 1, name: "Femme", slug: "femme", categories: [], createdAt: "2025-02-20",
    },
    {
        documentId: "kklmkk", id: 1, name: "Pyiurs-kids", slug: "kids", categories: [], createdAt: "2025-02-20",
    }
]
function getFakeSegments(): Segment[] {
    return data.map((item: Segment) => {
        return {
            id: item.id,
            name: item.name,
            documentId: item.documentId,
            slug: item.slug,
            categories: item.categories

        } as Segment;
    })
}

function getFakeCategories ({segment}: {segment?: string}): Category[] {
    if (segment === undefined) {
        const categories = data.reduce((acc: Category[], item: Segment) => {
            return acc.concat(item.categories);
        }, [])

        return categories.map((item: Category) => {
            return {
                id: item.id,
                documentId: item.documentId,
                createdAt: item.createdAt,
                segment: item.segment,
                name: item.name,
                slug: item.slug,
            };
        });
    }

    const categories: Category[] = data.filter((item: Segment) => item.slug === segment)[0].categories;
    return categories.map((item: Category) => {
        return {
            id: item.id,
                documentId: item.documentId,
                createdAt: item.createdAt,
                segment: item.segment,
                name: item.name,
                slug: item.slug,
        };
    })
}

export {getFakeSegments, getFakeCategories}