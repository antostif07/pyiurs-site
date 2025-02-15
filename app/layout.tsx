// app/layout.tsx
import { Inter,
    // Playfair_Display
} from 'next/font/google';
import './globals.css'; // Make sure this path is correct
import type { Metadata } from 'next';
import { ReactNode } from 'react';
import Footer from './components/Footer';
import HeaderServer from "@/app/components/header.server";

const inter = Inter({ subsets: ['latin'] });

// const playfair = Playfair_Display({
//   subsets: ['latin'],
//   display: 'swap',
//   weight: ['400', '700'], // Specify the weights you want
// });

export const metadata: Metadata = {
  title: 'Pyiurs Boutique',
  description: 'Boutique d\'habillement',
};

export default function RootLayout({ children, }: { children: ReactNode }) {
  return (
      <html lang="en">
      <body className={`${inter.className} font-serif`}>
      <div className='absolute w-full z-20'>
        <HeaderServer />
      </div>
      {children}
      <Footer />
      </body>
      </html>
  );
}