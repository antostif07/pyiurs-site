'use client'
import { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion, useAnimation } from "framer-motion";
import { useInView } from 'react-intersection-observer';
import {ParallaxHeader} from "@/components/parralax-title";

const collections = [
    {
        id: 1,
        name: "Été Chic",
        image: "https://source.unsplash.com/400x300/?summer,fashion",
        description: "Une collection légère et colorée inspirée par la chaleur estivale et les journées ensoleillées."
    },
    {
        id: 2,
        name: "Hiver Élégant",
        image: "https://source.unsplash.com/400x300/?winter,fashion",
        description: "Des pièces raffinées et chaudes, parfaites pour affronter l'hiver avec style et élégance."
    },
    {
        id: 3,
        name: "Streetwear Urbain",
        image: "https://source.unsplash.com/400x300/?streetwear,fashion",
        description: "L'alliance parfaite entre confort et modernité pour une silhouette résolument urbaine."
    },
    {
        id: 4,
        name: "Classique Intemporel",
        image: "https://source.unsplash.com/400x300/?classic,fashion",
        description: "Des pièces iconiques et intemporelles qui traversent les générations avec élégance."
    }
];

export default function CollectionsPage() {
    const cardVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: "easeInOut"
            }
        }
    };

    return (
        <div className="pb-16">
            <ParallaxHeader title={'Nos Collections'} />
            <div className="container mx-auto px-24">
                <p className="text-center text-gray-700 my-12 max-w-2xl mx-auto text-xl">
                    Découvrez l'univers de Pyiurs à travers nos collections soigneusement sélectionnées. Des looks audacieux aux classiques revisités, trouvez votre style parmi nos créations.
                </p>
                <div
                    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
                >
                    {collections.map((collection) => (
                        <CollectionCard collection={collection} key={collection.id} variants={cardVariants}/>
                    ))}
                </div>
            </div>
        </div>

    );
}

// @ts-ignore
function CollectionCard({collection, variants}) {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.2,
    });
    const controls = useAnimation();

    useEffect(() => {
        if (inView) {
            controls.start("visible");
        }
    }, [inView, controls]);
    return (
        <motion.div
            ref={ref}
            variants={variants}
            initial="hidden"
            animate={controls}
            whileHover={{ scale: 1.05 }}
        >
            <Card className="overflow-hidden rounded-2xl shadow-lg">
                <img src={collection.image} alt={collection.name} className="w-full h-60 object-cover" />
                <CardContent className="p-4 text-center">
                    <h2 className="text-xl font-semibold">{collection.name}</h2>
                    <p className="text-sm text-gray-600 mt-2">{collection.description}</p>
                    <Button className="mt-4">Découvrir</Button>
                </CardContent>
            </Card>
        </motion.div>
    )
}