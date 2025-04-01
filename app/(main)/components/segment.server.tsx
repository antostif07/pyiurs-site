import React from 'react';
import {ApiResponse, Segment} from "@/types/types";
import SegmentClient from "@/app/(main)/components/segment.client";

export default async function SegmentsServer() {
    const apiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL;
        const response = await fetch(`${apiUrl}/api/segments?populate=image`, {
            cache: 'no-store'
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const json: ApiResponse<Segment> = await response.json();

        if (json.error) {
            console.error("Erreur de l'API:", json.error);
            return <div>{`Erreur Interne. Contactez l'Administrateur.`}</div>;
        }

        const segments: Segment[] = json.data;

        return (
            <div className="max-w-7xl mx-auto px-4 py-16">
                <h2 className="text-3xl font-bold text-center mb-12">Nos Rayons</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {segments.map((rayon: Segment, index) => (
                        <SegmentClient key={index} rayon={rayon}/>
                    ))}
                </div>
            </div>
        );
}
