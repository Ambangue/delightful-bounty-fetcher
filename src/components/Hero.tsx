const Hero = () => {
  return (
    <section id="accueil" className="hero-section min-h-screen flex items-center justify-center text-white">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-5xl md:text-7xl font-display font-bold mb-6">
          Buntudelice
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
          Découvrez l'authenticité de la cuisine africaine, un voyage gustatif unique
        </p>
        <a
          href="#contact"
          className="bg-buntu-primary hover:bg-buntu-secondary transition-colors text-white font-semibold px-8 py-3 rounded-lg inline-block"
        >
          Réserver maintenant
        </a>
      </div>
    </section>
  );
};

export default Hero;