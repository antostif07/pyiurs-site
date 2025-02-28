"use client";

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Button } from '@/components/ui/button';

export const Collection = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="py-20 overflow-hidden">
      <div className="container mx-auto px-24">
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center"
        >
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="order-2 lg:order-1"
          >
            <span className="text-primary font-medium">Nouvelle Collection</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">Collection Été 2025</h2>
            <p className="text-muted-foreground mb-6 text-lg">
              Notre nouvelle collection d'été est arrivée avec des pièces légères, colorées et élégantes. 
              Des matières naturelles et respirantes pour vous accompagner tout au long de la saison estivale.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/products/summer-collection">
                <Button size="lg">Découvrir la collection</Button>
              </Link>
              <Link href="/lookbook">
                <Button variant="outline" size="lg">Voir le lookbook</Button>
              </Link>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="order-1 lg:order-2"
          >
            <div className="relative">
              <div className="relative h-[500px] rounded-lg overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop"
                  alt="Collection Été 2025"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 md:-left-12 w-40 h-40 md:w-60 md:h-60 bg-primary/10 backdrop-blur-sm rounded-lg p-6 flex flex-col justify-center">
                <span className="text-xl md:text-2xl font-bold">Jusqu'à</span>
                <span className="text-3xl md:text-5xl font-bold text-primary">30%</span>
                <span className="text-xl md:text-2xl font-bold">de réduction</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};