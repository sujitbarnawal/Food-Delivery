/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { StoreContext } from "../context/StoreContext";
import axios from "axios";
import {toast} from 'react-toastify'

const Verify = () => {

  const navigate=useNavigate()

  const [searchParams, setSearchParams] = useSearchParams();
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");

  const { url } = useContext(StoreContext);

  const verifyPayment=async()=>{
    const response=await axios.post(`${url}/api/order/verify`,{success,orderId})
    if(response.data.success){
        console.log("hello");
        navigate('/my-orders')
        toast.success(response.data.message)
    }else{
        navigate('/')
        toast.error(response.data.message)
    }
  }

  useEffect(()=>{
    verifyPayment()
  },[])

  return (
    <div className="min-h-[60vh] grid  ">
      <div className="animate-spin w-[100px] h-[100px] place-self-center border-[5px] border-solid border-[#bdbdbd] border-t-[tomato] rounded-[50%] "></div>
    </div>
  );
};

export default Verify;
