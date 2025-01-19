// import FoodDisplay from "../components/FoodDisplay"
import { useState, useEffect } from "react";
import Header from "../components/Header";
import Menu from "../pages/Menu";
import Mobile from "../pages/Mobile";
import Contact from "../pages/Contact";


const Home = () => {

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 750);
    };
    checkScreenSize();

    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return (
    
    <div>
      <Header />
      {/* <FoodDisplay/> */}
      {isMobile && (
        <>
          <Menu />
          <Mobile />
          <div className="mt-[100px]"></div>
          <Contact />
        </>
      )}
    </div>
  )
}

export default Home
