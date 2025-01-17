import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Switch } from "@/components/ui/switch";
import { SlidersHorizontal } from "lucide-react";

interface RestaurantFiltersProps {
  onFilterChange: (filters: FilterOptions) => void;
}

export interface FilterOptions {
  priceRange: [number, number];
  rating: number;
  deliveryTime: number;
  onlyVegetarian: boolean;
  onlyOpen: boolean;
}

const RestaurantFilters = ({ onFilterChange }: RestaurantFiltersProps) => {
  const [filters, setFilters] = useState<FilterOptions>({
    priceRange: [0, 50000],
    rating: 0,
    deliveryTime: 60,
    onlyVegetarian: false,
    onlyOpen: false,
  });

  const handleFilterChange = (newFilters: Partial<FilterOptions>) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4" />
          Filtres avancés
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Filtres</SheetTitle>
        </SheetHeader>
        <div className="py-6 space-y-6">
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Fourchette de prix (FCFA)</h3>
            <Slider
              defaultValue={[0, 50000]}
              max={50000}
              step={1000}
              onValueChange={(value) => handleFilterChange({ priceRange: value as [number, number] })}
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{filters.priceRange[0]} FCFA</span>
              <span>{filters.priceRange[1]} FCFA</span>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-medium">Note minimum</h3>
            <Slider
              defaultValue={[0]}
              max={5}
              step={0.5}
              onValueChange={(value) => handleFilterChange({ rating: value[0] })}
            />
            <div className="text-xs text-muted-foreground">
              {filters.rating} étoiles et plus
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-medium">Temps de livraison max.</h3>
            <Slider
              defaultValue={[60]}
              max={120}
              step={5}
              onValueChange={(value) => handleFilterChange({ deliveryTime: value[0] })}
            />
            <div className="text-xs text-muted-foreground">
              {filters.deliveryTime} minutes max.
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm">Uniquement végétarien</span>
            <Switch
              checked={filters.onlyVegetarian}
              onCheckedChange={(checked) => handleFilterChange({ onlyVegetarian: checked })}
            />
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm">Restaurants ouverts</span>
            <Switch
              checked={filters.onlyOpen}
              onCheckedChange={(checked) => handleFilterChange({ onlyOpen: checked })}
            />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default RestaurantFilters;