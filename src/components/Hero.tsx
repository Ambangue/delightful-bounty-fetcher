const Hero = () => {
  return (
    <section className="hero-section min-h-screen flex items-center justify-center text-white relative">
      <div className="absolute inset-0 bg-gradient-to-r from-brand-blue-900/80 to-brand-orange-900/80" />
      <div className="container mx-auto px-4 text-center relative z-10">
        <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 animate-fade-in">
          Buntudelice
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto animate-fade-in">
          Découvrez l'authenticité de la cuisine africaine, un voyage gustatif unique
        </p>
        <a
          href="#contact"
          className="bg-brand-orange-500 hover:bg-brand-orange-600 transition-colors text-white font-semibold px-8 py-3 rounded-lg inline-block animate-fade-in"
        >
          Réserver maintenant
        </a>
      </div>
    </section>
  );
};

export default Hero;