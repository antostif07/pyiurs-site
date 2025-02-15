'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Calendar, Clock, Facebook, Instagram, Linkedin, Twitter, } from 'lucide-react';
import PageHeroSection from "@/app/components/segments/PageHeroSection";
import React from "react";
import Image from "next/image";

// Simuler les données d'un article
const article = {
    id: 1,
    title: 'Les tendances mode printemps-été 2024',
    content: `
    <p>La saison printemps-été 2024 s'annonce riche en couleurs et en innovations stylistiques. Les créateurs ont misé sur des palettes vibrantes et des coupes audacieuses pour créer des collections qui célèbrent la joie de vivre et l'expression personnelle.</p>

    <h2>Les couleurs de la saison</h2>
    <p>Cette année, les tons pastel côtoient les teintes vives pour créer des associations chromatiques surprenantes. Le lilas et le vert menthe se marient parfaitement avec l'orange vif et le bleu électrique, offrant des possibilités infinies de combinaisons.</p>

    <h2>Les pièces incontournables</h2>
    <p>Parmi les must-have de la saison, on retrouve :</p>
    <ul>
      <li>La robe midi plissée</li>
      <li>Le tailleur oversize</li>
      <li>Le crop top sophistiqué</li>
      <li>Le pantalon large à taille haute</li>
    </ul>

    <h2>Les accessoires tendance</h2>
    <p>Les accessoires jouent un rôle crucial dans les looks de cette saison. Les sacs format XXL, les bijoux statement et les sandales plateformes seront vos meilleurs alliés pour un style affirmé.</p>
  `,
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070',
    author: {
        name: 'Sophie Martin',
        role: 'Responsable Marketing',
        image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1770',
    },
    date: '2024-03-15',
    readTime: '5 min',
    category: 'Tendances',
    tags: ['Mode', 'Tendances', 'Printemps-Été', '2024'],
};

// Articles similaires
const relatedPosts = [
    {
        id: 2,
        title: 'Comment porter les couleurs vives avec style',
        excerpt: 'Découvrez nos conseils pour associer les couleurs...',
        image: 'https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?q=80&w=2070',
        date: '2024-03-10',
        readTime: '4 min',
    },
    {
        id: 3,
        title: 'Les accessoires indispensables de l\'été',
        excerpt: 'Notre sélection des accessoires tendance...',
        image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1976',
        date: '2024-03-08',
        readTime: '3 min',
    },
];

export default function BlogPost() {
    return (
        <div className={'mx-auto'}>
            <PageHeroSection title={article.title} image={article.image} />
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* En-tête de l'article */}
                <div className="text-center mb-8">
                    <div className="flex items-center justify-center gap-4 text-sm text-gray-600 mb-4">
          <span className="bg-primary/10 text-primary px-3 py-1 rounded-full">
            {article.category}
          </span>
                        <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {new Date(article.date).toLocaleDateString('fr-FR')}
                        </div>
                        <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {article.readTime}
                        </div>
                    </div>
                    <div className="flex items-center justify-center gap-4">
                        <Image
                            src={article.author.image}
                            alt={article.author.name}
                            className="w-12 h-12 rounded-full object-cover"
                        />
                        <div className="text-left">
                            <p className="font-semibold">{article.author.name}</p>
                            <p className="text-sm text-gray-600">{article.author.role}</p>
                        </div>
                    </div>
                </div>

                {/* Image principale */}
                <div className="mb-8">
                    <Image
                        src={article.image}
                        alt={article.title}
                        className="w-full h-[400px] object-cover rounded-lg"
                    />
                </div>

                {/* Contenu de l'article */}
                <article className="prose prose-lg max-w-none mb-12">
                    <div dangerouslySetInnerHTML={{ __html: article.content }} />
                </article>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-8">
                    {article.tags.map((tag) => (
                        <span
                            key={tag}
                            className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm"
                        >
            {tag}
          </span>
                    ))}
                </div>

                {/* Partage social */}
                <div className="border-t border-b py-6 mb-12">
                    <div className="flex items-center justify-center space-x-4">
                        <Button variant="outline" size="icon">
                            <Facebook className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon">
                            <Twitter className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon">
                            <Linkedin className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon">
                            <Instagram className="h-4 w-4" />
                        </Button>
                    </div>
                </div>

                {/* Articles similaires */}
                <div>
                    <h2 className="text-2xl font-bold mb-6">Articles similaires</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        {relatedPosts.map((post) => (
                            <Card key={post.id} className="overflow-hidden group">
                                <div className="aspect-w-16 aspect-h-9">
                                    <Image
                                        src={post.image}
                                        alt={post.title}
                                        className="w-full h-full object-cover transition-transform group-hover:scale-105"
                                    />
                                </div>
                                <div className="p-6">
                                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                                        <div className="flex items-center gap-1">
                                            <Calendar className="h-4 w-4" />
                                            {new Date(post.date).toLocaleDateString('fr-FR')}
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Clock className="h-4 w-4" />
                                            {post.readTime}
                                        </div>
                                    </div>
                                    <h3 className="text-xl font-bold mb-2">{post.title}</h3>
                                    <p className="text-gray-600 mb-4">{post.excerpt}</p>
                                    <Button variant="ghost">{`Lire l'article`}</Button>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}