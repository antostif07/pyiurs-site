'use client'
import React from "react";
import {motion} from 'framer-motion'

export default function PageHeroSection({title, subtitle, image}: {title: string, subtitle?: string, image?: string}) {
    return (
        <section className="relative md:py-32 pt-24 pb-6 md:py-36 text-white overflow-hidden">
            <div
                className="absolute inset-0 z-0"
                style={{
                    backgroundImage:
                        `url(${image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                <div className="absolute inset-0 bg-black/50" />
            </div>
            <motion.div
                className="max-w-7xl mx-auto px-4 text-center relative z-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h1 className="text-4xl font-extrabold tracking-tight leading-tight">
                    {title}
                </h1>
                <p className="mt-4 text-lg">
                    {subtitle}
                </p>
            </motion.div>
        </section>
    )
}