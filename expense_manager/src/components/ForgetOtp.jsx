export default function ForgetOtp({ email, setPortal }) {
  async function submitHandler(e) {
    e.preventDefault();
    const fd = new FormData(e.target);
    const data = Object.fromEntries(fd.entries());
    data.email = email;
    console.log(data);
    try {
      const res = await fetch("http://localhost:3000/verify/otp", {
        method: "POST",
        body: JSON.stringify({ ...data }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) throw new Error("unmatched");
      const result = await res.json();
      localStorage.setItem("token", result.token);
      setPortal({ window: "password", data: data });
    } catch (e) {
      console.log(e);
    }
  }

  async function resendOtp(e) {
    try {
      const res = await fetch("http://localhost:3000/verify/resendOtp", {
        method: "POST",
        body: JSON.stringify({ email }),
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <form
      onSubmit={submitHandler}
      className="flex flex-col justify-center h-[100%] w-[100%] p-4 border-solid border-black border rounded-lg"
    >
      <div className="mb-5">
        <label htmlFor="otp" className="block mb-2 text-lg font-medium ">
          Enter OTP sent into {email}
        </label>
        <input
          type="number"
          name="otp"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
      <div className="flex justify-evenly items-center">
        <button
          type="reset"
          onClick={resendOtp}
          className="text-white bg-[#95AB3C] hover:bg-[#6b7d23] focus:ring-4 focus:outline-none focus:ring-ring-[#daec8e] font-medium rounded-lg text-lg w-full sm:w-auto px-5 py-2.5 text-center "
        >
          Resend Otp?
        </button>
        <button className="text-white bg-[#95AB3C] hover:bg-[#6b7d23] focus:ring-4 focus:outline-none focus:ring-ring-[#daec8e] font-medium rounded-lg text-lg w-full sm:w-auto px-5 py-2.5 text-center ">
          Submit
        </button>
      </div>
    </form>
  );
}
