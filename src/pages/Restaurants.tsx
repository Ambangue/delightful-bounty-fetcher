import { useState } from "react";
import RestaurantCard from "@/components/RestaurantCard";
import SearchFilters from "@/components/SearchFilters";

const Restaurants = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCuisine, setSelectedCuisine] = useState("all");

  // Exemple de données (à remplacer par des données réelles de l'API)
  const restaurants = [
    {
      id: "1",
      name: "Mami Wata",
      image: "/restaurant.jpg",
      rating: 4.8,
      deliveryTime: "25-35 min",
      minOrder: "5000 FCFA",
      cuisine: "Congolaise",
      address: "Avenue de la Paix, Brazzaville"
    },
    {
      id: "2",
      name: "Le Massamba",
      image: "/restaurant.jpg",
      rating: 4.5,
      deliveryTime: "30-45 min",
      minOrder: "3000 FCFA",
      cuisine: "Africaine",
      address: "Rue de la Liberté, Brazzaville"
    },
    {
      id: "3",
      name: "Chez Tantine",
      image: "/restaurant.jpg",
      rating: 4.7,
      deliveryTime: "20-30 min",
      minOrder: "4000 FCFA",
      cuisine: "Congolaise traditionnelle",
      address: "Boulevard Denis Sassou Nguesso, Brazzaville"
    }
  ];

  const filteredRestaurants = restaurants.filter((restaurant) => {
    const matchesSearch = restaurant.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCuisine =
      selectedCuisine === "all" ||
      restaurant.cuisine.toLowerCase() === selectedCuisine.toLowerCase();
    return matchesSearch && matchesCuisine;
  });

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container mx-auto px-4">
        <SearchFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedCuisine={selectedCuisine}
          setSelectedCuisine={setSelectedCuisine}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {filteredRestaurants.map((restaurant) => (
            <RestaurantCard
              key={restaurant.id}
              id={restaurant.id}
              name={restaurant.name}
              image={restaurant.image}
              rating={restaurant.rating}
              deliveryTime={restaurant.deliveryTime}
              minOrder={restaurant.minOrder}
              cuisine={restaurant.cuisine}
              address={restaurant.address}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Restaurants;