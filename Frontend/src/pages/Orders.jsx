/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react"
import { StoreContext } from "../context/StoreContext"
import axios from "axios"
import {assets} from "../assets/assets"
import {toast} from 'react-toastify'

const Orders = () => {

  const [data, setData] = useState([])
  const { token, url } = useContext(StoreContext)

  const fetchOrders = async () => {
    try {
      const response = await axios.post(url + "/api/order/user-orders", {}, { headers: { token } })
      if (response.data.success) {
        setData(response.data.data)
        
      } else {
        console.error("Error fetching orders:", response.data.message) 
      }
    } catch (error) {
      console.error("Error while fetching orders:", error) 
    }
  }

  const trackOrders=async(status)=>{
    await fetchOrders()
    toast.success(`Your order status:${status}`)
  }

  useEffect(() => {
    if (token) {
      fetchOrders()
    }
  }, [token])


  return (
    <div className="my-[5px] mx-0 ">
      <h2 className="text-xl font-semibold">My Orders</h2>
      <div className="flex flex-col gap-5 mt-[30px] ">
        {data.map((order,index)=>{
          return(
            <div className="grid grid-cols-[_0.5fr,_2fr,_1fr,_1fr,_2fr,_1fr] items-center gap-[30px] text-[14px] py-2.5 px-5 text-[#454545] border-[1px] border-solid border-[tomato] max-900:grid-cols-[_1fr,_2fr,_1fr] max-900:gap-y-[5px] max-900:text-[12px] " key={index}>
              <img className="w-[50px] " src={assets.parcel_icon} alt="parcel_icon" />
              <p>{order.items.map((item,index)=>{
                if(index===order.items.length-1){
                  return item.name +" x "+ item.quantity
                }else{
                  return item.name +" x "+ item.quantity +", "
                }
              })}</p>
              <p>${order.amount}.00</p>
              <p>items:{order.items.length}</p>
              <p><span className="text-[tomato]" >&#x25cf;</span><b className="font-[500] text-[#454545] " >{order.status}</b></p>
              <button onClick={()=>trackOrders(order.status)} className="border-none py-3 px-0 rounded bg-[#ffe1e1] cursor-pointer text-[#454545] max-900:text-[10px] " >Track Order</button>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Orders
