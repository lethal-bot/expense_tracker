import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <Link
        className="bg-slate-700 text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-lg w-full  px-5 py-2.5 text-center"
        to={"/register"}
      >
        Register
      </Link>
      <Link
        className="bg-slate-700 text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-lg w-full  px-5 py-2.5 text-center"
        to={"/login"}
      >
        Login
      </Link>
    </div>
  );
}
