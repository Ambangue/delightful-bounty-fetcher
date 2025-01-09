import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { CartProvider } from "./contexts/CartContext";
import Index from "./pages/Index";
import Restaurants from "./pages/Restaurants";
import RestaurantDetail from "./pages/RestaurantDetail";
import OrderTracking from "./pages/OrderTracking";
import Auth from "./pages/Auth";
import Cart from "./components/Cart";
import { useEffect, useState } from "react";
import { supabase } from "./integrations/supabase/client";
import React from 'react';
import { toast } from "sonner";

// Admin routes
import AdminDashboard from "./pages/admin/Dashboard";
// Restaurant routes
import RestaurantDashboard from "./pages/restaurant/Dashboard";
// Delivery routes
import DeliveryDashboard from "./pages/delivery/Dashboard";

const queryClient = new QueryClient();

const PrivateRoute = ({ children, allowedRoles = [] }: { children: React.ReactNode, allowedRoles?: string[] }) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user || null);
      if (session?.user) {
        fetchUserRole(session.user.id);
      } else {
        setLoading(false);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user || null);
      if (session?.user) {
        fetchUserRole(session.user.id);
      } else {
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchUserRole = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', userId)
        .maybeSingle(); // Using maybeSingle instead of single

      if (error) {
        console.error('Error fetching user role:', error);
        toast.error("Erreur lors de la récupération du rôle utilisateur");
        setLoading(false);
        return;
      }

      setUserRole(data?.role || 'user'); // Default to 'user' if no role is found
      setLoading(false);
    } catch (error) {
      console.error('Error in fetchUserRole:', error);
      toast.error("Erreur lors de la récupération du rôle utilisateur");
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Chargement...</div>;
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(userRole || '')) {
    toast.error("Vous n'avez pas les permissions nécessaires pour accéder à cette page");
    return <Navigate to="/" replace />;
  }

  return children;
};

const Root = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <Cart />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/restaurants" element={<Restaurants />} />
            <Route 
              path="/restaurant/:id" 
              element={
                <PrivateRoute>
                  <RestaurantDetail />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/order/:id" 
              element={
                <PrivateRoute>
                  <OrderTracking />
                </PrivateRoute>
              } 
            />

            {/* Admin routes */}
            <Route
              path="/admin"
              element={
                <PrivateRoute allowedRoles={['admin']}>
                  <AdminDashboard />
                </PrivateRoute>
              }
            />

            {/* Restaurant routes */}
            <Route
              path="/restaurant-dashboard"
              element={
                <PrivateRoute allowedRoles={['restaurant']}>
                  <RestaurantDashboard />
                </PrivateRoute>
              }
            />

            {/* Delivery routes */}
            <Route
              path="/delivery"
              element={
                <PrivateRoute allowedRoles={['delivery']}>
                  <DeliveryDashboard />
                </PrivateRoute>
              }
            />
          </Routes>
        </TooltipProvider>
      </CartProvider>
    </QueryClientProvider>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <Root />
    </BrowserRouter>
  );
};

export default App;