// lib/actions.ts
'use server';

import {Segment} from "@/app/types/types";
import {getFakeSegments} from "@/app/fakeData/data";

export async function getSegments(): Promise<Segment[]> {
<<<<<<< HEAD
    if(process.env.NODE_ENV === "development") {
        return getFakeSegments();
    }

=======
>>>>>>> 68430227338f5440c6fa3f18f39d6ac30d8ebfdb
    const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/segments?populate=*`, {
        cache: 'no-store'
    });

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