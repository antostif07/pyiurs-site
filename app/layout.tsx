'use client'
import { Cormorant_Garamond,
} from 'next/font/google';
import './globals.css'; // Make sure this path is correct
import { ReactNode, useState } from 'react';
import HeaderServer from "@/app/components/header.server";
import Footer from "@/app/components/Footer";
import dynamic from 'next/dynamic';
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

const cormorant = Cormorant_Garamond({
    subsets: ['latin'],
    weight: ['300', '400', '500', '600', '700'], // Ajoute les poids que tu veux
    style: ['normal', 'italic'], // Si tu veux l'italique aussi
    display: 'swap',
});

const Menu = dynamic(() => import("../app/components/Menu"))

const queryClient = new QueryClient()

export default function RootLayout({ children, }: { children: ReactNode }) {
  const [open, setOpen] = useState<"isOpen" | "isClosed">("isClosed");
  
  return (
      <html lang="en">
      <body
          className={`${cormorant.className}`}
      >
        <QueryClientProvider client={queryClient}>
            <Menu open={open} setOpen={setOpen}/>
            <div className={``}>
            {children}
            </div>
            <Footer />
        </QueryClientProvider>
      </body>
      </html>
  );
}