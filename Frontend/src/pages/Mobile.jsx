import { assets } from "../assets/assets";

const Mobile = () => {
  return (
    <div className="m-auto mt-[100px] text-[max(3vw,_20px)] text-center font-[500]">
      <p>
        For a smoother and more delightful experience, get the <br /> MithoMitho
        app now!
      </p>
      <div className="flex justify-center gap-[max(2vw,_10px)] mt-10">
        <img
          className="w-[max(30vw,_120px)] max-w-[180px] transition-[0.5s] cursor-pointer hover:scale-[1.05] animate-fadeIn"
          src={assets.play_store}
          alt=""
        />
        <img
          className="w-[max(30vw,_120px)] max-w-[180px] transition-[0.5s] cursor-pointer hover:scale-[1.05] animate-fadeIn"
          src={assets.app_store}
          alt=""
        />
      </div>
    </div>
  );
};

export default Mobile;
