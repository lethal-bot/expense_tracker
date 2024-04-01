import Box from "./Box";
import { Link } from "react-router-dom";
import duck from "../Photos/duck.png";
export default function NoAuth() {
  return (
    <div className="w-[100%] h-[650px] flex items-center justify-center">
      <Box>
        <div className="w-[100%] h-[100%] flex items-center justify-center flex-col">
          <h3 className="text-center p-3 text-3xl">Please Login/SignUp</h3>
          <img src={duck} alt="duck image" className="w-[50%] h-[70%]" />
          <Link
            to={"/"}
            className="bg-[#95AB3C] hover:bg-[#6b7d23] focus:ring-[#daec8e] text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-2xl  px-5 py-2.5 text-center"
          >
            Go to Home
          </Link>
        </div>
      </Box>
    </div>
  );
}
