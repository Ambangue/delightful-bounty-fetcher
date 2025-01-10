import { Menu, X, LogOut, User, ShoppingBag, Home } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState<any>(null);
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user || null);
      if (session?.user) {
        fetchUserRole(session.user.id);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null);
      if (session?.user) {
        fetchUserRole(session.user.id);
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
        .maybeSingle();

      if (error) throw error;
      setUserRole(data?.role || 'user');
    } catch (error) {
      console.error('Error fetching user role:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      toast.success("Déconnexion réussie");
      navigate("/");
    } catch (error) {
      toast.error("Erreur lors de la déconnexion");
    }
  };

  const getDashboardLink = () => {
    switch (userRole) {
      case 'admin':
        return '/admin';
      case 'restaurant':
        return '/restaurant-dashboard';
      case 'delivery':
        return '/delivery';
      default:
        return null;
    }
  };

  return (
    <nav className="bg-white/95 backdrop-blur-sm fixed w-full z-50 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="font-display text-2xl text-buntu-primary font-bold">
            Buntudelice
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink to="/" active={location.pathname === "/"}>
              <Home className="w-4 h-4 mr-2" />
              Accueil
            </NavLink>
            <NavLink to="/restaurants" active={location.pathname === "/restaurants"}>
              <ShoppingBag className="w-4 h-4 mr-2" />
              Restaurants
            </NavLink>
            {user ? (
              <>
                {getDashboardLink() && (
                  <NavLink to={getDashboardLink()!} active={location.pathname.includes(getDashboardLink()!)}>
                    Tableau de bord
                  </NavLink>
                )}
                <NavLink to="/orders" active={location.pathname === "/orders"}>
                  Mes commandes
                </NavLink>
                <Button 
                  variant="ghost" 
                  className="flex items-center gap-2"
                  onClick={handleLogout}
                >
                  <LogOut className="w-4 h-4" />
                  Déconnexion
                </Button>
              </>
            ) : (
              <>
                <Link to="/auth">
                  <Button variant="outline" className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Connexion
                  </Button>
                </Link>
                <Link to="/auth?signup=true">
                  <Button className="bg-buntu-primary hover:bg-buntu-secondary text-white">
                    Inscription
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col space-y-4">
              <MobileNavLink 
                to="/" 
                onClick={() => setIsOpen(false)}
                active={location.pathname === "/"}
              >
                <Home className="w-4 h-4 mr-2" />
                Accueil
              </MobileNavLink>
              <MobileNavLink 
                to="/restaurants" 
                onClick={() => setIsOpen(false)}
                active={location.pathname === "/restaurants"}
              >
                <ShoppingBag className="w-4 h-4 mr-2" />
                Restaurants
              </MobileNavLink>
              {user ? (
                <>
                  {getDashboardLink() && (
                    <MobileNavLink 
                      to={getDashboardLink()!} 
                      onClick={() => setIsOpen(false)}
                      active={location.pathname.includes(getDashboardLink()!)}
                    >
                      Tableau de bord
                    </MobileNavLink>
                  )}
                  <MobileNavLink 
                    to="/orders" 
                    onClick={() => setIsOpen(false)}
                    active={location.pathname === "/orders"}
                  >
                    Mes commandes
                  </MobileNavLink>
                  <Button 
                    variant="ghost" 
                    className="flex items-center gap-2 w-full justify-start px-4"
                    onClick={() => {
                      handleLogout();
                      setIsOpen(false);
                    }}
                  >
                    <LogOut className="w-4 h-4" />
                    Déconnexion
                  </Button>
                </>
              ) : (
                <>
                  <Link to="/auth" className="px-4" onClick={() => setIsOpen(false)}>
                    <Button variant="outline" className="w-full flex items-center gap-2">
                      <User className="w-4 h-4" />
                      Connexion
                    </Button>
                  </Link>
                  <Link to="/auth?signup=true" className="px-4" onClick={() => setIsOpen(false)}>
                    <Button className="w-full bg-buntu-primary hover:bg-buntu-secondary text-white">
                      Inscription
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

interface NavLinkProps {
  to: string;
  children: React.ReactNode;
  active?: boolean;
}

const NavLink = ({ to, children, active }: NavLinkProps) => (
  <Link
    to={to}
    className={`text-buntu-secondary hover:text-buntu-primary transition-colors font-medium flex items-center ${
      active ? 'text-buntu-primary' : ''
    }`}
  >
    {children}
  </Link>
);

interface MobileNavLinkProps extends NavLinkProps {
  onClick: () => void;
}

const MobileNavLink = ({ 
  to, 
  children, 
  onClick,
  active
}: MobileNavLinkProps) => (
  <Link
    to={to}
    className={`text-buntu-secondary hover:text-buntu-primary transition-colors font-medium block px-4 flex items-center ${
      active ? 'text-buntu-primary' : ''
    }`}
    onClick={onClick}
  >
    {children}
  </Link>
);

export default Navbar;