'use client';

import React, { useRef, useEffect, useState } from 'react';
import 'animate.css';

// Définition des types pour les données de Strapi

export default function SegmentClient({ rayon }: { rayon: Segment }) {
    const segmentRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(segmentRef.current!); // Use non-null assertion here
                }
            },
            {
                threshold: 0.2,
            }
        );

        if (segmentRef.current) {
            observer.observe(segmentRef.current);
        }

        return () => {
            if (segmentRef.current) {
                observer.unobserve(segmentRef.current);
            }
        };
    }, []);

    const imageUrl = rayon.image?.formats?.medium?.url;
    const imageName = rayon.name;

    return (
        <div
            ref={segmentRef}
            className={`relative group cursor-pointer h-[400px] overflow-hidden ${isVisible ? 'animate__animated animate__fadeInUp' : 'opacity-0'
            }`}
            style={{ transition: 'opacity 0.5s' }}
        >
            <img
                src={imageUrl ? `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${imageUrl}` : 'placeholder-image.jpg'}
                alt={imageName}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
                <h3 className="text-white text-2xl font-semibold">{imageName}</h3>
            </div>
        </div>
    );
};