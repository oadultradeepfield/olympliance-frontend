import { useState } from "react";
import { InformationCircleIcon, XMarkIcon } from "@heroicons/react/24/outline";

const CookieAlert = () => {
  const [isVisible, setIsVisible] = useState(true);

  const handleDismiss = () => {
    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div
      role="alert"
      className="mx-auto mb-6 w-96 rounded-xl border-2 border-base-content/15 bg-base-100 p-2"
    >
      <div className="flex items-start space-x-2">
        <InformationCircleIcon className="h-5 w-5 flex-shrink-0 text-primary" />
        <p className="text-sm text-base-content/75">
          We use cross-site cookies. Safari users, please disable 'Prevent
          Cross-Site Tracking' in settings to securely login.
        </p>

        <div className="flex items-center justify-between px-1">
          <button
            className="rounded-full p-1 hover:bg-base-200"
            onClick={handleDismiss}
          >
            <XMarkIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieAlert;
