/* eslint-disable react/prop-types */
import { NavLink, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { useContext } from "react";
import { StoreContext } from "../context/StoreContext";

const Navbar = ({ setShowLogin }) => {
  const navigate = useNavigate();
  const { getTotalCartAmount, token, setToken } = useContext(StoreContext);

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  };

  return (
    <div className="py-[20px] px-0 flex justify-between items-center">
      <p
        onClick={() => navigate("/")}
        className="cursor-pointer text-orange-600 text-2xl font-bold w-[150px] max-1050:w-[140px] max-900:w-[120px] max-750:[100px] "
      >
        MithoMitho
      </p>
      <ul className="list-none flex gap-5 text-[#49557e] text-lg max-900:gap-[10px]  max-900:text-[15px] max-750:hidden  ">
        <li className="cursor-pointer">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "text-orange-600 font-bold" : "text-[#49557e]"
            }
          >
            Home
          </NavLink>
        </li>
        <li className="cursor-pointer">
          <NavLink
            to="/menu"
            className={({ isActive }) =>
              isActive ? "text-orange-600 font-bold" : "text-[#49557e]"
            }
          >
            Menu
          </NavLink>
        </li>
        <li className="cursor-pointer">
          <NavLink
            to="/mobile-app"
            className={({ isActive }) =>
              isActive ? "text-orange-600 font-bold" : "text-[#49557e]"
            }
          >
            Mobile-App
          </NavLink>
        </li>
        <li className="cursor-pointer">
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive ? "text-orange-600 font-bold" : "text-[#49557e]"
            }
          >
            Contact Us
          </NavLink>
        </li>
      </ul>
      <div className="flex items-center gap-10 max-1050:gap-[30px] max-900:gap-5 max-480:pl-5 ">
        {/* <img
          className="max-1050:w-[22px] max-900:w-5 "
          src={assets.search_icon}
          alt=""
        /> */}
        <div className="relative">
          <img
            className="cursor-pointer"
            onClick={() => navigate("/cart")}
            src={assets.basket_icon}
            alt=""
          />
          <div
            className={
              getTotalCartAmount() === 0
                ? ""
                : "absolute min-w-2.5 min-h-2.5 bg-[tomato] rounded-md top-[-8px] right-[-5px]"
            }
          ></div>
        </div>
        {!token ? (
          <button
            onClick={() => setShowLogin(true)}
            className="bg-transparent text-[16px] text-[#49557e] border-[1px] border-solid border-[tomato] py-2.5 px-7 rounded-full cursor-pointer hover:bg-[#fff4f2] transition max-1050:py-2 max-1050:px-[25px] max-900:py-[7px] max-900:px-5 max-900:text-[15px] max-480:text-[12px] "
          >
            Sign in
          </button>
        ) : (
          <div className="relative group ">
            <img
              className="cursor-pointer"
              src={assets.profile_icon}
              alt="logged-in-icon"
            />
            <ul className="absolute hidden right-0 z-10 w-[120px] group-hover:flex group-hover:flex-col group-hover:gap-2.5 group-hover:bg-[#fff2ef] group-hover:py-3 group-hover:px-[15px] group-hover:rounded group-hover:border-[1px] group-hover:border-solid group-hover:border-[tomato] group-hover:outline-[2px] group-hover:outline-white ">
              <li onClick={()=>navigate('/my-orders')} className="cursor-pointer flex items-center gap-2.5 hover:text-[tomato] ">
                <img className="w-5" src={assets.bag_icon} alt="" />
                <p>Orders</p>
              </li>
              <hr />
              <li
                onClick={logout}
                className="cursor-pointer flex items-center gap-2.5 hover:text-[tomato] "
              >
                <img className="w-5" src={assets.logout_icon} alt="" />
                <p>Logout</p>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
