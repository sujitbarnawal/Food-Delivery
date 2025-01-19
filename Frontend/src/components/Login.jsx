
/* eslint-disable react/prop-types */
import { useContext, useState } from "react";
import { assets } from "../assets/assets";
import axios from "axios";
import { StoreContext } from "../context/StoreContext";
import {toast} from 'react-toastify'

const Login = ({ setShowLogin, setShowResetPassword }) => {
  const [state, setState] = useState("Sign Up");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { url,setToken } = useContext(StoreContext);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    let newUrl = url;
    if (state === "Sign Up") {
      newUrl = newUrl + "/api/user/register";
    } else {
      newUrl = newUrl + "/api/user/login";
    }
    const response = await axios.post(newUrl,state==="Sign Up"?{name,email,password}:{email,password})
    if(response.data.success){
      setToken(response.data.token)
      localStorage.setItem("token",response.data.token)
      setShowLogin(false);
      setShowResetPassword(false);
      toast.success(response.data.message)
    }else{
      toast.error(response.data.message)
    }
  };

  return (
    <div className="absolute z-[1] w-full h-full bg-[#00000090] grid ">
      <form
        autoComplete="off"
        onSubmit={onSubmitHandler}
        className="place-self-center w-[max(23vw,_330px)] text-[#808080] bg-white flex flex-col gap-[25px] py-[25px] px-[30px] rounded-lg text-sm animate-fadeIn "
      >
        <div className="flex justify-between items-center text-black ">
          <h2 className="font-semibold text-xl ">{state}</h2>
          <img
            className="cursor-pointer w-4 "
            onClick={() => setShowLogin(false)}
            src={assets.cross_icon}
            alt=""
          />
        </div>
        <div className="flex flex-col gap-5 ">
          {state === "Sign Up" ? (
            <input
              value={name}
              name="name"
              onChange={(e) => setName(e.target.value)}
              className="outline-none border-solid border-[#c9c9c9] border-[1px] p-2.5 rounded-lg "
              type="text"
              placeholder="Name"
              required
            />
          ) : (
            ""
          )}
          <input
            value={email}
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            className="outline-none border-solid border-[#c9c9c9] border-[1px] p-2.5 rounded-lg "
            type="email"
            placeholder="Email"
            required
          />
          <input
            value={password}
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            className="outline-none border-solid border-[#c9c9c9] border-[1px] p-2.5 rounded-lg "
            type="password"
            placeholder="Password"
            required
          />
          {state === "Login" ? (
            <p
              onClick={() => setShowResetPassword(true)}
              className="cursor-pointer"
            >
              Forgot password?
            </p>
          ) : (
            ""
          )}
        </div>

        <button
          type="submit"
          className="border-none p-2.5 rounded-lg text-white bg-[tomato] text-[15px] cursor-pointer"
        >
          {state === "Sign Up" ? "Create account" : "Login"}
        </button>
        <div className="flex items-start gap-2 mt-[-15px]">
          <input className="mt-1 " type="checkbox" required />
          <p>By proceeding, I accept the terms of use and privacy policy.</p>
        </div>
        {state === "Login" ? (
          <p>
            Create a new account?
            <span
              className="text-[tomato] ml-1 font-[500] cursor-pointer "
              onClick={() => setState("Sign Up")}
            >
              Click here
            </span>
          </p>
        ) : (
          <p>
            Already have an account?
            <span
              className="text-[tomato] ml-1 font-[500] cursor-pointer "
              onClick={() => setState("Login")}
            >
              Login here
            </span>
          </p>
        )}
      </form>
    </div>
  );
};

export default Login;
