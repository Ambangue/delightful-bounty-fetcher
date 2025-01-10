import { Search, SlidersHorizontal } from "lucide-react";
import { Button } from "./ui/button";
import { Dispatch, SetStateAction } from "react";

interface UserPreferences {
  cuisine: string;
  maxDeliveryTime: number;
  minRating: number;
  glutenFree: boolean;
  vegetarian: boolean;
  priceRange: string;
}

interface SearchFiltersProps {
  searchTerm: string;
  setSearchTerm: Dispatch<SetStateAction<string>>;
  selectedCuisine: string;
  setSelectedCuisine: Dispatch<SetStateAction<string>>;
  userPreferences: UserPreferences;
  setUserPreferences: Dispatch<SetStateAction<UserPreferences>>;
}

const SearchFilters = ({
  searchTerm,
  setSearchTerm,
  selectedCuisine,
  setSelectedCuisine,
  userPreferences,
  setUserPreferences
}: SearchFiltersProps) => {
  const cuisineTypes = ["Tout", "Congolais", "Africain", "Fast Food", "Poulet", "Poisson"];
  
  return (
    <div className="bg-white shadow-md p-4 rounded-lg mb-8">
      <div className="flex gap-4 mb-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher un restaurant ou un plat..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-buntu-primary"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline" className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4" />
          Filtres
        </Button>
      </div>
      
      <div className="flex gap-2 overflow-x-auto pb-2">
        {cuisineTypes.map((type) => (
          <button
            key={type}
            className={`px-4 py-1 rounded-full border transition-colors whitespace-nowrap ${
              selectedCuisine === type.toLowerCase() 
                ? "bg-buntu-primary text-white" 
                : "hover:bg-buntu-primary hover:text-white"
            }`}
            onClick={() => {
              setSelectedCuisine(type.toLowerCase());
              setUserPreferences({
                ...userPreferences,
                cuisine: type.toLowerCase()
              });
            }}
          >
            {type}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SearchFilters;