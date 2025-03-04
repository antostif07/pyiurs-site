"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Search, Menu, X, ChevronRight, ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import PyiursLogo from '@/app/components/ui/PyiursLogo';
import { Segment } from "@/app/types/types";

interface HeaderClientProps {
  mainCategories: Segment[];
}

const HeaderClient = ({ mainCategories }: HeaderClientProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [hoveredMainCategory, setHoveredMainCategory] = useState<number | null>(null); // New state for hovered MainCategory ID
  const [hoveredSubCategory, setHoveredSubCategory] = useState<number | null>(null); // Use ID instead of name
  const [mobileCategory, setMobileCategory] = useState<string | null>(null);
  const [mobileSubCategory, setMobileSubCategory] = useState<number | null>(null);
  const [mobileSubSubCategory, setMobileSubSubCategory] = useState<number | null>(null); // New state for the sub-subcategory
  const currentRoute = usePathname();

  // Fonction pour gérer le retour en arrière dans le menu mobile
  const handleMobileBack = () => {
    if (mobileSubSubCategory !== null) {
      setMobileSubSubCategory(null);
    } else if (mobileSubCategory !== null) {
      setMobileSubCategory(null);
    } else if (mobileCategory !== null && mobileCategory === 'categories') {
      setMobileCategory(null);
    }
  };


  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setMobileCategory(null);
    setMobileSubCategory(null);
    setMobileSubSubCategory(null);
  };

  return (
      <header
          className={cn(
              'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
              isScrolled ? 'bg-white/90 dark:bg-background/90 backdrop-blur-md shadow-sm py-2' : 'bg-transparent py-4'
          )}
      >
        <div className="container mx-auto md:px-24 px-4">
          <div className="flex items-center md:justify-between">
            <div className={'w-[240px]'}>
              <PyiursLogo />
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link href="/" className={cn('font-medium hover:text-primary transition-colors', currentRoute === '/' ? 'text-primary underline' : '')}>Accueil</Link>
              <Link href="/collections" className={cn('font-medium hover:text-primary transition-colors', currentRoute === '/collections' ? 'text-primary underline' : '')}>Collections</Link>

              {/* Menu Desktop avec Hover - Correction pour la stabilité du survol */}
              <div
                  className="relative group" // Utiliser 'group' pour le conteneur du menu
                  onMouseLeave={() => {
                    setHoveredCategory(null);
                    setHoveredMainCategory(null); // Reset MainCategory hover
                    setHoveredSubCategory(null);
                  }}
              >
                <button
                    className="font-medium hover:text-primary transition-colors cursor-pointer"
                    onMouseEnter={() => setHoveredCategory('categories')}
                >
                  Catégories
                </button>
                {hoveredCategory === 'categories' && (
                    <div className="absolute left-0 top-full w-48 p-2 bg-white shadow-lg rounded-md group-hover:block hidden">
                      {mainCategories.map((mainCategory) => (
                          <div
                              key={mainCategory.id}
                              className="relative"
                              onMouseEnter={() => setHoveredMainCategory(mainCategory.id)} // Hover on MainCategory
                              onMouseLeave={() => setHoveredMainCategory(null)}
                          >
                            <button className="w-full text-left py-2 px-4 hover:bg-gray-100 rounded-md flex justify-between items-center">
                              {mainCategory.name}
                              <ChevronRight className="h-4 w-4" />
                            </button>
                            {hoveredMainCategory === mainCategory.id && (
                                <div className="absolute left-full top-0 w-48 p-2 bg-white shadow-lg rounded-md">
                                  {mainCategory.categories.map((category) => (
                                      <div
                                          key={category.id}
                                          className="relative"
                                          onMouseEnter={() => setHoveredSubCategory(category.id)} // Hover on Category
                                          onMouseLeave={() => setHoveredSubCategory(null)}
                                      >
                                        <button className="w-full text-left py-2 px-4 hover:bg-gray-100 rounded-md flex justify-between items-center">
                                          {category.name}
                                          <ChevronRight className="h-4 w-4" />
                                        </button>
                                        {hoveredSubCategory === category.id && (
                                            <div className="absolute left-full top-0 w-48 p-2 bg-white shadow-lg rounded-md">
                                              {category.sub_categories.map((subCategory) => (
                                                  <Link
                                                      key={subCategory.id}
                                                      href={`/products/${mainCategory.slug}/${category.slug}/${subCategory.slug}`}
                                                      className="block py-2 px-4 hover:bg-gray-100 rounded-md"
                                                  >
                                                    {subCategory.name}
                                                  </Link>
                                              ))}
                                            </div>
                                        )}
                                      </div>
                                  ))}
                                </div>
                            )}
                          </div>
                      ))}
                    </div>
                )}
              </div>

              <Link href="/about" className={cn('font-medium hover:text-primary transition-colors', currentRoute === '/about' ? 'text-primary underline' : '')}>À propos</Link>
              <Link href="/blog" className={cn('font-medium hover:text-primary transition-colors', currentRoute === '/about' ? 'text-primary underline' : '')}>Blog</Link>
              <Link href="/contact" className={cn('font-medium hover:text-primary transition-colors', currentRoute === '/contact' ? 'text-primary underline' : '')}>Contact</Link>
            </nav>

            {/* Boutons et menu mobile */}
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" onClick={() => setIsSearchOpen(!isSearchOpen)} className="relative">
                <Search className="h-5 w-5" />
              </Button>
              <Link href="/cart">
                <Button variant="ghost" size="icon" className="relative">
                  <ShoppingBag className="h-5 w-5" />
                </Button>
              </Link>
              <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleMobileMenu}>
                {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <AnimatePresence>
          {isSearchOpen && (
              <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="mt-4"
              >
                <div className="relative">
                  <Input
                      type="text"
                      placeholder="Rechercher des produits..."
                      className="w-full py-2 pl-10 pr-4"
                      autoFocus
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2"
                      onClick={() => setIsSearchOpen(false)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
          )}
        </AnimatePresence>

        {/* Menu Mobile */}
        <AnimatePresence>
          {isMobileMenuOpen && (
              <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="md:hidden bg-background border-t"
              >
                <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
                  <Link
                      href="/"
                      className={cn('font-medium py-2 hover:text-primary transition-colors', currentRoute === '/' ? 'text-primary' : '')}
                      onClick={toggleMobileMenu}
                  >
                    Accueil
                  </Link>
                  <Link
                      href="/collections"
                      className={cn('font-medium py-2 hover:text-primary transition-colors', currentRoute === '/collections' ? 'text-primary' : '')}
                      onClick={toggleMobileMenu}
                  >
                    Collections
                  </Link>

                  {/* Menu Mobile Catégories */}
                  <div>
                    {mobileCategory === null ? (
                        <>
                          <div className="w-full justify-between flex " onClick={() => setMobileCategory('categories')}>
                            Catégories <ChevronRight className="h-4 w-4" />
                          </div>
                        </>
                    ) : (
                        <>
                          <Button variant="ghost" className="w-full justify-between" onClick={handleMobileBack}>
                            <ChevronLeft className="h-4 w-4" /> Retour
                          </Button>
                          {mainCategories.map((mainCategory) => (
                              <div key={mainCategory.id}>
                                {mobileSubCategory === null ? (
                                    <Button
                                        variant="ghost"
                                        className="w-full justify-between ml-4"
                                        onClick={() => setMobileSubCategory(mainCategory.id)}
                                    >
                                      {mainCategory.name} <ChevronRight className="h-4 w-4" />
                                    </Button>
                                ) : (
                                    mainCategory.id === mobileSubCategory && (
                                        <>
                                          <div key={mainCategory.id} className="ml-4">
                                            {mainCategory.categories.map((category) => (
                                                <div key={category.id}>
                                                  {mobileSubSubCategory === null ? (
                                                      <Button
                                                          variant="ghost"
                                                          className="w-full justify-between ml-8"
                                                          onClick={() => setMobileSubSubCategory(category.id)}
                                                      >
                                                        {category.name} <ChevronRight className="h-4 w-4" />
                                                      </Button>
                                                  ) : (
                                                      mobileSubSubCategory === category.id && (
                                                          <div key={category.id}>
                                                            {category.sub_categories.map((subCategory) => (
                                                                <Link
                                                                    key={subCategory.id}
                                                                    href={`/products/${mainCategory.slug}/${category.slug}/${subCategory.slug}`}
                                                                    className="block py-2 px-4 hover:text-primary transition-colors ml-12"
                                                                    onClick={toggleMobileMenu}
                                                                >
                                                                  {subCategory.name}
                                                                </Link>
                                                            ))}
                                                          </div>
                                                      )
                                                  )}
                                                </div>
                                            ))}
                                          </div>
                                        </>
                                    )
                                )}
                              </div>
                          ))}
                        </>
                    )}
                  </div>

                  <Link
                      href="/about"
                      className={cn('font-medium py-2 hover:text-primary transition-colors', currentRoute === '/about' ? 'text-primary' : '')}
                      onClick={toggleMobileMenu}
                  >
                    À propos
                  </Link>
                  <Link
                      href="/blog"
                      className={cn('font-medium py-2 hover:text-primary transition-colors', currentRoute === '/about' ? 'text-primary' : '')}
                      onClick={toggleMobileMenu}
                  >
                    Blog
                  </Link>
                  <Link
                      href="/contact"
                      className={cn('font-medium py-2 hover:text-primary transition-colors', currentRoute === '/contact' ? 'text-primary' : '')}
                      onClick={toggleMobileMenu}
                  >
                    Contact
                  </Link>
                </div>
              </motion.div>
          )}
        </AnimatePresence>
      </header>
  );
};

export default HeaderClient;