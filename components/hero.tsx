"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import {HomeSection} from "@/types/types";

export const Hero = ({ blocks }: { blocks: HomeSection[] }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % blocks.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [blocks.length]);

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {blocks.map((slide, index) => (
        <motion.div
          key={slide.id}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: currentSlide === index ? 1 : 0,
            transition: { duration: 0.8 }
          }}
        >
          <div className="relative h-full w-full">
            <Image
              src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${slide.cover?.formats?.large?.url || ''}`}
              alt={slide.title}
              fill
              priority
              className="object-cover object-top"
            />
            <div className="absolute inset-0 bg-black/30" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="container mx-auto px-8 md:px-24">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ 
                    opacity: currentSlide === index ? 1 : 0,
                    y: currentSlide === index ? 0 : 20,
                    transition: { delay: 0.3, duration: 0.8 }
                  }}
                  className="max-w-xl text-white"
                >
                  <h1 className="text-5xl md:text-6xl font-bold mb-4">{slide.title}</h1>
                  <p className="text-xl mb-8">{slide.subtitle}</p>
                  <Link href={slide.Button.href}>
                    <Button size="lg" className="group">
                      {slide.Button.title}
                      <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      ))}

      {/* Slide indicators */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center space-x-2">
        {blocks.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2 rounded-full transition-all ${
              currentSlide === index ? "w-8 bg-white" : "w-2 bg-white/50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};