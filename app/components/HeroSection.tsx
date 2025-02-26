'use client';

import React, { useState, useEffect } from 'react';
import {motion, AnimatePresence, Variants} from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

export default function Hero() {
  const slides = [
    {
      id: 1,
      imageUrl: '/images/image1.jpg',
      title: 'Nouvelles Arrivées',
      description: 'Explorez notre dernière collection',
      buttonText: 'Nouvelle Collection',
    },
    {
      id: 2,
      imageUrl: '/images/image2.jpg',
      title: 'Édition Limitée',
      description: 'Découvrez des designs exclusifs',
      buttonText: 'Nouvelle Collection',
    },
    {
      id: 3,
      imageUrl: '/images/image3.jpg',
      title: 'Soldes d\'été',
      description: 'Jusqu\'à 50% de réduction sur une sélection d\'articles',
      buttonText: 'Nouvelle Collection',
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 7000);
    return () => clearInterval(intervalId);
  }, [slides.length]);

  const variants: Variants = {
    enter: {
      x: "100%",
      opacity: 0,
      position: "absolute",
    },
    center: {
      x: "0%",
      opacity: 1,
      position: "absolute",
      transition: { duration: 1, ease: "easeInOut" },
    },
    exit: {
      x: "-100%",
      opacity: 0,
      position: "absolute",
      transition: { duration: 1, ease: "easeInOut" },
    },
  };

  return (
      <div className="relative h-screen min-h-screen overflow-hidden">
        <AnimatePresence>
          {slides.map((slide, index) => (
              index === currentIndex && (
                  <motion.div
                      key={slide.id}
                      className="absolute w-full h-full"
                      variants={variants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                  >
                    <motion.div
                        style={{
                          width: "100%",
                          height: "100%",
                          position: "absolute",
                        }}
                        transition={{
                          duration: 20,
                          repeat: Infinity,
                          repeatType: "reverse",
                          ease: "linear",
                        }}
                        animate={{ scale: 1.5 }}
                    >
                      <Image
                          src={slide.imageUrl}
                          alt={`Hero Image ${slide.id}`}
                          fill
                          style={{
                            objectFit: "cover",
                            objectPosition: "top",
                          }}
                          priority
                      />
                    </motion.div>

                    {/* Dark Overlay */}
                    <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50 z-9"></div>

                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-white z-20">
                      <motion.h2 className="text-5xl md:text-5xl font-bold mb-4">
                        {slide.title}
                      </motion.h2>
                      <motion.p className="text-xl mb-6">{slide.description}</motion.p>
                      <motion.button className="bg-white text-black py-3 px-8 rounded-md hover:bg-gray-100 transition">
                        <Link href={"/segments/femme"}>{slide.buttonText}</Link>
                      </motion.button>
                    </div>
                  </motion.div>
              )
          ))}
        </AnimatePresence>
      </div>
  );
};
