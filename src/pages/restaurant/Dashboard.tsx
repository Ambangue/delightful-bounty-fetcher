import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  ShoppingBag, 
  DollarSign, 
  Clock,
  ThumbsUp
} from "lucide-react";
import RestaurantLayout from "@/components/layouts/RestaurantLayout";

const RestaurantDashboard = () => {
  const [stats, setStats] = useState({
    orders: 0,
    revenue: 0,
    avgPreparationTime: 0,
    rating: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      const { data: orders } = await supabase
        .from('orders')
        .select('*')
        .eq('restaurant_id', 'current_restaurant_id'); // To be implemented with actual restaurant ID

      setStats({
        orders: orders?.length || 0,
        revenue: orders?.reduce((acc, order) => acc + order.total_amount, 0) || 0,
        avgPreparationTime: 0, // To be implemented
        rating: 0 // To be implemented
      });
    };

    fetchStats();
  }, []);

  return (
    <RestaurantLayout>
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">Tableau de bord restaurant</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Commandes</CardTitle>
              <ShoppingBag className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.orders}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Revenus</CardTitle>
              <DollarSign className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.revenue / 100}€</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Temps moyen de préparation</CardTitle>
              <Clock className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.avgPreparationTime} min</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Note moyenne</CardTitle>
              <ThumbsUp className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.rating}/5</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </RestaurantLayout>
  );
};

export default RestaurantDashboard;