const Services = () => {
  const services = [
    {
      title: "Restaurant",
      description: "Dégustez nos spécialités dans un cadre chaleureux et authentique.",
      image: "/restaurant.jpg"
    },
    {
      title: "Service Traiteur",
      description: "Nous donnons vie à vos événements avec une cuisine raffinée et personnalisée.",
      image: "/traiteur.jpg"
    },
    {
      title: "Cours de Cuisine",
      description: "Apprenez les secrets de la cuisine africaine avec nos chefs experts.",
      image: "/cours.jpg"
    }
  ];

  return (
    <section id="services" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="section-title text-center">Nos Services</h2>
        <div className="grid md:grid-cols-3 gap-8 mt-12">
          {services.map((service, index) => (
            <div 
              key={index}
              className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="h-48 overflow-hidden">
                <img 
                  src={service.image} 
                  alt={service.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="section-subtitle text-xl mb-2">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;