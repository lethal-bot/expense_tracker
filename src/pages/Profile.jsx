import { useEffect, useState } from "react";
import Box from "../components/Box";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import { me, logout, logoutall } from "../config";
import NoAuth from "../components/NoAuth";
export default function Profile() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});
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
        localStorage.setItem("id", result._id);
        setUserData({
          ...result,
          avatar: `https://money-manager-cft3.onrender.com/users/${result._id}/avatar`,
        });
      } catch (e) {
        console.log(e);
      }
    }
    aboutMe();
  }, []);

  async function logoutHandler() {
    try {
      const res = await fetch(logout, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          // prettier-ignore
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
      });
      localStorage.clear();
      navigate("/");
    } catch (e) {
      console.log(e);
    }
  }

  async function logoutAllHandler() {
    try {
      const res = await fetch(logoutall, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          // prettier-ignore
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
      });
      localStorage.clear();
      navigate("/");
    } catch (e) {
      console.log(e);
    }
  }

  function deleteHandler() {
    navigate("/profile/delete");
  }

  function updateHandler() {
    navigate("/profile/update");
  }
  const verified = localStorage.getItem("verified");
  const token = localStorage.getItem("token");
  return verified && token ? (
    <div className="h-[650px] w-[100%] flex items-center justify-center">
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
        <div className="text-lg pb-4">
          <p className="text-center">Name: {userData.name}</p>
          <p className="text-center">Email: {userData.email}</p>
        </div>
        <div className="w-[100%] h-[43%] flex items-center justify-evenly flex-col px-4">
          <Button onClick={updateHandler}>Update profile</Button>
          <Button onClick={logoutHandler} red={true}>
            Logout
          </Button>
          <Button onClick={logoutAllHandler} red={true}>
            Logout from All Devices
          </Button>

          <Button onClick={deleteHandler} red={true}>
            Delete Account
          </Button>
        </div>
      </Box>
    </div>
  ) : (
    <NoAuth />
  );
}
