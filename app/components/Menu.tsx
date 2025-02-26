'use client';

import {useState, useEffect, useRef} from 'react';
import {ArrowLeft, Search, ShoppingBag, SkipBack} from 'lucide-react';
import {motion, Variants} from 'framer-motion';
import {Category, Segment, SubCategory} from "@/app/types/types";
import {useQuery} from '@tanstack/react-query'
import { Skeleton } from '@/components/ui/skeleton';
import { getSegments, getCategories, getSubCategories } from '@/lib/api';
import Link from 'next/link';

const DURATION = 0.5

const fetchSegments = async () => {
    return await getSegments()
}

const fetchCategories = async (segmentSlug: string) => {
    return await getCategories({segment: segmentSlug})
}

const fetchSubcategories = async ({segmentSlug, categorySlug}: {segmentSlug?: string, categorySlug?: string}) => {
    return await getSubCategories({segment: segmentSlug, category: categorySlug})
}

export default function Menu({open, setOpenAction}: {open: 'isOpen' | 'isClosed', setOpenAction: (value: 'isOpen' | 'isClosed') => void}) {
    const [view, setView] = useState<'segments' | 'categories' | 'sub-categories'>('segments')
    const [selectedSegment, setSelectedSegment] = useState<string | null>(null)
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
    const drawerRef = useRef<HTMLDivElement>(null);

    const { data: segments, isLoading: loadingSegments } = useQuery<Segment[]>({
        queryKey: ['segments'],
        queryFn: fetchSegments,
    })

    const { data: categories, isLoading: loadingCategories } = useQuery<Category[]>({
        queryKey: ['categories', selectedSegment],
        queryFn: () => fetchCategories(selectedSegment!),
        enabled: !!selectedSegment
      })
    
    const { data: subcategories, isLoading: loadingSubcategories } = useQuery<SubCategory[]>({
    queryKey: ['sub-categories', selectedCategory],
    queryFn: () => fetchSubcategories({segmentSlug: selectedSegment ?? undefined, categorySlug: selectedCategory ?? undefined}),
    enabled: !!selectedCategory
    })

    const handleCloseMenu = () => {
        setOpenAction('isClosed')
    }
    

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (drawerRef.current && !drawerRef.current.contains(event.target as Node) && open === 'isOpen') {
                handleCloseMenu();
            }
        };

        if (open === 'isOpen') {
            document.addEventListener("mousedown", handleClickOutside);
        }


        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [open]);
        
    return (
            <motion.aside
                className={`fixed top-0 left-0 h-screen bg-white shadow-md z-50`}
                variants={asideVariants}
                animate={open} ref={drawerRef}
            >
                {/* Collapsed Sidebar */}
                <div
                    className={`flex flex-col items-center justify-start h-full py-4 ${open === 'isOpen' ? 'px-4' : ''}`}
                >
                    <div>
                        <MenuToggle toggle={() => open === 'isOpen' ? handleCloseMenu() : setOpenAction('isOpen')} />
                    </div>
                    <div
                        className={`flex flex-col ${open === 'isOpen' ? '' : 'justify-center'} items-center flex-grow w-full`}
                    >
                        <motion.button
                            className="p-2 text-gray-600 hover:text-gray-800"
                            variants={itemVariantsOpen}
                        >
                            <Search className="w-6 h-6" />
                        </motion.button>
                        <motion.button
                            className="p-2 text-gray-600 hover:text-gray-800"
                            variants={itemVariantsOpen}
                        >
                            <ShoppingBag className="w-6 h-6" />
                        </motion.button>
                        {view !== 'segments' && (
                            <div className='flex w-full'>
                                <button
                                    onClick={() => setView(view === 'sub-categories' ? 'categories' : 'segments')}
                                    className="mb-2 text-sm"
                                >
                                    <ArrowLeft />
                                </button>
                            </div>
                        )}
                        {view === 'segments' && (
                            <>
                                {loadingSegments ? (
                                <ul className='w-full'>
                                    {Array.from({ length: 5 }).map((_, index) => (
                                    <motion.li key={index} className="p-2" variants={itemVariantsClosed}>
                                        <Skeleton className="h-4 w-full" />
                                    </motion.li>
                                    ))}
                                </ul>
                                ) : (
                                <ul>
                                    <motion.li
                                        variants={itemVariantsClosed}
                                    >
                                        <Link 
                                            href="/" onClick={() => handleCloseMenu()}
                                            className="flex py-2 px-2 hover:text-gray-500 uppercase text-2xl hover:underline">
                                            Accueil
                                        </Link>
                                    </motion.li>
                                    <motion.li variants={itemVariantsClosed}>
                                        <Link 
                                            href="/collections" onClick={() => handleCloseMenu()}
                                            className="flex py-2 px-2 hover:text-gray-500 uppercase text-2xl hover:underline"
                                        >
                                            Collections
                                        </Link>
                                    </motion.li>
                                    {segments?.map((segment) => (
                                    <motion.li
                                        key={segment.id}
                                        onClick={() => {
                                        setSelectedSegment(segment.slug)
                                        setView('categories')
                                        }}
                                        className="cursor-pointer flex py-2 px-2 hover:text-gray-500 uppercase text-2xl hover:underline"
                                        variants={itemVariantsClosed}
                                    >
                                        {segment.name}
                                    </motion.li>
                                    ))}
                                </ul>
                                )}
                            </>
                        )}
                        {view === 'categories' && selectedSegment && (
                            <>
                                {loadingCategories ? (
                                <ul>
                                    {Array.from({ length: 5 }).map((_, index) => (
                                    <li key={index} className="p-2">
                                        <Skeleton className="h-4 w-full" />
                                    </li>
                                    ))}
                                </ul>
                                ) : (
                                <ul>
                                    {categories?.map((category) => (
                                    <motion.li
                                        key={category.id}
                                        onClick={() => {
                                        setSelectedCategory(category.slug)
                                        setView('sub-categories')
                                        }}
                                        className="cursor-pointer flex py-2 px-2 hover:text-gray-500 uppercase text-2xl hover:underline"
                                        variants={itemVariantsClosed}
                                    >
                                        {category.name}
                                    </motion.li>
                                    ))}
                                </ul>
                                )}
                            </>
                        )}
                        {view === 'sub-categories' && selectedCategory && (
                            <>
                                {loadingSubcategories ? (
                                <ul>
                                    {Array.from({ length: 5 }).map((_, index) => (
                                    <motion.li key={index} className="p-2">
                                        <Skeleton className="h-4 w-full" />
                                    </motion.li>
                                    ))}
                                </ul>
                                ) : (
                                <ul>
                                    {subcategories?.map((subcategory) => (
                                    <motion.li
                                        key={subcategory.id}
                                        className="cursor-pointer flex py-2 px-2 hover:text-gray-500 uppercase text-2xl hover:underline"
                                        variants={itemVariantsClosed}
                                        onClick={() => handleCloseMenu()}
                                    >
                                        <Link
                                            href={`/${selectedSegment}/${selectedCategory}/${subcategory.slug}`}
                                        >
                                            {subcategory.name}
                                        </Link>
                                    </motion.li>
                                    ))}
                                </ul>
                                )}
                            </>
                            )}
                    </div>
                </div>
            </motion.aside>
    );
}

