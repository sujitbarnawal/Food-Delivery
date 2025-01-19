import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Mobile from "./pages/Mobile";
import Contact from "./pages/Contact";
import Navbar from "./components/Navbar";
import Cart from "./pages/Cart";
import PlaceOrder from "./pages/PlaceOrder";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import { useState } from "react";
import Login from "./components/Login";
import ResetPassword from './components/ResetPassword'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from "react-toastify";
import Verify from "./pages/Verify";
import Orders from "./pages/Orders"



const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showResetPassword,setShowResetPassword]=useState(false)

  return (
    <>
      {showLogin && !showResetPassword ? <Login setShowLogin={setShowLogin} setShowResetPassword={setShowResetPassword} /> : <></>}
      {showResetPassword?<ResetPassword setShowLogin={setShowLogin} setShowReserPassword={setShowResetPassword} />:<></>}
      
      <Router>
        <ToastContainer/>
        <div className="w-[80%] m-auto ">
          <Navbar setShowLogin={setShowLogin} />
          <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/mobile-app" element={<Mobile />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/cart" element={<Cart />}></Route>
              <Route path="/order" element={<PlaceOrder />} />
              <Route path="/verify" element={<Verify/>}/>
              <Route path="/my-orders" element={<Orders/>} />
          </Routes>
        </div>
      </Router>
      <Footer />
    </>
  );
};

export default App;
