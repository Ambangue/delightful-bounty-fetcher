import { Phone, Mail, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer id="contact" className="bg-buntu-secondary text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-2xl font-display font-bold mb-4">Buntudelice</h3>
            <p className="mb-4">
              Découvrez l'authenticité de la cuisine africaine dans un cadre chaleureux et convivial.
            </p>
          </div>
          
          <div>
            <h4 className="text-xl font-display font-bold mb-4">Contact</h4>
            <div className="space-y-2">
              <p className="flex items-center">
                <Phone size={20} className="mr-2" />
                +33 1 23 45 67 89
              </p>
              <p className="flex items-center">
                <Mail size={20} className="mr-2" />
                contact@buntudelice.fr
              </p>
              <p className="flex items-center">
                <MapPin size={20} className="mr-2" />
                123 Rue de la Gastronomie, Paris
              </p>
            </div>
          </div>
          
          <div>
            <h4 className="text-xl font-display font-bold mb-4">Horaires</h4>
            <p>Lundi - Vendredi: 11h30 - 22h30</p>
            <p>Samedi - Dimanche: 12h00 - 23h00</p>
          </div>
        </div>
        
        <div className="border-t border-white/20 mt-8 pt-8 text-center">
          <p>&copy; {new Date().getFullYear()} Buntudelice. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;