// app/segments/page.tsx
import React from 'react';
import {getSegments} from "@/lib/api";
import {Segment} from "@/app/types/types";
import SegmentClient from "@/app/components/segment.client";
import SegmentHeroSection from "@/app/components/segments/PageHeroSection";

export default async function SegmentsPage() {
    const segments = await getSegments();

    return (
        <div className="container mx-auto"> {/* Ajout de px-6 ici */}
            {/* Hero Title */}
            <div className="text-center mb-10">
                <div>
                    <SegmentHeroSection
                        title={`Explorez Nos Différents Segments`}
                        subtitle={`Découvrez des collections uniques pour chaque style et occasion. `}
                    />
                </div>
            </div>
            <div className={"max-w-7xl mx-auto px-4 py-16"}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {segments.map((rayon: Segment, index) => (
                        <SegmentClient key={index} rayon={rayon}/>
                    ))}
                </div>
            </div>
        </div>
    );
}