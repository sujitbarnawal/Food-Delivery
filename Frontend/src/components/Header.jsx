import {useNavigate} from 'react-router-dom'
const Header = () => {

  const navigate=useNavigate()

  return (
    <div className="h-[34vw] my-[30px] mx-auto bg-[url('/header_img.png')] bg-no-repeat relative bg-contain  ">
      <div className="absolute flex flex-col items-start gap-[1.5vw] max-w-[50%] bottom-[10%] left-[6vw] animate-fadeIn max-1050:max-w-[45%] max-750:max-w-[65%] ">
        <h2 className="font-[500] text-[max(4.5vw,_22px)] text-white">
          Delicious Meals to your Doorstep!
        </h2>
        <p className="text-white text-[1vw] max-750:hidden ">
          Craving something tasty? Explore our extensive menu, crafted to
          satisfy every craving and delight your taste buds. Whether you’re in 
          the mood for a quick snack, a hearty meal, or a sweet treat, we’ve got
          you covered. Discover local favorites and international delights, all
          prepared fresh by expert chefs. With just a few taps, your favorite
          dishes will be delivered hot and fresh to your doorstep. Indulge in
          convenience and flavor without the wait!
        </p>
        <button onClick={()=>navigate('/menu')} className="text-[max(1vw,_13px)] cursor-pointer border-none font-[500] bg-white rounded-[50px] py-[1vw] px-[2.3vw] max-750:py-[2vw] max-750:px-[4vw]  ">View Menu</button>
      </div>
    </div>
  );
};

export default Header;
