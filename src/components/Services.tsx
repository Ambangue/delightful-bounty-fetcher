import { UtensilsCrossed, Truck, ChefHat, Users, Calendar, ShoppingBag } from "lucide-react";

const Services = () => {
  const services = [
    {
      title: "Restaurant",
      description: "Dégustez nos spécialités dans un cadre chaleureux et authentique.",
      icon: UtensilsCrossed,
      image: "/restaurant.jpg"
    },
    {
      title: "Service Traiteur",
      description: "Nous donnons vie à vos événements avec une cuisine raffinée et personnalisée.",
      icon: Truck,
      image: "/traiteur.jpg"
    },
    {
      title: "Cours de Cuisine",
      description: "Apprenez les secrets de la cuisine africaine avec nos chefs experts.",
      icon: ChefHat,
      image: "/cours.jpg"
    },
    {
      title: "Événements Privés",
      description: "Organisation de repas privés, anniversaires et célébrations.",
      icon: Users,
      image: "/evenements.jpg"
    },
    {
      title: "Réservations",
      description: "Réservez votre table ou planifiez votre événement en quelques clics.",
      icon: Calendar,
      image: "/reservations.jpg"
    },
    {
      title: "Vente à Emporter",
      description: "Commandez vos plats préférés et emportez-les chez vous.",
      icon: ShoppingBag,
      image: "/emporter.jpg"
    }
  ];

  return (
    <section id="services" className="py-20 bg-buntu-light">
      <div className="container mx-auto px-4">
        <h2 className="section-title text-center">Nos Services</h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Découvrez notre large gamme de services pour satisfaire toutes vos envies de cuisine africaine authentique
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {services.map((service, index) => (
            <div 
              key={index}
              className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="h-48 overflow-hidden relative">
                <img 
                  src={service.image} 
                  alt={service.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4 bg-buntu-primary p-2 rounded-full">
                  <service.icon className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="p-6">
                <h3 className="section-subtitle text-xl mb-2">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
                <button className="mt-4 px-6 py-2 bg-buntu-primary text-white rounded-full hover:bg-buntu-secondary transition-colors duration-300">
                  En savoir plus
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;