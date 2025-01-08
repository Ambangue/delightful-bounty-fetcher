import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Route, 
  Clock, 
  DollarSign,
  ThumbsUp
} from "lucide-react";
import DeliveryLayout from "@/components/layouts/DeliveryLayout";

const DeliveryDashboard = () => {
  const [stats, setStats] = useState({
    deliveries: 0,
    avgDeliveryTime: 0,
    earnings: 0,
    rating: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      const { data: deliveries } = await supabase
        .from('delivery_tracking')
        .select('*')
        .eq('driver_id', 'current_driver_id'); // To be implemented with actual driver ID

      setStats({
        deliveries: deliveries?.length || 0,
        avgDeliveryTime: 0, // To be implemented
        earnings: 0, // To be implemented
        rating: 0 // To be implemented
      });
    };

    fetchStats();
  }, []);

  return (
    <DeliveryLayout>
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">Tableau de bord livreur</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Livraisons</CardTitle>
              <Route className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.deliveries}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Temps moyen de livraison</CardTitle>
              <Clock className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.avgDeliveryTime} min</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Gains</CardTitle>
              <DollarSign className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.earnings}€</div>
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
    </DeliveryLayout>
  );
};

export default DeliveryDashboard;