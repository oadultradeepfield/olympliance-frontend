import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  return (
    <footer className="text-base-content-100 footer footer-center bg-base-200 p-7">
      <aside>
        <div className="-mb-2 text-base font-bold">Olympliance</div>
        <div className="font-bold">CVWO Assignment AY2024/25</div>
        <div>Copyright © {new Date().getFullYear()} - All rights reserved</div>
        <div className="space-x-2">
          <Link to="/terms-of-service" className="link-hover link">
            Terms of Service
          </Link>
          <span>{"•"}</span>
          <Link to="/privacy-policy" className="link-hover link">
            Privacy Policy
          </Link>
        </div>
      </aside>
    </footer>
  );
};

export default Footer;
