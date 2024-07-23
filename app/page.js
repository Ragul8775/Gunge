import Footer from "@/components/Footer";
import Categories from "../components/Categories";
import Hero from "../components/Hero";
import Intro from "../components/Intro";
import Navbar from "../components/Navbar";
import Signature from "../components/Signature";

const HomePage = () => {
  return (
    <div>
      <Navbar />
      <div className="relative sm:top-14 sm:mb-14">
        <Hero />
        <Intro />
        <Categories />
        <Signature />
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
