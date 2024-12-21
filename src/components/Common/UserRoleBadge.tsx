import { ShieldCheckIcon, StarIcon } from "@heroicons/react/24/outline";

interface UserRoleBadgeProps {
  roleId: number;
}

const UserRoleBadge: React.FC<UserRoleBadgeProps> = ({ roleId }) => {
  switch (roleId) {
    case 1:
      return (
        <div className="badge badge-secondary items-center text-xs">
          <ShieldCheckIcon className="mr-1 h-3 w-3" /> Moderator
        </div>
      );
    case 2:
      return (
        <div className="badge badge-success items-center text-xs">
          <StarIcon className="mr-1 h-3 w-3" /> Admin
        </div>
      );
    default:
      return null;
  }
};

export default UserRoleBadge;
