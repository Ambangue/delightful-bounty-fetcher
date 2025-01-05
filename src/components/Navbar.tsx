import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white/95 backdrop-blur-sm fixed w-full z-50 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="font-display text-2xl text-buntu-primary font-bold">
            Buntudelice
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            <NavLink to="/">Accueil</NavLink>
            <NavLink to="/restaurants">Restaurants</NavLink>
            <NavLink to="#a-propos">À propos</NavLink>
            <NavLink to="#contact">Contact</NavLink>
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
              <MobileNavLink to="#a-propos" onClick={() => setIsOpen(false)}>À propos</MobileNavLink>
              <MobileNavLink to="#contact" onClick={() => setIsOpen(false)}>Contact</MobileNavLink>
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