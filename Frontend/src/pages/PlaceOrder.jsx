/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import { StoreContext } from "../context/StoreContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const PlaceOrder = () => {
  const { getTotalCartAmount, token, food_list, cartItems, url } =
    useContext(StoreContext);
  const navigate = useNavigate()

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (e) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // const placeOrder = async (e) => {
  //   e.preventDefault();
  //   const orderItems = [];
  //   food_list.map((food) => {
  //     if (cartItems[food._id] > 0) {
  //       let itemInfo = food;
  //       itemInfo["quantity"] = cartItems[food._id];
  //       orderItems.push(itemInfo);
  //     }
  //   });
   
    
    
  //   const response = await axios(url + "/api/order/place", {address:data,items:orderItems,amount:(getTotalCartAmount()+3)}, {
  //     headers: { token },
  //   });
  //   if (response.data.success) {
  //     const { session_url } = response.data;
  //     console.log({ session_url });
  //     toast.success("Order placed successfully");
  //     window.location.href = session_url;
  //   } else {
  //     toast.error("Error");
  //   }
  // };

  const placeOrder = async (e) => {
    e.preventDefault();
    
    try {
      // Build the order items array
      const orderItems = [];
      food_list.forEach((food) => {
        if (cartItems[food._id] > 0) {
          let itemInfo = { ...food }; // Clone the food object
          itemInfo["quantity"] = cartItems[food._id];
          orderItems.push(itemInfo);
        }
      });
  
      // Prepare the order data
      const orderData = {
        address: data,
        items: orderItems,
        amount: getTotalCartAmount() + 3, // Include additional charges
      };
  
      // Make the API call
      const response = await axios.post(
        `${url}/api/order/place`,
        orderData,
        {
          headers: { token }, // Add Authorization header
        }
      );
  
      // Handle successful response
      if (response.data.success) {
        const { session_url } = response.data;
        console.log({ session_url });
        toast.success("Order placed successfully");
        window.location.replace(session_url);
      } else {
        toast.error("Error placing the order");
      }
    } 
    catch (error) {
      console.error("Error in placeOrder:", error);
    
      if (error.response) {
        // The server responded with a status outside of the 2xx range
        console.log("Response Data:", error.response.data);
        console.log("Status Code:", error.response.status);
        console.log("Headers:", error.response.headers);
      } else if (error.request) {
        // The request was made, but no response was received
        console.log("Request Data:", error.request);
      } else {
        // Something happened in setting up the request
        console.log("Error Message:", error.message);
      }
    
      toast.error("An error occurred while placing the order. Please try again.");
    }
    
  };

  useEffect(()=>{
    if(!token){
      navigate('/cart')
    }else if(getTotalCartAmount()===0){
      navigate('/cart')
    }
  },[token])
  
  return (
    <form
      onSubmit={placeOrder}
      className="flex items-start justify-between gap-[50px] mt-[100px] max-750:flex-col"
    >
      <div className="w-full max-w-[max(30%,_500px)] ">
        <p className="text-[30px] font-semibold mb-[50px] ">
          Delivery Information
        </p>
        <div className="flex gap-2.5 ">
          <input
            required
            onChange={onChangeHandler}
            name="firstName"
            value={data.firstName}
            className="mb-[15px] w-full p-2.5 border-[1px] border-solid border-[#c5c5c5] rounded outline-[tomato] "
            type="text"
            placeholder="First Name"
          />
          <input
            required
            onChange={onChangeHandler}
            name="lastName"
            value={data.lastName}
            className="mb-[15px] w-full p-2.5 border-[1px] border-solid border-[#c5c5c5] rounded outline-[tomato] "
            type="text"
            placeholder="Last Name"
          />
        </div>
        <input
          required
          onChange={onChangeHandler}
          name="email"
          value={data.email}
          className="mb-[15px] w-full p-2.5 border-[1px] border-solid border-[#c5c5c5] rounded outline-[tomato] "
          type="email"
          placeholder="Email address"
        />
        <input
          required
          onChange={onChangeHandler}
          name="street"
          value={data.street}
          className="mb-[15px] w-full p-2.5 border-[1px] border-solid border-[#c5c5c5] rounded outline-[tomato] "
          type="text"
          placeholder="Street"
        />
        <div className="flex gap-2.5 ">
          <input
            required
            onChange={onChangeHandler}
            name="city"
            value={data.city}
            className="mb-[15px] w-full p-2.5 border-[1px] border-solid border-[#c5c5c5] rounded outline-[tomato] "
            type="text"
            placeholder="City"
          />
          <input
            required
            onChange={onChangeHandler}
            name="state"
            value={data.state}
            className="mb-[15px] w-full p-2.5 border-[1px] border-solid border-[#c5c5c5] rounded outline-[tomato] "
            type="text"
            placeholder="State"
          />
        </div>
        <div className="flex gap-2.5 ">
          <input
            required
            onChange={onChangeHandler}
            name="zipcode"
            value={data.zipcode}
            className="mb-[15px] w-full p-2.5 border-[1px] border-solid border-[#c5c5c5] rounded outline-[tomato] "
            type="text"
            placeholder="Zip code"
          />
          <input
            required
            onChange={onChangeHandler}
            name="country"
            value={data.country}
            className="mb-[15px] w-full p-2.5 border-[1px] border-solid border-[#c5c5c5] rounded outline-[tomato] "
            type="text"
            placeholder="Country"
          />
        </div>
        <input
          required
          onChange={onChangeHandler}
          name="phone"
          value={data.phone}
          className="mb-[15px] w-full p-2.5 border-[1px] border-solid border-[#c5c5c5] rounded outline-[tomato] "
          type="text"
          placeholder="phone"
        />
      </div>
      <div className="w-full max-w-[max(40%,_500px)] ">
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
              <p>${getTotalCartAmount() > 0 ? 3 : 0}</p>
            </div>
            <hr className="my-2.5 mx-0 " />
            <div className="flex justify-between text-[#555] ">
              <b>Total</b>
              <b>${getTotalCartAmount() + (getTotalCartAmount() > 0 ? 3 : 0)}</b>
            </div>
          </div>
          <button
            type="submit"
            className="border-none mt-[30px] text-white bg-[tomato] w-[max(15vw,_200px)] py-[12px] px-0 rounded cursor-pointer "
          >
            Proceed to payment
          </button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
