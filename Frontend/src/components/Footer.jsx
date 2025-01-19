import { assets } from "../assets/assets";

const Footer = () => {


  return (
    <div className="text-[#d9d9d9] bg-[#323232] flex flex-col items-center gap-5 py-[20px] px-[8vw] pt-[80px] mt-[100px] ">
      <div className="w-full grid grid-cols-[2fr_1fr_1fr] gap-20 max-750:flex max-750:flex-col max-750:gap=[35px] ">
        <div className="flex flex-col items-start gap-5 ">
          <p className="text-orange-600 text-3xl font-bold w-[150px] ">
            MithoMitho
          </p>{" "}
          <p>
            Your ultimate food delivery companion, bringing delicious meals
            straight to your doorstep. Whether you are craving local delicacies
            or international cuisines, MithoMitho connects you with the best
            eateries around. Our mission is to deliver fresh, hot, and flavorful
            food quickly and reliably. Enjoy a hassle-free ordering experience
            and satisfy your hunger with just a few taps. Start your flavorful
            journey with MithoMitho today!
          </p>
          <div className="flex">
            <img
              className="w-10 mr-[15px]"
              src={assets.facebook_icon}
              alt="facebook"
            />
            <img
              className="w-10 mr-[15px]"
              src={assets.linkedin_icon}
              alt="linkedIn"
            />
            <img
              className="w-10 mr-[15px]"
              src={assets.twitter_icon}
              alt="twitter"
            />
          </div>
        </div>

        <div className="flex flex-col items-start gap-5 ">
          <h2 className="text-white text-2xl font-semibold">COMPANY</h2>
          <ul>
            <li className="mb-2.5 cursor-pointer">Home</li>
            <li className="mb-2.5 cursor-pointer">About Us</li>
            <li className="mb-2.5 cursor-pointer">Delivery</li>
            <li className="mb-2.5 cursor-pointer">Privacy & policy</li>
          </ul>
        </div>

        <div className="flex flex-col items-start gap-5 ">
          <h2 className="text-white text-2xl font-semibold">CONTACT US</h2>
          <ul>
            <li className="mb-2.5 cursor-pointer">+977-9800000000</li>
            <li className="mb-2.5 cursor-pointer">mithomitho@gmail.com</li>
          </ul>
        </div>
      </div>

      <hr className="w-full h-[2px] my-5 mx-0 bg-gray-200 border-none" />
      <p className="max-750:text-center">
        Copyright {new Date().getFullYear()} &#169; MithoMitho.com - All Rights Reserved{" "}
      </p>
    </div>
  );
};

export default Footer;
