import '../globals.css'; // Make sure this path is correct
import { ReactNode } from 'react';
import Footer from '@/components/footer';
import Header from "@/components/header";
import {Metadata, Viewport} from "next/types";

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
      <>
        <Header />
        <div>{children}</div>
        <Footer />
      </>
  );
}