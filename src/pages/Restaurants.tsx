import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import SearchFilters from "@/components/SearchFilters";
import RestaurantFilters, { FilterOptions } from "@/components/RestaurantFilters";
import RestaurantSort from "@/components/RestaurantSort";
import RestaurantList from "@/components/RestaurantList";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface UserPreferences {
  cuisine: string;
  maxDeliveryTime: number;
  minRating: number;
  glutenFree: boolean;
  vegetarian: boolean;
  priceRange: string;
}

const Restaurants = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCuisine, setSelectedCuisine] = useState("tout");
  const [restaurants, setRestaurants] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [userPreferences, setUserPreferences] = useState<UserPreferences>({
    cuisine: "tout",
    maxDeliveryTime: 60,
    minRating: 0,
    glutenFree: false,
    vegetarian: false,
    priceRange: "all"
  });
  const [filters, setFilters] = useState<FilterOptions>({
    priceRange: [0, 50000],
    rating: 0,
    deliveryTime: 60,
    onlyVegetarian: false,
    onlyOpen: false,
  });
  const [sortBy, setSortBy] = useState("rating");

  useEffect(() => {
    fetchRestaurants();
  }, [searchTerm, selectedCuisine]);

  const fetchRestaurants = async () => {
    try {
      setLoading(true);
      let query = supabase
        .from('restaurants')
        .select(`
          *,
          menu_items (
            id,
            name,
            price,
            description,
            image_url,
            available
          )
        `);

      if (searchTerm) {
        const { data: searchResults, error: searchError } = await supabase.rpc(
          'search_restaurants',
          { search_query: searchTerm }
        );
        
        if (searchError) throw searchError;
        setRestaurants(searchResults || []);
      } else {
        const { data, error } = await query;
        if (error) throw error;
        setRestaurants(data || []);
      }
    } catch (error) {
      console.error('Error fetching restaurants:', error);
      toast.error("Erreur lors de la récupération des restaurants");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-br from-brand-gray-50 to-brand-gray-100 pt-20"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ x: -20 }}
          animate={{ x: 0 }}
          className="flex items-center mb-8"
        >
          <Button
            variant="ghost"
            className="mr-4"
            onClick={() => navigate("/")}
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Retour
          </Button>
          <h1 className="text-3xl font-bold">Découvrez nos restaurants</h1>
        </motion.div>

        <div className="space-y-6">
          <SearchFilters
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            selectedCuisine={selectedCuisine}
            setSelectedCuisine={setSelectedCuisine}
            userPreferences={userPreferences}
            setUserPreferences={setUserPreferences}
          />

          <div className="flex justify-between items-center">
            <RestaurantFilters onFilterChange={setFilters} />
            <RestaurantSort onSortChange={setSortBy} />
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-buntu-primary"></div>
            </div>
          ) : (
            <RestaurantList
              restaurants={restaurants}
              filters={filters}
              sortBy={sortBy}
            />
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Restaurants;