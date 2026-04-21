import HeroSection from "../components/home/HeroSection";
import Featured from "../components/home/Featured";
import StatsSection from "../components/home/StatsSection";
import BrandMessageSection from "../components/home/BrandMessageSection";
import FaqSection from "../components/home/FaqSection";

const Home = () => {
  return (
    <main>
      <HeroSection />
      <Featured />
      <StatsSection />
      <BrandMessageSection />
      <FaqSection />
    </main>
  );
};

export default Home;
