import { Search, SlidersHorizontal } from "lucide-react";
import { Button } from "./ui/button";

const SearchFilters = () => {
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
            className="px-4 py-1 rounded-full border hover:bg-buntu-primary hover:text-white transition-colors whitespace-nowrap"
          >
            {type}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SearchFilters;