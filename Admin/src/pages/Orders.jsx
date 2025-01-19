import { useState } from "react";
import { assets, url } from "../assets/assets";
import axios from "axios";
import { useEffect } from "react";
import { toast } from "react-toastify";

const Orders = () => {
  const [data, setData] = useState([]);

  const fetchAllOrders = async () => {
    const response = await axios.get(`${url}/api/order/list`);
    if (response.data.success) {
      setData(response.data.data);
    } else {
      toast.error("Error fetching orders");
    }
  };

  const statusHandler=async(e,orderId)=>{
    const response= await axios.post(`${url}/api/order/status`,{orderId:orderId,status:e.target.value})
    if(response.data.success){
      await fetchAllOrders()
      toast.success(response.data.message)
    }else{
      toast.error("Error")
    }
  }

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className="w-[70%] ml-[max(5vw,_25px)] mt-[50px] text-[#6d6d6d] text-[16px] max-1000:text-[14px] flex flex-col gap-2.5 ">
      <h3 className="text-2xl font-semibold">Order Page</h3>
      <div>
        {data.map((order, index) => {
          return (
            <div key={index} className="grid grid-cols-[_0.5fr,_2fr,_1fr,_1fr,_1fr] items-start gap-[30px] border-[tomato] border-[1px] border-solid p-5 my-[30px] mx-0 text-[14px] text-[#505050] max-1000:text-[12px] max-1000:grid-cols-[_0.5fr,_1fr,_0.5fr] max-1000:py-[15px] max-1000:px-[8px]  ">
              <img className="w-[50px] max-1000:w-[40px] " src={assets.parcel_icon} alt="parcel_icon" />
              <div>
                <p className="font-[600]  ">
                  {order.items.map((item, index) => {
                    if (index === order.items.length - 1) {
                      return item.name + " x " + item.quantity;
                    } else {
                      return item.name + " x " + item.quantity + ",";
                    }
                  })}
                  <p className="max-1000:block hidden">items:{order.items.length}</p>
                </p>
                <p className="font-[600] mt-[30px] mb-[5px] ">
                  {order.address.firstName + " " + order.address.lastName}{" "}
                </p>
                <div className="mb-2.5 ">
                  <p>{order.address.street+","}</p>
                  <p>{order.address.city +","+order.address.state+","+order.address.country+","+order.address.zipcode}</p>
                </div>
                <p>{order.address.phone}</p>
              </div>
              <p className="max-1000:hidden">items:{order.items.length}</p>
              <p className="max-1000:block hidden"></p>
              <p>${order.amount}</p>
              <select value={order.status} onChange={(e)=>{statusHandler(e,order._id)}} className="bg-[#ffe8e4] border-[1px] border-solid border-[tomato] w-[max(10vw,_120px)] outline-none p-2.5 max-1000:text-[12px] max-1000:p-[5px] " >
                <option value="Food Processing">Food Processing</option>
                <option value="Out for delivery">Out for delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Orders;
