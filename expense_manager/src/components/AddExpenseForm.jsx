import { useState } from "react";
import { addExpense } from "../config";

export default function AddExpenseForm({ arr, changeArr }) {
  const [select, setSelect] = useState({
    addSelect: "paid",
    searchSelect: "past 3 days",
  });

  function selectHandler(value, option) {
    if (option === "addSelect")
      setSelect((prev) => ({ ...prev, addSelect: value }));
    else {
      setSelect((prev) => ({ ...prev, searchSelect: value }));
    }
  }

  async function submitHandler(e) {
    e.preventDefault();
    const fd = new FormData(e.target);
    const data = Object.fromEntries(fd.entries());
    data.price = parseFloat(data.price);
    console.log(data);
    try {
      const res = await fetch(addExpense, {
        method: "POST",
        body: JSON.stringify({ ...data }),
        headers: {
          "Content-Type": "application/json",
          // prettier-ignore
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const result = await res.json();
      changeArr([...arr, result]);
      e.target.reset();
      selectHandler("paid", "addSelect");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <form
      onSubmit={submitHandler}
      className=" w-[100%] h-12 my-1 p-1 rounded-xl bg-[#071355] flex items-center justify-start"
    >
      <input
        type="text"
        name="title"
        maxLength={30}
        placeholder={"Enter Title"}
        className={`text-gray-900 w-[25%] h-[80%] mx-1 my-2 rounded-lg  border  text-lg  focus:ring-blue-500 focus:border-blue-500 block p-2.5 text-center`}
      />
      <input
        type="text"
        name="description"
        maxLength={50}
        placeholder={"Enter description"}
        className={`text-gray-900 w-[37%] h-[80%] mx-1 my-2 rounded-lg  border text-lg  focus:ring-blue-500 focus:border-blue-500 block p-2.5 text-center`}
      />
      <input
        type="number"
        min={0}
        name="price"
        placeholder={"Enter Price"}
        className={`text-gray-900 w-[15%] h-[80%] mx-1 my-2 rounded-lg  border  text-lg  focus:ring-blue-500 focus:border-blue-500 block p-2.5 text-center`}
      />
      <select
        name="paid"
        value={select.addSelect}
        onChange={(e) => selectHandler(e.target.value, "addSelect")}
        className={`text-gray-900 w-[10%] h-[80%] mx-1 my-2 rounded-lg  border  text-lg  focus:ring-blue-500 focus:border-blue-500 block text-center`}
      >
        <option value={"paid"} className="">
          Paid
        </option>
        <option value={"unpaid"}>unpaid</option>
      </select>

      <button
        type="submit"
        className="h-[80%] w-[10%] mx-1 my-2 bg-[#95AB3C] hover:bg-[#6b7d23] focus:ring-[#daec8e]  rounded-lg text-center text-lg"
      >
        Add
      </button>
    </form>
  );
}
