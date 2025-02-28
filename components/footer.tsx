import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Facebook, Instagram, Twitter, Youtube, MapPin, Phone, Mail, CreditCard, Truck, ShieldCheck } from 'lucide-react';
import PyiursLogo from '@/app/components/ui/PyiursLogo';

const Footer = () => {
  return (
    <footer className="bg-muted pt-16 pb-8">
      <div className="container mx-auto px-24">
        {/* Features */}
        {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="flex flex-col items-center text-center p-6 bg-background rounded-lg shadow-sm">
            <Truck className="h-10 w-10 mb-4 text-primary" />
            <h3 className="font-semibold text-lg mb-2">Livraison Gratuite</h3>
            <p className="text-muted-foreground">Livraison gratuite pour toutes les commandes de plus de 100€</p>
          </div>
          <div className="flex flex-col items-center text-center p-6 bg-background rounded-lg shadow-sm">
            <CreditCard className="h-10 w-10 mb-4 text-primary" />
            <h3 className="font-semibold text-lg mb-2">Paiement Sécurisé</h3>
            <p className="text-muted-foreground">Paiement 100% sécurisé avec cryptage SSL</p>
          </div>
          <div className="flex flex-col items-center text-center p-6 bg-background rounded-lg shadow-sm">
            <ShieldCheck className="h-10 w-10 mb-4 text-primary" />
            <h3 className="font-semibold text-lg mb-2">Garantie Qualité</h3>
            <p className="text-muted-foreground">Satisfait ou remboursé pendant 30 jours</p>
          </div>
        </div> */}

        {/* Main Footer */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <PyiursLogo />
            <p className="text-muted-foreground mb-4">
              Votre destination pour des vêtements féminins élégants et de qualité. 
              Des pièces intemporelles pour toutes les occasions.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" asChild>
                <Link href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                  <Facebook className="h-5 w-5" />
                </Link>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                  <Instagram className="h-5 w-5" />
                </Link>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                  <Twitter className="h-5 w-5" />
                </Link>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <Link href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                  <Youtube className="h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Liens Rapides</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">
                  Accueil
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-muted-foreground hover:text-foreground transition-colors">
                  Boutique
                </Link>
              </li>
              <li>
                <Link href="/categories" className="text-muted-foreground hover:text-foreground transition-colors">
                  Catégories
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">
                  À propos
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Informations</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/faq" className="text-muted-foreground hover:text-foreground transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-muted-foreground hover:text-foreground transition-colors">
                  Livraison & Retours
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-muted-foreground hover:text-foreground transition-colors">
                  Conditions Générales
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">
                  Politique de Confidentialité
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-muted-foreground hover:text-foreground transition-colors">
                  Carrières
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-2 mt-0.5 text-primary" />
                <span className="text-muted-foreground">
                  Adresse 24
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-2 text-primary" />
                <span className="text-muted-foreground">+243 89 99 90 151</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-2 text-primary" />
                <span className="text-muted-foreground">contact@pyiurs.com</span>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="mb-8" />

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Pyiurs. Tous droits réservés.
          </p>
          {/* <div className="flex space-x-2">
            <img src="https://cdn-icons-png.flaticon.com/512/196/196578.png" alt="Visa" className="h-8" />
            <img src="https://cdn-icons-png.flaticon.com/512/196/196561.png" alt="MasterCard" className="h-8" />
            <img src="https://cdn-icons-png.flaticon.com/512/196/196565.png" alt="PayPal" className="h-8" />
            <img src="https://cdn-icons-png.flaticon.com/512/196/196539.png" alt="American Express" className="h-8" />
          </div> */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;