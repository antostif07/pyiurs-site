"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ChevronRight, Search, Calendar, User, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

const blogPosts = [
  {
    id: "tendances-printemps-2025",
    title: "Les tendances mode du printemps 2025",
    excerpt: "Découvrez les couleurs, les coupes et les matières qui feront sensation cette saison. Notre guide complet des tendances à adopter dès maintenant.",
    content: "",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop",
    author: "Sophie Martin",
    date: "15 mars 2025",
    category: "Tendances",
    tags: ["Printemps", "Tendances", "Mode", "2025"],
    featured: true
  },
  {
    id: "accessoires-indispensables",
    title: "Les accessoires indispensables pour sublimer votre tenue",
    excerpt: "Comment choisir et associer les accessoires parfaits pour mettre en valeur votre style personnel et transformer une tenue simple en look remarquable.",
    content: "",
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1976&auto=format&fit=crop",
    author: "Camille Dubois",
    date: "28 février 2025",
    category: "Conseils",
    tags: ["Accessoires", "Style", "Bijoux", "Sacs"],
    featured: true
  },
  {
    id: "mode-ethique-durable",
    title: "Mode éthique et durable : notre engagement",
    excerpt: "Comment nous sélectionnons nos matières premières et travaillons avec des ateliers responsables pour créer une mode belle et respectueuse de l'environnement.",
    content: "",
    image: "https://images.unsplash.com/photo-1532453288672-3a27e9be9efd?q=80&w=1964&auto=format&fit=crop",
    author: "Marie Leroy",
    date: "10 février 2025",
    category: "Éthique",
    tags: ["Durable", "Éthique", "Environnement", "Responsable"],
    featured: false
  },
  {
    id: "comment-porter-couleurs-vives",
    title: "Comment porter les couleurs vives avec élégance",
    excerpt: "Astuces et conseils pour intégrer des couleurs audacieuses dans votre garde-robe quotidienne, même si vous préférez habituellement les tons neutres.",
    content: "",
    image: "https://images.unsplash.com/photo-1589810635657-232948472d98?q=80&w=1980&auto=format&fit=crop",
    author: "Émilie Bernard",
    date: "5 février 2025",
    category: "Conseils",
    tags: ["Couleurs", "Style", "Conseils"],
    featured: false
  },
  {
    id: "entretien-vetements-qualite",
    title: "Comment entretenir vos vêtements de qualité",
    excerpt: "Guide pratique pour prolonger la durée de vie de vos pièces préférées grâce à des méthodes d'entretien adaptées à chaque type de tissu.",
    content: "",
    image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?q=80&w=1965&auto=format&fit=crop",
    author: "Julie Moreau",
    date: "20 janvier 2025",
    category: "Conseils",
    tags: ["Entretien", "Qualité", "Durabilité"],
    featured: false
  },
  {
    id: "interview-styliste",
    title: "Interview exclusive avec notre styliste en chef",
    excerpt: "Découvrez les inspirations, le processus créatif et les prévisions de tendances de notre styliste en chef pour les prochaines collections.",
    content: "",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop",
    author: "Thomas Durand",
    date: "12 janvier 2025",
    category: "Interview",
    tags: ["Styliste", "Création", "Coulisses", "Interview"],
    featured: false
  },
  {
    id: "capsule-wardrobe-printemps",
    title: "Créer une garde-robe capsule pour le printemps",
    excerpt: "Comment constituer une garde-robe minimaliste mais polyvalente avec seulement 15 pièces essentielles pour la saison printanière.",
    content: "",
    image: "https://images.unsplash.com/photo-1560243563-062bfc001d68?q=80&w=1970&auto=format&fit=crop",
    author: "Sophie Martin",
    date: "5 janvier 2025",
    category: "Conseils",
    tags: ["Garde-robe capsule", "Minimalisme", "Printemps", "Essentiels"],
    featured: false
  },
  {
    id: "histoire-mode-feminine",
    title: "L'évolution de la mode féminine à travers les décennies",
    excerpt: "Un voyage fascinant à travers l'histoire de la mode féminine, des années 1920 à aujourd'hui, et comment les tendances passées influencent toujours notre style.",
    content: "",
    image: "https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=2071&auto=format&fit=crop",
    author: "Camille Dubois",
    date: "28 décembre 2024",
    category: "Histoire",
    tags: ["Histoire", "Évolution", "Tendances", "Décennies"],
    featured: false
  }
];

// Catégories uniques
const categories = [...new Set(blogPosts.map(post => post.category))];

