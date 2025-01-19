import { useState } from "react";
import { assets, url } from "../assets/assets";
import { toast } from "react-toastify";
import axios from "axios";

const Add = () => {
  const [image, setImage] = useState(null);
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Salad",
  });

  const onChangeHandler = (e) => {
    setData((data) => ({ ...data, [e.target.name]: e.target.value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", Number(data.price));
    formData.append("category", data.category);
    formData.append("image", image);
    try {
      const response = await axios.post(`${url}/api/food/add`, formData);
      if (response.data.success) {
        setData({
          name: "",
          description: "",
          price: "",
          category: "Salad",
        });
        setImage(null);
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="w-[70%] ml-[max(5vw,_25px)] mt-[50px] text-[#6d6d6d] text-[16px] ">
      <form
        onSubmit={onSubmitHandler}
        autoComplete="off"
        className="flex flex-col gap-5  "
      >
        <div className="flex flex-col gap-2.5">
          <p>Upload Image</p>
          <label htmlFor="image">
            <img
              className="w-[120px] "
              src={image ? URL.createObjectURL(image) : assets.upload_area}
              alt="image-area"
            />
          </label>
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            id="image"
            hidden
            required
          />
        </div>
        <div className="flex flex-col gap-2.5 w-[max(40%,_280px)] ">
          <p>Product name</p>
          <input
            value={data.name}
            onChange={onChangeHandler}
            className="p-2.5 "
            type="text"
            name="name"
            placeholder="Write name here"
            required
          />
        </div>
        <div className="flex flex-col gap-2.5 w-[max(40%,_280px)] ">
          <p>Product description</p>
          <textarea
            value={data.description}
            onChange={onChangeHandler}
            className="p-2.5 "
            rows="6"
            name="description"
            placeholder="Write content here"
            required
          />
        </div>
        <div className="flex gap-[30px] ">
          <div className="flex flex-col gap-2.5">
            <p>Product category</p>
            <select
              value={data.category}
              onChange={onChangeHandler}
              className="max-w-[120px] p-2.5  "
              name="category"
              required
            >
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Desert">Desert</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Cake">Cake</option>
              <option value="Pure Veg">Pure Veg</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles">Noodles</option>
            </select>
          </div>
          <div className="flex flex-col gap-2.5">
            <p>Product price</p>
            <input
              value={data.price}
              onChange={onChangeHandler}
              className="max-w-[120px] p-2.5  "
              min={0}
              type="number"
              name="price"
              placeholder="$13"
              required
            />
          </div>
        </div>
        <button
          type="submit"
          className="max-w-[120px] border-none p-2.5 bg-black text-white cursor-pointer rounded "
        >
          Add
        </button>
      </form>
    </div>
  );
};

export default Add;
