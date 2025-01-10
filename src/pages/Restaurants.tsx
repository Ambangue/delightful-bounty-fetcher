import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Search, Filter, Star, Clock, MapPin, Sparkles, TrendingUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import RestaurantCard from "@/components/RestaurantCard";
import SearchFilters from "@/components/SearchFilters";
import PopularDishes from "@/components/PopularDishes";
import RestaurantFeatures from "@/components/RestaurantFeatures";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";

// Algorithmes intelligents améliorés
const useRestaurantRecommendations = (restaurants: any[], userPreferences: any) => {
  return restaurants.sort((a, b) => {
    const scoreA = calculateRecommendationScore(a, userPreferences);
    const scoreB = calculateRecommendationScore(b, userPreferences);
    return scoreB - scoreA;
  });
};

const calculateRecommendationScore = (restaurant: any, preferences: any) => {
  let score = 0;
  // Facteurs de base
  if (preferences.cuisine === restaurant.cuisine) score += 2;
  if (restaurant.rating >= 4.5) score += 1.5;
  if (parseInt(restaurant.deliveryTime) <= 30) score += 1;
  
  // Nouveaux facteurs innovants
  if (restaurant.aiRecommended) score += 2;
  if (restaurant.sustainablePractices) score += 1.5;
  if (restaurant.popularDishes?.length > 0) score += 1;
  if (restaurant.features?.includes("Sans Gluten")) score += preferences.glutenFree ? 2 : 0;
  
  return score;
};

const Restaurants = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCuisine, setSelectedCuisine] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "map" | "ar">("grid");
  const [sortBy, setSortBy] = useState<"rating" | "distance" | "price" | "trending" | "eco">("rating");
  const [userPreferences, setUserPreferences] = useState({
    cuisine: "all",
    maxDeliveryTime: 60,
    minRating: 4,
    glutenFree: false,
    vegetarian: false,
    priceRange: "all",
  });

  // Données enrichies avec nouvelles fonctionnalités
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

  // Nouveaux hooks pour les fonctionnalités innovantes
  const [showVirtualTour, setShowVirtualTour] = useState(false);
  const [showTrending, setShowTrending] = useState(true);
  const [showEcoFriendly, setShowEcoFriendly] = useState(false);

  // Algorithmes de filtrage et tri améliorés
  const filteredRestaurants = restaurants
    .filter((restaurant) => {
      const matchesSearch = restaurant.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
        restaurant.description
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      const matchesCuisine =
        selectedCuisine === "all" ||
        restaurant.cuisine.toLowerCase() === selectedCuisine.toLowerCase();
      
      // Nouveaux filtres
      const matchesPreferences = 
        (!userPreferences.glutenFree || restaurant.features.includes("Sans Gluten")) &&
        (!userPreferences.vegetarian || restaurant.features.includes("Végétarien")) &&
        (userPreferences.priceRange === "all" || matchesPriceRange(restaurant.minOrder, userPreferences.priceRange));
      
      return matchesSearch && matchesCuisine && matchesPreferences;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "rating":
          return b.rating - a.rating;
        case "trending":
          return (b.trending ? 1 : 0) - (a.trending ? 1 : 0);
        case "eco":
          return (b.ecoScore || 0) - (a.ecoScore || 0);
        case "distance":
          return parseInt(a.deliveryTime) - parseInt(b.deliveryTime);
        case "price":
          return (
            parseInt(a.minOrder.replace(/[^0-9]/g, "")) -
            parseInt(b.minOrder.replace(/[^0-9]/g, ""))
          );
        default:
          return 0;
      }
    });

  // Recommendations intelligentes améliorées
  const recommendedRestaurants = useRestaurantRecommendations(
    filteredRestaurants,
    userPreferences
  );

  // Fonction utilitaire pour le filtrage par prix
  const matchesPriceRange = (minOrder: string, range: string) => {
    const price = parseInt(minOrder.replace(/[^0-9]/g, ""));
    switch (range) {
      case "low": return price < 5000;
      case "medium": return price >= 5000 && price <= 15000;
      case "high": return price > 15000;
      default: return true;
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
            className="mr-4 hover:scale-105 transition-transform"
            onClick={() => navigate("/")}
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Retour
          </Button>
          <h1 className="text-3xl font-display font-bold text-brand-gray-800">
            Découvrez nos restaurants
          </h1>
          {showTrending && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="ml-4 flex items-center text-brand-orange-500"
            >
              <TrendingUp className="w-5 h-5 mr-1" />
              <span className="text-sm font-medium">Tendances</span>
            </motion.div>
          )}
        </motion.div>

        <SearchFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedCuisine={selectedCuisine}
          setSelectedCuisine={setSelectedCuisine}
          userPreferences={userPreferences}
          setUserPreferences={setUserPreferences}
        />

        <div className="flex justify-between items-center mb-6">
          <div className="flex gap-4">
            <Button
              variant={viewMode === "grid" ? "default" : "outline"}
              onClick={() => setViewMode("grid")}
              className="hover:scale-105 transition-transform"
            >
              Grille
            </Button>
            <Button
              variant={viewMode === "map" ? "default" : "outline"}
              onClick={() => setViewMode("map")}
              className="hover:scale-105 transition-transform"
            >
              Carte
            </Button>
            <Button
              variant={viewMode === "ar" ? "default" : "outline"}
              onClick={() => setViewMode("ar")}
              className="hover:scale-105 transition-transform"
            >
              AR View
            </Button>
          </div>
          <div className="flex gap-4">
            <select
              className="border rounded-md px-3 py-2 hover:border-brand-orange-500 transition-colors"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
            >
              <option value="rating">Note</option>
              <option value="trending">Tendances</option>
              <option value="eco">Éco-score</option>
              <option value="distance">Distance</option>
              <option value="price">Prix</option>
            </select>
          </div>
        </div>

        <AnimatePresence>
          {recommendedRestaurants.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <Card className="p-8 text-center">
                <CardHeader>
                  <CardTitle>Aucun restaurant trouvé</CardTitle>
                  <CardDescription>
                    Essayez de modifier vos critères de recherche
                  </CardDescription>
                </CardHeader>
              </Card>
            </motion.div>
          ) : (
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {recommendedRestaurants.map((restaurant, index) => (
                <motion.div
                  key={restaurant.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ 
                    opacity: 1, 
                    y: 0,
                    transition: { delay: index * 0.1 }
                  }}
                >
                  <RestaurantCard {...restaurant} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default Restaurants;
