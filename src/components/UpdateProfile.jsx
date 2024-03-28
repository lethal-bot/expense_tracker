import { useState, useEffect } from "react";
import Box from "./Box";
import Button from "./Button";
import UploadPhoto from "./UploadPhoto";
import { avatar, me } from "../config";
export default function UpdateProfile() {
  const [userData, setUserData] = useState({
    window: false,
    avatar: undefined,
  });

  useEffect(() => {
    async function aboutMe() {
      try {
        const res = await fetch(me, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            // prettier-ignore
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const result = await res.json();
        console.log(result);
        setUserData((prev) => ({
          ...prev,
          ...result,
          avatar: `https://money-manager-cft3.onrender.com/users/${result._id}/avatar`,
        }));
      } catch (e) {
        console.log(e);
      }
    }
    aboutMe();
    console.log(userData.avatar);
  }, [userData.window]);

  async function deleteHandler() {
    setUserData((prev) => ({ ...prev, avatar: undefined }));
    try {
      const res = await fetch(avatar, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          // prettier-ignore
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const result = await res.json();
    } catch (e) {
      console.log(e);
    }
  }

  async function updateHandler() {
    setUserData((prev) => ({ ...prev, window: true }));
  }

  return (
    <div className="h-[650px] w-[100%] flex items-center justify-center">
      {!userData.window && (
        <Box>
          {!userData.avatar && (
            <div
              id="image"
              className="h-[35%] w-[30%] bg-black mx-auto my-4 rounded-[100%]"
            ></div>
          )}
          {userData.avatar && (
            <img
              src={userData.avatar}
              id="image"
              className="h-[35%] w-[30%] bg-black mx-auto my-4 rounded-[100%]"
            />
          )}

          <div className="flex flex-row items-center justify-evenly w-full ">
            <div className="p-3">
              <Button>View Photo</Button>
            </div>

            <div className="p-3">
              <Button onClick={updateHandler}>Update Photo</Button>
            </div>
            <div className="p-3">
              <Button red={true} onClick={deleteHandler}>
                Delete Photo
              </Button>
            </div>
          </div>
          <form className="p-3 ">
            <label htmlFor="name">change Name</label>
            <input
              type="text"
              className="w-[60%] h-[80%] bg-[#3D4884] border-[#3d4884] mx-1 my-2 rounded-lg  border  text-lg  focus:ring-blue-500 focus:border-blue-500 block text-center"
              name="name"
            />
            <label htmlFor="password">change password</label>
            <input
              type="text"
              name="password"
              className="w-[60%] h-[80%] bg-[#3D4884] border-[#3d4884] mx-1 my-2 rounded-lg  border  text-lg  focus:ring-blue-500 focus:border-blue-500 block text-center"
            />
          </form>
        </Box>
      )}
      {userData.window && (
        <Box>
          <UploadPhoto setUserData={setUserData} />
        </Box>
      )}
    </div>
  );
}
