import { useNavigate } from "react-router-dom";

export default function ChangePassword() {
  const navigate = useNavigate();
  async function submitHandler(e) {
    e.preventDefault();
    const fb = new FormData(e.target);
    const data = Object.fromEntries(fb.entries());
    if (data.newPassword === data.reEnterPassword) {
      try {
        const res = await fetch("http://localhost:3000/users/me", {
          method: "PATCH",
          body: JSON.stringify({ password: data.newPassword }),
          headers: {
            "Content-Type": "application/json",
            // prettier-ignore
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
          },
        });
        navigate("/profile");
      } catch (error) {
        console.log(error);
      }
    }
  }
  return (
    <form
      onSubmit={submitHandler}
      className="flex flex-col justify-center h-[100%] w-[100%] p-4 border-solid border-black border rounded-lg"
    >
      <div className="mb-5">
        <label htmlFor="password" className="block mb-2 text-lg font-medium ">
          Enter new password
        </label>
        <input
          type="password"
          name="newPassword"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
      <div className="mb-5">
        <label htmlFor="password" className="block mb-2 text-lg font-medium ">
          Enter new password
        </label>
        <input
          type="password"
          name="reEnterPassword"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
      <div className="flex justify-evenly items-center">
        <button className="text-white bg-[#95AB3C] hover:bg-[#6b7d23] focus:ring-4 focus:outline-none focus:ring-ring-[#daec8e] font-medium rounded-lg text-lg w-full sm:w-auto px-5 py-2.5 text-center ">
          Submit
        </button>
      </div>
    </form>
  );
}
