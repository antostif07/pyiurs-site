'use client';

import React, { useRef, useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { twMerge } from 'tailwind-merge';
import {useInView} from "react-intersection-observer";
import Link from "next/link";
import Image from "next/image";
import {Segment} from "@/types/types";  // Import tailwind-merge

export default function SegmentClient({ rayon }: { rayon: Segment }) {
    const segmentRef = useRef<HTMLDivElement>(null);
    const controls = useAnimation();
    const [isVisible, setIsVisible] = useState(false);
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.2,
    });

    useEffect(() => {
        const seg = segmentRef.current
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    controls.start("visible");
                    observer.unobserve(seg!);
                }
            },
            {
                threshold: 0.2,
            }
        );

        if (seg) {
            observer.observe(seg);
        }

        return () => {
            if (seg) {
                observer.unobserve(seg);
            }
        };
    }, [controls]);

    const imageUrl = rayon.image?.formats?.medium?.url;
    const imageName = rayon.name;

    const variants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.7, // Reduced duration for a snappier animation
                ease: "easeInOut" // More natural easing function
            }
        }
    };

    const mergedClassName = twMerge(
        "relative group cursor-pointer h-[350px] md:h-[400px] overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300", // base classes
        isVisible ? "animate-fade-in" : ""
    );

    return (
        <Link href={`/segments/${rayon.slug}`} passHref> {/* Use Link with the desired href */}
            <motion.div
                ref={ref}
                className={mergedClassName}
                variants={variants}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
            >
                <Image
                    src={imageUrl ? `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${imageUrl}` : '/placeholder-image.jpg'}
                    alt={imageName}
                    width={rayon.image?.width} height={rayon.image?.height}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent flex items-end justify-center p-4">
                    <h3 className="text-white text-xl md:text-2xl font-semibold text-center">{imageName}</h3>
                </div>
            </motion.div>
        </Link>
    );
}