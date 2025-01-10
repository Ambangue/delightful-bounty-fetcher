import { UtensilsCrossed, Truck, ChefHat, Users, Calendar, ShoppingBag, Brain } from "lucide-react";
import { motion } from "framer-motion";
import { Card } from "./ui/card";

const Services = () => {
  const services = [
    {
      title: "Restaurant IA",
      description: "Notre système d'IA personnalise vos recommandations basées sur vos préférences et habitudes alimentaires.",
      icon: Brain,
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e",
      features: ["Recommandations personnalisées", "Analyse des préférences", "Suggestions intelligentes"]
    },
    {
      title: "Livraison Prédictive",
      description: "Algorithme prédictif pour optimiser les temps de livraison et la fraîcheur des plats.",
      icon: Truck,
      image: "https://images.unsplash.com/photo-1487887235947-a955ef187fcc",
      features: ["Estimation précise", "Optimisation des routes", "Suivi en temps réel"]
    },
    {
      title: "Chef Virtuel",
      description: "Explorez nos cours de cuisine interactifs avec réalité augmentée et assistance IA.",
      icon: ChefHat,
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
      features: ["Réalité augmentée", "Assistance IA", "Cours personnalisés"]
    },
    {
      title: "Événements Smart",
      description: "Organisation d'événements avec planification intelligente et gestion automatisée.",
      icon: Users,
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
      features: ["Planification IA", "Gestion automatisée", "Analyse prédictive"]
    },
    {
      title: "Réservations Dynamiques",
      description: "Système de réservation intelligent qui optimise la disponibilité et l'expérience client.",
      icon: Calendar,
      image: "https://images.unsplash.com/photo-1483058712412-4245e9b90334",
      features: ["Optimisation temps réel", "Suggestions horaires", "Gestion intelligente"]
    },
    {
      title: "Click & Collect 2.0",
      description: "Commande intelligente avec préparation optimisée et notification prédictive.",
      icon: ShoppingBag,
      image: "https://images.unsplash.com/photo-1434494878577-86c23bcb06b9",
      features: ["Préparation optimisée", "Notifications smart", "Personnalisation IA"]
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <section id="services" className="py-20 bg-gradient-to-b from-buntu-light to-brand-gray-50">
      <div className="container mx-auto px-4">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-display font-bold text-center text-brand-gray-800 mb-6"
        >
          Services Innovants
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center text-brand-gray-600 mb-12 max-w-2xl mx-auto"
        >
          Découvrez nos services alimentés par l'intelligence artificielle pour une expérience culinaire du futur
        </motion.p>
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.03 }}
              className="h-full"
            >
              <Card className="h-full bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="h-48 overflow-hidden relative group">
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <ul className="text-sm space-y-1">
                        {service.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center">
                            <span className="w-1.5 h-1.5 bg-buntu-primary rounded-full mr-2" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="absolute top-4 right-4 bg-buntu-primary p-2 rounded-full shadow-lg">
                    <service.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-brand-gray-800 mb-2">{service.title}</h3>
                  <p className="text-brand-gray-600 text-sm">{service.description}</p>
                  <button className="mt-4 w-full px-6 py-2 bg-brand-blue-500 text-white rounded-full hover:bg-brand-blue-600 transform hover:-translate-y-1 transition-all duration-300">
                    Découvrir
                  </button>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;