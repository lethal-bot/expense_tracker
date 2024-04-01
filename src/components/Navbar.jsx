import { Link } from "react-router-dom";
export default function Navbar() {
  return (
    <div className="h-12 w-[100%] bg-black flex flex-row justify-around items-center text-lg">
      <div>
        <p>TRACKME</p>
      </div>
      <div className="flex w-[20%] items-center justify-between">
        <Link to={"/"}>Home</Link>
        <Link to={"/track"}>Track</Link>
        <Link to={"/profile"}>profile</Link>
      </div>
    </div>
  );
}
