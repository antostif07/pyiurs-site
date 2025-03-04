'use client'

import Link from "next/link";
import {Button} from "@/components/ui/button";
import {IArticle} from "@/app/types/types";
import {useState} from "react";
import {useInView} from "react-intersection-observer";
import {
    Calendar,
    ChevronRight,
    Copy,
    Facebook,
    Linkedin,
    MessageCircle,
    Twitter
} from "lucide-react";
import {motion} from "framer-motion";
import {Badge} from "@/components/ui/badge";
import {Input} from "@/components/ui/input";

export default function BlogPost({post}: {post: IArticle}) {
    const [, setCopied] = useState(false);
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.1,
    })

    const copyToClipboard = () => {
        const url = window.location.href;
        navigator.clipboard.writeText(url).then(() => {
            setCopied(true);
            // toast({
            //     title: "Lien copié !",
            //     description: "Le lien de l'article a été copié dans votre presse-papiers.",
            // });
            setTimeout(() => setCopied(false), 2000);
        });
    };

    if (!post) {
        return (
            <div className="pt-24 pb-16">
                <div className="container mx-auto px-4">
                    <div className="text-center py-16">
                        <h1 className="text-3xl font-bold mb-4">Article introuvable</h1>
                        <p className="text-muted-foreground mb-8">
                            {`L'article que vous recherchez n'existe pas ou a été déplacé.`}
                        </p>
                        <Link href="/blog">
                            <Button>Retour aux articles</Button>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="pt-24 pb-16">
            <div className="container mx-auto px-4">
                {/* Breadcrumb */}
                <div className="flex items-center text-sm text-muted-foreground mb-8">
                    <Link href="/" className="hover:text-foreground transition-colors">
                        Accueil
                    </Link>
                    <ChevronRight className="h-4 w-4 mx-2" />
                    <Link href="/blog" className="hover:text-foreground transition-colors">
                        Blog
                    </Link>
                    <ChevronRight className="h-4 w-4 mx-2" />
                    <span className="text-foreground">{post.title}</span>
                </div>

                <motion.div
                    ref={ref}
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="grid grid-cols-1 lg:grid-cols-3 gap-8"
                >
                    {/* Main Content */}
                    <div className="lg:col-span-2">
                        {/* Article Header */}
                        <div className="mb-8">
                            <div className="flex items-center mb-4">
                                <Badge className="bg-primary text-primary-foreground">
                                    {post.category.name}
                                </Badge>
                                <span className="mx-2 text-muted-foreground">•</span>
                                <span className="text-sm text-muted-foreground flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                                    {post.createdAt}
                </span>
                                <span className="mx-2 text-muted-foreground">•</span>
                {/*                <span className="text-sm text-muted-foreground">*/}
                {/*  {post.readTime} de lecture*/}
                {/*</span>*/}
                            </div>
                            <h1 className="text-3xl md:text-4xl font-bold mb-4">{post.title}</h1>
                            <p className="text-xl text-muted-foreground mb-6">
                                {post.excerpt}
                            </p>
                        </div>

                        {/* Featured Image */}
                        {/*<div className="relative aspect-[16/9] rounded-lg overflow-hidden mb-8">*/}
                        {/*    <Image*/}
                        {/*        src={post.image}*/}
                        {/*        alt={post.title}*/}
                        {/*        fill*/}
                        {/*        className="object-cover"*/}
                        {/*    />*/}
                        {/*</div>*/}

                        {/* Article Content */}
                        <div className="prose prose-lg max-w-none mb-12">
                            <div dangerouslySetInnerHTML={{ __html: post.content }} />
                        </div>

                        {/* Tags */}
                        {/*<div className="flex flex-wrap gap-2 mb-8">*/}
                        {/*    {post.tags.map(tag => (*/}
                        {/*        <Link key={tag} href={`/blog?tag=${tag}`}>*/}
                        {/*            <Badge variant="outline" className="cursor-pointer hover:bg-muted">*/}
                        {/*                <Tag className="h-3 w-3 mr-1" />*/}
                        {/*                {tag}*/}
                        {/*            </Badge>*/}
                        {/*        </Link>*/}
                        {/*    ))}*/}
                        {/*</div>*/}

                        {/* Share */}
                        <div className="flex items-center space-x-4 mb-12">
                            <span className="font-medium">Partager :</span>
                            <Button variant="outline" size="icon" className="rounded-full" onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank')}>
                                <Facebook className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="icon" className="rounded-full" onClick={() => window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(post.title)}`, '_blank')}>
                                <Twitter className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="icon" className="rounded-full" onClick={() => window.open(`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(window.location.href)}&title=${encodeURIComponent(post.title)}`, '_blank')}>
                                <Linkedin className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="icon" className="rounded-full" onClick={copyToClipboard}>
                                <Copy className="h-4 w-4" />
                            </Button>
                        </div>

                        {/* Author */}
                        <div className="bg-muted/30 rounded-lg p-6 mb-12">
                            <div className="flex items-start sm:items-center flex-col sm:flex-row gap-4">
                                {/*<Avatar className="h-16 w-16">*/}
                                {/*    <AvatarImage src={post.authorImage} alt={post.author} />*/}
                                {/*    <AvatarFallback>{post.author.split(' ').map(n => n[0]).join('')}</AvatarFallback>*/}
                                {/*</Avatar>*/}
                                <div>
                                    {/*<h3 className="font-semibold text-lg mb-1">À propos de {post.author}</h3>*/}
                                    {/*<p className="text-muted-foreground mb-4">{post.authorBio}</p>*/}
                                    <div className="flex space-x-2">
                                        <Button variant="outline" size="sm">
                                            Voir tous ses articles
                                        </Button>
                                        <Button variant="ghost" size="sm">
                                            <MessageCircle className="h-4 w-4 mr-1" />
                                            Contacter
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Navigation between posts */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
                            {/*{prevPost && (*/}
                            {/*    <Link href={`/blog/${prevPost.id}`} className="group">*/}
                            {/*        <div className="border rounded-lg p-4 h-full transition-colors hover:bg-muted/30">*/}
                            {/*            <div className="flex items-center text-primary mb-2">*/}
                            {/*                <ArrowLeft className="h-4 w-4 mr-1 transition-transform group-hover:-translate-x-1" />*/}
                            {/*                <span className="text-sm font-medium">Article précédent</span>*/}
                            {/*            </div>*/}
                            {/*            <h4 className="font-medium line-clamp-2">{prevPost.title}</h4>*/}
                            {/*        </div>*/}
                            {/*    </Link>*/}
                            {/*)}*/}

                            {/*{nextPost && (*/}
                            {/*    <Link href={`/blog/${nextPost.id}`} className="group">*/}
                            {/*        <div className="border rounded-lg p-4 h-full transition-colors hover:bg-muted/30">*/}
                            {/*            <div className="flex items-center justify-end text-primary mb-2">*/}
                            {/*                <span className="text-sm font-medium">Article suivant</span>*/}
                            {/*                <ArrowRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />*/}
                            {/*            </div>*/}
                            {/*            <h4 className="font-medium text-right line-clamp-2">{nextPost.title}</h4>*/}
                            {/*        </div>*/}
                            {/*    </Link>*/}
                            {/*)}*/}
                        </div>

                        {/* Comments Section Placeholder */}
                        <div className="border rounded-lg p-6">
                            <h3 className="text-xl font-semibold mb-6">Commentaires (0)</h3>
                            <div className="mb-6">
                <textarea
                    className="w-full border rounded-md p-3 min-h-[120px] focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Partagez votre avis sur cet article..."
                ></textarea>
                            </div>
                            <Button>Publier un commentaire</Button>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-24 space-y-8">
                            {/* Table of Contents */}
                            <div className="bg-background rounded-lg border p-6">
                                <h3 className="font-semibold text-lg mb-4">Dans cet article</h3>
                                <ul className="space-y-2 text-muted-foreground">
                                    {post.content.match(/<h2>(.*?)<\/h2>/g)?.map((match, index) => {
                                        const title = match.replace(/<h2>|<\/h2>/g, '');
                                        const anchor = title.toLowerCase().replace(/\s+/g, '-');
                                        return (
                                            <li key={index} className="hover:text-primary transition-colors">
                                                <a href={`#${anchor}`} className="block py-1">
                                                    {title}
                                                </a>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>

                            {/* Related Posts */}
                            {/*<div className="bg-background rounded-lg border p-6">*/}
                            {/*    <h3 className="font-semibold text-lg mb-4">Articles similaires</h3>*/}
                            {/*    <div className="space-y-4">*/}
                            {/*        {relatedPosts.map((relatedPost) => (*/}
                            {/*            <div key={relatedPost.id} className="flex gap-3">*/}
                            {/*                <div className="relative w-16 h-16 rounded-md overflow-hidden flex-shrink-0">*/}
                            {/*                    <Image*/}
                            {/*                        src={relatedPost.image}*/}
                            {/*                        alt={relatedPost.title}*/}
                            {/*                        fill*/}
                            {/*                        className="object-cover"*/}
                            {/*                    />*/}
                            {/*                </div>*/}
                            {/*                <div>*/}
                            {/*                    <Link href={`/blog/${relatedPost.id}`} className="font-medium hover:text-primary transition-colors line-clamp-2 text-sm">*/}
                            {/*                        {relatedPost.title}*/}
                            {/*                    </Link>*/}
                            {/*                    <p className="text-xs text-muted-foreground mt-1">{relatedPost.date}</p>*/}
                            {/*                </div>*/}
                            {/*            </div>*/}
                            {/*        ))}*/}
                            {/*    </div>*/}
                            {/*</div>*/}

                            {/* Categories */}
                            <div className="bg-background rounded-lg border p-6">
                                <h3 className="font-semibold text-lg mb-4">Catégories</h3>
                                {/*<div className="space-y-2">*/}
                                {/*    {[...new Set(blogPosts.map(post => post.category))].map((category) => (*/}
                                {/*        <Link*/}
                                {/*            key={category.name}*/}
                                {/*            href={`/blog?category=${category}`}*/}
                                {/*            className="block w-full text-left px-3 py-2 rounded-md transition-colors hover:bg-muted"*/}
                                {/*        >*/}
                                {/*            {category.name}*/}
                                {/*        </Link>*/}
                                {/*    ))}*/}
                                {/*</div>*/}
                            </div>

                            {/* Popular Tags */}
                            {/*<div className="bg-background rounded-lg border p-6">*/}
                            {/*    <h3 className="font-semibold text-lg mb-4">Tags populaires</h3>*/}
                            {/*    <div className="flex flex-wrap gap-2">*/}
                            {/*        {[...new Set(blogPosts.flatMap(post => post.tags))].map((tag) => (*/}
                            {/*            <Link key={tag} href={`/blog?tag=${tag}`}>*/}
                            {/*                <Badge variant="outline" className="cursor-pointer hover:bg-muted">*/}
                            {/*                    {tag}*/}
                            {/*                </Badge>*/}
                            {/*            </Link>*/}
                            {/*        ))}*/}
                            {/*    </div>*/}
                            {/*</div>*/}

                            {/* Newsletter */}
                            <div className="bg-primary text-primary-foreground rounded-lg p-6">
                                <h3 className="font-semibold text-lg mb-2">Restez informée</h3>
                                <p className="text-primary-foreground/80 mb-4 text-sm">
                                    Inscrivez-vous à notre newsletter pour recevoir nos derniers articles et conseils mode.
                                </p>
                                <div className="space-y-2">
                                    <Input
                                        type="email"
                                        placeholder="Votre email"
                                        className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/60"
                                    />
                                    <Button variant="secondary" className="w-full">
                                        {`S'inscrire`}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}