import { useState } from "react";
import Navbar from "@/components/Navbar";
import SearchFilters from "@/components/SearchFilters";
import RestaurantCard from "@/components/RestaurantCard";
import Footer from "@/components/Footer";

const Restaurants = () => {
  const [restaurants] = useState([
    {
      name: "Mami Wata",
      image: "/restaurant.jpg",
      rating: 4.8,
      deliveryTime: "25-35 min",
      minOrder: "5000 FCFA",
      cuisine: "Cuisine Congolaise",
      address: "Avenue de la Paix, Brazzaville"
    },
    {
      name: "Le Massamba",
      image: "/traiteur.jpg",
      rating: 4.6,
      deliveryTime: "30-45 min",
      minOrder: "3000 FCFA",
      cuisine: "Cuisine Africaine",
      address: "Rue de la Liberté, Brazzaville"
    },
    {
      name: "Chez Mama Africa",
      image: "/cours.jpg",
      rating: 4.7,
      deliveryTime: "20-35 min",
      minOrder: "4000 FCFA",
      cuisine: "Cuisine Traditionnelle",
      address: "Boulevard Denis Sassou Nguesso, Brazzaville"
    }
  ]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto px-4 py-8 mt-20">
        <h1 className="text-3xl font-bold mb-8">Restaurants à Brazzaville</h1>
        <SearchFilters />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {restaurants.map((restaurant, index) => (
            <RestaurantCard key={index} {...restaurant} />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Restaurants;