const MenuToggle = ({ toggle }: { toggle: () => void }) => (
    <button onClick={toggle} className={'self-end'}>
        <svg width="23" height="23" viewBox="0 0 23 23">
            <Path
                variants={{
                    isClosed: { d: "M 2 2.5 L 20 2.5" },
                    isOpen: { d: "M 3 16.5 L 17 2.5" },
                }}
            />
            <Path
                d="M 2 9.423 L 20 9.423"
                variants={{
                    isClosed: { opacity: 1 },
                    isOpen: { opacity: 0 },
                }}
                transition={{ duration: DURATION }}
            />
            <Path
                variants={{
                    isClosed: { d: "M 2 16.346 L 20 16.346" },
                    isOpen: { d: "M 3 2.5 L 17 16.346" },
                }}
            />
        </svg>
    </button>
)

interface PathProps {
    d?: string
    variants: Variants
    transition?: { duration: number }
}

const Path = (props: PathProps) => (
    <motion.path
        fill="transparent"
        strokeWidth="3"
        stroke="hsl(0, 0%, 18%)"
        strokeLinecap="round"
        {...props}
    />
)

const asideVariants: Variants = {
    isOpen: {
        width: "300px",
        transition: {
            duration: DURATION
        }
    },
    isClosed: {
        width: "72px",
        transition: {
            duration: DURATION
        }
    }
}

const itemVariantsClosed: Variants = {
    isOpen: {
        y: 0,
        opacity: 1,
        transition: {
            y: { stiffness: 1000, velocity: -100, duration: DURATION },
        },
    },
    isClosed: {
        y: 50,
        opacity: 0,
        transition: {
            y: { stiffness: 1000, duration: DURATION },
        },
    },
}

const itemVariantsOpen: Variants = {
    isClosed: {
        y: 0,
        opacity: 1,
        transition: {
            y: { stiffness: 1000, velocity: -100, duration: DURATION },
        },
    },
    isOpen: {
        y: 50,
        opacity: 0,
        transition: {
            y: { stiffness: 1000, duration: DURATION },
        },
    },
}

// Variants pour l'animation de transition avec Framer Motion
const pageVariants = {
    hidden: { x: 100, opacity: 0 },
    visible: { x: 0, opacity: 1 },
    exit: { x: -100, opacity: 0 }
  }
