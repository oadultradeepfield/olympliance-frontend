const Footer: React.FC = () => {
  return (
    <footer className="footer footer-center bg-base-200 text-base-content-100 p-7">
      <aside>
        <p className="font-bold text-base -mb-2">Olympliance</p>
        <p className="font-bold">CVWO Assignment AY2024/25</p>
        <p>Copyright © {new Date().getFullYear()} - All right reserved</p>
      </aside>
    </footer>
  );
};

export default Footer;
