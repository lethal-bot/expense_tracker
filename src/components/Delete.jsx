import { useNavigate } from "react-router-dom";
import Box from "./Box";
import Button from "./Button";
import { me } from "../config";
export default function Delete() {
  const navigate = useNavigate();
  async function deleteHandler() {
    try {
      const res = await fetch(me, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          // prettier-ignore
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
      });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }
  function backHandler() {
    navigate("/profile");
  }

  return (
    <div className="h-[650px] w-[100%] flex items-center justify-center">
      <Box>
        <div className="h-[100%] width-[100%] flex items-center justify-center flex-col">
          <p className="text-center text-lg m-4">
            Are you sure you want to delete your account?
          </p>
          <div className="flex justify-around items-center w-[100%] flex-col">
            <div className="mb-5 w-[80%]">
              <Button onClick={deleteHandler} red={true}>
                Yes
              </Button>
            </div>
            <div className="mb-5 w-[80%]">
              <Button onClick={backHandler}>No</Button>
            </div>
          </div>
        </div>
      </Box>
    </div>
  );
}
