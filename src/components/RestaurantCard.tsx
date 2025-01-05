import { Star, Clock, MapPin } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

interface RestaurantCardProps {
  id: string;
  name: string;
  image: string;
  rating: number;
  deliveryTime: string;
  minOrder: string;
  cuisine: string;
  address: string;
}

const RestaurantCard = ({
  id,
  name,
  image,
  rating,
  deliveryTime,
  minOrder,
  cuisine,
  address,
}: RestaurantCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
      <Link to={`/restaurant/${id}`}>
        <div className="relative h-48">
          <img src={image} alt={name} className="w-full h-full object-cover" />
          <div className="absolute top-4 right-4 bg-white px-2 py-1 rounded-full flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            <span className="text-sm font-semibold">{rating}</span>
          </div>
        </div>
        
        <div className="p-4">
          <h3 className="text-xl font-semibold mb-2">{name}</h3>
          <p className="text-gray-600 text-sm mb-2">{cuisine}</p>
          
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
            <MapPin className="w-4 h-4" />
            <span>{address}</span>
          </div>
          
          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4 text-buntu-primary" />
              <span className="text-sm">{deliveryTime}</span>
            </div>
            <div className="text-sm">
              Min. {minOrder}
            </div>
          </div>
          
          <Button className="w-full bg-buntu-primary hover:bg-buntu-secondary">
            Voir le menu
          </Button>
        </div>
      </Link>
    </div>
  );
};

export default RestaurantCard;