import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Database } from "@/integrations/supabase/types";

type UserRole = Database["public"]["Enums"]["user_role"];

interface RoleSelectorProps {
  onRoleChange: (role: UserRole) => void;
  defaultRole?: UserRole;
}

const RoleSelector = ({ onRoleChange, defaultRole = "user" }: RoleSelectorProps) => {
  return (
    <div className="mb-6">
      <Label className="text-base font-semibold mb-4 block">Choisissez votre rôle :</Label>
      <RadioGroup 
        defaultValue={defaultRole}
        onValueChange={(value) => onRoleChange(value as UserRole)}
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
  );
};

export default RoleSelector;