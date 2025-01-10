import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Search, Filter, Star, Clock, MapPin } from "lucide-react";
import RestaurantCard from "@/components/RestaurantCard";
import SearchFilters from "@/components/SearchFilters";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";

// Algorithmes intelligents
const useRestaurantRecommendations = (restaurants: any[], userPreferences: any) => {
  return restaurants.sort((a, b) => {
    const scoreA = calculateRecommendationScore(a, userPreferences);
    const scoreB = calculateRecommendationScore(b, userPreferences);
    return scoreB - scoreA;
  });
};

const calculateRecommendationScore = (restaurant: any, preferences: any) => {
  let score = 0;
  if (preferences.cuisine === restaurant.cuisine) score += 2;
  if (restaurant.rating >= 4.5) score += 1.5;
  if (parseInt(restaurant.deliveryTime) <= 30) score += 1;
  return score;
};

const Restaurants = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCuisine, setSelectedCuisine] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "map">("grid");
  const [sortBy, setSortBy] = useState<"rating" | "distance" | "price">("rating");
  const [userPreferences, setUserPreferences] = useState({
    cuisine: "all",
    maxDeliveryTime: 60,
    minRating: 4,
  });

  // Exemple de données enrichies
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
      features: ["Végétarien", "Sans Gluten"],
      popularDishes: ["Poulet Moambé", "Saka Saka"],
      aiRecommended: true
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

  // Algorithmes de filtrage et tri
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
      return matchesSearch && matchesCuisine;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "rating":
          return b.rating - a.rating;
        case "distance":
          // Simulation de calcul de distance
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

  // Recommendations intelligentes
  const recommendedRestaurants = useRestaurantRecommendations(
    filteredRestaurants,
    userPreferences
  );

  useEffect(() => {
    // Simulation d'apprentissage des préférences utilisateur
    const learnUserPreferences = () => {
      // Analyse des clics et comportements utilisateur
      setUserPreferences((prev) => ({
        ...prev,
        cuisine: selectedCuisine,
      }));
    };

    learnUserPreferences();
  }, [selectedCuisine]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-gray-50 to-brand-gray-100 pt-20">
      <div className="container mx-auto px-4">
        <div className="flex items-center mb-8">
          <Button
            variant="ghost"
            className="mr-4"
            onClick={() => navigate("/")}
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Retour
          </Button>
          <h1 className="text-3xl font-display font-bold text-brand-gray-800">
            Découvrez nos restaurants
          </h1>
        </div>

        <SearchFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedCuisine={selectedCuisine}
          setSelectedCuisine={setSelectedCuisine}
        />

        <div className="flex justify-between items-center mb-6">
          <div className="flex gap-4">
            <Button
              variant={viewMode === "grid" ? "default" : "outline"}
              onClick={() => setViewMode("grid")}
            >
              Grille
            </Button>
            <Button
              variant={viewMode === "map" ? "default" : "outline"}
              onClick={() => setViewMode("map")}
            >
              Carte
            </Button>
          </div>
          <div className="flex gap-4">
            <select
              className="border rounded-md px-3 py-2"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
            >
              <option value="rating">Note</option>
              <option value="distance">Distance</option>
              <option value="price">Prix</option>
            </select>
          </div>
        </div>

        {recommendedRestaurants.length === 0 ? (
          <Card className="p-8 text-center">
            <CardHeader>
              <CardTitle>Aucun restaurant trouvé</CardTitle>
              <CardDescription>
                Essayez de modifier vos critères de recherche
              </CardDescription>
            </CardHeader>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {recommendedRestaurants.map((restaurant) => (
              <RestaurantCard
                key={restaurant.id}
                {...restaurant}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Restaurants;