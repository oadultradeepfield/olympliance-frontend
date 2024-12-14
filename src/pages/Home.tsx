import Categories from "../components/Categories";
import Hero from "../components/Hero";

const Home = () => {
  return (
    <div className="mx-auto flex max-w-5xl flex-grow flex-col items-center justify-center px-2">
      <Hero />
      <Categories />
    </div>
  );
};

export default Home;
