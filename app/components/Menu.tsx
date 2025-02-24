'use client';

import {useState} from 'react';
import {Search, ShoppingBag, SkipBack} from 'lucide-react';
import {motion, Variants} from 'framer-motion';
import {getSegments} from "@/lib/actions";
import {Segment} from "@/app/types/types";
import {useQuery} from '@tanstack/react-query'

const DURATION = 0.5

const fetchSegments = async () => {
    return await getSegments()
}

export default function Menu() {
    const [open, setOpen] = useState<"isOpen" | "isClosed">("isClosed");
    const [view, setView] = useState<'segments' | 'categories' | 'sub-categories'>('segments')

    const { data: segments, isLoading: loadingSegments } = useQuery<Segment[]>({
        queryKey: ['segments'],
        queryFn: fetchSegments,
    })

    console.log(segments)

    return (
            <motion.aside
                className={`fixed top-0 left-0 h-screen bg-white shadow-md z-50`}
                variants={asideVariants}
                animate={open}
            >
                {/* Collapsed Sidebar */}
                <div
                    className={`flex flex-col items-center justify-start h-full py-4`}
                >
                    <div>
                        <MenuToggle toggle={() => open === 'isOpen' ? setOpen('isClosed') : setOpen('isOpen')} />
                    </div>
                    <div
                        className={`flex flex-col ${open === 'isOpen' ? '' : 'justify-center'} items-center flex-grow`}
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
                        {
                            view !== 'segments' && (
                                <button>
                                    <SkipBack />
                                </button>
                            )
                        }
                        <ul>
                            <motion.li variants={itemVariantsClosed}>
                                <a href="#">Link 1</a>
                            </motion.li>
                        </ul>
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
        width: "380px",
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