"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ChevronRight, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

// Données des collections
const collections = [
  {
    id: "printemps-2025",
    name: "Printemps 2025",
    description: "Découvrez notre nouvelle collection de printemps avec des pièces légères et colorées, parfaites pour la saison.",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop",
    itemCount: 24,
    isNew: true,
    featured: true
  },
  {
    id: "ete-2025",
    name: "Été 2025",
    description: "Notre collection d'été est arrivée avec des pièces légères, colorées et élégantes pour vous accompagner tout au long de la saison estivale.",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop",
    itemCount: 32,
    isNew: true,
    featured: true
  },
  {
    id: "essentiels-quotidien",
    name: "Essentiels du Quotidien",
    description: "Des vêtements confortables et élégants pour toutes les occasions. Des pièces intemporelles qui s'intègrent parfaitement à votre garde-robe.",
    image: "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?q=80&w=2086&auto=format&fit=crop",
    itemCount: 18,
    isNew: false,
    featured: true
  },
  {
    id: "edition-limitee",
    name: "Édition Limitée",
    description: "Pièces exclusives disponibles pour une durée limitée. Ne manquez pas cette opportunité de vous démarquer avec des créations uniques.",
    image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=2070&auto=format&fit=crop",
    itemCount: 12,
    isNew: true,
    featured: false
  },
  {
    id: "automne-2024",
    name: "Automne 2024",
    description: "Des pièces chaudes et élégantes pour affronter les journées fraîches avec style. Découvrez notre sélection de vêtements d'automne.",
    image: "https://images.unsplash.com/photo-1511130558090-00af810c21b1?q=80&w=1974&auto=format&fit=crop",
    itemCount: 28,
    isNew: false,
    featured: false
  },
  {
    id: "hiver-2024",
    name: "Hiver 2024",
    description: "Restez au chaud avec notre collection d'hiver. Des manteaux élégants, des pulls douillets et des accessoires pour compléter votre look hivernal.",
    image: "https://images.unsplash.com/photo-1548624313-0396c75e4b1a?q=80&w=1974&auto=format&fit=crop",
    itemCount: 22,
    isNew: false,
    featured: false
  },
  {
    id: "soiree-elegante",
    name: "Soirée Élégante",
    description: "Des tenues sophistiquées pour vos événements spéciaux. Robes de soirée, ensembles chics et accessoires raffinés pour briller en toute occasion.",
    image: "https://images.unsplash.com/photo-1581044777550-4cfa60707c03?q=80&w=1972&auto=format&fit=crop",
    itemCount: 16,
    isNew: false,
    featured: false
  },
  {
    id: "casual-chic",
    name: "Casual Chic",
    description: "Le parfait équilibre entre confort et élégance. Des tenues décontractées mais stylées pour votre quotidien.",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1920&auto=format&fit=crop",
    itemCount: 20,
    isNew: false,
    featured: false
  }
];

export default function CollectionsPage() {
  const [filter, setFilter] = useState('all'); // 'all', 'new', 'featured'
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Filtrer les collections
  const filteredCollections = collections.filter(collection => {
    if (filter === 'all') return true;
    if (filter === 'new') return collection.isNew;
    if (filter === 'featured') return collection.featured;
    return true;
  });

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <div className="flex items-center text-sm text-muted-foreground mb-8">
          <Link href="/" className="hover:text-foreground transition-colors">
            Accueil
          </Link>
          <ChevronRight className="h-4 w-4 mx-2" />
          <span className="text-foreground">Collections</span>
        </div>

        {/* Hero Section */}
        <div className="relative rounded-lg overflow-hidden mb-12">
          <div className="relative h-[300px] md:h-[400px]">
            <Image
              src="https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=2071&auto=format&fit=crop"
              alt="Collections"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/40" />
            <div className="absolute inset-0 flex flex-col justify-center p-8 md:p-16">
              <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">Nos Collections</h1>
              <p className="text-white/90 text-lg md:text-xl max-w-2xl mb-6">
                Découvrez nos collections soigneusement élaborées pour chaque saison et occasion.
                Des pièces élégantes et intemporelles qui reflètent votre style unique.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button 
                  variant={filter === 'all' ? 'default' : 'outline'} 
                  onClick={() => setFilter('all')}
                  className={filter === 'all' ? 'bg-white text-black hover:bg-white/90' : 'bg-transparent text-white border-white hover:bg-white/20'}
                >
                  Toutes les collections
                </Button>
                <Button 
                  variant={filter === 'new' ? 'default' : 'outline'} 
                  onClick={() => setFilter('new')}
                  className={filter === 'new' ? 'bg-white text-black hover:bg-white/90' : 'bg-transparent text-white border-white hover:bg-white/20'}
                >
                  Nouveautés
                </Button>
                <Button 
                  variant={filter === 'featured' ? 'default' : 'outline'} 
                  onClick={() => setFilter('featured')}
                  className={filter === 'featured' ? 'bg-white text-black hover:bg-white/90' : 'bg-transparent text-white border-white hover:bg-white/20'}
                >
                  Collections vedettes
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Collections Grid */}
        <motion.div
          ref={ref}
          variants={container}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredCollections.map((collection) => (
            <motion.div key={collection.id} variants={item}>
              <Link href={`/collections/${collection.id}`} className="group block">
                <div className="relative aspect-[4/3] rounded-lg overflow-hidden mb-4">
                  <Image
                    src={collection.image}
                    alt={collection.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors duration-300" />
                  
                  {collection.isNew && (
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-primary text-primary-foreground">Nouveau</Badge>
                    </div>
                  )}
                  
                  <div className="absolute bottom-4 right-4">
                    <Badge variant="outline" className="bg-black/50 text-white border-white">
                      {collection.itemCount} articles
                    </Badge>
                  </div>
                </div>
                
                <h2 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                  {collection.name}
                </h2>
                
                <p className="text-muted-foreground mb-3 line-clamp-2">
                  {collection.description}
                </p>
                
                <div className="flex items-center text-primary font-medium">
                  <span>Découvrir la collection</span>
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Empty State */}
        {filteredCollections.length === 0 && (
          <div className="text-center py-16">
            <h2 className="text-2xl font-semibold mb-2">Aucune collection trouvée</h2>
            <p className="text-muted-foreground mb-6">
              Aucune collection ne correspond à votre filtre actuel.
            </p>
            <Button onClick={() => setFilter('all')}>
              Voir toutes les collections
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}