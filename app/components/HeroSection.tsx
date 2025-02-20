'use client';

import React, { useState, useEffect, } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link'

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

  const variants = {
    enter: (direction: number) => {
      return {
        x: direction > 0 ? 1000 : -1000,
        opacity: 0,
      };
    },
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.7,
        ease: "easeInOut",
      },
    },
    exit: (direction: number) => {
      return {
        zIndex: 0,
        x: direction < 0 ? 1000 : -1000,
        opacity: 0,
        transition: {
          duration: 0.7,
          ease: "easeInOut",
        },
      };
    },
  };

  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  return (
    <div className="relative h-screen min-h-screen overflow-hidden">
      <AnimatePresence initial={false} custom={1} >
        <motion.div
          key={slides[currentIndex].id}
          className="absolute w-full h-full"
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={(e, { offset, velocity }) => {
            const direction = swipePower(offset.x, velocity.x) < -100 ? 1 : -1;
            setCurrentIndex(  ( slides.length + currentIndex + direction ) % slides.length   );
          }}
          custom={1}
        >
          <motion.div style={{width:"100%", height:"100%", position:"absolute", scale: 1.1}} transition={{
              duration: 20,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'linear',
            }} animate={{ scale: 1.5 }}>
              <Image
                  src={slides[currentIndex].imageUrl}
                  alt={`Hero Image ${slides[currentIndex].id}`}
                  fill
                  style={{
                      objectFit: 'cover',
                      objectPosition: 'top',
                  }}
                  priority // loading priority
                  />
          </motion.div>

          {/* Dark Overlay */}
          <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50 z-10"></div>

          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-white z-20">
            <motion.h2
              className="text-5xl md:text-5xl font-bold mb-4 font-hero"
            >
              {slides[currentIndex].title}
            </motion.h2>
            <motion.p
              className="text-xl mb-6"
            >
              {slides[currentIndex].description}
            </motion.p>
            <motion.button
              className="bg-white text-black py-3 px-8 rounded-md hover:bg-gray-100 transition"
            >
              <Link href={'/segments/femme'}>
                {slides[currentIndex].buttonText}
              </Link>
            </motion.button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};