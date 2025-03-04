'use client';

import React, { useState } from 'react';
import { Button } from "@/components/ui/button"; // Assurez-vous que le chemin est correct
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { Category, SubCategory, ISize, IColor } from "@/app/types/types"; // Définir les types
import { ScrollArea } from "@/components/ui/scroll-area"

interface FilterProps {
  categories: Category[];
  subCategories: SubCategory[];
  sizes: ISize[];
  colors: IColor[];
  onFilterChange: (filters: { sizes: number[]; categories: number[]; subCategories: number[]; colors: number[] }) => void; // Définir le type de 'filters'
}

const FilterDrawerContent: React.FC<FilterProps> = ({
  categories,
  subCategories,
  sizes,
  colors,
  onFilterChange,
}) => {
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [selectedSubCategories, setSelectedSubCategories] = useState<number[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<number[]>([]);
  const [selectedColors, setSelectedColors] = useState<number[]>([]);

  const handleCategoryChange = (categoryId: number) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handleSubCategoryChange = (subCategoryId: number) => {
    setSelectedSubCategories((prev) =>
      prev.includes(subCategoryId)
        ? prev.filter((id) => id !== subCategoryId)
        : [...prev, subCategoryId]
    );
  };

  const handleSizeChange = (sizeId: number) => {
    setSelectedSizes((prev) =>
      prev.includes(sizeId) ? prev.filter((id) => id !== sizeId) : [...prev, sizeId]
    );
  };

  const handleColorChange = (colorId: number) => {
    setSelectedColors((prev) =>
      prev.includes(colorId)
        ? prev.filter((id) => id !== colorId)
        : [...prev, colorId]
    );
  };

  const handleApplyFilters = () => {
    const filters = {
      categories: selectedCategories,
      subCategories: selectedSubCategories,
      sizes: selectedSizes,
      colors: selectedColors,
    };
    onFilterChange(filters);
    // Close the drawer after applying filters
  };

  return (
    <DrawerContent className="sm:max-w-sm">
      <DrawerHeader>
        <DrawerTitle>Filtrer</DrawerTitle>
      </DrawerHeader>
      <ScrollArea className="h-[calc(100vh-10rem)] space-y-4 p-4">
        <div>
          <h3 className="text-lg font-semibold mb-2">Catégories</h3>
          <div className="flex flex-col gap-2">
            {categories.map((category) => (
              <label key={category.id} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="rounded text-blue-500 focus:ring-blue-500"
                  checked={selectedCategories.includes(category.id)}
                  onChange={() => handleCategoryChange(category.id)}
                />
                <span>{category.name}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Sous-Catégories</h3>
          <div className="flex flex-col gap-2">
            {subCategories.map((subCategory) => (
              <label key={subCategory.id} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="rounded text-blue-500 focus:ring-blue-500"
                  checked={selectedSubCategories.includes(subCategory.id)}
                  onChange={() => handleSubCategoryChange(subCategory.id)}
                />
                <span>{subCategory.name}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Tailles</h3>
          <div className="flex flex-col gap-2">
            {sizes.map((size) => (
              <label key={size.id} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="rounded text-blue-500 focus:ring-blue-500"
                  checked={selectedSizes.includes(size.id)}
                  onChange={() => handleSizeChange(size.id)}
                />
                <span>{size.name}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Couleurs</h3>
          <div className="flex flex-col gap-2">
            {colors.map((color) => (
              <label key={color.id} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="rounded text-blue-500 focus:ring-blue-500"
                  checked={selectedColors.includes(color.id)}
                  onChange={() => handleColorChange(color.id)}
                />
                <span>{color.name}</span>
              </label>
            ))}
          </div>
        </div>
      </ScrollArea>
      <Button className="w-full mt-4" onClick={handleApplyFilters}>
        Appliquer les filtres
      </Button>
    </DrawerContent>
  );
};

interface Props {
  categories: Category[];
  subCategories: SubCategory[];
  sizes: ISize[];
  colors: IColor[];
  onFilterChange: (filters: { sizes: number[]; categories: number[]; subCategories: number[]; colors: number[] }) => void;
}

const FilterButton: React.FC<Props> = ({ categories, subCategories, sizes, colors, onFilterChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleFilterChange = (filters: { sizes: number[]; categories: number[]; subCategories: number[]; colors: number[] }) => {
    onFilterChange(filters);
    setIsOpen(false); // Close the drawer after filtering
  };

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger>
        <Button variant="outline">Filtres</Button>
      </DrawerTrigger>
      <FilterDrawerContent
        categories={categories}
        subCategories={subCategories}
        sizes={sizes}
        colors={colors}
        onFilterChange={handleFilterChange}
      />
    </Drawer>
  );
};

export default FilterButton;