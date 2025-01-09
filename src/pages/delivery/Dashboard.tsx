import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, Timer, Star, Route } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const DeliveryDashboard = () => {
  const [stats, setStats] = useState({
    deliveries: 0,
    avgTime: 0,
    rating: 0,
    distance: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      // Fetch delivery stats from Supabase
      const { data: deliveries } = await supabase
        .from('delivery_tracking')
        .select('*');

      setStats({
        deliveries: deliveries?.length || 0,
        avgTime: 0, // À implémenter
        rating: 0, // À implémenter
        distance: 0 // À implémenter
      });
    };

    fetchStats();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Tableau de bord livreur</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Livraisons</CardTitle>
            <Package className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.deliveries}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Temps moyen</CardTitle>
            <Timer className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.avgTime} min</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Note moyenne</CardTitle>
            <Star className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.rating}/5</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Distance totale</CardTitle>
            <Route className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.distance} km</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DeliveryDashboard;