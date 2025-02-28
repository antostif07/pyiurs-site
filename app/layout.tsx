'use client'
// import { Inter,} from 'next/font/google';
import './globals.css'; // Make sure this path is correct
import { ReactNode, useState } from 'react';
import Footer from "@/app/components/Footer";
import dynamic from 'next/dynamic';
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import PyiursLogo from "@/app/components/ui/PyiursLogo";
import {motion} from "framer-motion";
import Head from "next/head";
import {Toaster} from "@/components/ui/sonner";


const Menu = dynamic(() => import("../app/components/Menu"))

const queryClient = new QueryClient()

export default function RootLayout({ children, }: { children: ReactNode }) {
  const [open, setOpen] = useState<"isOpen" | "isClosed">("isClosed");
  
  return (
      <html lang="en">
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
            <Footer
                animate={open} initial={'initial'}
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
            />
        </QueryClientProvider>
      <Toaster />
      </body>
      </html>
  );
}