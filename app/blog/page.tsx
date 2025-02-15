'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, User } from 'lucide-react';
import PageHeroSection from "@/app/components/segments/PageHeroSection";
import React from "react";
import Image from "next/image";

const blogPosts = [
    {
        id: 1,
        title: 'Les tendances mode printemps-été 2024',
        excerpt: 'Découvrez les couleurs, les coupes et les styles qui feront sensation cette saison...',
        image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070',
        author: 'Sophie Martin',
        date: '2024-03-15',
        readTime: '5 min',
        category: 'Tendances',
    },
    {
        id: 2,
        title: 'Guide des soins cosmétiques naturels',
        excerpt: 'Comment créer une routine beauté efficace avec des produits naturels...',
        image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=2070',
        author: 'Marie Dubois',
        date: '2024-03-10',
        readTime: '8 min',
        category: 'Beauté',
    },
    {
        id: 3,
        title: 'Mode enfant : conseils pour bien choisir les vêtements',
        excerpt: 'Les critères essentiels pour habiller vos enfants avec style et confort...',
        image: 'https://images.unsplash.com/photo-1471286174890-9c112ffca5b4?q=80&w=2069',
        author: 'Julie Leroux',
        date: '2024-03-05',
        readTime: '6 min',
        category: 'Mode Enfant',
    },
];

export default function Blog() {
    return (
        <div className="mx-auto">
            <PageHeroSection title={'Blog'} image={`https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=2070`} />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

                {/* Article en vedette */}
                <Card className="mb-12 overflow-hidden group">
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="relative overflow-hidden">
                            <Image
                                src={blogPosts[0].image}
                                alt={blogPosts[0].title}
                                className="w-full h-full object-cover transition-transform group-hover:scale-105"
                            />
                        </div>
                        <div className="p-6">
                            <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
              <span className="bg-primary/10 text-primary px-3 py-1 rounded-full">
                {blogPosts[0].category}
              </span>
                                <div className="flex items-center gap-1">
                                    <Calendar className="h-4 w-4" />
                                    {new Date(blogPosts[0].date).toLocaleDateString('fr-FR')}
                                </div>
                            </div>
                            <h2 className="text-2xl font-bold mb-4">{blogPosts[0].title}</h2>
                            <p className="text-gray-600 mb-6">{blogPosts[0].excerpt}</p>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <User className="h-4 w-4" />
                                    {blogPosts[0].author}
                                    <Clock className="h-4 w-4 ml-4" />
                                    {blogPosts[0].readTime}
                                </div>
                                <Button>{`Lire l'article`}</Button>
                            </div>
                        </div>
                    </div>
                </Card>

                {/* Liste des articles */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogPosts.slice(1).map((post) => (
                        <Card key={post.id} className="overflow-hidden group">
                            <div className="relative aspect-w-16 aspect-h-9 overflow-hidden">
                                <Image
                                    src={post.image}
                                    alt={post.title}
                                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                                />
                            </div>
                            <div className="p-6">
                                <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                <span className="bg-primary/10 text-primary px-3 py-1 rounded-full">
                  {post.category}
                </span>
                                    <div className="flex items-center gap-1">
                                        <Calendar className="h-4 w-4" />
                                        {new Date(post.date).toLocaleDateString('fr-FR')}
                                    </div>
                                </div>
                                <h3 className="text-xl font-bold mb-2">{post.title}</h3>
                                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                        <User className="h-4 w-4" />
                                        {post.author}
                                        <Clock className="h-4 w-4 ml-4" />
                                        {post.readTime}
                                    </div>
                                    <Button variant="ghost">Lire plus</Button>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}