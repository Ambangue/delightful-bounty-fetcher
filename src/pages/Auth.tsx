import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Auth as SupabaseAuth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import { toast } from "sonner";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Database } from "@/integrations/supabase/types";

type UserRole = Database["public"]["Enums"]["user_role"];

const Auth = () => {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<UserRole>("user");
  const [isSignUp, setIsSignUp] = useState(false);

  useEffect(() => {
    // Check if user is already authenticated
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        handleRedirection(session.user.id);
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event: string, session) => {
      if (event === 'SIGNED_IN' && session?.user) {
        handleRedirection(session.user.id);
      } else if (event === 'SIGNED_UP' && session?.user) {
        // Create user role after signup
        const { error: roleError } = await supabase
          .from('user_roles')
          .insert({
            user_id: session.user.id,
            role: selectedRole
          });

        if (roleError) {
          toast.error("Erreur lors de la création du rôle");
          return;
        }

        handleRedirection(session.user.id);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate, selectedRole]);

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
          navigate('/restaurant');
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
        <div className="max-w-md mx-auto">
          <Card className="p-6 mb-4">
            <div className="flex items-center justify-center mb-4">
              <button 
                className={`px-4 py-2 ${!isSignUp ? 'bg-primary text-white' : 'bg-gray-100'} rounded-l-lg`}
                onClick={() => setIsSignUp(false)}
              >
                Connexion
              </button>
              <button 
                className={`px-4 py-2 ${isSignUp ? 'bg-primary text-white' : 'bg-gray-100'} rounded-r-lg`}
                onClick={() => setIsSignUp(true)}
              >
                Inscription
              </button>
            </div>

            {isSignUp && (
              <div className="mb-6">
                <Label className="text-base font-semibold mb-4 block">Choisissez votre rôle :</Label>
                <RadioGroup 
                  defaultValue="user" 
                  onValueChange={(value) => setSelectedRole(value as UserRole)}
                  className="flex flex-col space-y-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="user" id="user" />
                    <Label htmlFor="user">Utilisateur</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="restaurant" id="restaurant" />
                    <Label htmlFor="restaurant">Restaurant</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="delivery" id="delivery" />
                    <Label htmlFor="delivery">Livreur</Label>
                  </div>
                </RadioGroup>
              </div>
            )}

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
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Auth;