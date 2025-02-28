"use client";

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import { Segment } from '@/app/types/types';

const categories = [
  {
    id: 1,
    name: "Robes",
    description: "Élégantes et confortables pour toutes les occasions",
    image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?q=80&w=1992&auto=format&fit=crop",
    link: "/categories/dresses"
  },
  {
    id: 2,
    name: "Hauts",
    description: "Des t-shirts aux blouses sophistiquées",
    image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?q=80&w=2005&auto=format&fit=crop",
    link: "/categories/tops"
  },
  {
    id: 3,
    name: "Pantalons",
    description: "Jeans, pantalons habillés et leggings",
    image: "https://images.unsplash.com/photo-1509551388413-e18d0ac5d495?q=80&w=1974&auto=format&fit=crop",
    link: "/categories/pants"
  },
  {
    id: 4,
    name: "Accessoires",
    description: "Bijoux, sacs et plus encore",
    image: "https://images.unsplash.com/photo-1601924582970-9238bcb495d9?q=80&w=1976&auto=format&fit=crop",
    link: "/categories/accessories"
  }
];

export const Segments = ({segments}: {segments: Segment[]}) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="py-20">
      <div className="container mx-auto px-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Nos Rayons</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
          Notre boutique vous invite à explorer trois facettes de la vie, chacune célébrée à travers une sélection pointue et inspirante. Découvrez des essentiels intemporels, des créations audacieuses, et des rituels de beauté pour tous les âges et tous les styles.
          </p>
        </div>

        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6"
        >
          {segments.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link href={`/segments/${category.slug}`} className="block group">
                <div className="relative overflow-hidden rounded-lg aspect-square">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${category.image?.formats?.small?.url ?? ''}`}
                    alt={category.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-300" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6 text-center">
                    <h3 className="text-2xl font-bold mb-2">{category.name}</h3>
                    <p className="mb-4 opacity-90">{category.description}</p>
                    <Button variant="outline" className="text-black/60 border-white hover:bg-white hover:text-black transition-colors">
                      Explorer
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};