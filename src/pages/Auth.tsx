import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Auth as SupabaseAuth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";
import { Database } from "@/integrations/supabase/types";
import RoleSelector from "@/components/auth/RoleSelector";
import { createUserRole, getUserRole, handleRoleBasedRedirection } from "@/utils/roleManagement";
import { AuthError } from "@supabase/supabase-js";

type UserRole = Database["public"]["Enums"]["user_role"];

const Auth = () => {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<UserRole>("user");
  const [isSignUp, setIsSignUp] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        try {
          const role = await getUserRole(session.user.id);
          handleRoleBasedRedirection(role, navigate);
        } catch (error) {
          console.error('Error checking session:', error);
        }
      }
    };

    checkSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event: string, session) => {
      if (!session?.user) return;

      try {
        if (event === 'SIGNED_IN') {
          const role = await getUserRole(session.user.id);
          handleRoleBasedRedirection(role, navigate);
        } else if (event === 'SIGNED_UP') {
          await createUserRole(session.user.id, selectedRole);
          handleRoleBasedRedirection(selectedRole, navigate);
        }
      } catch (error) {
        if (error instanceof AuthError) {
          switch (error.message) {
            case 'User already registered':
              toast.error("Cette adresse email est déjà utilisée. Veuillez vous connecter.");
              break;
            default:
              toast.error("Une erreur est survenue lors de l'authentification");
          }
        } else {
          console.error('Auth state change error:', error);
          toast.error("Une erreur est survenue");
        }
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate, selectedRole]);

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
              <RoleSelector onRoleChange={setSelectedRole} defaultRole={selectedRole} />
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