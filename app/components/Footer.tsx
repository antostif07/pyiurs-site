import Link from 'next/link';
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-slate-950 border-t text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">Site</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="hover:font-bold">Accueil</Link></li>
              <li><Link href="#" className="hover:font-bold">A Propos</Link></li>
              <li><Link href="/blog" className="">Blog</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Service Client</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="">Contact</Link></li>
              <li><Link href="#" className="">Retour Produit</Link></li>
              {/* <li><Link href="#" className="">FAQ</Link></li> */}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Boutique</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="">Nouvelles Collections</Link></li>
              <li><Link href="#" className="">Pyiurs Beauty</Link></li>
              <li><Link href="#" className="">Pyiurs Kids</Link></li>
              <li><Link href="#" className="">Soldes</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Suivez Nous</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="">Instagram</Link></li>
              <li><Link href="#" className="">Facebook</Link></li>
              <li><Link href="#" className="">Tiktok</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t text-center">
          <p>&copy; {new Date().getFullYear()} Pyiurs. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;