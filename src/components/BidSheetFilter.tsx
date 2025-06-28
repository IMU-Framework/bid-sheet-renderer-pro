
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Filter } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface BidSheetFilterProps {
  categories: string[];
  selectedCategories: string[];
  onCategoryChange: (category: string, checked: boolean) => void;
  darkMode?: boolean;
  isMobile?: boolean;
}

const BidSheetFilter = ({ 
  categories, 
  selectedCategories, 
  onCategoryChange, 
  darkMode = false,
  isMobile = false
}: BidSheetFilterProps) => {
  const [open, setOpen] = useState(false);

  // Calculate the maximum line length for mobile width adjustment
  const maxLineLength = Math.max(...categories.map(cat => cat.length));
  const mobileWidth = Math.min(Math.max(maxLineLength * 8 + 32, 200), 300);

  const handleCheckedChange = (category: string, checked: boolean) => {
    onCategoryChange(category, checked);
    // Don't close the dropdown after check/uncheck
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="flex items-center justify-center print:hidden"
        >
          <Filter className={`h-4 w-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align={isMobile ? "start" : "end"}
        className={`${isMobile ? `ml-4` : 'w-56'} ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}
        style={isMobile ? { width: `${mobileWidth}px` } : {}}
        onPointerDownOutside={() => setOpen(false)}
        onEscapeKeyDown={() => setOpen(false)}
      >
        {categories.map((category) => (
          <DropdownMenuCheckboxItem
            key={category}
            checked={selectedCategories.includes(category)}
            onCheckedChange={(checked) => handleCheckedChange(category, checked)}
            className={`${darkMode ? 'text-gray-200 hover:bg-gray-700' : 'text-gray-900 hover:bg-gray-50'}`}
            onSelect={(e) => e.preventDefault()}
          >
            {category}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default BidSheetFilter;
