import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import SearchFilters from "@/components/SearchFilters";
import RestaurantFilters, { FilterOptions } from "@/components/RestaurantFilters";
import RestaurantSort from "@/components/RestaurantSort";
import RestaurantList from "@/components/RestaurantList";

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

  // Exemple de données de restaurants (à remplacer par des données réelles de Supabase)
  const restaurants = [
    {
      id: "1",
      name: "Mami Wata",
      description: "Les meilleurs plats traditionnels congolais en ville",
      image: "https://images.unsplash.com/photo-1504893524553-b855bce32c67",
      rating: 4.8,
      deliveryTime: "25-35",
      minOrder: "5000 FCFA",
      cuisine: "Congolaise",
      address: "Avenue de la Paix, Brazzaville",
      features: ["Végétarien", "Sans Gluten", "Éco-responsable"],
      popularDishes: ["Poulet Moambé", "Saka Saka"],
      aiRecommended: true,
      sustainablePractices: true,
      virtualTour: true,
      trending: true,
      ecoScore: 95
    },
    {
      id: "2",
      name: "Le Massamba",
      description: "Une expérience culinaire africaine authentique",
      image: "https://images.unsplash.com/photo-1504893524553-b855bce32c67",
      rating: 4.5,
      deliveryTime: "30-45",
      minOrder: "3000 FCFA",
      cuisine: "Africaine",
      address: "Rue de la Liberté, Brazzaville",
      features: ["Halal", "Local"],
      popularDishes: ["Thieb", "Alloco"],
      aiRecommended: true
    },
    {
      id: "3",
      name: "Chez Tantine",
      description: "Le goût de la cuisine maison congolaise",
      image: "https://images.unsplash.com/photo-1504893524553-b855bce32c67",
      rating: 4.7,
      deliveryTime: "20-30",
      minOrder: "4000 FCFA",
      cuisine: "Congolaise traditionnelle",
      address: "Boulevard Denis Sassou Nguesso, Brazzaville",
      features: ["Bio", "Fait Maison"],
      popularDishes: ["Ndolé", "Fumbwa"],
      aiRecommended: false
    }
  ];

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

          <RestaurantList
            restaurants={restaurants}
            filters={filters}
            sortBy={sortBy}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default Restaurants;