import { Link } from "react-router-dom";
import ImageWithFallback from "./ImageWithFallback";
import { Card, CardContent, CardFooter } from "./ui/card";
import { Star } from "lucide-react";

interface RestaurantCardProps {
  id: string;
  name: string;
  description?: string;
  image: string;
  rating: number;
  cuisine: string;
  deliveryTime?: string;
  minOrder?: string;
  address?: string;
}

const RestaurantCard = ({
  id,
  name,
  description,
  image,
  rating,
  cuisine,
  deliveryTime,
  minOrder,
  address,
}: RestaurantCardProps) => {
  return (
    <Link to={`/restaurant/${id}`}>
      <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
        <ImageWithFallback
          src={image}
          alt={name}
          className="w-full h-48 object-cover"
          fallbackSrc="https://images.unsplash.com/photo-1504893524553-b855bce32c67"
        />
        <CardContent className="p-4">
          <h3 className="text-xl font-semibold text-brand-gray-800 mb-2">{name}</h3>
          <p className="text-brand-gray-600 text-sm mb-2">{cuisine}</p>
          {description && (
            <p className="text-brand-gray-500 text-sm line-clamp-2">{description}</p>
          )}
          {deliveryTime && (
            <p className="text-brand-gray-600 text-sm mt-2">
              Temps de livraison: {deliveryTime}
            </p>
          )}
          {minOrder && (
            <p className="text-brand-gray-600 text-sm">
              Commande minimum: {minOrder}
            </p>
          )}
          {address && (
            <p className="text-brand-gray-500 text-sm mt-2">{address}</p>
          )}
        </CardContent>
        <CardFooter className="px-4 py-3 bg-brand-gray-50">
          <div className="flex items-center text-brand-orange-500">
            <Star className="w-4 h-4 fill-current" />
            <span className="ml-1 font-medium">{rating.toFixed(1)}</span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default RestaurantCard;