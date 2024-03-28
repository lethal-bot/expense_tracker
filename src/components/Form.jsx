import useRegistration from "../context/RegistrationContext";
import Button from "./Button";
import { Link } from "react-router-dom";
import { register } from "../config";
export default function Form() {
  const { open, email, getEmail } = useRegistration();
  async function submitHandler(e) {
    e.preventDefault();
    const fd = new FormData(e.target);
    const data = Object.fromEntries(fd.entries());
    getEmail(data.email);
    console.log(JSON.stringify({ ...data }));
    try {
      const res = await fetch(register, {
        method: "POST",
        body: JSON.stringify({ ...data }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) throw new Error("already registered");
      const result = await res.json();
      const token = result.token;
      console.log(res);
      saveToStorage(token);
      open();
    } catch (e) {
      console.log(e);
    }
  }

  function saveToStorage(token) {
    console.log(token);
    localStorage.setItem("token", token);
  }

  return (
    <form
      className="flex flex-col justify-center h-[100%] w-[100%] p-4 border-solid border-black border rounded-lg"
      onSubmit={submitHandler}
    >
      <h3 className="text-center text-xl">Register</h3>
      <div className="mb-5">
        <label
          htmlFor="name"
          className="block mb-2 text-lg font-medium text-white"
        >
          Your Name
        </label>
        <input
          name="name"
          type="text"
          placeholder="Aditya Keshari"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
        />
      </div>
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
        <label htmlFor="password" className="block mb-2 text-lg font-medium ">
          Password
        </label>
        <input
          name="password"
          type="password"
          placeholder="must be 8 character long"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
        />
      </div>
      <Button>Submit</Button>
      <p className="text-red-600">Error</p>
      <Link to={"/login"}>Already have an account?</Link>
    </form>
  );
}
