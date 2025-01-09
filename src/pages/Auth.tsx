import { Auth as SupabaseAuth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { useEffect } from "react";
import { toast } from "sonner";

const Auth = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already authenticated
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        handleRedirection(session.user.id);
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session?.user) {
        handleRedirection(session.user.id);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleRedirection = async (userId: string) => {
    try {
      // Fetch user role
      const { data: userRole, error } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', userId)
        .maybeSingle();

      if (error) {
        toast.error("Erreur lors de la récupération du rôle");
        return;
      }

      // Redirect based on role
      switch (userRole?.role) {
        case 'admin':
          navigate('/admin');
          break;
        case 'restaurant':
          navigate('/restaurant-dashboard');
          break;
        case 'delivery':
          navigate('/delivery');
          break;
        default:
          navigate('/'); // Regular users go to home page
          break;
      }
    } catch (error) {
      console.error('Error during redirection:', error);
      toast.error("Erreur lors de la redirection");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 pt-24">
        <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
          <SupabaseAuth
            supabaseClient={supabase}
            appearance={{
              theme: ThemeSupa,
              variables: {
                default: {
                  colors: {
                    brand: "#C17817",
                    brandAccent: "#8B4513",
                  },
                },
              },
            }}
            localization={{
              variables: {
                sign_in: {
                  email_label: "Adresse email",
                  password_label: "Mot de passe",
                  button_label: "Se connecter",
                },
                sign_up: {
                  email_label: "Adresse email",
                  password_label: "Mot de passe",
                  button_label: "S'inscrire",
                },
              },
            }}
            providers={[]}
            redirectTo={`${window.location.origin}/`}
          />
        </div>
      </div>
    </div>
  );
};

export default Auth;