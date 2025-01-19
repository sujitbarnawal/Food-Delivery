import { useState } from "react";
import { menu_list } from "../assets/assets";
import FoodDisplay from "../components/FoodDisplay";

const Menu = () => {
  const [category, setCategory] = useState("All");

  return (
    <>
    <div className="flex flex-col gap-5">
      <h1 className="text-[#262626] font-[500] text-3xl ">
        See What{`'`}s Cooking
      </h1>
      <p className="max-w-[60%] max-1050:max-w-full max-1050:text-[14px] text-[#262626]">
        Choose from these delightful menus, each thoughtfully curated to satisfy
        a wide range of tastes and cravings. Whether you{`'`}re in the mood for
        something savory, sweet, or a little bit of both, we{`'`}ve got an array
        of options to tantalize your taste buds
      </p>
      <div className="flex justify-between items-center gap-[30px] text-center my-5 mx-0 overflow-x-scroll hide-scrollbar ">
        {menu_list.map((menu, index) => {
          return (
            <div
              onClick={() =>
                setCategory((prev) =>
                  prev === menu.menu_name ? "All" : menu.menu_name
                )
              }
              key={index}
            >
              <img
                className={
                  category === menu.menu_name
                    ? "w-[7.5vw] min-w-20 rounded-[50%] cursor-pointer transition-[0.2s] border-4 border-solid border-[tomato] p-0.5"
                    : "w-[7.5vw] min-w-20 rounded-[50%] cursor-pointer transition-[0.2s] "
                }
                src={menu.menu_image}
                alt="menu-image"
              />
              <p className="mt-2.5 text-[#747474] text-[max(1.4vw,_16px)] cursor-pointer">{menu.menu_name}</p>
            </div>
          );
        })}
      </div>
      <hr className="my-2.5 mx-0 h-[2px] bg-[#e2e2e2] border-none " />
    </div>
    <FoodDisplay category={category}/>
    </>
  );
};

export default Menu;
