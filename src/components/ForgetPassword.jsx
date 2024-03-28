import { useState } from "react";
import ForgetOtp from "./ForgetOtp";
import ChangePassword from "./ChangePassword";
import Box from "./Box";
import { resendOTP } from "../config";

export default function ForgetPassword() {
  const [portal, setPortal] = useState({ window: "email", data: {} });
  async function submitHandler(e) {
    e.preventDefault();
    const fd = new FormData(e.target);
    const data = Object.fromEntries(fd.entries());
    try {
      const res = await fetch(resendOTP, {
        method: "POST",
        body: JSON.stringify({ email: data.email }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      setPortal({ window: "otp", data: data });
    } catch (e) {
      console.log(e);
    }
  }
  return (
    <div className="h-[650px] w-[100%] flex items-center justify-center">
      <Box>
        {portal.window === "email" && (
          <form
            onSubmit={submitHandler}
            className="flex flex-col justify-center h-[100%] w-[100%] p-4 border-solid border-black border rounded-lg"
          >
            <div className="mb-5">
              <label
                htmlFor="email"
                className="block mb-2 text-lg font-medium "
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="adityakeshari@gmail.com"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            <div className="flex justify-evenly items-center">
              <button className="text-white bg-[#95AB3C] hover:bg-[#6b7d23] focus:ring-4 focus:outline-none focus:ring-ring-[#daec8e] font-medium rounded-lg text-lg w-full sm:w-auto px-5 py-2.5 text-center ">
                Get otp
              </button>
            </div>
          </form>
        )}
        {portal.window === "otp" && (
          <ForgetOtp setPortal={setPortal} email={portal.data.email} />
        )}
        {portal.window === "password" && (
          <ChangePassword setPortal={setPortal} />
        )}
      </Box>
    </div>
  );
}
