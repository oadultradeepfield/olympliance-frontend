import { Link } from "react-router-dom";

const Terms = () => {
  return (
    <div className="mx-auto mb-24 h-full w-full max-w-5xl flex-col items-center justify-center px-8">
      <div className="hero mt-8">
        <div className="hero-content text-center">
          <h1 className="mb-1 text-4xl font-bold">Terms of Service</h1>
        </div>
      </div>

      <div className="content mt-6 space-y-4 text-left">
        <h2 className="text-2xl font-semibold">1. Acceptance of Terms</h2>
        <p>
          By accessing or using the Olympliance website, you agree to be bound
          by these Terms of Service and any additional guidelines or rules that
          may apply.
        </p>

        <h2 className="text-2xl font-semibold">2. User Accounts</h2>
        <p>
          To access certain features of the site, you must create an account.
          You may sign up using either a username-based authentication or Google
          OAuth. You are responsible for maintaining the confidentiality of your
          account information and for all activities under your account.
        </p>

        <h2 className="text-2xl font-semibold">3. Content</h2>
        <p>
          Users can create, read, update, and delete threads and comments. You
          retain ownership of the content you post, but by posting on the site,
          you grant Olympliance a non-exclusive, royalty-free, and perpetual
          license to use, display, and distribute your content.
        </p>

        <h2 className="text-2xl font-semibold">4. User Conduct</h2>
        <p>
          You agree not to post or share content that is illegal, harmful,
          offensive, or violates the rights of others. Olympliance reserves the
          right to remove any content or suspend accounts that violate these
          terms.
        </p>

        <h2 className="text-2xl font-semibold">5. Privacy</h2>
        <p>
          We collect personal data and any information you provide during
          account creation. For more details, please refer to our{" "}
          <Link to="/privacy-policy">Privacy Policy</Link>.
        </p>

        <h2 className="text-2xl font-semibold">6. Termination</h2>
        <p>
          Olympliance may suspend or terminate your account if you violate these
          Terms of Service. You may also delete your account at any time via the
          account settings.
        </p>

        <h2 className="text-2xl font-semibold">7. Limitation of Liability</h2>
        <p>
          Olympliance is not liable for any damages arising from the use or
          inability to use the website, including but not limited to data loss
          or service interruptions.
        </p>

        <h2 className="text-2xl font-semibold">8. Changes to Terms</h2>
        <p>
          Olympliance reserves the right to update these Terms of Service. Any
          changes will be posted on this page, and continued use of the site
          constitutes acceptance of the updated terms.
        </p>
      </div>
    </div>
  );
};

export default Terms;
