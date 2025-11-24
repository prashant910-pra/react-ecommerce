import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  productCounts?: Record<string, number>;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  selectedCategory,
  onCategoryChange,
  productCounts
}) => {
  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-lg">Categories</h3>
      <div className="space-y-2">
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "ghost"}
            className={`w-full justify-start ${selectedCategory === category ? "bg-pink-500" : "ghost"}`}
            onClick={() => onCategoryChange(category)}
          >
            <span className="flex-1 text-left">{category}</span>
            {productCounts && productCounts[category] > 0 && (
              <Badge variant="secondary" className="ml-2">
                {productCounts[category]}
              </Badge>
            )}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;