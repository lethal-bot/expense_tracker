import Box from "../components/Box";
import Button from "../components/Button";
import { login, resendOTP } from "../config";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  async function submitHandler(e) {
    e.preventDefault();
    const fd = new FormData(e.target);
    const data = Object.fromEntries(fd.entries());
    localStorage.setItem("email", data.email);
    console.log(data);
    if (data.email.length != 0 && data.password.length > 6) {
      try {
        const res = await fetch(login, {
          method: "POST",
          body: JSON.stringify({ ...data }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const result = await res.json();
        if (result.message === "not verified") {
          try {
            const res = await fetch(resendOTP, {
              method: "POST",
              body: JSON.stringify({ email: localStorage.getItem("email") }),
              headers: {
                "Content-Type": "application/json",
              },
            });
          } catch (e) {
            console.log(e);
          }
          return navigate("/login/otp");
        }
        console.log(result);
        const token = result.token;
        localStorage.setItem("token", token);
        return navigate("/track");
      } catch (e) {
        console.log(e);
      }
    }
  }
  return (
    <div className="h-[650px] w-[100%] flex items-center justify-center">
      <Box>
        <form
          className="flex flex-col justify-center h-[100%] w-[100%] p-4 border-solid border-black border rounded-lg"
          onSubmit={submitHandler}
        >
          <h3 className="text-center text-xl">Login</h3>
          <div className="mb-5">
            <label htmlFor="email" className="block mb-2 text-lg font-medium">
              Your Email
            </label>
            <input
              name="email"
              type="email"
              placeholder="example@gmail.com"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="password"
              className="block mb-2 text-lg font-medium "
            >
              Password
            </label>
            <input
              name="password"
              type="password"
              placeholder="must be 8 character long"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            />
          </div>
          <div className="my-5">
            <Button>Login</Button>
          </div>
          <div className="flex items-center justify-around w-[100%]">
            <Link to={"/register"}>Don't have an Account?</Link>
            <Link to={"/login/forget"}>Forget Password</Link>
          </div>
        </form>
      </Box>
    </div>
  );
}
