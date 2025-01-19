import { useEffect, useState } from "react";
import axios from "axios";
import { url } from "../assets/assets";
import { toast } from "react-toastify";

const List = () => {
  const [listItems, setListItems] = useState([]);

  const fetchList = async () => {
    const response = await axios.get(`${url}/api/food/list`);
    // console.log(response.data);
    if (response.data.success) {
      setListItems(response.data.data);
    } else {
      toast.error(response.data.message);
    }
  };

  const removeFood = async(foodId)=>{
    const response = await axios.post(`${url}/api/food/remove`,{id:foodId});
    if(response.data.success){
      toast.success(response.data.message)
      await fetchList()
    }
    // else{
    //   toast.error("Error")
    // }
  }

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className=" flex flex-col gap-2.5 w-[70%] ml-[max(5vw,_25px)] mt-[50px] text-[#6d6d6d] text-[16px] ">
      <p>All Foods List</p>
      <div className="">
        <div className="grid grid-cols-[0.5fr,_2fr,_1fr,_1fr,_0.5fr] items-center gap-2.5 py-3 px-[15px] border-[#cacaca] border-[1px] border-solid text-[13px] bg-[#f9f9f9] max-600:grid-cols-[_1fr,_3fr,_1fr] max-600:gap-[15px] max-600:hidden ">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {
          listItems.map((item,index)=>{
            return(
              <div key={index} className="grid grid-cols-[0.5fr,_2fr,_1fr,_1fr,_0.5fr] items-center gap-2.5 py-3 px-[15px] border-[#cacaca] border-[1px] border-solid text-[13px] max-600:grid-cols-[_1fr,_3fr,_1fr] max-600:gap-[15px]  " >
                <img className="w-[50px] " src={`${url}/images/${item.image}`} alt="" />
                <p>{item.name}</p>
                <p>{item.category}</p>
                <p>${item.price}</p>
                <p onClick={()=>removeFood(item._id)} className="cursor-pointer">X</p>
              </div>
            )
          })
        }
      </div>
    </div>
  );
};

export default List;
