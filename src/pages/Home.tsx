import Categories from "../components/home/Categories";
import Hero from "../components/home/Hero";

const Home: React.FC = () => {
  return (
    <div className="mx-auto flex max-w-5xl flex-grow flex-col items-center justify-center px-2">
      <Hero />
      <Categories />
    </div>
  );
};

export default Home;
