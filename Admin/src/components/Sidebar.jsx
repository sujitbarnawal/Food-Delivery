import { NavLink } from "react-router-dom"
import { assets } from "../assets/assets"

const Sidebar = () => {
  return (
    <div className="w-[18%] min-h-screen border-[1px] border-solid border-[#a9a9a9] border-t-0 text-[max(1vw,_10px)]  ">
      <div className="pt-[50px] pl-[20%] flex flex-col gap-5 ">
        <NavLink to="/add" className={({isActive})=>{
          return isActive ? "flex items-center gap-3 border-[1px] border-solid border-r-0 py-2 px-2.5 cursor-pointer rounded-t-[3px] rounde-b-[3px] bg-[#fff0ed] border-[tomato] ":"flex items-center gap-3 border-[1px] border-solid border-[#a9a9a9] border-r-0 py-2 px-2.5 cursor-pointer rounded-t-[3px] rounde-b-[3px]"
        }}>
            <img src={assets.add_icon} alt="" />
            <p className="max-900:hidden">Add Items</p>
        </NavLink>
        <NavLink to="/list" className={({isActive})=>{
          return isActive ? "flex items-center gap-3 border-[1px] border-solid border-r-0 py-2 px-2.5 cursor-pointer rounded-t-[3px] rounde-b-[3px] bg-[#fff0ed] border-[tomato] ":"flex items-center gap-3 border-[1px] border-solid border-[#a9a9a9] border-r-0 py-2 px-2.5 cursor-pointer rounded-t-[3px] rounde-b-[3px]"
        }}>
            <img src={assets.order_icon} alt="" />
            <p className="max-900:hidden">List Items</p>
        </NavLink>
        <NavLink to="/orders" className={({isActive})=>{
          return isActive ? "flex items-center gap-3 border-[1px] border-solid border-r-0 py-2 px-2.5 cursor-pointer rounded-t-[3px] rounde-b-[3px] bg-[#fff0ed] border-[tomato] ":"flex items-center gap-3 border-[1px] border-solid border-[#a9a9a9] border-r-0 py-2 px-2.5 cursor-pointer rounded-t-[3px] rounde-b-[3px]"
        }}>
            <img src={assets.order_icon} alt="" />
            <p className="max-900:hidden">Orders</p>
        </NavLink>
      </div>
    </div>
  )
}

export default Sidebar
