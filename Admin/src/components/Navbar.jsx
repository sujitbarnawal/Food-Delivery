import { assets } from "../assets/assets";
// import {useNavigate} from 'react-router-dom'
const Navbar = () => {
  // const navigate=useNavigate()
  return (
    <div className="flex justify-between items-center py-[8px] px-[4%] ">
      <div className=" w-[max(10%,_80px)]">
        <p  className="cursor-pointer text-orange-600 text-[27px] font-bold ">
          MithoMitho
        </p>
        <p className="text-xl">Admin</p>
      </div>
      <img className="w-[40px] rounded-full " src={assets.profile_image1} />
    </div>
  );
};

export default Navbar;
