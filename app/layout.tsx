import { Inter,} from 'next/font/google';
import './globals.css'; // Make sure this path is correct
import { ReactNode } from 'react';
import {Toaster} from "@/components/ui/sonner";
import {Metadata, Viewport} from "next/types";

const inter = Inter({ subsets: ['latin'] });

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false
}
export const metadata: Metadata = {
    title: 'Pyiurs | Boutique d\'habillement',
    description: 'Boutique d\'habillement',
};

export default function RootLayout({ children, }: { children: ReactNode }) {
  return (
      <html lang="fr">
      <body
          className={`relative ${inter.className}`}
      >
        {children}
      <Toaster />
      </body>
      </html>
  );
}