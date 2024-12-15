const Footer: React.FC = () => {
  return (
    <footer className="text-base-content-100 footer footer-center bg-base-200 p-7">
      <aside>
        <div className="-mb-2 text-base font-bold">Olympliance</div>
        <div className="font-bold">CVWO Assignment AY2024/25</div>
        <div>Copyright © {new Date().getFullYear()} - All right reserved</div>
      </aside>
    </footer>
  );
};

export default Footer;
