const Footer: React.FC = () => {
  return (
    <footer className="text-base-content-100 footer footer-center bg-base-200 p-7">
      <aside>
        <p className="-mb-2 text-base font-bold">Olympliance</p>
        <p className="font-bold">CVWO Assignment AY2024/25</p>
        <p>Copyright © {new Date().getFullYear()} - All right reserved</p>
      </aside>
    </footer>
  );
};

export default Footer;
