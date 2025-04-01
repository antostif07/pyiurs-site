// components/SegmentGrid.tsx
import React from 'react';
import Link from 'next/link';
import Image from "next/image";
import {Segment} from "@/types/types";

interface SegmentGridProps {
    segments: Segment[];
}

export default function SegmentGrid({ segments }: SegmentGridProps) {
    const apiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL;

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {segments.map((segment) => (
                <div
                    key={segment.id}
                    className="group cursor-pointer rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition-transform duration-300 animate-slide-up"
                >
                    <Link href={`/segment/${segment.id}`} className="block">
                        <div className="relative h-[400px] overflow-hidden">
                            <Image
                                src={`${apiUrl}${segment.image?.formats.medium?.url}`}
                                alt={segment.name}
                                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500 ease-in-out"
                            />
                            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
                            <button
                                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white text-gray-800 font-semibold px-6 py-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-gray-100"
                            >
                                Voir Plus
                            </button>
                        </div>
                        <div className="p-4 text-center">
                            <h3 className="text-xl font-semibold text-gray-800">{segment.name}</h3>
                            {/* Add a short description here if you have one */}
                        </div>
                    </Link>
                </div>
            ))}
        </div>
    );
}