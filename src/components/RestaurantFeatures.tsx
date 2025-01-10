import { Badge } from "@/components/ui/badge";
import { Leaf, Award, Home } from "lucide-react";

interface RestaurantFeaturesProps {
  features: string[];
}

const RestaurantFeatures = ({ features }: RestaurantFeaturesProps) => {
  const getFeatureIcon = (feature: string) => {
    switch (feature.toLowerCase()) {
      case "végétarien":
      case "bio":
        return <Leaf className="w-4 h-4" />;
      case "fait maison":
        return <Home className="w-4 h-4" />;
      default:
        return <Award className="w-4 h-4" />;
    }
  };

  return (
    <div className="flex flex-wrap gap-2">
      {features.map((feature) => (
        <Badge
          key={feature}
          variant="secondary"
          className="flex items-center gap-1"
        >
          {getFeatureIcon(feature)}
          {feature}
        </Badge>
      ))}
    </div>
  );
};

export default RestaurantFeatures;