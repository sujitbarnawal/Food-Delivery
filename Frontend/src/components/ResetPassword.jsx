/* eslint-disable react/prop-types */
import { useState, useRef, useContext } from "react";
import { assets } from "../assets/assets";
import { toast } from "react-toastify";
import axios from "axios";
import { StoreContext } from "../context/StoreContext";

const ResetPassword = ({ setShowLogin, setShowReserPassword }) => {
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [isOtpSubmitted, setIsOtpSubmitted] = useState(false);
  const [otp, setOtp] = useState(0);
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const { url } = useContext(StoreContext);

  const inputRefs = useRef([]);

  const handleInput = (e, index) => {
    if (e.target.value.length > 0 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && e.target.value === "" && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    const value = e.clipboardData.getData("text");
    const valueArray = value.split("");
    valueArray.forEach((v, index) => {
      if (inputRefs.current[index]) {
        inputRefs.current[index].value = v;
      }
    });
  };

  const updateShow = () => {
    setShowLogin(false);
    setShowReserPassword(false);
  };

  const onEmailSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(url + "/api/user/send-pass-reset-otp", {
        email,
      });
      if (response.data.success) {
        setIsEmailSent(true);
        toast.success(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const onOtpSubmitHandler = (e) => {
    e.preventDefault();
    try {
      const otp = Number(inputRefs.current.map((ref) => ref.value).join(""));
      setOtp(otp);
      setIsOtpSubmitted(true);
    } catch (error) {
      toast.error(error.message);
    }
    setIsOtpSubmitted(true);
  };

  const onNewPasswordSubmitHandler = async (e) => {
    e.preventDefault();
    console.log("Submit button clicked");
    console.log("Email:", email); // Log email for debugging
    console.log("OTP:", otp); // Log OTP for debugging
    console.log("New Password:", newPassword); // Log password for debugging
    try {
      const response = await axios.post(url + "/api/user/reset-pass", {
        email,
        otp,
        newPassword,
      });

      if (response.data.success) {
        toast.success(response.data.message);
        setShowLogin(true);
        setShowReserPassword(false);
      } else {
        toast.error(response.data.message || "Failed to reset password");
      }
    } catch (error) {
      toast.error(error.message || "An error occurred");
    }
  };

  return (
    <div className="absolute z-[1] w-full h-full bg-[#00000090] grid ">
      {!isEmailSent && (
        <form
          autoComplete="off"
          onSubmit={onEmailSubmitHandler}
          className="place-self-center w-[max(23vw,_330px)] text-[#808080] bg-white flex flex-col gap-[25px] py-[25px] px-[30px] rounded-lg text-sm animate-[fadeIn,0.5s] "
        >
          <div className="flex justify-between items-center text-black ">
            <h2 className="font-semibold text-xl ">Reset Password</h2>
            <img
              className="cursor-pointer w-4 "
              onClick={updateShow}
              src={assets.cross_icon}
              alt=""
            />
          </div>
          <div className="flex flex-col gap-5 ">
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="outline-none border-solid border-[#c9c9c9] border-[1px] p-2.5 rounded-lg"
              type="email"
              placeholder="Email"
              name="email"
              required
            />
          </div>

          <button
            type="submit"
            className="border-none p-2.5 rounded-lg text-white bg-[tomato] text-[15px] cursor-pointer"
          >
            Submit email
          </button>
        </form>
      )}

      {isEmailSent && !isOtpSubmitted && (
        <form
          onSubmit={onOtpSubmitHandler}
          autoComplete="off"
          className="place-self-center w-[max(23vw,_330px)] text-[#808080] bg-white flex flex-col gap-[25px] py-[25px] px-[30px] rounded-lg text-sm animate-[fadeIn,0.5s] "
        >
          <div className="flex justify-between items-center text-black ">
            <h2 className="font-semibold text-xl">Password OTP</h2>
            <img
              className="cursor-pointer w-4 "
              onClick={updateShow}
              src={assets.cross_icon}
              alt=""
            />
          </div>
          <div className="flex  gap-1">
            {Array(6)
              .fill(0)
              .map((_, index) => {
                return (
                  <input
                    required
                    maxLength={1}
                    className="w-12 h-12 bg-gray-400 rounded flex px-3.5 py-3 text-white outline-none text-3xl max-750:w-11 max-750:h-11"
                    type="text"
                    key={index}
                    ref={(e) => (inputRefs.current[index] = e)}
                    onInput={(e) => handleInput(e, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    onPaste={handlePaste}
                  />
                );
              })}
          </div>

          <button
            type="submit"
            className="border-none p-2.5 rounded-lg text-white bg-[tomato] text-[15px] cursor-pointer"
          >
            Submit OTP
          </button>
        </form>
      )}

      {isEmailSent && isOtpSubmitted && (
        <form
          onSubmit={onNewPasswordSubmitHandler}
          className="place-self-center w-[max(23vw,_330px)] text-[#808080] bg-white flex flex-col gap-[25px] py-[25px] px-[30px] rounded-lg text-sm animate-[fadeIn,0.5s] "
        >
          <div className="flex justify-between items-center text-black ">
            <h2 className="font-semibold text-xl ">Reset Password</h2>
            <img
              className="cursor-pointer w-4 "
              onClick={updateShow}
              src={assets.cross_icon}
              alt=""
            />
          </div>
          <div className="flex flex-col gap-5 ">
            <input
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="outline-none border-solid border-[#c9c9c9] border-[1px] p-2.5 rounded-lg"
              type="password"
              name="password"
              placeholder="New Password"
              required
            />
          </div>

          <button
            type="submit"
            className="border-none p-2.5 rounded-lg text-white bg-[tomato] text-[15px] cursor-pointer"
          >
            Submit New Password
          </button>
        </form>
      )}
    </div>
  );
};

export default ResetPassword;
