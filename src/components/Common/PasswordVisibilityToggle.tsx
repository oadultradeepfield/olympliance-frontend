import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

interface PasswordVisibilityToggleProps {
  showPassword: boolean;
  onToggle: () => void;
}

const PasswordVisibilityToggle: React.FC<PasswordVisibilityToggleProps> = ({
  showPassword,
  onToggle,
}) => (
  <button
    type="button"
    onClick={onToggle}
    className="text-base-content-200 absolute right-2 top-1/2 -translate-y-1/2 hover:text-secondary focus:outline-none"
  >
    {showPassword ? (
      <EyeSlashIcon className="h-5 w-5" />
    ) : (
      <EyeIcon className="h-5 w-5" />
    )}
  </button>
);

export default PasswordVisibilityToggle;
