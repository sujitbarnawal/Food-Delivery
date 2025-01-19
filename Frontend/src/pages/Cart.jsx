import { useContext } from "react";
import { StoreContext } from "../context/StoreContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { food_list, cartItems, removeFromCart, getTotalCartAmount,url } =
    useContext(StoreContext);
  const navigate = useNavigate();
  return (
    <div className="mt-[100px]">
      <div className="">
        <div className="grid grid-cols-[_1fr,_1.5fr,_1fr,_1fr,_1fr,_0.5fr] items-center text-gray-500 text-[max(1vw,_12px)] ">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr className="my-2.5 mx-0 " />
        {food_list.map((food, index) => {
          if (cartItems[food._id] > 0) {
            return (
              <div key={index}>
                <div className="grid grid-cols-[_1fr,_1.5fr,_1fr,_1fr,_1fr,_0.5fr] items-center text-[max(1vw,_12px)] my-2.5 mx-0 text-black">
                  <img className="w-[50px]" src={url+"/images/"+food.image} alt="food-image" />
                  <p>{food.name}</p>
                  <p>${food.price}</p>
                  <p>{cartItems[food._id]}</p>
                  <p>${food.price * cartItems[food._id]}</p>
                  <p
                    onClick={() => {
                      removeFromCart(food._id);
                    }}
                    className="cursor-pointer"
                  >
                    x
                  </p>
                </div>
                <hr className="my-2.5 mx-0 " />
              </div>
            );
          }
        })}
      </div>
      <div className="mt-20 flex justify-between gap-[max(12vw,_20px)] max-750:flex-col-reverse  ">
        <div className="flex-1 flex flex-col gap-5 ">
          <h2>Cart Totals</h2>
          <div>
            <div className="flex justify-between text-[#555] ">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr className="my-2.5 mx-0 " />
            <div className="flex justify-between text-[#555] ">
              <p>Delivery Fee</p>
              <p>
                ${getTotalCartAmount()>0?3:0}
              </p>
            </div>
            <hr className="my-2.5 mx-0 " />
            <div className="flex justify-between text-[#555] ">
              <b>Total</b>
              <b>
                $
                {getTotalCartAmount() + (getTotalCartAmount()>0?3:0)}
              </b>
            </div>
          </div>
          <button
            onClick={() => navigate("/order")}
            className="border-none text-white bg-[tomato] w-[max(15vw,_200px)] py-[12px] px-0 rounded cursor-pointer "
          >
            Proceed to checkout
          </button>
        </div>
        <div className="flex-1  max-750:justify-start  ">
          <div>
            <p className="text-[#555] ">
              Enter your promo code if you have one
            </p>
            <div className="mt-2.5 flex justify-between items-center bg-[#eaeaea] rounded">
              <input
                className="bg-transparent border-none outline-none pl-2.5 "
                type="text"
                placeholder="promo code"
              />
              <button className="w-[max(10vw,_150px)] py-[12px] px-[5px] bg-black border-none text-white rounded ">
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
