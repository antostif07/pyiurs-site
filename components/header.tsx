"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, User, Search, Menu, X, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import PyiursLogo from '@/app/components/ui/PyiursLogo';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled ? 'bg-white/90 dark:bg-background/90 backdrop-blur-md shadow-sm py-2' : 'bg-transparent py-4'
      )}
    >
      <div className="container mx-auto px-24">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <PyiursLogo />

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="font-medium hover:text-primary transition-colors">
              Accueil
            </Link>
            <Link href="/products" className="font-medium hover:text-primary transition-colors">
              Boutique
            </Link>
            <Link href="/categories" className="font-medium hover:text-primary transition-colors">
              Catégories
            </Link>
            <Link href="/about" className="font-medium hover:text-primary transition-colors">
              À propos
            </Link>
            <Link href="/contact" className="font-medium hover:text-primary transition-colors">
              Contact
            </Link>
          </nav>

          {/* Icons */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" onClick={toggleSearch} className="relative">
              <Search className="h-5 w-5" />
            </Button>
            {/* <Link href="/wishlist">
              <Button variant="ghost" size="icon">
                <Heart className="h-5 w-5" />
              </Button>
            </Link>
            <Link href="/account">
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </Link> */}
            <Link href="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingBag className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  3
                </span>
              </Button>
            </Link>
            <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleMobileMenu}>
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
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
                  onClick={toggleSearch}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Mobile Menu */}
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
              <Link href="/" className="font-medium py-2 hover:text-primary transition-colors">
                Accueil
              </Link>
              <Link href="/products" className="font-medium py-2 hover:text-primary transition-colors">
                Boutique
              </Link>
              <Link href="/categories" className="font-medium py-2 hover:text-primary transition-colors">
                Catégories
              </Link>
              <Link href="/about" className="font-medium py-2 hover:text-primary transition-colors">
                À propos
              </Link>
              <Link href="/contact" className="font-medium py-2 hover:text-primary transition-colors">
                Contact
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;