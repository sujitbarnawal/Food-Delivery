/* eslint-disable react/prop-types */
import { useContext } from "react";
import { StoreContext } from "../context/StoreContext";
import FoodItem from "./FoodItem";

const FoodDisplay = ({category}) => {
  const { food_list } = useContext(StoreContext);

  return (
    <div className="mt-[30px]">
      <h2 className="text-[max(2vw,_24px)] font-semibold">Delicious Options Close by</h2>
      <div className="grid grid-cols-[repeat(auto-fill,_minmax(240px,_1fr))] mt-[30px] gap-[30px] gap-y-[50px] ">
        {food_list.map((food, index) => {

          if(category==="All" || category===food.category){
            return (
              <FoodItem
                key={index}
                id={food._id}
                name={food.name}
                price={food.price}
                description={food.description}
                image={food.image}
              />
            );
          }        
        })}
      </div>
    </div>
  );
};

export default FoodDisplay;
