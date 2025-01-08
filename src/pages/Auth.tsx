import { Auth as SupabaseAuth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";

const Auth = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isSignUp = searchParams.get("signup") === "true";

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN") {
        toast.success("Connexion réussie !");
        navigate("/restaurants");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  return (
    <>
      <Navbar />
      <div className="min-h-screen pt-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto bg-white rounded-lg shadow p-8">
            <h1 className="text-2xl font-bold text-center mb-6">
              {isSignUp ? "Créer un compte" : "Se connecter"}
            </h1>
            <SupabaseAuth
              supabaseClient={supabase}
              appearance={{
                theme: ThemeSupa,
                variables: {
                  default: {
                    colors: {
                      brand: '#E8590C',
                      brandAccent: '#D9480F',
                    },
                  },
                },
              }}
              providers={[]}
              view={isSignUp ? "sign_up" : "sign_in"}
              localization={{
                variables: {
                  sign_in: {
                    email_label: 'Email',
                    password_label: 'Mot de passe',
                    button_label: 'Se connecter',
                  },
                  sign_up: {
                    email_label: 'Email',
                    password_label: 'Mot de passe',
                    button_label: 'S\'inscrire',
                  },
                },
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Auth;