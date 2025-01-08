import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { 
  LayoutDashboard, 
  Users, 
  Store, 
  Truck,
  Settings,
  LogOut
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const AdminLayout = ({ children }: { children: ReactNode }) => {
  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast.success("Déconnexion réussie");
  };

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r">
        <div className="h-full px-3 py-4 flex flex-col">
          <div className="mb-8">
            <Link to="/" className="text-2xl font-bold text-buntu-primary">
              Buntudelice
            </Link>
          </div>
          
          <nav className="flex-1 space-y-2">
            <Link to="/admin">
              <Button variant="ghost" className="w-full justify-start">
                <LayoutDashboard className="mr-2 h-4 w-4" />
                Tableau de bord
              </Button>
            </Link>
            <Link to="/admin/users">
              <Button variant="ghost" className="w-full justify-start">
                <Users className="mr-2 h-4 w-4" />
                Utilisateurs
              </Button>
            </Link>
            <Link to="/admin/restaurants">
              <Button variant="ghost" className="w-full justify-start">
                <Store className="mr-2 h-4 w-4" />
                Restaurants
              </Button>
            </Link>
            <Link to="/admin/delivery">
              <Button variant="ghost" className="w-full justify-start">
                <Truck className="mr-2 h-4 w-4" />
                Livraisons
              </Button>
            </Link>
            <Link to="/admin/settings">
              <Button variant="ghost" className="w-full justify-start">
                <Settings className="mr-2 h-4 w-4" />
                Paramètres
              </Button>
            </Link>
          </nav>

          <Button 
            variant="ghost" 
            className="mt-auto w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50"
            onClick={handleLogout}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Déconnexion
          </Button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 bg-gray-50">
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;