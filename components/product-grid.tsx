'use client'
import { Product, } from "@/types/types";
import { motion } from "framer-motion";
import { useInView } from 'react-intersection-observer';
import ProductCard from "@/components/product-card";

export default function ProductGrid({ products }: { products: Product[] }) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      variants={container}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
    >
      {products.map((product) => (
        <ProductCard product={product} key={product.id} />
      ))}
    </motion.div>
  );
}