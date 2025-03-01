import { Inter,} from 'next/font/google';
import './globals.css'; // Make sure this path is correct
import { ReactNode } from 'react';
import {Toaster} from "@/components/ui/sonner";
import Footer from '@/components/footer';
import Header from "@/components/header";

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children, }: { children: ReactNode }) {
  return (
      <html lang="fr">
      <body
          className={`relative ${inter.className}`}
      >
        <Header />
        <div>{children}</div>
        <Footer />
      <Toaster />
      </body>
      </html>
  );
}