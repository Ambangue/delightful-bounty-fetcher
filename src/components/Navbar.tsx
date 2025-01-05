import { Menu, X } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white/95 backdrop-blur-sm fixed w-full z-50 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          <a href="/" className="font-display text-2xl text-buntu-primary font-bold">
            Buntudelice
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            <NavLink href="#accueil">Accueil</NavLink>
            <NavLink href="#a-propos">À propos</NavLink>
            <NavLink href="#services">Services</NavLink>
            <NavLink href="#galerie">Galerie</NavLink>
            <NavLink href="#contact">Contact</NavLink>
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
              <MobileNavLink href="#accueil" onClick={() => setIsOpen(false)}>Accueil</MobileNavLink>
              <MobileNavLink href="#a-propos" onClick={() => setIsOpen(false)}>À propos</MobileNavLink>
              <MobileNavLink href="#services" onClick={() => setIsOpen(false)}>Services</MobileNavLink>
              <MobileNavLink href="#galerie" onClick={() => setIsOpen(false)}>Galerie</MobileNavLink>
              <MobileNavLink href="#contact" onClick={() => setIsOpen(false)}>Contact</MobileNavLink>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a
    href={href}
    className="text-buntu-secondary hover:text-buntu-primary transition-colors font-medium"
  >
    {children}
  </a>
);

const MobileNavLink = ({ 
  href, 
  children, 
  onClick 
}: { 
  href: string; 
  children: React.ReactNode;
  onClick: () => void;
}) => (
  <a
    href={href}
    className="text-buntu-secondary hover:text-buntu-primary transition-colors font-medium block px-4"
    onClick={onClick}
  >
    {children}
  </a>
);

export default Navbar;