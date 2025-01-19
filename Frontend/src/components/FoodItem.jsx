/* eslint-disable react/prop-types */


import { useContext } from "react";
import { assets } from "../assets/assets";
import { StoreContext } from "../context/StoreContext";

const FoodItem = ({ id, name, price, description, image }) => {
  

  const{cartItems,addToCart,removeFromCart,url}=useContext(StoreContext)

  return (
    <div className="w-full m-auto rounded-[15px] shadow-md shadow-[#00000015] transition-[0.3s] animate-fadeIn ">
      <div className="relative">
        <img
          className="w-full rounded-[15px] rounded-b-none"
          src={url+'/images/'+image}
          alt="foodimage"
        />
        {!cartItems[id] ? (
          <img
            onClick={() => addToCart(id)}
            className="w-[35px] absolute bottom-[15px] right-[15px] cursor-pointer rounded-[50%] "
            src={assets.add_icon_white}
          />
        ) : (
          <div className="absolute bottom-[15px] right-[15px] flex items-center gap-2.5 p-1.5 rounded-[50px] bg-white ">
            <img className="w-[30px] cursor-pointer " onClick={()=>removeFromCart(id)} src={assets.remove_icon_red} alt="" />
            <p>{cartItems[id]}</p>
            <img className="w-[30px] cursor-pointer " onClick={()=>addToCart(id)} src={assets.add_icon_green} alt="" />
          </div>
        )}
      </div>
      <div className="p-5">
        <div className="flex justify-between items-center mb-2.5">
          <p className="text-xl font-[500] ">{name}</p>
          <img className="w-[70px]" src={assets.rating_starts} alt="stars" />
        </div>
        <p className="text-[#676767] text-[12px]">{description}</p>
        <p className="text-[tomato] my-2.5 mx-0 font-[500] text-[22px] ">${price}</p>
      </div>
    </div>
  );
};

export default FoodItem;
