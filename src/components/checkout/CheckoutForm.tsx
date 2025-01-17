import { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export const CheckoutForm = () => {
  const { state, clearCart } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    deliveryAddress: "",
    deliveryInstructions: "",
    paymentMethod: "card",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast.error("Veuillez vous connecter pour commander");
        navigate("/auth");
        return;
      }

      const totalAmount = state.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );

      // Créer la commande
      const { data: order, error: orderError } = await supabase
        .from("orders")
        .insert({
          user_id: user.id,
          restaurant_id: state.restaurantId,
          total_amount: totalAmount,
          delivery_address: formData.deliveryAddress,
          delivery_instructions: formData.deliveryInstructions,
          payment_method: formData.paymentMethod,
          status: "pending",
          payment_status: "pending",
        })
        .select()
        .single();

      if (orderError) throw orderError;

      // Créer les éléments de la commande
      const orderItems = state.items.map((item) => ({
        order_id: order.id,
        item_name: item.name,
        quantity: item.quantity,
        price: item.price,
      }));

      const { error: itemsError } = await supabase
        .from("order_items")
        .insert(orderItems);

      if (itemsError) throw itemsError;

      toast.success("Commande créée avec succès");
      clearCart();
      navigate(`/orders/${order.id}`);
    } catch (error) {
      console.error("Erreur lors de la création de la commande:", error);
      toast.error("Erreur lors de la création de la commande");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6 bg-white rounded-lg shadow-lg p-6"
      onSubmit={handleSubmit}
    >
      <div className="space-y-2">
        <Label htmlFor="deliveryAddress">Adresse de livraison</Label>
        <Input
          id="deliveryAddress"
          required
          value={formData.deliveryAddress}
          onChange={(e) =>
            setFormData({ ...formData, deliveryAddress: e.target.value })
          }
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="deliveryInstructions">Instructions de livraison</Label>
        <Textarea
          id="deliveryInstructions"
          value={formData.deliveryInstructions}
          onChange={(e) =>
            setFormData({ ...formData, deliveryInstructions: e.target.value })
          }
          placeholder="Instructions spéciales pour le livreur..."
        />
      </div>

      <div className="space-y-2">
        <Label>Mode de paiement</Label>
        <div className="grid grid-cols-2 gap-4">
          <Button
            type="button"
            variant={formData.paymentMethod === "card" ? "default" : "outline"}
            onClick={() => setFormData({ ...formData, paymentMethod: "card" })}
          >
            Carte bancaire
          </Button>
          <Button
            type="button"
            variant={formData.paymentMethod === "cash" ? "default" : "outline"}
            onClick={() => setFormData({ ...formData, paymentMethod: "cash" })}
          >
            Espèces
          </Button>
        </div>
      </div>

      <Button
        type="submit"
        className="w-full bg-buntu-primary hover:bg-buntu-secondary"
        disabled={loading}
      >
        {loading ? "Traitement en cours..." : "Confirmer la commande"}
      </Button>
    </motion.form>
  );
};