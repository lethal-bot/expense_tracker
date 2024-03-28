import { useState } from "react";
import Button from "./Button";
import { avatar } from "../config";

export default function UploadPhoto({ setUserData }) {
  const [file, setFile] = useState();
  function closeHandler() {
    setUserData((prev) => ({ ...prev, window: false }));
  }

  async function uploadHandler(e) {
    e.preventDefault();
    const fd = new FormData();
    console.log(file);
    fd.append("avatar", file);
    console.log(fd.get("avatar"));
    try {
      const res = await fetch(avatar, {
        method: "POST",
        body: fd,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      closeHandler();
    } catch (error) {
      console.log(error);
    }
  }

  function onInputChange(e) {
    console.log(e.target.files[0]);
    setFile(e.target.files[0]);
  }

  return (
    <form onSubmit={uploadHandler}>
      <label htmlFor="upload">
        upload photo PNG or JPEG or JPG of max size 1MB
      </label>
      <input
        type="file"
        name="avatar"
        accept=".jpg, .jpeg, .png"
        onChange={onInputChange}
      />
      <Button>Upload</Button>
      <button
        onClick={closeHandler}
        className="text-white bg-[#CD2929] hover:bg-[#47020A] focus:ring-[#eb5090] focus:ring-4 focus:outline-none font-medium rounded-lg text-lg w-full  px-5 py-2.5 text-center"
        type="button"
      >
        Back
      </button>
    </form>
  );
}
