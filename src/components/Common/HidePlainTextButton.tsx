import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

interface HidePlainTextButtonProps {
  size: number;
  showPlainText: boolean;
  setShowPlainText: React.Dispatch<React.SetStateAction<boolean>>;
}

const HidePlainTextButton: React.FC<HidePlainTextButtonProps> = ({
  size,
  showPlainText,
  setShowPlainText,
}) => {
  const toggleShowPlainText = () => {
    setShowPlainText((prev: boolean) => !prev);
  };

  return (
    <div
      className="tooltip"
      data-tip={`${showPlainText ? "Hide Plain Text" : "Show Plain Text"}`}
    >
      <button className="p-2" onClick={toggleShowPlainText}>
        {showPlainText ? (
          <EyeSlashIcon
            className={`h-${size} w-${size} text-base-content hover:text-error`}
          />
        ) : (
          <EyeIcon
            className={`h-${size} w-${size} text-base-content hover:text-success`}
          />
        )}
      </button>
    </div>
  );
};

export default HidePlainTextButton;
