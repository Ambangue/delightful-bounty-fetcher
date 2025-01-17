import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { ShoppingBag, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export const CartSummary = () => {
  const { state } = useCart();
  const navigate = useNavigate();

  const totalAmount = state.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    if (state.items.length === 0) {
      toast.error("Votre panier est vide");
      return;
    }
    navigate("/checkout");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-lg p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold">Résumé du panier</h3>
        <ShoppingBag className="text-buntu-primary" />
      </div>

      <div className="space-y-4 mb-6">
        {state.items.map((item) => (
          <div key={item.id} className="flex justify-between items-center">
            <span>{item.name}</span>
            <span className="text-gray-600">
              {item.quantity} x {(item.price / 100).toFixed(2)} €
            </span>
          </div>
        ))}
      </div>

      <div className="border-t pt-4">
        <div className="flex justify-between items-center mb-6">
          <span className="font-semibold">Total</span>
          <span className="text-xl font-bold text-buntu-primary">
            {(totalAmount / 100).toFixed(2)} €
          </span>
        </div>

        <Button
          onClick={handleCheckout}
          className="w-full bg-buntu-primary hover:bg-buntu-secondary text-white"
        >
          Passer à la caisse
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </motion.div>
  );
};