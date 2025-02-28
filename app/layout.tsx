'use client'
// import { Inter,} from 'next/font/google';
import './globals.css'; // Make sure this path is correct
import { ReactNode, useState } from 'react';
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import Head from "next/head";
import {Toaster} from "@/components/ui/sonner";
import { ThemeProvider } from 'next-themes';
import Header from '@/components/header';
import Footer from '@/components/footer';

const queryClient = new QueryClient()

export default function RootLayout({ children, }: { children: ReactNode }) {
  const [open, setOpen] = useState<"isOpen" | "isClosed">("isClosed");
  
  return (
      <html lang="fr" suppressHydrationWarning>
      <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin={"anonymous"} />
          <link
              href="https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&display=swap"
              rel="stylesheet"
          />
      </Head>
      <body
          className={`relative libre-baskerville-regular`}
      >
        <QueryClientProvider client={queryClient}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
            <Header />
            <main className="min-h-screen">{children}</main>
            <Footer />
        </ThemeProvider>
            
        </QueryClientProvider>
      <Toaster />
      </body>
      </html>
  );
}