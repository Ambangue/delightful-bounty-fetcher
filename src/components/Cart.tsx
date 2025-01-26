import { ShoppingCart } from "lucide-react";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { useCart } from "@/contexts/CartContext";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Cart = () => {
  const { state, removeFromCart, updateQuantity, clearCart } = useCart();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const total = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = async () => {
    if (state.items.length === 0) {
      toast.error("Votre panier est vide");
      return;
    }

    setIsLoading(true);

    try {
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      
      if (authError || !user) {
        toast.error("Veuillez vous connecter pour commander");
        navigate("/auth");
        return;
      }

      // Create order
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({
          user_id: user.id,
          restaurant_id: state.restaurantId,
          total_amount: total,
          status: 'pending',
          payment_status: 'pending',
          payment_method: 'cash',
          delivery_address: '',
          delivery_instructions: '',
          special_requests: {},
          estimated_preparation_time: 30
        })
        .select()
        .single();

      if (orderError) {
        throw orderError;
      }

      // Create order items
      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(
          state.items.map(item => ({
            order_id: order.id,
            item_name: item.name,
            quantity: item.quantity,
            price: item.price
          }))
        );

      if (itemsError) {
        // Rollback order if items creation fails
        await supabase.from('orders').delete().eq('id', order.id);
        throw itemsError;
      }

      clearCart();
      toast.success("Commande créée avec succès!");
      navigate(`/order/${order.id}`);

    } catch (error) {
      console.error('Erreur:', error);
      toast.error("Une erreur est survenue lors de la création de la commande");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button 
          variant="outline" 
          size="icon"
          className="fixed bottom-4 right-4 h-16 w-16 rounded-full shadow-lg bg-buntu-primary hover:bg-buntu-secondary text-white"
        >
          <ShoppingCart className="h-6 w-6" />
          {state.items.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full h-6 w-6 flex items-center justify-center text-sm">
              {state.items.length}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>Votre panier</SheetTitle>
        </SheetHeader>
        <div className="mt-8">
          {state.items.length === 0 ? (
            <p className="text-center text-gray-500">Votre panier est vide</p>
          ) : (
            <div className="space-y-4">
              {state.items.map((item) => (
                <div key={item.id} className="flex items-center justify-between border-b pb-4">
                  <div>
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-sm text-gray-500">{item.price * item.quantity} FCFA</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                    >
                      -
                    </Button>
                    <span>{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      +
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeFromCart(item.id)}
                    >
                      ×
                    </Button>
                  </div>
                </div>
              ))}
              <div className="pt-4">
                <div className="flex justify-between font-medium">
                  <span>Total</span>
                  <span>{total} FCFA</span>
                </div>
                <Button 
                  className="w-full mt-4 bg-buntu-primary hover:bg-buntu-secondary"
                  onClick={handleCheckout}
                  disabled={isLoading || state.items.length === 0}
                >
                  {isLoading ? "Traitement..." : "Commander"}
                </Button>
              </div>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Cart;