'use client'
import { useState, } from "react";
import { Button } from "@/components/ui/button";
import { motion, } from "framer-motion";
import { useInView } from 'react-intersection-observer';
import { ICollection } from "@/app/types/types";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";

export const CollectionsPage = ({collections}: {collections: ICollection[]}) => {
    const [filter, setFilter] = useState('all'); // 'all', 'new', 'featured'
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.1,
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
            <div className="container mx-auto px-24">
        
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
          {collections.map((collection) => (
            <motion.div key={collection.id} variants={item}>
              <Link href={`/collections/${collection.id}`} className="group block">
                <div className="relative aspect-[4/3] rounded-lg overflow-hidden mb-4">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${collection.image?.formats?.medium?.url}`}
                    alt={collection.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors duration-300" />
                  
                  {/* {collection.isNew && (
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-primary text-primary-foreground">Nouveau</Badge>
                    </div>
                  )} */}
                  
                  {/* <div className="absolute bottom-4 right-4">
                    <Badge variant="outline" className="bg-black/50 text-white border-white">
                      {collection.itemCount} articles
                    </Badge>
                  </div> */}
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
        {collections.length === 0 && (
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
    )
}