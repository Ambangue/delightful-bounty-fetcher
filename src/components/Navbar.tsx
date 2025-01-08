import { Menu, X, LogOut } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  // Vérifier l'état de l'authentification
  supabase.auth.onAuthStateChange((event, session) => {
    setUser(session?.user || null);
  });

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      toast.success("Déconnexion réussie");
      navigate("/");
    } catch (error) {
      toast.error("Erreur lors de la déconnexion");
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
            <NavLink to="/">Accueil</NavLink>
            <NavLink to="/restaurants">Restaurants</NavLink>
            {user ? (
              <>
                <NavLink to="/orders">Mes commandes</NavLink>
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
                  <Button variant="outline">Connexion</Button>
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
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col space-y-4">
              <MobileNavLink to="/" onClick={() => setIsOpen(false)}>Accueil</MobileNavLink>
              <MobileNavLink to="/restaurants" onClick={() => setIsOpen(false)}>Restaurants</MobileNavLink>
              {user ? (
                <>
                  <MobileNavLink to="/orders" onClick={() => setIsOpen(false)}>Mes commandes</MobileNavLink>
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
                    <Button variant="outline" className="w-full">Connexion</Button>
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

const NavLink = ({ to, children }: { to: string; children: React.ReactNode }) => (
  <Link
    to={to}
    className="text-buntu-secondary hover:text-buntu-primary transition-colors font-medium"
  >
    {children}
  </Link>
);

const MobileNavLink = ({ 
  to, 
  children, 
  onClick 
}: { 
  to: string; 
  children: React.ReactNode;
  onClick: () => void;
}) => (
  <Link
    to={to}
    className="text-buntu-secondary hover:text-buntu-primary transition-colors font-medium block px-4"
    onClick={onClick}
  >
    {children}
  </Link>
);

export default Navbar;