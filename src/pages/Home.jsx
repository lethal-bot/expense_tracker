import { Link } from "react-router-dom";

export default function Home() {
  const token = localStorage.getItem("token");
  const verified = localStorage.getItem("verified");
  return (
    <div className="flex h-[650px] w-full items-center justify-center flex-col">
      <p className="font-extrabold text-7xl text-center">
        TRACK ALL YOUR <span className="text-yellow-500">EXPENSE</span> WITH{" "}
        <br />
        <span className="text-red-500">TRACKME</span>
      </p>
      {token && verified && (
        <div className="p-8 w-[300px]">
          <Link
            to={"/track"}
            className="block w-[100%] bg-[#95AB3C] hover:bg-[#6b7d23] focus:ring-[#daec8e] text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-2xl  px-5 py-2.5 text-center"
          >
            Get started
          </Link>
        </div>
      )}
      {(!token || !verified) && (
        <div className="p-8">
          <Link
            className="bg-slate-700 text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-2xl w-full  px-5 py-2.5 text-center m-4"
            to={"/register"}
          >
            Register
          </Link>
          <Link
            className="bg-slate-700 text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-2xl w-full  px-5 py-2.5 text-center"
            to={"/login"}
          >
            Login
          </Link>
        </div>
      )}
    </div>
    // <div>
    //   <Link
    //     className="bg-slate-700 text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-lg w-full  px-5 py-2.5 text-center"
    //     to={"/register"}
    //   >
    //     Register
    //   </Link>
    //   <Link
    //     className="bg-slate-700 text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-lg w-full  px-5 py-2.5 text-center"
    //     to={"/login"}
    //   >
    //     Login
    //   </Link>
    // </div>
  );
}
