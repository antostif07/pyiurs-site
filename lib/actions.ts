// lib/actions.ts
'use server';

import {Segment} from "@/app/types/types";

export async function getSegments(): Promise<Segment[]> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/segments?populate=image`, {
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
                image: item.image
                // categories: item.categories.data.map((cat: any) => ({
                //     id: cat.id,
                //     name: cat.name,
                //     slug: cat.slug,
                // })),
            };
        });
    } else {
        console.error("Invalid segments data structure:", data);
        return [];
    }
}