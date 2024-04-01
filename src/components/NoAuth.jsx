import Box from "./Box";
import { Link } from "react-router-dom";
export default function NoAuth() {
  return (
    <div className="w-[100%] h-[650px] flex items-center justify-center">
      <Box>
        <h3 className="flex items-center justify-center p-3 text-xl">
          Please Login/SignUp
        </h3>
        <Link to={"/"} className="flex items-center justify-center ">
          Go to Home
        </Link>
      </Box>
    </div>
  );
}
