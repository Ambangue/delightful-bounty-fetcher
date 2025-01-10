import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

interface PopularDishesProps {
  dishes: string[];
}

const PopularDishes = ({ dishes }: PopularDishesProps) => {
  return (
    <div className="mt-4">
      <h4 className="text-sm font-semibold mb-2">Plats populaires</h4>
      <div className="flex gap-2 overflow-x-auto pb-2">
        {dishes.map((dish, index) => (
          <motion.div
            key={dish}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="min-w-[150px]">
              <CardContent className="p-3">
                <p className="text-sm">{dish}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default PopularDishes;