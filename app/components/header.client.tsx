'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Menu, Search, ShoppingBag } from 'lucide-react';
import PyiursLogo from './ui/PyiursLogo';
import Link from 'next/link';
import { Segment } from "@/app/types/types";
import useCartStore from "@/store/cart";
import { useRouter } from 'next/navigation'; // Import useRouter

interface ClientHeaderProps {
    segments: Segment[];
}

export default function HeaderClient({ segments }: ClientHeaderProps) {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    // const [openSegment, setOpenSegment] = useState<number | null>(null);
    const drawerRef = useRef<HTMLDivElement>(null);
    const { cartItems } = useCartStore();
    const router = useRouter(); // Initialize useRouter

    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
    };

    const closeDrawer = () => {
        setIsDrawerOpen(false);
    };

    const handleLinkClick = () => {
        closeDrawer();
    };


    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (drawerRef.current && !drawerRef.current.contains(event.target as Node) && isDrawerOpen) {
                closeDrawer();
            }
        };

        if (isDrawerOpen) {
            document.addEventListener("mousedown", handleClickOutside);
            document.body.classList.add('overflow-hidden'); // Prevent scrolling when drawer is open
        } else {
            document.body.classList.remove('overflow-hidden'); // Allow scrolling when drawer is closed
        }


        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.body.classList.remove('overflow-hidden');
        };
    }, [isDrawerOpen]);

    return (
        <>
            <header className="py-2 md:py-4 sticky top-0 z-10">
                {/* Responsive py */}
                <div className="container mx-auto flex items-center justify-between px-4 md:px-16">

                    {/* Hamburger Menu - Always visible */}
                    <button
                        className="text-white focus:outline-none"
                        onClick={toggleDrawer}
                    >
                        <Menu className="h-6 w-6" color="white" />
                    </button>

                    {/* Logo */}
                    <PyiursLogo />

                    {/* Icons (Search, Cart) */}
                    <div className="flex items-center space-x-3 md:space-x-4">
                        <button className="text-white focus:outline-none">
                            <Search className="h-5 w-5" color="white" />
                        </button>
                        <Link href="/cart" className="text-white hover:text-gray-500 focus:outline-none relative">
                            <ShoppingBag className="h-5 w-5" color="white" />
                            <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs px-1 leading-none">
                                {cartItems.length}
                            </span>
                        </Link>
                    </div>
                </div>
            </header>

            {/* Mobile Drawer - Always visible, but hidden by default */}
            <div
                ref={drawerRef}
                className={`fixed top-0 left-0 h-full w-64 bg-white shadow-md transform transition-transform duration-300 ease-in-out ${isDrawerOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}
            >
                <div className="p-4">
                    <button className="text-gray-700" onClick={toggleDrawer}>
                        <Menu className="h-6 w-6" />
                    </button>
                    <nav className="mt-4">
                        <Link href="/" className="flex py-2 px-2 hover:text-gray-500" onClick={handleLinkClick}>
                            Accueil
                        </Link>
                        {segments.map((segment) => (
                            <div key={segment.id}>
                                <Link href={`/segments/${segment.slug}`} className="flex py-2 px-2 hover:text-gray-500" onClick={handleLinkClick}>
                                    {segment.name}
                                </Link>
                            </div>
                        ))}
                    </nav>
                </div>
            </div>
        </>
    );
}