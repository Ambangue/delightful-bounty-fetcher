import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface RestaurantSortProps {
  onSortChange: (value: string) => void;
}

const RestaurantSort = ({ onSortChange }: RestaurantSortProps) => {
  return (
    <Select onValueChange={onSortChange} defaultValue="rating">
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Trier par" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="rating">Note</SelectItem>
        <SelectItem value="deliveryTime">Temps de livraison</SelectItem>
        <SelectItem value="minOrder">Commande minimum</SelectItem>
        <SelectItem value="distance">Distance</SelectItem>
        <SelectItem value="trending">Tendances</SelectItem>
        <SelectItem value="eco">Éco-score</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default RestaurantSort;