const PrivacyPolicy = () => {
  return (
    <div className="mx-auto mb-24 h-full w-full max-w-5xl flex-col items-center justify-center px-8">
      <div className="hero mt-8">
        <div className="hero-content text-center">
          <h1 className="mb-1 text-4xl font-bold">Privacy Policy</h1>
        </div>
      </div>

      <div className="content mt-6 space-y-4 text-left">
        <h2 className="text-2xl font-semibold">1. Introduction</h2>
        <p>
          Olympliance values your privacy. This Privacy Policy outlines the
          information we collect, how we use it, and the steps we take to
          protect your data. By using our website, you agree to the collection
          and use of the according information.
        </p>

        <h2 className="text-2xl font-semibold">2. Information We Collect</h2>
        <p>
          We collect personal information such as:
          <ul className="ml-6 list-disc">
            <li>Account-related information (e.g., username, profile data)</li>
            <li>Usage data (e.g., activity on the site, browser type)</li>
          </ul>
        </p>

        <h2 className="text-2xl font-semibold">
          3. How We Use Your Information
        </h2>
        <p>
          We use the information we collect for the following purposes:
          <ul className="ml-6 list-disc">
            <li>To personalize the services on our site</li>
            <li>
              To improve the functionality and user experience of our platform
            </li>
            <li>For security purposes, including account protection</li>
          </ul>
        </p>

        <h2 className="text-2xl font-semibold">
          4. How We Protect Your Information
        </h2>
        <p>
          We use reasonable security measures to protect your personal data.
          However, no method of transmission over the internet or electronic
          storage is 100% secure, so we cannot guarantee absolute security.
        </p>

        <h2 className="text-2xl font-semibold">5. Sharing of Information</h2>
        <p>
          We do not share your personal data with third parties except in the
          following cases:
          <ul className="ml-6 list-disc">
            <li>If required by law or legal process</li>
            <li>
              If we believe that such action is necessary to protect the safety
              or rights of our users
            </li>
            <li>
              If we engage third-party service providers (e.g., for
              authentication, hosting) who are bound by privacy agreements to
              handle your data responsibly
            </li>
          </ul>
        </p>

        <h2 className="text-2xl font-semibold">6. Cookies</h2>
        <p>
          Our website uses cookies to improve your experience. These small
          files, stored on your device, help us remember your preferences and
          enhance our services. You can manage cookie settings through your
          browser. Please note that cookies are primarily used for
          authentication and require cross-site permissions. If you've enabled
          “Prevent Cross-Site Tracking” on iOS devices, logging in may not be
          possible.
        </p>

        <h2 className="text-2xl font-semibold">
          7. Changes to This Privacy Policy
        </h2>
        <p>
          Olympliance reserves the right to update this Privacy Policy. Any
          changes will be posted on this page, and we encourage you to review it
          periodically. Continued use of the site after any updates will
          constitute your acceptance of the revised policy.
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