// Tags uniques
const allTags = [...new Set(blogPosts.flatMap(post => post.tags))];

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Toutes');
  const [selectedTag, setSelectedTag] = useState('');
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Filtrer les articles
  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'Toutes' || post.category === selectedCategory;
    const matchesTag = selectedTag === '' || post.tags.includes(selectedTag);
    
    return matchesSearch && matchesCategory && matchesTag;
  });

  // Articles en vedette
  const featuredPosts = blogPosts.filter(post => post.featured);

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
          <span className="text-foreground">Blog</span>
        </div>

        {/* Hero Section */}
        <div className="relative rounded-lg overflow-hidden mb-12">
          <div className="relative h-[300px] md:h-[400px]">
            <Image
              src="https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop"
              alt="Blog Mode"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/40" />
            <div className="absolute inset-0 flex flex-col justify-center p-8 md:p-16">
              <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">Notre Blog Mode</h1>
              <p className="text-white/90 text-lg md:text-xl max-w-2xl mb-6">
                Découvrez nos derniers articles, conseils de style et actualités mode pour rester à la pointe des tendances.
              </p>
              <div className="relative max-w-md">
                <Input 
                  type="text" 
                  placeholder="Rechercher un article..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-white/20 text-white placeholder:text-white/70 border-white/30 focus-visible:ring-white/50"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/70" />
              </div>
            </div>
          </div>
        </div>

        {/* Featured Posts */}
        {featuredPosts.length > 0 && (
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-8">Articles en Vedette</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {featuredPosts.map((post) => (
                <Link key={post.id} href={`/blog/${post.id}`} className="group">
                  <div className="relative aspect-[16/9] rounded-lg overflow-hidden mb-4">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors duration-300" />
                    <div className="absolute bottom-4 left-4">
                      <Badge className="bg-primary text-primary-foreground">
                        {post.category}
                      </Badge>
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                    {post.title}
                  </h3>
                  <div className="flex items-center text-sm text-muted-foreground mb-3">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>{post.date}</span>
                    <span className="mx-2">•</span>
                    <User className="h-4 w-4 mr-1" />
                    <span>{post.author}</span>
                  </div>
                  <p className="text-muted-foreground mb-3">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center text-primary font-medium">
                    <span>{`Lire l'article`}</span>
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 order-2 lg:order-1">
            <div className="sticky top-24 space-y-8">
              {/* Categories */}
              <div className="bg-background rounded-lg border p-6">
                <h3 className="font-semibold text-lg mb-4">Catégories</h3>
                <div className="space-y-2">
                  <button
                    onClick={() => setSelectedCategory('Toutes')}
                    className={`block w-full text-left px-3 py-2 rounded-md transition-colors ${
                      selectedCategory === 'Toutes' 
                        ? 'bg-primary text-primary-foreground' 
                        : 'hover:bg-muted'
                    }`}
                  >
                    Toutes les catégories
                  </button>
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`block w-full text-left px-3 py-2 rounded-md transition-colors ${
                        selectedCategory === category 
                          ? 'bg-primary text-primary-foreground' 
                          : 'hover:bg-muted'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tags */}
              <div className="bg-background rounded-lg border p-6">
                <h3 className="font-semibold text-lg mb-4">Tags populaires</h3>
                <div className="flex flex-wrap gap-2">
                  {allTags.map((tag) => (
                    <Badge
                      key={tag}
                      variant={selectedTag === tag ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => setSelectedTag(selectedTag === tag ? '' : tag)}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Recent Posts */}
              <div className="bg-background rounded-lg border p-6">
                <h3 className="font-semibold text-lg mb-4">Articles récents</h3>
                <div className="space-y-4">
                  {blogPosts.slice(0, 3).map((post) => (
                    <div key={post.id} className="flex gap-3">
                      <div className="relative w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
                        <Image
                          src={post.image}
                          alt={post.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <Link href={`/blog/${post.id}`} className="font-medium hover:text-primary transition-colors line-clamp-2 text-sm">
                          {post.title}
                        </Link>
                        <p className="text-xs text-muted-foreground mt-1">{post.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 order-1 lg:order-2">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold">Tous les Articles</h2>
              <div className="text-sm text-muted-foreground">
                {filteredPosts.length} article{filteredPosts.length !== 1 ? 's' : ''}
              </div>
            </div>

            {/* Blog Posts Grid */}
            {filteredPosts.length > 0 ? (
              <motion.div
                ref={ref}
                variants={container}
                initial="hidden"
                animate={inView ? "show" : "hidden"}
                className="grid grid-cols-1 md:grid-cols-2 gap-8"
              >
                {filteredPosts.map((post) => (
                  <motion.div key={post.id} variants={item}>
                    <Link href={`/blog/${post.id}`} className="group block">
                      <div className="relative aspect-video rounded-lg overflow-hidden mb-4">
                        <Image
                          src={post.image}
                          alt={post.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute top-4 left-4">
                          <Badge className="bg-primary text-primary-foreground">
                            {post.category}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="flex items-center text-sm text-muted-foreground mb-2">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>{post.date}</span>
                        <span className="mx-2">•</span>
                        <User className="h-4 w-4 mr-1" />
                        <span>{post.author}</span>
                      </div>
                      
                      <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                        {post.title}
                      </h3>
                      
                      <p className="text-muted-foreground mb-3 line-clamp-2">
                        {post.excerpt}
                      </p>
                      
                      <div className="flex items-center text-primary font-medium">
                        <span>{`Lire l'article`}</span>
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <div className="text-center py-16 bg-muted/30 rounded-lg">
                <h3 className="text-xl font-semibold mb-2">Aucun article trouvé</h3>
                <p className="text-muted-foreground mb-6">
                  Aucun article ne correspond à votre recherche.
                </p>
                <Button onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('Toutes');
                  setSelectedTag('');
                }}>
                  Réinitialiser les filtres
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}