// components/CategoryFilter.tsx
'use client';
import {Category} from "@/app/types/types";
import React, {useState} from "react";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {Check, ChevronDown} from "lucide-react";
import {Button} from "@/components/ui/button";
import {Slider} from "@/components/ui/slider";

interface CategoryFilterProps {
    categories: Category[];
    selectedCategory: string | undefined;
    // onCategoryClickAction: (slug: string | undefined) => void;
}

const sizes = ['Toutes', 'XS', 'S', 'M', 'L', 'XL'];

export default function CategoryFilter({ categories }: CategoryFilterProps) {
    const [selectedCategory, setSelectedCategory] = useState('Toutes');
    const [selectedSize, setSelectedSize] = useState('Toutes');
    const [priceRange, setPriceRange] = useState([0, 200]);

    return (
        <div className="space-y-4">
                <h2 className="font-semibold text-lg">Filtres</h2>

                {/* Catégories */}
                <div>
                    <h3 className="text-sm font-medium mb-2">Catégorie</h3>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="w-full justify-between">
                                {selectedCategory}
                                <ChevronDown className="h-4 w-4 ml-2" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56">
                            {categories.map((category) => (
                                <DropdownMenuItem
                                    key={category.id}
                                    onClick={() => setSelectedCategory(category.documentId)}
                                    className="justify-between"
                                >
                                    {category.name}
                                    {selectedCategory === category.documentId && <Check className="h-4 w-4" />}
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

                {/* Tailles */}
                <div>
                    <h3 className="text-sm font-medium mb-2">Taille</h3>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="w-full justify-between">
                                {selectedSize}
                                <ChevronDown className="h-4 w-4 ml-2" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56">
                            {sizes.map((size) => (
                                <DropdownMenuItem
                                    key={size}
                                    onClick={() => setSelectedSize(size)}
                                    className="justify-between"
                                >
                                    {size}
                                    {selectedSize === size && <Check className="h-4 w-4" />}
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

                {/* Prix */}
                <div>
                    <h3 className="text-sm font-medium mb-2">Prix</h3>
                    <div className="px-2">
                        <Slider
                            defaultValue={[0, 200]}
                            max={200}
                            step={1}
                            value={priceRange}
                            onValueChange={setPriceRange}
                            className="my-4"
                        />
                        <div className="flex justify-between text-sm text-gray-600">
                            <span>{priceRange[0]}€</span>
                            <span>{priceRange[1]}€</span>
                        </div>
                    </div>
                </div>
            </div>
    )
}