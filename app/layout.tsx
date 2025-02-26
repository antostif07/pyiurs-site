'use client'
import { Cormorant_Garamond,
} from 'next/font/google';
import './globals.css'; // Make sure this path is correct
import { ReactNode, useState } from 'react';
import Footer from "@/app/components/Footer";
import dynamic from 'next/dynamic';
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import PyiursLogo from "@/app/components/ui/PyiursLogo";
import {motion} from "framer-motion";

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
          className={`${cormorant.className} relative`}
      >
        <QueryClientProvider client={queryClient}>
            <div className={'fixed pt-8 z-10 w-full flex justify-end'}>
                <PyiursLogo />
            </div>
            <Menu open={open} setOpenAction={setOpen}/>
            <motion.div
                animate={open}
                initial={'isClosed'}
                variants={{
                    isOpen: {
                        marginLeft: "300px",
                        transition: {
                            duration: 0.5
                        }
                    },
                    isClosed: {
                        marginLeft: "72px",
                        transition: {
                            duration: 0.5
                        }
                    }
                }}
            >
            {children}
            </motion.div>
            <Footer />
        </QueryClientProvider>
      </body>
      </html>
  );
}