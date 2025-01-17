import { motion } from "framer-motion";
import { CartSummary } from "@/components/cart/CartSummary";
import { CheckoutForm } from "@/components/checkout/CheckoutForm";

const Checkout = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container mx-auto px-4 py-8"
    >
      <h1 className="text-3xl font-bold mb-8">Finaliser la commande</h1>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <CheckoutForm />
        </div>
        <div>
          <CartSummary />
        </div>
      </div>
    </motion.div>
  );
};

export default Checkout;