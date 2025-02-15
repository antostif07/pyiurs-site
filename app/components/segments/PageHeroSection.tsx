'use client'
import React from "react";
import {motion} from 'framer-motion'

export default function PageHeroSection({title, subtitle}: {title: string, subtitle?: string}) {
    return (
        <section className="relative py-12 md:py-36 bg-blue-500 text-white">
            <motion.div
                className="max-w-7xl mx-auto px-4 text-center"
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