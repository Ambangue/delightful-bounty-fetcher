import { motion } from "framer-motion";
import RestaurantCard from "./RestaurantCard";
import { FilterOptions } from "./RestaurantFilters";

interface Restaurant {
  id: string;
  name: string;
  description?: string;
  image: string;
  rating: number;
  cuisine: string;
  deliveryTime?: string;
  minOrder?: string;
  address?: string;
  isVegetarian?: boolean;
  isOpen?: boolean;
  ecoScore?: number;
  trending?: boolean;
}

interface RestaurantListProps {
  restaurants: Restaurant[];
  filters: FilterOptions;
  sortBy: string;
}

const RestaurantList = ({ restaurants, filters, sortBy }: RestaurantListProps) => {
  const filteredRestaurants = restaurants
    .filter((restaurant) => {
      if (filters.onlyVegetarian && !restaurant.isVegetarian) return false;
      if (filters.onlyOpen && !restaurant.isOpen) return false;
      if (restaurant.rating < filters.rating) return false;
      if (parseInt(restaurant.deliveryTime || "0") > filters.deliveryTime) return false;
      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "rating":
          return b.rating - a.rating;
        case "deliveryTime":
          return (
            parseInt(a.deliveryTime || "0") - parseInt(b.deliveryTime || "0")
          );
        case "minOrder":
          return (
            parseInt(a.minOrder?.replace(/[^0-9]/g, "") || "0") -
            parseInt(b.minOrder?.replace(/[^0-9]/g, "") || "0")
          );
        case "trending":
          return (b.trending ? 1 : 0) - (a.trending ? 1 : 0);
        case "eco":
          return (b.ecoScore || 0) - (a.ecoScore || 0);
        default:
          return 0;
      }
    });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredRestaurants.map((restaurant, index) => (
        <motion.div
          key={restaurant.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <RestaurantCard {...restaurant} />
        </motion.div>
      ))}
    </div>
  );
};

export default RestaurantList;