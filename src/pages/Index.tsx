import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import About from "@/components/About";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen"
    >
      <Hero />
      
      <motion.div variants={itemVariants} className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Découvrez nos restaurants</h2>
          <p className="text-gray-600 mb-8">
            Une sélection des meilleurs restaurants de la ville, livrés chez vous
          </p>
          <Button 
            onClick={() => navigate("/restaurants")}
            className="bg-buntu-primary hover:bg-buntu-secondary text-white px-6 py-3 rounded-full transition-all transform hover:scale-105"
          >
            Explorer les restaurants
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </motion.div>

      <motion.div variants={itemVariants}>
        <Services />
      </motion.div>

      <motion.div variants={itemVariants}>
        <About />
      </motion.div>

      <motion.div variants={itemVariants}>
        <Footer />
      </motion.div>
    </motion.div>
  );
};

export default Index;