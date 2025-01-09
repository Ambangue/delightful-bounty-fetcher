import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Store, Truck, DollarSign } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    users: 0,
    restaurants: 0,
    deliveries: 0,
    revenue: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      // Fetch stats from Supabase
      const { data: users } = await supabase
        .from('user_roles')
        .select('*');

      setStats({
        users: users?.length || 0,
        restaurants: users?.filter(u => u.role === 'restaurant').length || 0,
        deliveries: 0, // À implémenter
        revenue: 0 // À implémenter
      });
    };

    fetchStats();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Tableau de bord administrateur</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Utilisateurs</CardTitle>
            <Users className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.users}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Restaurants</CardTitle>
            <Store className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.restaurants}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Livraisons</CardTitle>
            <Truck className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.deliveries}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Revenus</CardTitle>
            <DollarSign className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.revenue} FCFA</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;