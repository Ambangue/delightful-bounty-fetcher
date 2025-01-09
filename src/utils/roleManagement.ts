import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Database } from "@/integrations/supabase/types";

type UserRole = Database["public"]["Enums"]["user_role"];

export const createUserRole = async (userId: string, role: UserRole) => {
  const { error } = await supabase
    .from('user_roles')
    .insert({
      user_id: userId,
      role: role
    });

  if (error) {
    toast.error("Erreur lors de la création du rôle");
    throw error;
  }
};

export const getUserRole = async (userId: string) => {
  const { data: userRole, error } = await supabase
    .from('user_roles')
    .select('role')
    .eq('user_id', userId)
    .maybeSingle();

  if (error) {
    toast.error("Erreur lors de la récupération du rôle");
    throw error;
  }

  return userRole?.role;
};

export const handleRoleBasedRedirection = (role: UserRole | null, navigate: (path: string) => void) => {
  switch (role) {
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
      navigate('/');
      break;
  }
};